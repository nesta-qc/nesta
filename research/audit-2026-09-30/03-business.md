# Audit business NESTA — 30 septembre 2026

Analyse franche, chiffrée, sans langue de bois. Contexte : Gabriel, 19 ans, solo, étudiant à temps plein, budget perso plafonné (~607–1 000 $/mois). Produit : plateforme immobilière québécoise, 532 127 profils (données ouvertes Ville de Montréal + MAMH), 51 pages, infra Vercel Hobby + Supabase (coût ~0 $).

---

## 1. Unit economics par offre

| Offre | Prix | Coût marginal réel | Marge brute | Vrai goulot |
|---|---|---|---|---|
| Free | 0 $ | ~0 $ (infra mutualisée) | — | C'est un aimant, pas un produit. Ne rapporte rien, coûte du support. |
| LIST (vendeur) | 299 $ | ~0 $ (hébergement annonce) | ~100 % | Acquisition. Personne ne connaît Nesta. |
| SELL (vendeur) | 699 $ | ~0 $ + temps de production 3D si fait à la main | ~95 %+ | Acquisition + production 3D (qui la fait ? Gabriel ?). |
| SIGNATURE (vendeur) | 1 299 $ | idem SELL | ~95 %+ | Crédibilité : pourquoi payer 1 299 $ à un inconnu plutôt que 1 199 $ à DuProprio ? |
| 3D Essentiel | 299 $ | ~2–10 $ (génération OpenArt) — **à vérifier** | ~97 % | Temps de production + révisions client. Non scalable à la main. |
| Immersif | 599 $ | ~5–20 $ (génération) — **à vérifier** | ~97 % | Idem. |
| Pro (promoteur) | 4 800 $/an/projet ou 490 $/mois | ~0 $ (page projet) | ~100 % | Cycle de vente B2B (3–9 mois). Le pilote gratuit de 3 mois repousse le premier dollar au mois 4 au mieux. |

**Constats qui fâchent :**

1. **Il n'y a pas de caisse enregistreuse.** Aucun Stripe, aucun checkout (problème ouvert connu). Marge de 100 % sur 0 $ de ventes = 0 $. C'est le bloqueur n° 1, devant tout le reste. Sans paiement en ligne, tout ce qui suit est théorique.
2. **Les marges sont excellentes mais c'est le mauvais indicateur.** Le coût marginal n'est pas le problème ; le coût d'acquisition (CAC) l'est. À 699 $, avec un CAC Meta réaliste de 100–300 $ pour un produit à considération élevée, il reste 400–600 $ par deal — correct, mais il faut d'abord *payer* ce CAC, et le budget actuel ne le permet pas (voir section 4).
3. **Le 3D est une promesse à double tranchant.** Si Gabriel produit chaque visite 3D à la main, chaque vente SELL/Immersif lui coûte des heures. Le modèle ne tient que si la production est automatisée (pipeline OpenArt fiable) ou sous-traitée à prix fixe. À clarifier avant de vendre la première.
4. **Le Pro à 4 800 $/an est bien positionné en prix** (un promoteur dépense 10–50 k$ en marketing par projet ; 4 800 $ pour des leads qualifiés, c'est un ticket d'entrée crédible). Le risque n'est pas le prix, c'est la preuve : aucun promoteur ne paiera sans voir des acheteurs d'abord.

---

## 2. Le cap de 100 k$ année 1 : réaliste ?

Le calcul du cap : 112 deals vendeurs (~78 k$ à 699 $ de panier moyen) + 3 projets promoteurs (14,4 k$) + ~12 mandats services (~5 k$) ≈ 97–100 k$. **L'arithmétique est bonne. Le plan pour y arriver n'existe pas.**

Décomposition honnête :

