-- ============================================================
-- NESTA — 000026 : tunnel de paiement (commandes + Projets)
--
-- `orders` : forfaits vendeur (LIST / SELL / SIGNATURE), paiement unique.
-- `project_subscriptions` : abonnements NESTA Projets (annuel / mensuel,
--   essai 90 j), liés ensuite à un développement par l'équipe.
-- `developments.is_pro` : badge « Projet Pro » sur /projects.
--
-- RLS : lecture/écriture réservées au service_role (webhook Stripe).
-- Aucune policy publique : l'anon key ne voit rien.
-- ============================================================

-- ---------- orders ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  kind text not null check (kind in ('seller_plan', 'projets_subscription')),
  plan text not null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'cad',
  customer_email text,
  status text not null default 'paid'
    check (status in ('paid', 'refunded', 'cancelled')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_customer_email_idx
  on public.orders (customer_email);
create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

alter table public.orders enable row level security;
-- Pas de policy publique : seul le service_role (webhook) écrit/lit.

-- ---------- project_subscriptions ----------
create table if not exists public.project_subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_subscription_id text not null unique,
  stripe_customer_id text,
  customer_email text,
  billing text not null check (billing in ('annuel', 'mensuel')),
  status text not null default 'trialing'
    check (status in ('trialing', 'active', 'past_due', 'canceled')),
  trial_end timestamptz,
  development_id uuid references public.developments (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_subscriptions_customer_email_idx
  on public.project_subscriptions (customer_email);
create index if not exists project_subscriptions_status_idx
  on public.project_subscriptions (status);

alter table public.project_subscriptions enable row level security;
-- Pas de policy publique : seul le service_role (webhook) écrit/lit.

-- ---------- developments.is_pro ----------
alter table public.developments
  add column if not exists is_pro boolean not null default false;

comment on column public.developments.is_pro is
  'Badge « Projet Pro » : développement lié à un abonnement NESTA Projets actif.';
