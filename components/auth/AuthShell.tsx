import type { ReactNode } from "react";
import { Card, Container } from "@/components/ui";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Coquille commune des pages d'authentification : carte centrée,
 * titre éditorial, contenu de formulaire.
 */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <Container className="flex flex-1 items-center justify-center py-16 sm:py-24">
      <Card className="w-full max-w-md p-8">
        <h1 className="font-display text-2xl text-charcoal">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-6">{children}</div>
      </Card>
    </Container>
  );
}
