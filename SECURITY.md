# Politique de sécurité — NESTA

## Signaler une vulnérabilité

Écris à l'équipe (Merouane / Gabriel) en privé. Ne crée pas d'issue
publique pour une faille de sécurité.

## Secrets

- Ne commite JAMAIS de clé, token ou mot de passe. Les fichiers
  `.env*` sont ignorés par Git (voir `.gitignore`).
- Clés Supabase : `NEXT_PUBLIC_SUPABASE_URL` et
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont publiques par design (la clé
  anon est dans le JS client). `SUPABASE_SERVICE_ROLE_KEY` /
  `SUPABASE_SECRET_KEY` ne sortent JAMAIS du serveur (variables
  d'environnement Vercel uniquement).
- En cas d'exposition d'une clé privée : la régénérer dans le
  dashboard Supabase (Project Settings → API), mettre à jour les
  variables Vercel, redéployer.

## Base de données (Supabase / Postgres)

- Le Row Level Security (RLS) est ACTIF sur toutes les tables
  applicatives. Chaque nouvelle table/migration DOIT faire
  `alter table … enable row level security` + des politiques
  restrictives (principe du moindre privilège).
- Exceptions volontaires et documentées :
  - lecture publique : `agencies`, `property_profiles`,
    `market_comparables`, annonces `properties` publiées ;
  - insertion anonyme : `development_alerts`, `pro_leads`,
    `page_views`, `pro_waitlist`, `estimation_requests`
    (formulaires publics ; lecture réservée aux admins).
- Les fonctions `SECURITY DEFINER` DOIVENT déclarer
  `SET search_path = public` (protection contre le hijacking
  de search_path).
- Ne JAMAIS logger d'adresse IP brute ni d'identifiant personnel
  dans les tables publiques (Loi 25).

## Application (Next.js)

- En-têtes de sécurité configurés dans `next.config.ts`
  (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  Permissions-Policy).
- Rate limiting en mémoire sur les API publiques
  (`lib/rate-limit.ts`) : protection par instance — en cas
  d'attaque distribuée, passer à un stockage partagé (Redis)
  ou à Cloudflare.
- Validation systématique des entrées avec `zod` côté API.

## Comptes et accès

- 2FA obligatoire sur GitHub, Supabase, Vercel et Google
  (comptes Merouane + Gabriel).
- Organisation GitHub `nesta-qc` : seuls Merouane et Gabriel sont
  Owners. Ne pas ajouter de collaborateurs sans besoin.
- Branch protection sur `main` recommandée (reviews avant merge).

## Dépendances

- `npm audit` avant chaque mise en production ; corriger les
  vulnérabilités critiques sans délai.