- **112 deals vendeurs = 9,3/mois, ~2,2/semaine, dès le mois 1.** Avec quel trafic ? Aujourd'hui : ~0 visiteur organique. À 1 % de conversion visiteur→achat (optimiste pour un achat à 699 $ d'une marque inconnue), il faut ~930 visiteurs qualifiés/mois. Le SEO sur 532 k profils est un vrai actif, mais il met 6–12 mois à produire. TikTok founder-led : imprévisible. **Verdict : inatteignable en année 1 sans budget pub.**
- **3 projets promoteurs à 4 800 $.** 699 prospects, prospection à froid, cycle de vente 3–9 mois, pilote gratuit de 3 mois avant le premier paiement. Le premier dollar promoteur réaliste arrive au T2–T3 de l'année 1, pas au T1. 3 signatures sur 699 prospects = 0,4 % de conversion : plausible *sur 12–18 mois*, pas sur 12 mois en partant de zéro avec un vendeur à temps partiel.
- **Ce qui manque dans le cap : le taux d'échec.** Aucune hypothèse sur le churn, les remboursements, les forfaits invendus.

**Verdict franc : le cap de 100 k$ est un objectif d'étirement, pas un plan.** Fourchette centrale réaliste année 1 avec exécution sérieuse et moyens actuels : **15–35 k$**. Atteindre 100 k$ exigerait l'un de ces trois : (a) 15–30 k$ de budget acquisition payante, (b) un canal organique qui explose (TikTok viral + SEO qui décolle tôt), ou (c) un premier promoteur qui signe vite et sert de preuve sociale. Aucun des trois n'est planifié aujourd'hui.

Ce n'est pas une raison d'abandonner le cap — un cap trop bas démotive. Mais il faut le traiter comme un *stretch goal* et piloter sur un plancher de 25 k$.

---

## 3. Valeur de l'idée

### 3.1 Marché adressable (ordres de grandeur, Québec)

- **Vendeurs sans courtier (FSBO).** ~97 000 ventes résidentielles au Québec en 2025 (APCIQ). Part des ventes sans courtier traditionnel : ~15 % (estimation, à affiner) → ~14 500 transactions/an. À 699 $ de panier moyen → **TAM ~10 M$/an**. Petit marché, mais Nesta n'a besoin que de 1 % pour faire 100 k$.
- **Promoteurs (projets neufs en vente).** Actifs en vente dans le Grand Montréal : ~200–400 projets (ordre de grandeur). À 4 800 $/an → **TAM ~1–2 M$/an**. Plus petit en nombre de clients, tickets plus gros, vente plus longue.
- **Investisseurs (vertical hors marché).** Désert concurrentiel confirmé par l'étude. TAM non chiffré (disposition à payer non prouvée) — c'est une option, pas un pilier.

**Lecture : le marché total adressable réaliste tourne autour de 10–12 M$/an.** C'est un marché de niche, pas un marché de licorne. Et c'est très bien : une niche de 10 M$ avec 5 % de part = 500 k$/an pour une équipe de 2–3. Mais il ne faut pas se raconter l'histoire d'une « prochaine licorne ».

### 3.2 Différenciation : le tri honnête

**Deux vrais avantages, vérifiés par l'étude de concurrence :**
1. **L'estimateur gratuit en libre-service n'existe pas au Québec.** HouseSigma est absent de la province, DuProprio réserve sa fourchette à ses clients payants. C'est le seul aimant à trafic éprouvé du secteur — et Nesta l'a déjà en ligne (/estimation).
2. **Le badge « acheteur vérifié » n'a aucun équivalent.** Ni Centris, ni DuProprio, ni Kijiji ne qualifient la solvabilité. C'est l'arme anti-friction n° 1 contre DuProprio (où le vendeur gère seul des curieux non qualifiés).

