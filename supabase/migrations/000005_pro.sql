-- ============================================================
-- NESTA — Migration 000005 : espace Pro (agences, pros,
--          développements, abonnements)
-- Ordre d'exécution : 5 / 7 — après 000004_marketplace.
-- Rôle : agences, annuaire des professionnels (photographes,
--        inspecteurs, notaires, etc.), projets de développement
--        et leurs unités, abonnements (plans tarifaires).
-- Idempotent : CREATE TABLE IF NOT EXISTS,
--              CREATE INDEX IF NOT EXISTS.
-- Prérequis : 000002 (profiles).
-- ============================================================

-- ---------- Table agencies ----------

create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- ---------- Table professionals (annuaire Pro) ----------

create table if not exists public.professionals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  agency_id uuid references public.agencies(id) on delete set null,
  category text not null
    check (category in ('photographer','scanner_3d','inspector','appraiser','notary','mortgage','insurance','mover','contractor','surveyor')),
  business_name text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_professionals_user_id
  on public.professionals (user_id);
create index if not exists idx_professionals_agency_id
  on public.professionals (agency_id);
create index if not exists idx_professionals_category
  on public.professionals (category);

-- ---------- Table developments (projets de développement) ----------

create table if not exists public.developments (
  id uuid primary key default gen_random_uuid(),
  developer_id uuid not null references public.profiles(id),
  name text not null,
  address text,
  city text,
  location geography(Point,4326),
  description text,
  completion_date date,
  status text not null default 'planned',
  created_at timestamptz not null default now()
);

create index if not exists idx_developments_developer_id
  on public.developments (developer_id);
create index if not exists idx_developments_location
  on public.developments using gist (location);

-- ---------- Table development_units (unités d'un projet) ----------

create table if not exists public.development_units (
  id uuid primary key default gen_random_uuid(),
  development_id uuid not null references public.developments(id) on delete cascade,
  unit_number text not null,
  floor int,
  price numeric(14,2),
  bedrooms int,
  bathrooms numeric(3,1),
  area numeric(10,2),
  orientation text,
  status text not null default 'AVAILABLE'
    check (status in ('AVAILABLE','RESERVED','SOLD')),
  floor_plan_path text
);

create index if not exists idx_development_units_development_id
  on public.development_units (development_id);

-- ---------- Table subscriptions (abonnements) ----------

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan text not null
    check (plan in ('FREE','LIST','SELL','SIGNATURE','PRO','TEAM','BROKERAGE')),
  status text not null default 'active'
    check (status in ('active','cancelled','expired')),
  started_at timestamptz not null default now(),
  ends_at timestamptz
);

create index if not exists idx_subscriptions_user_id
  on public.subscriptions (user_id);
