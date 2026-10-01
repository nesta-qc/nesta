/* Dictionnaire français — langue par défaut du site. */

export const fr = {
  nav: {
    passeport: "Passeport",
    acheter: "Acheter",
    vendre: "Vendre",
    estimer: "Estimation",
    investir: "Investir",
    projets: "Projets",
    services: "Services",
    tarifs: "Tarifs",
    statistiques: "Statistiques",
    connexion: "Connexion",
    inscription: "Inscription",
    profil: "Profil",
    favoris: "Favoris",
    deconnexion: "Déconnexion",
    accueilAria: "Nesta — accueil",
    navPrincipaleAria: "Navigation principale",
    navMobileAria: "Navigation mobile",
    favorisAria: "Mes favoris",
    profilAria: "Mon profil",
    langueAria: "Choisir la langue",
  },
  investir: {
    exempleBadge: "Exemple",
  },
  passeport: {
    explorer: {
      recherchePlaceholder: "Rechercher une adresse, un secteur…",
      rechercheAria: "Rechercher parmi les profils",
      arrondissement: "Arrondissement",
      tousArrondissements: "Tous les arrondissements",
      valeurMax: "Valeur au rôle max ($)",
      resultats: "{n} profils",
      aucunResultatTitre: "Aucun résultat",
      aucunResultatTexte:
        "Aucun profil ne correspond à ces critères. Essayez d'élargir la recherche.",
      reinitialiser: "Réinitialiser",
    },
    voirStats: "Voir les statistiques du marché",
  },
  statistiques: {
    eyebrow: "Statistiques du marché",
    titre: "Le marché, en chiffres honnêtes",
    intro:
      "Des agrégats calculés à partir des {n} profils du Passeport Nesta, issus des données ouvertes de la Ville de Montréal. Aucun chiffre inventé : ce que nous ne savons pas, nous ne l'affichons pas.",
    vueEnsemble: "Vue d'ensemble",
    profilsAnalyses: "Profils analysés",
    valeurMediane: "Valeur au rôle médiane",
    anneeMediane: "Année de construction médiane",
    parArrondissement: "Par arrondissement",
    parVilleArrondissement: "Par ville et arrondissement",
    arrondissement: "Arrondissement",
    profils: "Profils",
    valeurMedianeColonne: "Valeur médiane au rôle",
    categories: "Catégories de propriétés",
    methodoTitre: "Méthodologie",
    methodoSource:
      "Source : Ville de Montréal — Données ouvertes (rôle d'évaluation foncière, taxes municipales).",
    methodoEchantillon:
      "Échantillon de {n} adresses ({nb} arrondissements, environ {par} profils par arrondissement) : ce n'est pas un portrait représentatif du marché montréalais.",
    methodoEchantillonMulti:
      "Échantillon de {n} adresses ({nv} municipalités, {nb} arrondissements ou secteurs, environ {par} profils par secteur) : ce n'est pas un portrait représentatif du marché.",
    methodoRole:
      "Les valeurs affichées sont des valeurs au rôle (évaluation foncière), pas des prix de vente.",
    methodoAnnees:
      "Les années de rôle varient ({annees}) : les médianes mélangent plusieurs rôles d'évaluation.",
    donneesAu: "Données calculées le {date}",
    indisponibleTitre: "Statistiques indisponibles",
    indisponibleTexte:
      "Les données des profils sont inaccessibles pour le moment. Revenez bientôt.",
  },
  footer: {
    tagline: "L'immobilier, à votre façon.",
    colonnes: [
      {
        titre: "Nesta",
        liens: [
          { href: "/a-propos", label: "À propos" },
          { href: "/tarifs", label: "Tarifs" },
          { href: "/services/demande", label: "Nous joindre" },
          { href: "/favoris", label: "Mes favoris" },
        ],
      },
      {
        titre: "Immobilier",
        liens: [
          { href: "/search", label: "Acheter" },
          { href: "/sell", label: "Vendre" },
          { href: "/investir", label: "Investir" },
          { href: "/statistiques", label: "Statistiques" },
          { href: "/projects", label: "Projets" },
        ],
      },
      {
        titre: "Services",
        liens: [
          { href: "/services#estimation", label: "Estimation" },
          { href: "/services#dessin-revit", label: "Revit / BIM" },
          { href: "/services#modelisation-3d", label: "Modélisation 3D" },
        ],
      },
      {
        titre: "Professionnels",
        liens: [{ href: "/pro", label: "Nesta Pro" }],
      },
      {
        titre: "Légal",
        liens: [
          { href: "/confidentialite", label: "Confidentialité" },
          { href: "/conditions", label: "Conditions" },
        ],
      },
    ],
    droits: "© 2026 Nesta — Plateforme immobilière québécoise. Tous droits réservés.",
    avertissement:
      "Les estimations affichées sont indicatives et ne constituent pas une approbation hypothécaire.",
  },
  accueil: {
    heroSurTitre: "Nesta",
    heroTitre1: "Voyez le potentiel",
    heroTitre2: "derrière chaque propriété",
    heroSousTitre:
      "Avant d'acheter, de rénover ou d'investir, comprenez ce qu'une propriété peut devenir — sans promesse, sans jargon.",
    ctaRecherche: "Rechercher une propriété",
    ctaVendre: "Vendre avec Nesta",
    ctaEstimer: "Estimer ma propriété",
    ouExplorer: "Ou explorez les annonces",
    analyseTitre: "Analyser une adresse",
    analysePlaceholder: "Ex. 4215, rue Sherbrooke Ouest, Montréal",
    analyseBouton: "Voir le potentiel",
    analyseNote:
      "Analyse gratuite de l'adresse : profil de la propriété et pistes de potentiel, sans promesse de valeur.",
    rechercheAcheter: "Acheter",
    rechercheLouer: "Louer",
    rechercheOu: "Où cherchez-vous ?",
    rechercheOuPlaceholder: "Ville, quartier…",
    rechercheType: "Type",
    rechercheTous: "Tous",
    rechercheMaison: "Maison",
    rechercheCondo: "Condo",
    recherchePlex: "Plex",
    rechercheTerrain: "Terrain",
    recherchePrixMax: "Prix max",
    rechercheSansLimite: "Sans limite",
    rechercheChambres: "Chambres",
    rechercheToutes: "Toutes",
    rechercheBouton: "Rechercher",
    rechercheAria: "Recherche de propriété",
    parcoursSurTitre: "Parcours",
    parcoursTitre: "Explorez autrement.",
    parcoursSousTitre:
      "Trois façons d'avancer dans votre projet immobilier — avec ou sans courtier.",
    parcoursAcheter: "Acheter",
    parcoursAcheterTexte:
      "Explorez les propriétés au Québec, visitez en 3D et estimez votre coût réel.",
    parcoursVendre: "Vendre",
    parcoursVendreTexte:
      "Publiez votre annonce vous-même, avec accompagnement ou avec un courtier.",
    parcoursInvestir: "Investir",
    parcoursInvestirTexte:
      "Analysez des immeubles et préparez vos offres avec des données claires.",
    valeurSurTitre: "Estimation",
    valeurTitre: "Combien vaut votre propriété ?",
    valeurTexte:
      "Obtenez en quelques secondes une estimation indicative de la valeur marchande d'une propriété au Québec — gratuitement, sans inscription.",
    valeurPuces: [
      "Basée sur le rôle d'évaluation foncière",
      "Ajustée aux prix récents du marché",
      "Fourchette indicative, sans engagement",
    ],
    valeurCta: "Estimer ma propriété",
    valeurAdressePlaceholder: "Ex. 4215, rue Sherbrooke Ouest, Montréal",
    valeurAdresseAria: "Adresse de la propriété à estimer",
    vendreSurTitre: "Vendre",
    vendreTitre: "Vendez à votre façon.",
    vendreTexte:
      "Créez votre annonce en quelques minutes. Choisissez le niveau d'accompagnement qui vous convient — Nesta reste votre outil, pas votre intermédiaire.",
    vendreOptions: [
      {
        titre: "Sans courtier",
        texte:
          "Vous publiez, vous gérez les visites, vous négociez. Nesta vous donne les outils.",
      },
      {
        titre: "Avec accompagnement à la carte",
        texte:
          "Photos, description, mise en valeur : choisissez l'aide dont vous avez besoin.",
      },
      {
        titre: "Avec un professionnel",
        texte:
          "Vous préférez déléguer ? Travaillez avec un courtier de votre choix.",
      },
    ],
    vendreCta: "Vendre avec Nesta",
    investirSurTitre: "Investir",
    investirTitre: "Comprenez l'actif, pas juste la photo.",
    investirTexte:
      "Saisissez les chiffres d'un immeuble : Nesta calcule le taux de capitalisation, le cash-flow et le rendement sur mise de fonds. Vos hypothèses, affichées clairement.",
    investirCta: "Analyser un immeuble",
    comparableLegende: "Comparable réel — DuProprio",
    comparableAdresse: "48, rue Charlevoix, Kirkland",
    comparableSuperficie: "Superficie",
    comparablePrixPi2: "$/pi²",
    comparableChambres: "Chambres",
    comparableAnnee: "Année",
    comparableVerifie: "Données vérifiées le 28 sept. 2026",
    estimateSurTitre: "Nesta Estimate",
    estimateTitre: "Des plans au budget.",
    estimateTexte:
      "Téléversez vos plans et obtenez une estimation structurée de votre projet de construction — poste par poste, avec les hypothèses affichées clairement.",
    estimatePuces: [
      "Estimation par un estimateur qualifié",
      "Détail transparent, sans chiffre inventé",
      "Idéal avant d'acheter un terrain ou de rénover",
    ],
    estimateCta: "Demander une estimation",
    pourquoiSurTitre: "Pourquoi Nesta",
    pourquoiTitre1: "Ce que les autres vous facturent,",
    pourquoiTitre2: "on vous l'épargne.",
    confiance: [
      {
        titre: "25 000 $ ou 699 $ ?",
        texte:
          "Exemple : 5 % de commission (taux négociable, à titre indicatif) sur une vente de 500 000 $ = 25 000 $ + taxes. Le forfait Nesta SELL : 699 $, paiement unique.",
      },
      {
        titre: "Les prix réels, enfin lisibles",
        texte:
          "Les prix de vente réels sont quasi inaccessibles au public québécois. Nos comparables sont vérifiés, avec la source et la date sur chaque fiche.",
      },
      {
        titre: "Chaque annonce vérifiée",
        texte:
          "Contre les arnaques des petites annonces : notre équipe vérifie chaque annonce avant sa publication.",
      },
      {
        titre: "Zéro sollicitation",
        texte:
          "Vos coordonnées ne sont jamais revendues ni partagées. Publier sur Nesta n'attire aucun démarchage.",
      },
    ],
    finalTitre: "Votre prochain projet commence ici.",
    finalExplorer: "Explorer les propriétés",
    finalPublier: "Publier une propriété",
  },
  estimation: {
    pageSurTitre: "Estimation",
    pageTitre1: "Combien vaut",
    pageTitre2: "votre propriété ?",
    pageSousTitre:
      "Une estimation indicative calculée à partir du rôle d'évaluation foncière officiel et des prix de vente médians du marché. Simple, gratuit, sans engagement.",
    metaTitre: "Estimation de propriété",
    metaDescription:
      "Obtenez une estimation indicative de la valeur marchande d'une propriété à partir des données officielles d'évaluation foncière.",
    champVille: "Ville",
    champType: "Type de bien",
    champTypeIndice: "Laissez la détection automatique en cas de doute",
    typeAuto: "Détection automatique",
    typeMaison: "Maison",
    typeCondo: "Copropriété (condo)",
    typePlex: "Plex (2 à 4 logements)",
    typeMulti: "Immeuble multi-logements",
    typeTerrain: "Terrain",
    typeCommercial: "Commercial",
    portee: "Portée de l'estimation",
    porteeImmeuble: "Immeuble complet",
    porteeLogement: "Un seul logement",
    horizon: "Horizon",
    horizonIndice: "La valeur affichée reste la valeur actuelle",
    horizonActuel: "Valeur actuelle",
    horizon3: "+ 3 ans",
    horizon5: "+ 5 ans",
    champAdresse: "Adresse de la propriété",
    champAdresseIndice: "Numéro civique et rue, ex. 2219 rue Duvernay",
    champAdressePlaceholder: "Ex. 2219 rue Duvernay",
    champSuite: "N° d'appartement ou de bureau (optionnel)",
    champSuitePlaceholder: "Ex. 201",
    boutonEstimer: "Estimer ma propriété",
    boutonCalcul: "Calcul en cours…",
    erreurAmbigue:
      "Plusieurs adresses correspondent (orientation Est/Ouest/Nord/Sud). Précisez :",
    erreurIntrouvableVilles: "Adresse introuvable à {ville}, mais elle existe ailleurs :",
    erreurIntrouvable:
      "Adresse introuvable au rôle d'évaluation. Vérifiez l'orthographe ou essayez une adresse voisine.",
    erreurInvalide: "Veuillez saisir une adresse valide (numéro civique + rue).",
    erreurGenerique: "Une erreur est survenue. Veuillez réessayer.",
    estimerAilleurs: "Estimer à {ville} →",
    groupePrecisionAdresse: "Préciser l'adresse",
    groupeAutreVille: "Essayer dans une autre ville",
    badgeLogement: "1 logement (sur {n})",
    valeurEstimee: "Valeur actuelle estimée",
    fourchetteProbable: "Fourchette probable :",
    fourchetteMin: "Bas",
    fourchetteMax: "Haut",
    marcheReference: "Marché de référence :",
    projectionTitre: "Projection indicative — dans {n} ans",
    projectionFourchette: "Fourchette :",
    projectionNote:
      "Scénario tendanciel amorti (≈ {taux} %/an, plafonné à 5 %). Hypothèse indicative, pas une prévision garantie.",
    detailValeurRole: "Valeur au rôle",
    detailRole: "Rôle d'évaluation",
    detailTerrain: "Superficie du terrain",
    detailBatiment: "Superficie du bâtiment",
    detailAnnee: "Année de construction",
    noteCondoRepli: "Aucune unité de moins de 150 m² : classé « maison ».",
    notePlexLogement:
      "Estimation pour un seul logement : valeur de l'immeuble divisée par le nombre de logements ({n}).",
    avertissement:
      "Estimation indicative calculée à partir du rôle d'évaluation foncière et des prix de vente médians du marché. Elle ne constitue pas une évaluation agréée et ne remplace pas l'avis d'un évaluateur agréé.",
    sources:
      "Sources : MAMH — Rôle d'évaluation foncière du Québec (Données Québec, CC-BY 4.0), prix de vente médians APCIQ.",
    dossierMarche:
      "Prix établi aux conditions du marché de {mois} · confiance {confiance} · {n} comparables.",
    orientationEst: "Est",
    orientationOuest: "Ouest",
    orientationNord: "Nord",
    orientationSud: "Sud",
    categorieLabels: {
      terrain: "Terrain",
      maison: "Maison",
      condo: "Copropriété",
      plex: "Plex (2 à 4 logements)",
      multi: "Immeuble multi-logements",
      commercial: "Commercial",
    } as Record<string, string>,
  },
  analyse: {
    demarrerSurTitre: "Passeport Nesta",
    demarrerTitre: "Analyser une propriété",
    demarrerTexte:
      "Adresse, valeur, potentiel d'achat, de vente ou d'investissement : l'analyse complète d'un bien, en quelques secondes, à partir des données officielles.",
    champVille: "Ville",
    champAdresse: "Adresse de la propriété",
    champAdressePlaceholder: "Ex. 4215, rue Sherbrooke Ouest",
    boutonAnalyser: "Analyser",
    ficheTitre: "Fiche du bien",
    ficheAdresse: "Adresse",
    ficheVille: "Ville",
    ficheArrondissement: "Arrondissement",
    ficheType: "Type de bien",
    ficheAnnee: "Année de construction",
    ficheAge: "ans",
    ficheTerrain: "Terrain",
    ficheBatiment: "Bâtiment",
    ficheLogements: "Logements",
    ficheValeurRole: "Valeur au rôle foncier",
    ficheValeurEstimee: "Valeur marchande estimée",
    ficheFourchette: "Fourchette indicative",
    ficheMillesime: "Rôle {millesime} — marché de référence {reference}",
    valeurTitre: "Valeur estimée aujourd'hui",
    verdictsTitre: "Acheter, vendre, investir ?",
    verdictsTexte:
      "Lecture du marché pour ce bien, à partir des prix de vente réels (APCIQ). Indicatif seulement — pas un conseil financier.",
    verdictAcheter: "Acheter",
    verdictVendre: "Vendre",
    verdictInvestir: "Investir",
    niveauFavorable: "Favorable",
    niveauNeutre: "Neutre",
    niveauDefavorable: "Défavorable",
    vendreFavorable:
      "La demande porte les prix bien au-delà de l'évaluation foncière : un bon moment pour mettre en vente.",
    vendreNeutre:
      "Marché stable à légèrement haussier pour ce type de bien : une vente reste envisageable, sans précipitation.",
    vendreDefavorable:
      "Marché atone pour ce segment : sauf besoin, attendre peut rapporter davantage.",
    acheterFavorable:
      "Le prix estimé reste proche de l'évaluation foncière : le point d'entrée est raisonnable.",
    acheterNeutre:
      "Marché haussier : l'achat reste possible, mais la marge de négociation sera mince.",
    acheterDefavorable:
      "Vous paieriez le haut du marché : prime d'achat élevée — négociez serré ou attendez.",
    investirFavorable:
      "Immeuble à revenus dans un segment porteur : le profil investisseur est intéressant.",
    investirNeutreRevenus:
      "Immeuble à revenus, marché stable : vérifiez les loyers réels avant de conclure.",
    investirNeutre:
      "Ce type de bien mise sur l'appréciation uniquement : aucun revenu locatif attendu.",
    investirNote:
      "Sans données de loyers, aucun rendement locatif n'est calculé.",
    horizonTitre: "Maintenant ou plus tard ?",
    horizonTexte:
      "Scénario tendanciel : si la dynamique actuelle se poursuit (taux plafonné à 5 %/an, par prudence).",
    horizonMaintenant: "Aujourd'hui",
    horizon3ans: "Dans 3 ans",
    horizon5ans: "Dans 5 ans",
    courbeTitre: "La valeur du bien, année par année",
    courbeNote:
      "Reconstitution indicative : ce que vaudrait le bien s'il avait suivi l'indice annuel des prix du marché québécois (FCIQ/APCIQ, 2010-2026). Pas l'historique réel de ses transactions.",
    courbeTronquee:
      "Indice disponible depuis 2010 : la courbe commence à cette date.",
    courbeLegendePasse: "Reconstitué",
    courbeLegendeActuel: "Aujourd'hui",
    courbeLegendeScenario: "Scénario",
    courbeDetails: "Voir les valeurs année par année",
    courbeInfobulleScenario: "Scénario hypothétique",
    courbeVariationAnnee: "sur un an",
    courbeConsigne: "Survolez ou touchez un point pour voir la valeur de chaque année.",
    methodeTitre: "Notre méthode",
    methodeTexte:
      "Données du rôle d'évaluation foncière (MAMH / Ville de Montréal, licence CC-BY 4.0), ajustées aux prix de vente médians du baromètre APCIQ (référence {reference}). Les prix utilisés sont des prix vendus, jamais des prix demandés.",
    dossierTitre: "Dossier d'évaluation — Système Marché NESTA",
    dossierMarche:
      "Prix établi aux conditions du marché de {mois} · confiance {confiance} · {n} comparables.",
    avertissement:
      "Estimation indicative : ne constitue pas une évaluation agréée et ne remplace pas l'avis d'un professionnel.",
    introuvableTitre: "Adresse introuvable",
    introuvableTexte:
      "Cette adresse n'est pas au rôle d'évaluation des villes couvertes. Demandez une analyse manuelle : la réponse vous parvient par courriel.",
    demandeManuelle: "Demander une analyse manuelle",
  },
};
