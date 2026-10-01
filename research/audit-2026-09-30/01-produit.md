# Audit produit NESTA — 30 septembre 2026

Audit du site https://nesta-drab.vercel.app et du code source (~/workspace/nesta).
Méthode : lecture des ~45 `page.tsx` publics (+ composants proches), en lecture seule.
Périmètre : produit public. L'admin/CRM a été survolé (pas audité en profondeur).

---

## 1. Inventaire des routes

### Pages publiques — parcours acheteur / visiteur

| Route | État | Résumé |
|---|---|---|
| `/` (accueil) | Fini | Hero cinématique plein écran (« Voyez le potentiel derrière chaque propriété »), analyseur d'adresse (GET vers /passeport/analyse), recherche, sections éditoriales (explorer, estimation, vendre, investir), 4 angles « pourquoi Nesta », CTA final. Bilingue FR/EN. |
| `/search` | Fini | Recherche d'annonces sur données réelles : filtres serveur (ville, prix min/max, type, chambres/sdb, superficie, vente/location, visite 3D), pagination, favoris, badge « nouveau » < 14 j. Aucun placeholder. |
| `/properties/[id]` | Fini | Détail d'annonce : 100 % données réelles, 404 si id invalide ou annonce non publiée (sauf proprio/admin), onglet visite 3D revalidé côté serveur. Photos + plans depuis le stockage. |
| `/properties/[id]/modifier` | Fini | Édition propriétaire (gardée : connexion + rôle), badge de statut, publication/dépublication, suppression avec confirmation. |
| `/properties` (index) | **N'existe pas** | Pas de page d'index ; le listing public c'est `/search`. Les liens internes pointent bien vers `/properties/[id]`. |
| `/passeport` | Fini en apparence, **perf critique** | Présentation + autocomplétion d'adresse (données ouvertes réelles) + explorateur de profils (recherche texte, filtre arrondissement, valeur max) + compteur live. **Problème : `listPropertyProfilesForExplorer()` charge les 532 127 profils dans la page serveur et les passe au client qui filtre en local** — dizaines de Mo par visite, page potentiellement inutilisable. L'action `searchPropertyProfiles` (limitée, serveur) existe déjà pour l'autocomplétion : c'est elle qu'il faudrait utiliser partout. |
| `/passeport/profil/[id]` | Fini | La fiche phare : profil open-data (Ville de Montréal / Données Québec) — valeur au rôle (terrain/bâtiment/total), année, superficie, carte, source nommée + lien, badge « Profil — données publiques », disclaimer « pas une annonce ni une valeur marchande ». Champs absents → « À confirmer ». |
| `/passeport/[id]` | Fini | Passeport d'une **annonce vendeur** (distinct du profil open-data). Honnêteté stricte : « À confirmer » partout où ça manque, scénarios plex seulement si type=plex + prix connu, zonage/évaluation foncière = badge « Connexion en préparation » (assumé, pas trompeur). CTA vers /passeport/analyse fonctionnel. |
| `/passeport/analyse` | Fini | Capture guidée de bout en bout, **sans compte** : adresse (autocomplétion), objectif (acheter/rénover/investir), nom/courriel validés, téléphone/message optionnels, consentement. `createAnalysisRequest` : validation serveur → insertion `service_requests` (`user_id: null`) → redirect confirmation. Échec DB → message honnête, jamais de fausse confirmation. |
| `/passeport/analyse/confirmation` | Fini | Statique, sobre, pas de délai inventé. |
| `/statistiques` | Fini (refait ce soir) | Aperçu : 3 cartes (532 127 profils, médiane au rôle, année médiane), top 10 arrondissements, catégories, méthodologie. Agrégats via `market_stats()` cachée en vue matérialisée (~7 ms, refresh pg_cron quotidien). |
| `/statistiques/villes` | Fini (ce soir) | 150+ municipalités : recherche insensible aux accents + tri (nombre décroissant/croissant, nom A→Z, médiane décroissante/croissante). Secteurs repliés par défaut. |
| `/statistiques/arrondissements` | Fini (ce soir) | Tous les secteurs, mêmes tris. |
| `/investir` | Fini, **badge à corriger** | Annonces investissement (`getInvestmentProperties`) + comparables « vérifiés » (`getMarketComparables`) + CTA calculateur. **Le badge « exemple » est toujours présent** (point déjà signalé comme à corriger). Source exacte des comparables non vérifiée dans cet audit. |
| `/investir/calculateur` | Fini | Assistant guidé (8 questions) : taux de capitalisation, cash-flow, rendement sur mise de fonds. Calculs côté client à partir des chiffres saisis. |
| `/estimation` | Fini (surface) | Formulaire (`EstimationForm`) → `fetch("/api/estimation")`, résultat en balayage élégant. La qualité du modèle d'estimation n'a pas été auditée en profondeur. |

