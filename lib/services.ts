/* ============================================================
 * NESTA — catalogue de services professionnels.
 * Les prix sont « sur devis » tant que Gabriel ne les a pas
 * fixés : aucun tarif n'est inventé ici.
 * ============================================================ */

export interface NestaService {
  id: string;
  name: string;
  tagline: string;
  scope: string[];
  deliverable: string;
  /** Prix de départ en $ CA, ou null = sur devis. */
  startingPrice: number | null;
  /** "h" = tarif horaire (affiche « 35 $/h »), sinon « À partir de X $ ». */
  priceUnit?: "h";
  /** Option payante proposée sur ce service (ex. vérification ingénieur). */
  addon?: {
    label: string;
    detail: string;
  };
  cta: string;
}

export const NESTA_SERVICES: NestaService[] = [
  {
    id: "estimation",
    name: "Estimation de construction",
    tagline: "Budget fiable avant de construire ou rénover.",
    scope: [
      "Analyse des plans et devis descriptifs",
      "Quantification par corps de métier",
      "Budget détaillé poste par poste",
      "Fourchettes basse / probable / haute",
    ],
    deliverable: "Rapport d'estimation en format PDF (méthode AÉCQ)",
    startingPrice: null,
    cta: "Demander une estimation",
  },
  {
    id: "dessin-revit",
    name: "Dessin Revit",
    tagline: "Des plans propres, prêts pour l'exécution.",
    scope: [
      "Modélisation 3D à partir de plans ou de relevés",
      "Plans d'architecture : aménagement, coupes, façades",
      "Nomenclature des pièces et superficies",
      "Fichiers sources fournis",
    ],
    deliverable: "Maquette Revit + plans en PDF",
    startingPrice: 35,
    priceUnit: "h",
    addon: {
      label: "Vérification par ingénieur en structure",
      detail: "sur devis",
    },
    cta: "Demander un dessin",
  },
  {
    id: "modelisation-3d",
    name: "Modélisation 3D / visite virtuelle",
    tagline: "Présentez un projet avant qu'il existe.",
    scope: [
      "Modélisation 3D à partir de plans 2D",
      "Rendus intérieurs et extérieurs",
      "Visite virtuelle navigable",
      "Ajustements de matériaux et de finis",
    ],
    deliverable: "Rendus HD + lien de visite virtuelle",
    startingPrice: 299,
    cta: "Demander une modélisation",
  },
];

export const SERVICE_REQUEST_STATUSES = [
  { id: "pending", label: "Demande reçue" },
  { id: "in_review", label: "En révision" },
  { id: "quoted", label: "Devis envoyé" },
  { id: "in_progress", label: "En cours" },
  { id: "delivered", label: "Livré" },
  { id: "cancelled", label: "Annulé" },
] as const;

export type ServiceRequestStatus =
  (typeof SERVICE_REQUEST_STATUSES)[number]["id"];

export function serviceStatusLabel(status: string): string {
  return (
    SERVICE_REQUEST_STATUSES.find((s) => s.id === status)?.label ?? status
  );
}

export function getServiceById(id: string): NestaService | undefined {
  return NESTA_SERVICES.find((s) => s.id === id);
}
