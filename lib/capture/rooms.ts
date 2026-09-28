/* ============================================================
 * NESTA Capture — pièces photographiables et quotas conseillés.
 * ============================================================ */

export interface RoomDef {
  id: string;
  label: string;
  quota: number;
  interior: boolean;
}

export const ROOMS: RoomDef[] = [
  { id: "salon", label: "Salon", quota: 2, interior: true },
  { id: "cuisine", label: "Cuisine", quota: 2, interior: true },
  { id: "chambre-principale", label: "Chambre principale", quota: 2, interior: true },
  { id: "chambre", label: "Chambre", quota: 2, interior: true },
  { id: "salle-de-bain", label: "Salle de bain", quota: 1, interior: true },
  { id: "salle-a-manger", label: "Salle à manger", quota: 1, interior: true },
  { id: "sous-sol", label: "Sous-sol", quota: 1, interior: true },
  { id: "exterieur-avant", label: "Extérieur avant", quota: 2, interior: false },
  { id: "exterieur-arriere", label: "Extérieur arrière", quota: 2, interior: false },
  { id: "autre", label: "Autre", quota: 1, interior: true },
];

export function roomById(id: string): RoomDef {
  return ROOMS.find((r) => r.id === id) ?? ROOMS[ROOMS.length - 1];
}
