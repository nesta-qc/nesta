-- ============================================================
-- NESTA — Migration 000003 : propriétés et contenus liés
-- Ordre d'exécution : 3 / 7 — après 000002_auth_core.
-- Rôle : table properties (annonces) + tables satellites
--        (médias, caractéristiques, documents), trigger de
--        calcul automatique de la colonne geography depuis
--        latitude/longitude, index spatiaux et de recherche.
-- Idempotent : CREATE TABLE IF NOT EXISTS,
--              CREATE INDEX IF NOT EXISTS,
--              DROP TRIGGER IF EXISTS avant recréation.
-- Prérequis : 000001 (PostGIS), 000002 (profiles, set_updated_at).
-- ============================================================

-- ---------- Table properties ----------

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  listing_type text not null default 'sale'
    check (listing_type in ('sale','rent')),
  status text not null default 'draft'
    check (status in ('draft','published','suspended','sold','rented','withdrawn')),
  address text not null,
  city text not null,
  province text not null default 'QC',
  postal_code text,
  latitude double precision,
  longitude double precision,
  location geography(Point,4326),
  asking_price numeric(14,2),
  property_type text
    check (property_type in ('house','condo','plex','land','commercial','other')),
  bedrooms int,
  bathrooms numeric(3,1),
  living_area numeric(10,2),
  lot_area numeric(12,2),
  year_built int,
  municipal_tax numeric(12,2),
  school_tax numeric(12,2),
  description text,
  virtual_tour_provider text,
  virtual_tour_url text,
  virtual_tour_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger updated_at générique.
drop trigger if exists trg_properties_updated_at on public.properties;
create trigger trg_properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

-- Calcule location (geography) depuis latitude/longitude
-- quand location est NULL. Ne touche jamais à une location
-- explicitement fournie.
create or replace function public.set_property_location()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.location is null
     and new.latitude is not null
     and new.longitude is not null then
    new.location := ST_SetSRID(ST_MakePoint(new.longitude, new.latitude), 4326)::geography;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_properties_location on public.properties;
create trigger trg_properties_location
  before insert or update on public.properties
  for each row execute function public.set_property_location();

-- Index : recherche spatiale (GIST) + filtres courants (btree).
create index if not exists idx_properties_location
  on public.properties using gist (location);
create index if not exists idx_properties_status
  on public.properties (status);
create index if not exists idx_properties_city
  on public.properties (city);
create index if not exists idx_properties_asking_price
  on public.properties (asking_price);

-- ---------- Table property_media ----------

create table if not exists public.property_media (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  kind text not null default 'photo'
    check (kind in ('photo','video','floor_plan')),
  storage_path text not null,
  caption text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_property_media_property_id
  on public.property_media (property_id);

-- ---------- Table property_features ----------

create table if not exists public.property_features (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  feature_key text not null,
  feature_value text,
  unique (property_id, feature_key)
);

-- ---------- Table property_documents ----------

create table if not exists public.property_documents (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  doc_type text not null,
  name text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_property_documents_property_id
  on public.property_documents (property_id);