**Le reste est du « pareil en moins bien » (pour l'instant) :** les annonces (moins d'inventaire que Centris), la visite 3D (DuProprio l'offre déjà), les pages promoteurs (vitrines, tout le monde en a). La verticale investisseurs est un désert, mais c'est aussi un désert parce que personne n'a prouvé qu'on pouvait y faire payer.

**Différenciation nette : mince mais réelle, concentrée sur 2 fonctionnalités.** Suffisant pour exister, insuffisant pour être inattaquable.

### 3.3 Risques majeurs (par ordre de gravité)

1. **Acquisition (poule-œuf).** Sans annonces, pas d'acheteurs ; sans acheteurs, pas de vendeurs ; sans vendeurs, pas de revenus pour acheter du trafic. C'est le risque qui tue 90 % des marketplaces. Le SEO sur 532 k profils est la seule réponse crédible à moyen terme — mais il faut 6–12 mois de patience.
2. **Données : pas de prix vendus.** La promesse « transparence » (historique, comparables) est amputée : les prix vendus sont la donnée propriétaire de Centris/APCIQ. Sans elle, l'estimateur reste indicatif et la différenciation « transparence » est théorique. Risque de déception utilisateur.
3. **Clonage par les gros.** Realtor.ca est devenue à but lucratif (2024) et vise les leads IA ; DuProprio (écosystème Desjardins, 4 M visites/mois) peut ajouter estimation publique ou acheteurs vérifiés en un trimestre. La fenêtre d'avance se compte en mois, pas en années.
4. **OACIQ / conformité.** Les forfaits vendeur sans permis sont légaux *tant que* Nesta ne transmet pas d'offres et ne négocie pas. La ligne est mince et le marketing ne doit jamais la franchir (« on vend votre maison pour vous » = courtage illégal). À faire relire par un avocat avant de scaler : 2–5 k$ bien dépensés.
5. **Bande passante du fondateur.** 19 ans, DEC à temps plein, job à 20 $/h, ~10–15 h/sem max sur Nesta en session. Une marketplace + un SaaS B2B + du 3D manuel + de la prospection à froid, c'est 3 jobs à temps plein. Le risque n'est pas l'idée, c'est l'éparpillement.

### 3.4 Trois scénarios à 3 ans

|  | Pessimiste (40 %) | Central (45 %) | Optimiste (15 %) |
|---|---|---|---|
| Année 1 | 3–8 k$ (quelques forfaits à des proches, pas de checkout avant 6 mois) | 15–35 k$ (checkout en place, 20–50 deals vendeurs, 1 promoteur pilote converti) | 60–100 k$ (canal organique qui décolle + 2–3 promoteurs) |
| Année 2 | Stagnation, projet en maintenance | 40–90 k$ (SEO qui paie, 5–10 projets Pro, bouche-à-oreille vendeurs) | 150–300 k$ (20+ projets Pro, marque installée sur l'estimation gratuite) |
| Année 3 | Abandon ou pivot | 80–180 k$ cumulés sur 3 ans : ~150–350 k$ (niche rentable, équipe de 2) | 400 k$–1 M$ cumulés (50+ projets Pro, investisseur vertical lancé) |
| Sortie | — | Micro-SaaS + revenus vendeurs, option de revente à un acteur local (DuProprio, courtier) | Acteur québécois reconnu, levée ou croissance autofinancée |

**Probabilités assumées :** le scénario central (45 %) suppose que Gabriel (a) met le checkout en place dans les 3 mois, (b) ne s'éparpille pas sur plus de 2 offres, (c) tient le SEO/TikTok 12 mois sans revenus significatifs. Le pessimiste (40 %) reflète la statistique brute : solo, étudiant, sans budget pub, la plupart des projets meurent de l'acquisition. L'optimiste (15 %) exige un catalyseur : un promoteur vitrine, un contenu viral, ou Merouane à temps plein.

**Le point que Gabriel doit entendre :** l'idée vaut quelque chose (niche réelle, 2 vrais avantages, TAM ~10 M$), mais *l'idée ne vaut rien sans distribution*. La question n'est pas « est-ce une bonne idée ? » mais « qui va amener les 1 000 premiers utilisateurs, avec quel argent, en combien d'heures/semaine ? ». Aujourd'hui, cette réponse n'existe pas par écrit.

---

## 4. Investissement pour passer « pro »

Ordre de grandeur, année 1, hors temps de Gabriel :

| Poste | Coût estimé/an | Commentaire |
|---|---|---|
| Infra (Vercel Pro + Supabase Pro) | ~650 $ | Nécessaire dès que le trafic décolle ; aujourd'hui 0 $ suffit |
| Paiement (Stripe) | 2,9 % + 0,30 $/transaction | ~3 k$ sur 100 k$ de CA — à budgéter dans les prix |
| Production 3D (si externalisée/automatisée) | 2–8 k$ | À chiffrer : coût OpenArt réel par visite + temps de contrôle qualité |
| Acquisition payante (Meta/Google) | 10–30 k$ | Le poste qui change tout ; 100–300 $ de CAC × 112 deals |
| Contenu/SEO (outils, pas le temps) | 1–2 k$ | Search Console gratuit ; outils type Ahrefs ~1 k$/an si besoin |
| Juridique (conformité OACIQ, CGV) | 2–5 k$ (one-shot) | Avant de scaler les forfaits vendeur, pas après |
| Comptabilité de base | 1–2 k$ | Dès les premiers revenus |
| **Total « pro »** | **~20–50 k$/an** | |

**Confrontation au réel :** le budget de Gabriel est de 7–12 k$/an. Il manque 2 à 4×. Trois voies :
- **(a) Voie organique (recommandée avec ses moyens) :** 0 $ de pub, tout sur SEO + TikTok + prospection directe promoteurs. Plus lent (12–18 mois avant traction), mais finançable. C'est la voie par défaut.
- **(b) Prévente du Pro :** faire payer 1–2 promoteurs *avant* de construire (pilote payant, pas gratuit). 2 × 4 800 $ = 9 600 $ qui financent l'acquisition vendeurs. Le pilote gratuit de 3 mois est une erreur : un pilote gratuit n'engage à rien et ne valide pas la disposition à payer.
- **(c) Financement externe :** bourses/concours (OSEntreprendre, Futurpreneur — déjà dans son radar) pour 5–20 k$. À viser pour financer l'acquisition, pas le produit (le produit existe déjà).

**Recommandation : corriger le pilote gratuit en pilote payant réduit** (ex. 1 500 $ pour 3 mois, déductible de l'annuel). Un promoteur qui paie 1 500 $ donne un signal 10× plus fort que dix qui acceptent du gratuit.

---

## 5. Collaboration avec le prof évaluateur agréé (É.A.)

### 5.1 Quelles données demander — liste précise

Ne pas demander « tes données » en vrac. Demander des tables exploitables, avec millésime et source :

1. **Coûts de construction à neuf au pi² habitable**, par type (unifamiliale, condo, plex 2–4, multilogement 5+), par gamme (économique / standard / haut de gamme), région Montréal + Rive-Sud. Format : fourchette basse–haute + valeur centrale.
2. **Coûts de rénovation par poste**, fourchettes 2025–2026 : cuisine complète, salle de bain, toiture (bardeau/membrane), fondation (fissures, imperméabilisation), électricité (panneau, remise aux normes), plomberie, fenêtres, revêtement extérieur, sous-sol aménagé. Par poste : fourchette $ et, si possible, $/pi² ou $/unité.
3. **Facteurs d'ajustement** : majoration selon l'âge du bâtiment, l'accès au chantier (urbain dense vs banlieue), et la saisonnalité s'il en a.
4. **Méthodologie** : comment il passe du coût à neuf à la valeur (dépréciation physique/fonctionnelle/économique) — 1 page ou 30 minutes d'explication. C'est ce qui rendra l'estimateur *défendable*.
5. **Fréquence de mise à jour** : à quel rythme ses tables bougent (annuel ? trimestriel ?) et s'il accepte de les rafraîchir 1–2×/an.
6. **Source de ses propres tables** (Marshall & Swift, Altus, interne ?) — pour citer correctement et évaluer la fraîcheur.

### 5.2 Ce que ça change au produit (valeur réelle)

- **L'estimateur passe d'« indicatif » à « crédible ».** Aujourd'hui : valeurs au rôle (fiscales, datées, pas des prix de marché). Avec des coûts de construction/rénovation validés par un É.A., Nesta peut afficher : valeur estimée + *coût de remise à niveau* (« cuisine à refaire : 18–25 k$ »). Aucun concurrent québécois ne fait ça en libre-service.
- **Badge de crédibilité : « Données de coûts validées avec [Nom], évaluateur agréé ».** Sur un marché où la confiance est tout (19 ans, pas de marque), un É.A. qui cautionne les chiffres vaut plus que 10 k$ de pub.
- **Nouveau contenu SEO** : pages « coût de rénovation cuisine Montréal 2026 » — requêtes à forte intention, zéro concurrence structurée au Québec.
- **Argument B2B** : les promoteurs comprennent le langage des coûts ; ça crédibilise le Pro.

Honnêteté : ça ne donne toujours pas les *prix vendus* (le vrai nerf de la guerre), et les fourchettes de coûts restent des fourchettes. Mais ça transforme le point faible « données datées » en avantage « seul à montrer les coûts de réno ».

### 5.3 Trois structures de deal (sans contrat pour l'instant)

1. **Échange de visibilité (recommandé pour démarrer).** Il fournit les tables 1–2×/an ; Nesta affiche « Données de coûts fournies par [Nom], évaluateur agréé » avec lien vers son site/firme sur les pages d'estimation. Lui : des leads d'expertise (les utilisateurs qui veulent un rapport officiel). Coût : 0 $. Durée : tacite, révocable. *Commencer ici.*
2. **Licence de données.** Quand Nesta génère du revenu : forfait annuel (ordre de grandeur à négocier : 1–3 k$/an pour un usage web non exclusif) contre mises à jour garanties + droit de citer. Ne rien proposer de chiffré maintenant — en parler comme une option « quand on aura du revenu ».
3. **Partenariat de prescription.** Co-marquage léger (« Estimation Nesta × [Cabinet] ») + boucle de renvoi : l'estimateur propose « besoin d'un rapport officiel ? » → son cabinet ; lui oriente ses clients vendeurs vers Nesta pour la mise en vente. Le plus puissant à terme, mais exige de la confiance — à construire après 6 mois de (1).

### 5.4 Prudences (importantes)

- **Ne jamais faire signer ses chiffres par son titre sans son accord écrit.** Un É.A. engage sa responsabilité professionnelle (OEAQ, déontologie) quand son titre cautionne des données publiques. Formulation sûre : « fourchettes indicatives établies avec la collaboration de [Nom], É.A. » — jamais « évalué par » ni « certifié par ».
- **Pas d'exclusivité promise**, ni de son côté ni du nôtre. Il doit rester libre de travailler avec d'autres ; Nesta doit rester libre de changer de source.
- **Vérifier le format réel avant de s'emballer.** Beaucoup d'évaluateurs ont leurs tables « dans la tête » ou dans des fichiers internes non partageables. Première question : « sous quel format as-tu ça, et qu'est-ce que tu peux partager ? »
- **Rien d'écrit pour l'instant** au-delà d'un courriel résumant ce qui a été convenu (qui fournit quoi, droit de citer le nom, révocable à tout moment). Un contrat viendra avec la licence (option 2), pas avant.
- **Ne pas utiliser son nom dans du marketing avant son OK explicite**, même verbal confirmé par écrit.

---

## 6. Synthèse : que faire dans les 90 jours ?

1. **Mettre le checkout en place** (Stripe). Sans ça, tout le reste est du théâtre. Semaine 1–4.
2. **Chiffrer le vrai coût de production d'une visite 3D** (OpenArt : coût/génération, temps de QA). Si > 50 $ ou > 2 h par visite, revoir les prix ou le process. Semaine 2.
3. **Convertir le pilote Pro gratuit en pilote payant** (1 500 $ / 3 mois). Contacter 20 prospects/semaine parmi les 699. Semaines 3–12.
4. **Cadre la collaboration avec le prof** (option 1 : échange de visibilité) et obtenir les tables de coûts. Semaines 4–8.
5. **Choisir 2 offres et geler le reste.** Recommandation : l'estimateur gratuit (trafic) + SELL 699 $ (revenu). Le reste (SIGNATURE, Immersif, investisseurs) attend l'année 2. Immédiat.
6. **Avis juridique OACIQ** sur le marketing des forfaits vendeur avant de dépenser en acquisition. Mois 2–3.

**La phrase à retenir :** l'idée est bonne (niche réelle, 2 vrais avantages, TAM ~10 M$), le produit existe, les marges sont excellentes — mais la valeur actuelle de l'entreprise, c'est sa distribution, et sa distribution vaut aujourd'hui ~0 $. Les 90 prochains jours doivent être 80 % vente/distribution, 20 % produit. Pas l'inverse.
