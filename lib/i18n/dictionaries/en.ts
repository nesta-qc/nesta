/* English dictionary — same structure as fr.ts. */

export const en = {
  nav: {
    passeport: "Passport",
    acheter: "Buy",
    vendre: "Sell",
    estimer: "Valuation",
    investir: "Invest",
    projets: "Projects",
    services: "Services",
    tarifs: "Pricing",
    statistiques: "Statistics",
    connexion: "Log in",
    inscription: "Sign up",
    profil: "Profile",
    favoris: "Favorites",
    deconnexion: "Log out",
    accueilAria: "Nesta — home",
    navPrincipaleAria: "Main navigation",
    navMobileAria: "Mobile navigation",
    favorisAria: "My favorites",
    profilAria: "My profile",
    langueAria: "Choose language",
  },
  investir: {
    exempleBadge: "Example",
  },
  passeport: {
    explorer: {
      recherchePlaceholder: "Search an address, a neighbourhood…",
      rechercheAria: "Search profiles",
      arrondissement: "Borough",
      tousArrondissements: "All boroughs",
      valeurMax: "Max assessed value ($)",
      resultats: "{n} profiles",
      aucunResultatTitre: "No results",
      aucunResultatTexte:
        "No profile matches these criteria. Try broadening your search.",
      reinitialiser: "Reset",
    },
    voirStats: "See market statistics",
  },
  statistiques: {
    eyebrow: "Market statistics",
    titre: "The market, in honest numbers",
    intro:
      "Aggregates computed from the {n} Nesta Passport profiles, sourced from the City of Montréal's open data. No invented numbers: what we don't know, we don't show.",
    vueEnsemble: "Overview",
    profilsAnalyses: "Profiles analyzed",
    valeurMediane: "Median assessed value",
    anneeMediane: "Median year built",
    parArrondissement: "By borough",
    parVilleArrondissement: "By city and borough",
    arrondissement: "Borough",
    profils: "Profiles",
    valeurMedianeColonne: "Median assessed value",
    categories: "Property categories",
    methodoTitre: "Methodology",
    methodoSource:
      "Source: City of Montréal — Open data (property assessment roll, municipal taxes).",
    methodoEchantillon:
      "Sample of {n} addresses ({nb} boroughs, about {par} profiles per borough): this is not a representative portrait of the Montréal market.",
    methodoEchantillonMulti:
      "Sample of {n} addresses ({nv} municipalities, {nb} boroughs or sectors, about {par} profiles per sector): this is not a representative portrait of the market.",
    methodoRole:
      "Values shown are assessed values (property assessment), not sale prices.",
    methodoAnnees:
      "Assessment roll years vary ({annees}): medians mix several assessment rolls.",
    donneesAu: "Data computed on {date}",
    indisponibleTitre: "Statistics unavailable",
    indisponibleTexte:
      "Profile data is currently unreachable. Please come back soon.",
  },
  footer: {
    tagline: "Real estate, your way.",
    colonnes: [
      {
        titre: "Nesta",
        liens: [
          { href: "/a-propos", label: "About" },
          { href: "/tarifs", label: "Pricing" },
          { href: "/services/demande", label: "Contact us" },
          { href: "/favoris", label: "My favorites" },
        ],
      },
      {
        titre: "Real estate",
        liens: [
          { href: "/search", label: "Buy" },
          { href: "/sell", label: "Sell" },
          { href: "/investir", label: "Invest" },
          { href: "/statistiques", label: "Statistics" },
          { href: "/projects", label: "Projects" },
        ],
      },
      {
        titre: "Services",
        liens: [
          { href: "/services#estimation", label: "Valuation" },
          { href: "/services#dessin-revit", label: "Revit / BIM" },
          { href: "/services#modelisation-3d", label: "3D modelling" },
        ],
      },
      {
        titre: "Professionals",
        liens: [{ href: "/pro", label: "Nesta Pro" }],
      },
      {
        titre: "Legal",
        liens: [
          { href: "/confidentialite", label: "Privacy" },
          { href: "/conditions", label: "Terms" },
        ],
      },
    ],
    droits: "© 2026 Nesta — Quebec real estate platform. All rights reserved.",
    avertissement:
      "Displayed valuations are indicative only and do not constitute mortgage approval.",
  },
  accueil: {
    heroSurTitre: "Nesta",
    heroTitre1: "See the potential",
    heroTitre2: "behind every property",
    heroSousTitre:
      "Before buying, renovating or investing, understand what a property could become — no promises, no jargon.",
    ctaRecherche: "Search properties",
    ctaVendre: "Sell with Nesta",
    ctaEstimer: "Estimate my property",
    ouExplorer: "Or browse listings",
    analyseTitre: "Analyze an address",
    analysePlaceholder: "E.g. 4215 Sherbrooke Street West, Montreal",
    analyseBouton: "See the potential",
    analyseNote:
      "Free address analysis: property profile and potential leads, with no promise of value.",
    rechercheAcheter: "Buy",
    rechercheLouer: "Rent",
    rechercheOu: "Where are you looking?",
    rechercheOuPlaceholder: "City, neighbourhood…",
    rechercheType: "Type",
    rechercheTous: "All",
    rechercheMaison: "House",
    rechercheCondo: "Condo",
    recherchePlex: "Plex",
    rechercheTerrain: "Land",
    recherchePrixMax: "Max price",
    rechercheSansLimite: "No limit",
    rechercheChambres: "Bedrooms",
    rechercheToutes: "All",
    rechercheBouton: "Search",
    rechercheAria: "Property search",
    parcoursSurTitre: "Journeys",
    parcoursTitre: "Explore differently.",
    parcoursSousTitre:
      "Three ways to move your real estate project forward — with or without a broker.",
    parcoursAcheter: "Buy",
    parcoursAcheterTexte:
      "Explore Quebec properties, tour in 3D and estimate your true cost.",
    parcoursVendre: "Sell",
    parcoursVendreTexte:
      "List your property yourself, with à-la-carte help or with a broker.",
    parcoursInvestir: "Invest",
    parcoursInvestirTexte:
      "Analyze income properties and prepare your offers with clear data.",
    valeurSurTitre: "Valuation",
    valeurTitre: "What is your property worth?",
    valeurTexte:
      "Get an indicative estimate of a Quebec property's market value in seconds — free, no sign-up.",
    valeurPuces: [
      "Based on the municipal assessment roll",
      "Adjusted to recent market sale prices",
      "Indicative range, no commitment",
    ],
    valeurCta: "Estimate my property",
    valeurAdressePlaceholder: "E.g. 4215 Sherbrooke St W, Montreal",
    valeurAdresseAria: "Address of the property to value",
    vendreSurTitre: "Sell",
    vendreTitre: "Sell your way.",
    vendreTexte:
      "Create your listing in minutes. Choose the level of support that suits you — Nesta stays your tool, not your middleman.",
    vendreOptions: [
      {
        titre: "Without a broker",
        texte:
          "You list, you host the visits, you negotiate. Nesta gives you the tools.",
      },
      {
        titre: "With à-la-carte support",
        texte:
          "Photos, description, staging: pick the help you need.",
      },
      {
        titre: "With a professional",
        texte:
          "Prefer to delegate? Work with the broker of your choice.",
      },
    ],
    vendreCta: "Sell with Nesta",
    investirSurTitre: "Invest",
    investirTitre: "Understand the asset, not just the photo.",
    investirTexte:
      "Enter a building's numbers: Nesta computes the cap rate, cash flow and return on down payment. Your assumptions, shown clearly.",
    investirCta: "Analyze a building",
    comparableLegende: "Real comparable — DuProprio",
    comparableAdresse: "48 Charlevoix Street, Kirkland",
    comparableSuperficie: "Living area",
    comparablePrixPi2: "$/sq ft",
    comparableChambres: "Bedrooms",
    comparableAnnee: "Year built",
    comparableVerifie: "Data verified Sept. 28, 2026",
    estimateSurTitre: "Nesta Estimate",
    estimateTitre: "From plans to budget.",
    estimateTexte:
      "Upload your plans and get a structured estimate of your construction project — line by line, with assumptions shown clearly.",
    estimatePuces: [
      "Estimate by a qualified estimator",
      "Transparent detail, no invented figures",
      "Ideal before buying land or renovating",
    ],
    estimateCta: "Request an estimate",
    pourquoiSurTitre: "Why Nesta",
    pourquoiTitre1: "What others charge you for,",
    pourquoiTitre2: "we spare you.",
    confiance: [
      {
        titre: "$25,000 or $699?",
        texte:
          "Example: a 5% commission (negotiable rate, for illustration only) on a $500,000 sale = $25,000 + taxes. The Nesta SELL plan: $699, one-time payment.",
      },
      {
        titre: "Real prices, finally readable",
        texte:
          "Actual sale prices are nearly inaccessible to the Quebec public. Our comparables are verified, with the source and date on every listing.",
      },
      {
        titre: "Every listing verified",
        texte:
          "Against classified-ad scams: our team verifies every listing before publication.",
      },
      {
        titre: "Zero solicitation",
        texte:
          "Your contact details are never sold or shared. Listing on Nesta attracts no canvassing.",
      },
    ],
    finalTitre: "Your next project starts here.",
    finalExplorer: "Explore properties",
    finalPublier: "List a property",
  },
  estimation: {
    pageSurTitre: "Valuation",
    pageTitre1: "What is",
    pageTitre2: "your property worth?",
    pageSousTitre:
      "An indicative estimate computed from the official municipal assessment roll and median market sale prices. Simple, free, no commitment.",
    metaTitre: "Property valuation",
    metaDescription:
      "Get an indicative estimate of a property's market value from official assessment data.",
    champVille: "City",
    champType: "Property type",
    champTypeIndice: "Leave automatic detection when in doubt",
    typeAuto: "Automatic detection",
    typeMaison: "House",
    typeCondo: "Condo",
    typePlex: "Plex (2 to 4 units)",
    typeMulti: "Multi-unit building",
    typeTerrain: "Land",
    typeCommercial: "Commercial",
    portee: "Estimate scope",
    porteeImmeuble: "Whole building",
    porteeLogement: "Single unit",
    horizon: "Horizon",
    horizonIndice: "The displayed value remains the current value",
    horizonActuel: "Current value",
    horizon3: "+ 3 years",
    horizon5: "+ 5 years",
    champAdresse: "Property address",
    champAdresseIndice: "Civic number and street, e.g. 2219 Duvernay Street",
    champAdressePlaceholder: "E.g. 2219 Duvernay Street",
    champSuite: "Apt. or suite no. (optional)",
    champSuitePlaceholder: "E.g. 201",
    boutonEstimer: "Estimate my property",
    boutonCalcul: "Calculating…",
    erreurAmbigue:
      "Several addresses match (East/West/North/South orientation). Please specify:",
    erreurIntrouvableVilles: "Address not found in {ville}, but it exists elsewhere:",
    erreurIntrouvable:
      "Address not found on the assessment roll. Check the spelling or try a neighbouring address.",
    erreurInvalide: "Please enter a valid address (civic number + street).",
    erreurGenerique: "Something went wrong. Please try again.",
    estimerAilleurs: "Estimate in {ville} →",
    groupePrecisionAdresse: "Specify the address",
    groupeAutreVille: "Try in another city",
    badgeLogement: "1 unit (of {n})",
    valeurEstimee: "Estimated current value",
    fourchetteProbable: "Likely range:",
    fourchetteMin: "Low",
    fourchetteMax: "High",
    marcheReference: "Market reference:",
    projectionTitre: "Indicative projection — in {n} years",
    projectionFourchette: "Range:",
    projectionNote:
      "Damped trend scenario (≈ {taux} %/yr, capped at 5%). Indicative assumption, not a guaranteed forecast.",
    detailValeurRole: "Assessed value",
    detailRole: "Assessment roll",
    detailTerrain: "Lot area",
    detailBatiment: "Building area",
    detailAnnee: "Year built",
    noteCondoRepli: "No unit under 150 m²: classified as “house”.",
    notePlexLogement:
      "Estimate for a single unit: building value divided by the number of units ({n}).",
    avertissement:
      "Indicative estimate computed from the property assessment roll and median market sale prices. It is not a certified appraisal and does not replace the advice of a certified appraiser.",
    sources:
      "Sources: MAMH — Quebec property assessment roll (Données Québec, CC-BY 4.0), APCIQ median sale prices.",
    orientationEst: "East",
    orientationOuest: "West",
    orientationNord: "North",
    orientationSud: "South",
    categorieLabels: {
      terrain: "Land",
      maison: "House",
      condo: "Condo",
      plex: "Plex (2 to 4 units)",
      multi: "Multi-unit building",
      commercial: "Commercial",
    } as Record<string, string>,
  },
};
