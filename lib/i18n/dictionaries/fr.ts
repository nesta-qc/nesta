/* Dictionnaire français — langue par défaut du site. */

export const fr = {
  nav: {
    passeport: "Passeport",
    acheter: "Acheter",
    vendre: "Vendre",
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
    menu: "Menu",
    fermerMenu: "Fermer le menu",
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
      rechercher: "Rechercher",
      inviteTitre: "Explorez par adresse ou par secteur",
      inviteTexte:
        "Tapez une adresse, choisissez un arrondissement ou fixez une valeur maximale pour voir les profils correspondants.",
      limiteNote:
        "Affichage des 60 premiers résultats — affinez la recherche pour en voir d'autres.",
      valeurAuRole: "Valeur au rôle",
      voirPasseport: "Voir le Passeport →",
      aConfirmer: "À confirmer",
    },
    voirStats: "Voir les statistiques du marché",
  },
  statistiques: {
    eyebrow: "Statistiques du marché",
    titre: "Le marché, en chiffres honnêtes",
    intro:
      "Des agrégats calculés à partir des {n} profils du Passeport Nesta, issus des données ouvertes : Ville de Montréal et MAMH (Données Québec). Aucun chiffre inventé : ce que nous ne savons pas, nous ne l'affichons pas.",
    vueEnsemble: "Vue d'ensemble",
    profilsAnalyses: "Profils analysés",
    valeurMediane: "Valeur au rôle médiane",
    anneeMediane: "Année de construction médiane",
    parArrondissement: "Par arrondissement",
    parVilleArrondissement: "Par ville et arrondissement",
    ongletApercu: "Aperçu",
    ongletVilles: "Villes",
    ongletArrondissements: "Arrondissements",
    rechercherVille: "Rechercher une ville…",
    trierPar: "Trier par",
    triNombreDesc: "Nombre de profils (décroissant)",
    triNombreAsc: "Nombre de profils (croissant)",
    triNom: "Nom (A → Z)",
    triMedianeDesc: "Valeur médiane (décroissante)",
    triMedianeAsc: "Valeur médiane (croissante)",
    aucunResultat: "Aucune ville trouvée pour cette recherche.",
    resultatsVilles: "{n} villes",
    topArrondissements: "Top arrondissements",
    voirTout: "Voir tout",
    detailsSecteurs: "Voir les secteurs",
    arrondissement: "Arrondissement",
    profils: "Profils",
    valeurMedianeColonne: "Valeur médiane au rôle",
    categories: "Catégories de propriétés",
    methodoTitre: "Méthodologie",
    methodoSource:
      "Sources : Ville de Montréal — Données ouvertes (rôle d'évaluation foncière, taxes municipales) ; MAMH — Données Québec (rôles d'évaluation foncière).",
    methodoEchantillon:
      "Échantillon de {n} adresses ({nb} arrondissements, environ {par} profils par arrondissement) : ce n'est pas un portrait représentatif du marché montréalais.",
    methodoEchantillonMulti:
      "Échantillon de {n} adresses ({nv} municipalités, {nb} arrondissements ou secteurs) : ce n'est pas un portrait représentatif du marché.",
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
};
