# NESTA — Note d'audit complète (30 septembre 2026)

Commandée par Gabriel. Trois audits menés ce soir : produit (~45 pages lues), SEO/performance (mesures live), business (unit economics, scénarios, investissement). Rapports détaillés : `01-produit.md`, `02-seo-perf.md`, `03-business.md` (même dossier).

---

## 1. En bref

| Axe | Note | En une phrase |
|---|---|---|
| Produit | 6,5/10 | Large, honnête, fini en surface — mais ne peut encaisser aucun dollar et sa page phare rame. |
| SEO | 6/10 | Fondations solides (sitemap 560k URL, canonical, GSC) mais anglais invisible et fiches « thin content ». |
| Performance | 6/10 | Pages clés < 1 s, mais `/passeport` met ~59 s (même bug que /statistiques avant son correctif). |
| Idée / business | — | TAM ~10–12 M$/an, 2 vrais différenciants, mais distribution = 0 $ aujourd'hui. Scénario central à 3 ans : 150–350 k$ cumulés (45 %). |

Phrase qui résume tout : **la valeur actuelle de l'entreprise, c'est sa distribution, et sa distribution vaut aujourd'hui ~0 $ — 80 % vente/distribution, 20 % produit.**

---

## 2. Ce que Nesta fait aujourd'hui

**L'actif central : 532 127 profils de propriétés** issus de données ouvertes (rôle foncier Ville de Montréal + 153 municipalités de la Montérégie via MAMH/Données Québec). C'est le vrai fossé : personne d'autre n'offre cette granularité gratuitement au Québec.

**Pages principales :**
- **Accueil** — promesse « Voyez le potentiel derrière chaque propriété », angle anti-commission (« 25 000 $ ou 699 $ ? »).
- **/passeport** — recherche de propriétés (OK) + explorateur des 532k profils (**cassé en pratique : ~59 s**, voir §4).
- **/statistiques** — réparée ce soir : 3 pages (Aperçu / Villes avec recherche + tri / Arrondissements triables), < 2 s.
- **/tarifs** — Free 0 $, Pro 4 800 $/an/projet ou 490 $/mois (pilote 3 mois gratuits), LIST 299 $, SELL 699 $, SIGNATURE 1 299 $, 3D Essentiel 299 $, Immersif 599 $.
- **/estimation** — estimateur de valeur (fini en surface, modèle non audité).
- **/investir** — porte encore le badge « exemple » (promesse « potentiel » sous-outillée).
- **Capture guidée** (publier une propriété), **favoris**, **CRM/pro** (699 prospects, 0 projet en ligne).
- FR/EN complet, honnêteté systématique (zéro donnée fictive sur ~45 pages — rare et précieux).

---

## 3. Nom, logo, positionnement