### Parcours vendeur / services / pro

| Route | État | Résumé |
|---|---|---|
| `/sell` | Fini | Hero vendeur, 3 options (seul / accompagné / courtier), processus 4 étapes, grille LIST 299 $ / SELL 699 $ / SIGNATURE 1 299 $ (depuis `lib/pricing.ts`). **Le copy promet « Choisissez votre forfait au moment de publier » — cette étape n'existe pas.** |
| `/sell/nouveau` | Fini, **trou monétisation** | Formulaire d'annonce branché (`createProperty`, brouillon → photos → publication, upload géré), gardé (connexion + rôle vendeur). **Aucun choix de forfait ni paiement : « Publier » met l'annonce en ligne gratuitement.** |
| `/sell/annonces` | Fini | Dashboard vendeur réel : annonces (`getMyProperties`), statuts, compteurs de vues 3D réels, publier/retirer/supprimer (avec confirmation). |
| `/services` | Fini | Catalogue (estimation, dessin Revit, modélisation 3D, depuis `lib/services.ts`), prix « à partir de » ou « sur devis », disclaimer honnête (pas de courtage). CTA vers /services/demande présélectionné. |
| `/services/demande` | Fini | Demande de devis multi-étapes, **accessible sans compte** (nom/courriel/téléphone), mention honnête : suivi en ligne réservé aux connectés. Branché (`createServiceRequest`). |
| `/services/demande/confirmation` | Fini | Sobre, pas de promesse de délai. |
| `/services/suivi` | Fini | Demandes du compte (`getMyServiceRequests`), bandeau `?nouveau=1`. |
| `/pro` | Fini | Carrefour pros : NESTA Pro (pilote 3 mois gratuit, 4 800 $/an ou 490 $/mois, renvoi /projects#pro) + liste d'attente partenaires (courtiers/notaires/estimateurs) branchée. |
| `/projects` | Fini | Développements neufs (`getDevelopments`) ; **état vide explicite « Les premiers projets arrivent »** + alerte email réelle — aucun faux projet. Section NESTA Pro + formulaire de lead. |
| `/projects/[id]` | Fini | Fiche projet : unités (prix/ch./sdb/superficie/étage/orientation/statut), carte si coordonnées, contact ventes. Absent → « — » / « À confirmer ». Metadata dynamiques, 404 propre. |

### Compte / auth / légal

| Route | État | Résumé |
|---|---|---|
| `/connexion`, `/inscription` | Fini | Branchés Supabase Auth (`signInWithPassword` / `signUp`), états dégradés propres, redirections. |
| `/mot-de-passe-oublie`, `/reinitialiser-mot-de-passe` | Fini | Reset par email, gestion du lien invalide/expiré. |
| `/onboarding` | Fini | Questionnaire d'arrivée, rôles pro en validation admin manuelle. |
| `/profil` | Fini | Aperçu + formulaires (nom, téléphone, avatar, mot de passe), RLS. **Incohérence : /conditions promet la suppression du compte « à tout moment », aucun bouton dans /profil.** |
| `/favoris` | Fini | Vrais favoris (`getFavoriteProperties`), EmptyState sinon. **Vouvoiement** (« Retrouvez… ») vs tutoiement partout ailleurs. |
| `/conditions`, `/confidentialite` | Fini | Textes rédigés (5 sections ; Loi 25, hébergement Supabase Canada Central, pas d'IP/tracking pub). Non indexées. |

### Admin (survol)

`/admin` : centre de contrôle complet — vue d'ensemble (compteurs SQL réels, activité, revenus), pipeline, prospection (699 prospects), projets, properties, modération, carte, revenus, utilisateurs. Authentification gardée. 100 % données réelles, empty states propres.

### Constat transversal
**Aucune donnée fictive, aucun TODO/FIXME, aucun bouton mort, aucun formulaire non branché** sur les ~45 pages auditées. C'est rare et c'est un vrai actif.

---

## 2. Nom, logo, prise de position

### Nom : « Nesta »
- **Mémorabilité : forte.** 5 lettres, 2 syllabes, se prononce pareil en FR et EN, facile à épeler et à retenir. Bon nom de produit.
- **Sens : ambigu mais exploitable.** Pas de sens direct en français ; évocation de l'anglais *nest* (nid, cocon, foyer) — pertinent pour l'immobilier, même si le lien demande un petit effort. En portugais/italien, « nesta » = « dans celle-ci » (anodin).
- **Risques :**
  - **Collision de marque : NESTA est une fondation britannique connue** (National Endowment for Science, Technology and the Arts). Vérification au registre des marques canadien (OPIC) recommandée avant d'investir dans la marque.
  - **Pas de domaine propre** : le site vit sur `nesta-drab.vercel.app`. Pour la crédibilité (et le SEO), `nesta.ca` / `nestaquebec.ca` devrait être réservé vite — décision déjà repoussée (« pas tout de suite »).
  - « Groupe Nesta » (holding, en constitution) vs « Nesta » (produit) : la distinction est saine, mais aujourd'hui le **logo affiché sur le produit dit « GROUPE NESTA »** — c'est un logo corporate sur un site grand public.

### Logo actuel (`public/logo-groupe-nesta.png`)
- N géométrique dans un hexagone, bleu marine, wordmark « GROUPE NESTA » en capitales espacées. Propre, lisible, crédible.
- **Limites :** (1) c'est un logo de holding, pas un logo de produit grand public — il ne dit ni immobilier, ni « potentiel », ni humain ; (2) le motif hexagone+N est très vu dans la tech (générique) ; (3) **plusieurs fichiers logo coexistent** (`nesta-hexagone-navy.png`, `nesta-wordmark-transparent.png`, `groupe-nesta-logo.png`) — risque d'incohérence visuelle ; (4) pas de déclinaison « Nesta » seul pour le produit (favicon `nesta-icon.png` existe, c'est déjà ça).
- Verdict : correct comme identité corporate de Groupe Nesta inc., **à compléter par une vraie identité produit « Nesta »** (logotype seul, ton plus chaleureux) quand le produit grand public décollera.

### Prise de position / promesse
- **Hero : « Voyez le potentiel derrière chaque propriété »** — « Avant d'acheter, de rénover ou d'investir, comprenez ce qu'une propriété peut devenir — sans promesse, sans jargon. »
- **Signature : « L'immobilier, à votre façon. »** (avec ou sans courtier)
- **Angles d'attaque** (section « pourquoi ») : anti-commission en pourcentage (« 25 000 $ ou 699 $ ? »), honnêteté radicale des données (« ce que nous ne savons pas, nous ne l'affichons pas »), transparence des prix.
- **Évaluation : positionnement clair et différenciant.** DuProprio = sans courtier, Centris = avec courtier ; Nesta se place **entre les deux + la data** (passeport, statistiques, estimation). Le message anti-commission est un angle marketing qui frappe et qui se chiffre — c'est le meilleur slogan d'acquisition actuel. Point de vigilance : la promesse « potentiel » (rénovation, investissement) repose aujourd'hui sur des fiches honnêtes mais **peu outillées** (pas de simulateur de rénovation, pas de coûts travaux) — **la collaboration évoquée avec le prof économiste agréé (données de prix des matériaux) tombe exactement sur ce trou** et crédibiliserait le volet estimation/rénovation. À cadrer : licence des données, attribution, fraîcheur.

---

## 3. Forces et faiblesses

### 5 plus grandes forces
1. **Un actif data réel et massif : 532 127 profils** issus de données ouvertes (Ville de Montréal + MAMH/Données Québec), avec sitemap de 14 volets × 40 000 URL — une base SEO et un corpus d'analyse qu'aucun concurrent québécois « sans courtier » n'affiche publiquement.
2. **Honnêteté produit systématique** : zéro donnée fictive sur ~45 pages, « — » / « À confirmer » / badges assumés (« Connexion en préparation »), états vides explicites (« Les premiers projets arrivent » au lieu de faux projets). C'est la promesse marketing tenue dans le code.
3. **Couverture fonctionnelle large et finie** : recherche avec filtres serveur, fiches annonces + profils, 3 pages de statistiques, tarifs, estimation, calculateur investisseur, capture guidée sans compte, favoris, parcours vendeur complet, services, pro/projets, auth complète, admin/CRM complet — tout est branché, rien n'est mort.
4. **Bilingue FR/EN complet + SEO soigné** : métadonnées dynamiques par page, canonical, sitemap, robots — la tuyauterie d'acquisition organique est posée.
5. **Positionnement qui frappe** : l'angle anti-commission (« 25 000 $ ou 699 $ ? ») est simple, chiffré, mémorable — et le tunnel vendeur existe déjà pour le recevoir.

### 5 plus grandes faiblesses
1. **Zéro monétisation : aucun tuyau de paiement.** Pas de Stripe dans tout le codebase ; les forfaits LIST/SELL/SIGNATURE n'existent que dans le copy et `lib/pricing.ts` ; `/sell/nouveau` publie **gratuitement**. Le cap de 100 k$ année 1 n'a aucun moyen d'encaisser 1 $.
2. **La page phare est cassée en performance** : `/passeport` injecte les 532 127 profils côté client (dizaines de Mo) — la vitrine du produit est potentiellement inutilisable, exactement le bug que Gabriel a signalé sur /statistiques avant son découpage.
3. **Pas de domaine propre, marque non sécurisée** : `nesta-drab.vercel.app` + collision possible avec la fondation NESTA (UK) — investir en pub/SEO là-dessus sans verrouiller la marque et le domaine, c'est construire sur du sable.
4. **La promesse « potentiel » est sous-outillée** : pas de simulateur de coûts de rénovation, pas de données matériaux (d'où l'intérêt de la collaboration avec le prof économiste agréé), badge « exemple » toujours présent sur /investir, source des « comparables vérifiés » non établie dans cet audit.
5. **Incohérences qui érodent la confiance** : copy « Choisissez votre forfait au moment de publier » (étape inexistante), suppression de compte promise mais absente, vouvoiement isolé sur /favoris, logo « Groupe Nesta » sur le produit grand public, autocomplétion /passeport qui fait quitter le formulaire au lieu de le pré-remplir.

---

## 4. État des fonctionnalités clés

| Fonctionnalité | État | Note |
|---|---|---|
| **Passeport — recherche** | Fini, **perf à corriger** | `/search` : filtres serveur, pagination — solide. `/passeport` explorateur : 532k profils côté client — à passer en recherche serveur. Fiches `/passeport/profil/[id]` : finies, honnêtes, sourcées. |
| **/statistiques** | **Fini (ce soir)** | 3 pages (aperçu / villes / arrondissements), recherche + 5 tris, cache ~7 ms, refresh quotidien. |
| **/tarifs** | Fini, 1 promesse douteuse | Comparatif Free/Pro, FAQ, forfaits vendeur affichés. « Favoris et recherche avancée » promis dans Free alors que la **recherche avancée n'existe pas** (problème ouvert connu). |
| **/estimation** | Fini en surface | Formulaire → `/api/estimation`, résultat élégant. Qualité du modèle non auditée ; pas de données de coûts matériaux (piste : prof économiste agréé). |
| **Capture guidée** | **Fini, exemplaire** | `/passeport/analyse` : sans compte, validation serveur, insertion `service_requests`, jamais de fausse confirmation. C'est le tunnel d'acquisition le plus propre du site. |
| **Favoris** | Fini | Réels, connectés, EmptyState propre. |
| **CRM / Pro** | Fini, en attente de traction | Admin complet (pipeline, prospection : 699 prospects / 4 modèles / 29 courriels vérifiés, revenus, modération). `/pro` et `/projects` finis mais **0 projet promoteur en ligne** ; prospection en pause (go de Gabriel requis). |

---

## Note : **6,5 / 10**

Un produit large, honnête et fini en surface, porté par un vrai actif data — mais qui ne peut encaisser aucun dollar et dont la page phare rame : la fondation est solide, la tuyauterie commerciale reste à brancher.
