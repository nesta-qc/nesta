# Audit SEO & Performance — NESTA
**Date :** 30 septembre 2026 · **Site :** https://nesta-drab.vercel.app · **Code :** ~/workspace/nesta
**Contexte :** 532 127 profils de propriétés en base (`property_profiles`).

## Résumé exécutif
Les fondations SEO sont propres (sitemap valide, canonicals, métadonnées uniques par fiche, JSON-LD organisation). Mais trois problèmes majeurs plombent le potentiel : **/passeport met ~59 s à répondre** (même bug que /statistiques avant son correctif — 533 requêtes séquentielles), **les 532 k fiches profils sont des îles sans maillage interne** (aucun lien entre elles), et **la version anglaise est invisible pour Google** (langue gérée par cookie, sans hreflang ni URL dédiée).

---

## 1. SEO technique

### Sitemap — ✅ valide
- `/sitemap.xml` → index : 1 volet `statiques.xml` (13 pages) + **14 volets `profils-1.xml` … `profils-14.xml`**, 40 000 URL chacun. Vérifié en direct.
- Chaque fiche profil : `<loc>`, `<lastmod>` (date d'import), `changefreq weekly`, `priority 0.7`. Format conforme au protocole.
- ⚠️ **`/passeport` est dans le sitemap (priority 0.9, daily) mais met ~59 s à répondre** → Googlebot va timeouter et gaspiller son budget de crawl dessus.
- ⚠️ **`/statistiques/villes` et `/statistiques/arrondissements` (créées ce soir) absentes du sitemap statique.**
- ⚠️ L'index `/sitemap.xml` fait un `COUNT(*) exact` sur 532 k lignes à chaque hit (`Cache-Control: max-age=0`) — quelques secondes de latence à chaque crawl du sitemap. Cache court recommandé.
- `changefreq weekly` sur les profils : les données ne changent quasiment jamais (import ponctuel) — `yearly` serait plus honnête, impact mineur.

### robots.txt — ✅ propre
```
User-Agent: * / Allow: / / Disallow: /admin
Sitemap: https://nesta-drab.vercel.app/sitemap.xml
```
Bon. (Le mode admin `SITE_MODE=admin` bloque tout via `Disallow: /` — bonne séparation.)

### Métadonnées (`lib/seo.ts` + layouts) — ✅ bonnes bases, 2 manques
- `metadataBase`, template de titre `%s | Nesta`, `canonical` absolu sur chaque page via `pageMetadata()`. Vérifié en direct : canonical présent sur `/`, `/tarifs`, fiche profil.
- Open Graph + Twitter cards présents ; `og:image` en URL absolue ✅. **Mais** : image carrée 1254×1254 de **258 Ko** — le code lui-même recommande une og-image 1200×630 dédiée. Les partages sociaux seront rognés/mal cadrés.
- Google Search Console vérifié (meta `google-site-verification` dans le layout) ✅.
- JSON-LD présent sur toutes les pages `(site)` : `Organization` + `WebSite` (schema.org) ✅. **Aucune donnée structurée par fiche profil** (ni par page d'ailleurs : pas de `BreadcrumbList`, pas de `WebPage`).
- ❌ **Pas de hreflang.** La langue est lue depuis le cookie `nesta-lang` (`lib/i18n/lang.ts`, français par défaut) : **une même URL sert le FR et l'EN selon le cookie. Googlebot ne verra que la version française** — tout le contenu anglais est invisible au référencement. C'est le plus gros manque SEO structurel après /passeport.

### Fiche profil (`/passeport/profil/[id]`) — ✅ indexable, contenu unique mais mince
Vérifié en direct sur une fiche (Granby) :
- HTTP 200, TTFB ~0,5–0,9 s ✅
- `<title>` unique : « Passeport Nesta — 60, Piverts | Nesta » ✅
- Meta description unique (template avec adresse + ville) ✅
- Canonical auto-référencé ✅, pas de `noindex` → **indexable** ✅
- H1 = l'adresse ✅
- ⚠️ **Contenu dupliqué/« thin »** : ~90 % du texte est du boilerplate identique sur les 532 k pages (intros de sections, disclaimers, CTA). Le contenu vraiment unique se résume à : adresse, ville/arrondissement, 3–4 valeurs au rôle, année, catégorie. Risque réel de classification « thin content » à grande échelle.
- ⚠️ **Boilerplate factuellement faux** : la section « Caractéristiques » dit « Données issues des Données ouvertes de la **Ville de Montréal** » même sur les profils Montérégie (source MAMH). Dupliqué ET inexact.
- Deux routes profils distinctes (`/passeport/[id]` = annonces vendeurs, `/passeport/profil/[id]` = données ouvertes) : contenus et canonicals différents, pas de duplicate à proprement parler, mais une structure d'URL confuse.

### 404 — ⚠️ statut OK, page générique
- URL inexistante → **HTTP 404 correct** (0,76 s) ✅
- Mais **aucun `not-found.tsx`** : c'est la page 404 par défaut de Next.js, non brandée, sans liens utiles → perte sèche du trafic sur URL erronées.

### Redirections — ✅
- `/tarifs/` → 308 vers `/tarifs` (pas de duplicate slash/non-slash) ✅
- En-têtes de sécurité présents (HSTS, nosniff, referrer-policy) ✅

---

## 2. Performance (mesures curl, 30 sept. 2026 ~23h25 EDT)

| Page | HTTP | TTFB (3 essais) | Total | Verdict |
|---|---|---|---|---|
| `/` | 200 | 0,73 / 0,61 / 0,44 s | 0,66–0,94 s | ✅ bon |
| `/tarifs` | 200 | 0,71 / 0,52 / 0,39 s | 0,52–0,91 s | ✅ bon |
| `/statistiques` | 200 | 0,51 / 0,44 / 0,55 s | 0,69–0,95 s | ✅ bon (après correctif) |
| `/statistiques/villes` | 200 | 0,46 / 0,44 / 0,53 s | 0,68–0,83 s | ✅ bon |
| `/search` | 200 | 0,87 / 0,63 / 0,56 s | 0,64–0,93 s | ✅ correct |
| `/passeport/profil/[id]` | 200 | 0,90 / 0,55 s | 0,75–1,08 s | ✅ bon |
| **`/passeport`** | 200/000 | **timeout / 58,6 s / timeout** | — | ❌ **critique** |
| `/sitemap.xml` | 200 | ~3–5 s | — | ⚠️ lent (COUNT à chaque hit) |
| `/sitemaps/profils-1.xml` | 200 | — | ~25–30 s (40 k URL) | ⚠️ acceptable pour un sitemap |

**Cause de /passeport** (`app/(site)/passeport/page.tsx` + `actions/property-profiles.ts`) : la page `await` **`listPropertyProfilesForExplorer()` qui pagine les 532 127 profils par tranches de 1 000 (533 requêtes Supabase séquentielles) puis les sérialise dans le HTML** — exactement le pattern qui faisait planter /statistiques ce matin. Le HTML résultant pèse probablement plusieurs dizaines de Mo.

---

## 3. Maillage interne — ❌ le point faible majeur

- **Zéro lien entre fiches profils** : chaque fiche ne propose que « ← Retour au Passeport » + CTA estimation. Pas de « propriétés similaires » (même rue, même arrondissement).
- **Seule porte d'entrée vers les profils** : le composant `ProfileExplorer` sur `/passeport`… qui est inutilisable (59 s). Autrement dit : **les 532 k pages ne sont découvrables que via le sitemap**, sans aucun signal de popularité/profondeur via liens internes.
- `/search` ne lie aucun profil directement (0 lien `/passeport/profil/` dans le HTML).
- L'accueil ne lie `/passeport` qu'une fois (navigation).
- Pas de fil d'Ariane (ni visuel, ni `BreadcrumbList` JSON-LD) sur les fiches.
- Footer : maillage correct entre pages statiques (statistiques, tarifs, projets…).

**Conséquence SEO** : 532 k pages orphelines = Google les crawle via sitemap mais ne leur accorde aucune autorité interne ; avec le contenu mince (section 1), le risque de non-indexation massive (« Discovered – currently not indexed » / « Crawled – currently not indexed » dans GSC) est élevé.

---

## 4. Top 5 des recommandations (priorisées)

1. **Réparer /passeport — CRITIQUE.** Ne plus charger les 532 k profils côté serveur. Comme pour /statistiques : ne charger qu'un compteur + une recherche serveur (`ilike` + `limit`, déjà existant via `searchPropertyProfiles`), ou paginer côté client via API. Tant que TTFB > 5 s, **retirer /passeport du sitemap** pour ne pas brûler le budget de crawl.
2. **Mailler les fiches profils.** Sur chaque fiche : bloc « Profils similaires » (6 liens : même rue ou même arrondissement/ville, requête SQL triviale). + Lier chaque ville de `/statistiques/villes` vers une recherche pré-filtrée. C'est le levier n°1 pour faire indexer les 532 k pages.
3. **Épaissir le contenu unique par fiche.** Ajouter 1–2 phrases générées depuis les données (ex. : « Maison construite en 1954 à Granby — valeur au rôle de X $, {au-dessus/en dessous} de la médiane de la ville » avec lien vers /statistiques/villes). **Corriger le boilerplate « Ville de Montréal » sur les profils MAMH** (inexact + dupliqué). Envisager `noindex` sur les fiches quasi vides si GSC signale du thin content.
4. **Internationalisation.** Ajouter `hreflang` (ou des URLs `/en` dédiées — la langue par cookie est invisible de Google). Sans ça, 50 % du potentiel de recherche est perdu et il y a un risque de contenu perçu comme dupliqué FR/EN.
5. **Finitions sitemap & partage.** Ajouter `/statistiques/villes` et `/statistiques/arrondissements` à `statiques.xml` ; og-image 1200×630 < 100 Ko ; `not-found.tsx` brandée avec liens ; `Cache-Control` court (ex. 1 h) sur `/sitemap.xml` pour éviter le COUNT à chaque hit.

---

## Notes

- **SEO : 6/10** — Les fondations techniques sont solides (sitemap valide, canonicals, métadonnées uniques, JSON-LD organisation, GSC vérifié), mais le maillage interne vers les 532 k fiches est inexistant, l'anglais est invisible pour Google (cookie sans hreflang), et /passeport figure au sitemap avec un TTFB de ~59 s.
- **Performance : 6/10** — Toutes les pages clés répondent en moins d'une seconde (accueil, tarifs, statistiques, fiches profils), mais /passeport est inutilisable (~59 s, timeouts 2 fois sur 3) et le sitemap des profils met ~30 s à se générer.