- **Nom « Nesta »** : mémorable (5 lettres, 2 syllabes, FR/EN), évocation de *nest* (nid) exploitable. Deux risques : collision avec la fondation britannique NESTA (vérification OPIC recommandée) et **pas de domaine propre** (`nesta-drab.vercel.app` — à corriger vite, c'est le signal « projet étudiant » n°1).
- **Logo** : N géométrique bleu marine, propre mais corporate — il dit « GROUPE NESTA » sur un produit grand public. Plusieurs fichiers logo coexistent (nettoyage à faire).
- **Positionnement** : clair et différenciant — entre DuProprio (annonces) et Centris (courtiers), avec la data en plus. L'angle anti-commission frappe juste.

---

## 4. Vitesse — le point critique

| Page | TTFB mesuré |
|---|---|
| Accueil | 0,44–0,73 s |
| /tarifs, /statistiques, /statistiques/villes | < 1 s |
| Fiche profil | 0,55–0,9 s |
| **/passeport** | **~59 s (2 timeouts sur 3)** |

**/passeport a exactement le même bug que /statistiques avait** : `listPropertyProfilesForExplorer()` pagine les 532k profils par tranches de 1 000 (533 requêtes séquentielles) puis les sérialise dans le HTML. C'est la page phare du produit — elle est inutilisable en l'état. Même remède que ce soir : recherche côté serveur au lieu du full-scan.

Autres : sitemap profils lent (~30 s pour 40k URL), `/sitemap.xml` refait un COUNT exact à chaque hit (mettre en cache).

---

## 5. SEO

**Solide** : sitemap index valide (1 volet statique + 14 volets de 40 000 URL), robots.txt propre, canonical absolu partout, title/description uniques par fiche, JSON-LD Organization/WebSite, GSC/Bing/Ahrefs vérifiés, 404 correcte.

**À corriger (priorisé) :**
1. **Pas de hreflang, langue par cookie → la version anglaise est invisible pour Google.** Soit hreflang, soit URLs /en dédiées.
2. **Thin content** : ~90 % de boilerplate identique sur les 532k fiches → risque de déclassement. Épaissir avec une phrase générée depuis les données de chaque fiche.
3. **Boilerplate inexact** : « Données issues des Données ouvertes de la Ville de Montréal » s'affiche aussi sur les profils Montérégie (MAMH). À corriger par source.
4. **Maillage interne quasi nul** : zéro lien entre fiches, seule porte d'entrée = l'explorateur /passeport (inutilisable). Ajouter « profils similaires » sur chaque fiche + liens depuis /statistiques/villes.
5. `/statistiques/villes` et `/arrondissements` absentes du sitemap ; og-image 258 Ko carrée au lieu de 1200×630 ; pas de `not-found.tsx` brandée.

---

## 6. Business — la valeur de l'idée, franchement

**Unit economics** : marges ~95–100 % sur toutes les offres (coût marginal ~0). Mais 3 alertes :
- (a) **Aucun checkout Stripe dans tout le codebase** → 0 $ de revenu possible. Bloqueur n°1, avant tout le reste.
- (b) Le 3D produit à la main par Gabriel ne scale pas ; coût OpenArt réel à chiffrer.
- (c) Pilote Pro gratuit 3 mois → premier dollar au mois 4+, sans valider la disposition à payer. Convertir en pilote **payant** 1 500 $/3 mois.

**Cap 100 k$ année 1** : l'arithmétique est bonne (112×699 $ + 3×4 800 $ + 12 mandats), mais le plan d'acquisition n'existe pas. 9,3 deals/mois avec ~0 trafic = inatteignable sans budget pub. Fourchette centrale réaliste : **15–35 k$**. Garder 100 k$ comme stretch, piloter sur un plancher de 25 k$.

**TAM ~10–12 M$/an** (FSBO ~10 M$ à ~14 500 transactions/an ; promoteurs ~1–2 M$). Deux vrais différenciants vérifiés : estimateur gratuit inexistant au QC, badge acheteur vérifié sans équivalent. Le reste est du me-too.

**5 risques majeurs** : acquisition (poule-œuf, tueur n°1) · pas de prix vendus (promesse transparence amputée) · clonage par Realtor.ca/DuProprio · conformité OACIQ · bande passante du fondateur.

**3 scénarios à 3 ans :**
| Scénario | Proba | CA cumulé |
|---|---|---|
| Pessimiste (abandon) | 40 % | < 20 k$ |
| Central (niche rentable) | 45 % | 150–350 k$ |
| Optimiste (catalyseur requis) | 15 % | 400 k$–1 M$ |

**Investissement niveau pro : ~20–50 k$/an** (acquisition payante 10–30 k$ = le poste qui change tout ; juridique 2–5 k$ ; infra ~650 $). Budget Gabriel : 7–12 k$/an → sous-financé 2–4×. Voies : organique (défaut), prévente Pro, concours/bourses (OSEntreprendre, etc.).

---

## 7. Collaboration avec ton prof — ÉCA en construction

*(Correction intégrée : il est estimateur en construction agréé, pas évaluateur agréé — c'est encore mieux pour Nesta.)*

C'est exactement le trou actuel du produit : la promesse « potentiel/rénovation » est sous-outillée, et l'estimateur de coûts de rénovation est la fonctionnalité qui la comblerait. Un ÉCA en construction, c'est la donnée « coûts de matériaux et de construction au Québec » à la source — crédible, locale, à jour.

**6 données à lui demander :**
1. Coûts de construction au pi² par type (unifamiliale, plex, condo) — fourchettes QC 2026.
2. Coûts de rénovation par poste (cuisine, salle de bain, toiture, fondation, électricité, plomberie…).
3. Facteurs d'ajustement (région, âge du bâtiment, qualité des finis).
4. Sa méthodologie de dépréciation (utile pour l'estimateur).
5. Fréquence de mise à jour de ses tables.
6. Source et format réel de ses données (Excel ? PDF ? logiciel ?).

**Ce que ça apporte** : estimateur de rénovation crédible (différenciant n°1 du produit) · badge « fourchettes établies avec la collaboration d'un ÉCA en construction » (confiance) · contenu SEO (guides coûts par poste) · argument B2B pour le Pro.

**3 structures de deal** (progressives) : (1) échange de visibilité pour commencer (il est cité comme collaborateur) ; (2) licence de données quand il y aura du revenu ; (3) partenariat de prescription à terme. **Prudences** : formulation « fourchettes établies avec la collaboration de », jamais « certifié par » (responsabilité OEAQ/AEÉCQ) ; pas d'exclusivité ; vérifier le format réel avant de promettre ; OK écrit avant d'utiliser son nom ; rien de contractuel pour l'instant.

---

## 8. Top priorités (90 jours)

1. **Checkout Stripe** — sans ça, tout le reste est théorique.
2. **Réparer /passeport** — même pattern que /statistiques : recherche serveur, plus de full-scan.
3. **Domaine propre** (nesta.ca ou équivalent) + vérif OPIC du nom.
4. **Cadrer la collab avec ton prof** (liste des 6 données ci-dessus, simple appel).
5. **Pilote Pro payant** 1 500 $/3 mois + 20 prospects/semaine — valider que quelqu'un paie.
6. **SEO** : hreflang, thin content des fiches, boilerplate MAMH, maillage interne.
7. **Geler sur 2 offres** : estimateur gratuit (acquisition) + SELL (revenu). Le reste attend.
8. **Avis juridique OACIQ** avant de scaler les forfaits vendeur.

---

*Notes : 6,5/10 produit · 6/10 SEO · 6/10 performance. Prochaine étape logique : réparer /passeport (même correctif que ce soir), puis Stripe.*
