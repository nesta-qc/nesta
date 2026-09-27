"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "@/actions/favorites";

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorite?: boolean;
}

/**
 * Bouton cœur : sauvegarde la propriété dans les favoris réels.
 * Redirige vers la connexion si l'utilisateur est anonyme.
 */
export function FavoriteButton({
  propertyId,
  initialFavorite = false,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () =>
    startTransition(async () => {
      const result = await toggleFavorite(propertyId);
      if (!result.ok && result.error === "Connectez-vous pour sauvegarder des favoris.") {
        router.push("/connexion");
        return;
      }
      if (result.ok) setFavorite(result.favorite);
    });

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={favorite}
      aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-50 ${
        favorite
          ? "border-forest bg-forest text-white"
          : "border-border bg-white text-charcoal/60 hover:border-forest hover:text-forest"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
