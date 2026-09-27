# Nesta

Plateforme immobilière québécoise transactionnelle — recherche, vente,
espace professionnels et suivi de projets, avec des données vérifiées et
transparentes.

Phase 1 : fondation (design system, navigation, helpers Supabase).

## Prérequis

- Node.js 20 ou plus récent
- npm
- Un projet Supabase (gratuit) pour la base de données et l'authentification

## Démarrage

```bash
# Installer les dépendances
npm install

# Configurer l'environnement (copier puis remplir vos clés Supabase)
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Sans `.env.local`, l'application démarre quand même : les helpers Supabase
utilisent des valeurs factices et `hasSupabaseConfig()` permet d'afficher des
états dégradés propres au lieu de planter.

## Scripts

| Commande           | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Serveur de développement                 |
| `npm run build`    | Build de production (doit passer sans `.env.local`) |
| `npm start`        | Démarre le build de production           |
| `npm run lint`     | Vérification ESLint                      |
| `npx tsc --noEmit` | Vérification TypeScript (mode strict)    |

## Structure

```
app/                  Routes (/, /search, /sell, /pro, /projects)
components/ui/        Design system (Button, Input, Card, Badge…)
lib/env.ts            Variables d'environnement centralisées
lib/supabase/         Helpers Supabase (client, server, middleware)
proxy.ts              Rafraîchissement de la session Supabase (Next.js 16)
supabase/             Migrations SQL (gérées par un autre agent)
public/               Assets statiques (logo, icône)
```

## Notes techniques

- Next.js 16 : la convention `middleware.ts` est dépréciée au profit de
  `proxy.ts` (voir `node_modules/next/dist/docs`). La logique de session
  reste dans `lib/supabase/middleware.ts` (`updateSession`).
- Design system : Tailwind CSS v4 (`@theme` dans `app/globals.css`),
  Fraunces (titres) + Inter (texte) via `next/font`.
- TypeScript en mode strict, sans `any` injustifié.
