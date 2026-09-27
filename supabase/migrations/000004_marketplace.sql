-- ============================================================
-- NESTA — Migration 000004 : marketplace (parcours acheteur)
-- Ordre d'exécution : 4 / 7 — après 000003_properties.
-- Rôle : favoris, recherches sauvegardées (avec polygone de
--        zone), demandes de visite, offres d'achat et suivi
--        des transactions.
-- Idempotent : CREATE TABLE IF NOT EXISTS,
--              CREATE INDEX IF NOT EXISTS.
-- Prérequis : 000002 (profiles), 000003 (properties).
-- ============================================================

-- ---------- Table favorites ----------

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, property_id)
);

create index if not exists idx_favorites_property_id
  on public.favorites (property_id);

-- ---------- Table saved_searches ----------

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  filters jsonb not null default '{}',
  polygon geography(Polygon,4326),
  notify boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_saved_searches_user_id
  on public.saved_searches (user_id);
create index if not exists idx_saved_searches_polygon
  on public.saved_searches using gist (polygon);

-- ---------- Table viewings (demandes de visite) ----------

create table if not exists public.viewings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id),
  scheduled_at timestamptz not null,
  party_size int not null default 1,
  status text not null default 'REQUESTED'
    check (status in ('REQUESTED','CONFIRMED','COMPLETED','CANCELLED')),
  buyer_feedback text
    check (buyer_feedback in ('YES','MAYBE','NO')),
  created_at timestamptz not null default now()
);

create index if not exists idx_viewings_property_id
  on public.viewings (property_id);
create index if not exists idx_viewings_buyer_id
  on public.viewings (buyer_id);

-- ---------- Table offers (offres d'achat) ----------

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id),
  amount numeric(14,2) not null,
  status text not null default 'draft'
    check (status in ('draft','submitted','accepted','rejected','withdrawn')),
  conditions jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_offers_property_id
  on public.offers (property_id);
create index if not exists idx_offers_buyer_id
  on public.offers (buyer_id);

-- ---------- Table transactions (suivi post-acceptation) ----------

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id),
  offer_id uuid references public.offers(id),
  stage text not null default 'offer_accepted',
  created_at timestamptz not null default now()
);

create index if not exists idx_transactions_property_id
  on public.transactions (property_id);
create index if not exists idx_transactions_offer_id
  on public.transactions (offer_id);
