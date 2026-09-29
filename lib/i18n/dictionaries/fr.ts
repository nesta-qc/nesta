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
    confiance: [
      {
        titre: "Données transparentes",
        texte:
          "Chaque annonce affiche ses caractéristiques réelles : taxes, superficie, année. Quand une information manque, c'est indiqué.",
      },
      {
        titre: "Visites immersives",
        texte:
          "Les vendeurs peuvent ajouter une vraie visite 3D Matterport, intégrée directement dans l'annonce.",
      },
      {
        titre: "Sans intermédiaire obligé",
        texte:
          "Achetez ou vendez avec ou sans courtier. Nesta reste votre outil, pas votre intermédiaire.",
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
