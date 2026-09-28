-- ============================================================
-- NESTA — Migration 000013 : profils de propriétés publiques
-- (données ouvertes — alimente l'autocomplétion d'adresses et
--  les pages Passeport des profils publics)
--
-- Contexte : le site manquait d'adresses réelles. Cette table
-- stocke des profils issus des Données ouvertes de la Ville de
-- Montréal (unités d'évaluation foncière, adresses ponctuelles,
-- taxes municipales — licence CC-BY 4.0). Chaque valeur vient
-- du jeu de données ; champ absent = NULL (jamais inventé).
--
-- IMPORTANT : ces profils NE SONT PAS des annonces à vendre.
-- Ils ne doivent jamais apparaître dans /search ni être
-- présentés comme des propriétés à vendre.
--
-- RLS : lecture publique (anon + authenticated). Aucune policy
-- d'insert/update/delete → écriture bloquée pour tout le monde
-- (les seeds sont appliqués manuellement via le SQL Editor).
--
-- Fichier écrit le 2026-09-27 — NON APPLIQUÉ en production.
-- Ordre d'application : 000013 puis les seeds
-- supabase/seed_property_profiles*.sql
-- ============================================================

-- Extension pour la recherche floue sur les adresses (autocomplétion).
create extension if not exists pg_trgm;

create table public.property_profiles (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  borough text,
  city text not null default 'Montréal',
  latitude numeric,
  longitude numeric,
  lot_area_sqm numeric,
  construction_year int,
  assessment_land numeric,
  assessment_building numeric,
  assessment_total numeric,
  assessment_year int,
  property_category text,
  data_source text not null default 'Ville de Montréal — Données ouvertes',
  source_url text,
  -- Photo de rue réelle (Mapillary / KartaView, CC BY-SA 4.0).
  -- Vue de la rue à titre indicatif — jamais une photo officielle du bien.
  street_photo_url text,
  street_photo_taken_at timestamptz,
  street_photo_author text,
  street_photo_source text,
  created_at timestamptz not null default now()
);

-- Index pour l'autocomplétion (recherche insensible sur l'adresse).
create index property_profiles_address_trgm_idx
  on public.property_profiles using gin (address gin_trgm_ops);

create index property_profiles_borough_idx
  on public.property_profiles (borough);

alter table public.property_profiles enable row level security;

-- Lecture publique : tout le monde peut consulter les profils.
drop policy if exists "property_profiles : lecture publique" on public.property_profiles;
create policy "property_profiles : lecture publique"
  on public.property_profiles for select
  using (true);

-- Pas de policy insert / update / delete : l'écriture est refusée
-- par défaut sous RLS (seul le SQL Editor / service_role écrit).
