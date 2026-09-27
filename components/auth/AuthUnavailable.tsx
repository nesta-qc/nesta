import { Container, EmptyState } from "@/components/ui";

/**
 * État affiché par les pages d'authentification quand la configuration
 * Supabase est absente (aucune tentative réseau, aucun crash).
 */
export function AuthUnavailable() {
  return (
    <Container className="flex flex-1 items-center py-16 sm:py-24">
      <div className="w-full">
        <EmptyState
          title="Configuration Supabase manquante"
          description="L'authentification est désactivée tant que le projet Supabase n'est pas branché — voir SETUP.md pour la marche à suivre."
        />
      </div>
    </Container>
  );
}
