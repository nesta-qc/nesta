-- NESTA — comparables du marché (données tierces vérifiées, avec source).
-- Ces lignes NE SONT PAS des annonces Nesta : ce sont des faits publics
-- (adresse, prix demandé, caractéristiques) relevés sur des annonces
-- DuProprio actives, avec URL source et date de vérification.
-- Aucune photo ni texte marketing reproduit.

create table if not exists public.market_comparables (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city text not null,
  borough text,
  property_type text not null check (property_type in ('house', 'condo', 'plex')),
  asking_price numeric not null check (asking_price > 0),
  bedrooms integer,
  bathrooms numeric,
  living_area numeric,
  lot_area numeric,
  year_built integer,
  condo_fees_monthly numeric,
  gross_revenue_annual numeric,
  latitude double precision,
  longitude double precision,
  source_name text not null default 'DuProprio',
  source_url text,
  verified_at date not null,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.market_comparables enable row level security;

drop policy if exists "Lecture publique des comparables" on public.market_comparables;
create policy "Lecture publique des comparables"
  on public.market_comparables for select
  using (true);

create index if not exists market_comparables_city_idx on public.market_comparables (city);
create index if not exists market_comparables_type_idx on public.market_comparables (property_type);

-- Seed initial : 20 annonces DuProprio vérifiées le 2026-09-28.
insert into public.market_comparables
  (address, city, borough, property_type, asking_price, bedrooms, bathrooms, living_area, lot_area, year_built, condo_fees_monthly, gross_revenue_annual, latitude, longitude, source_url, verified_at, notes)
values
  ('5957, rue de Bellefeuille', 'Montréal', 'Saint-Léonard', 'plex', 1349000, 3, 1, null, 3990.18, 1966, null, 93600, 45.5874645, -73.5812910,
   'https://duproprio.com/fr/montreal/saint-leonard/triplex-a-vendre/hab-5957-rue-de-bellefeuille-1141873', '2026-09-28',
   'Triplex semi-détaché, libre immédiatement.'),
  ('2209-2211-2213, rue Coupal', 'Montréal', 'Ville-Marie', 'plex', 689000, 3, 1, null, 1872.92, null, null, 32604, 45.5293875, -73.5553517,
   'https://duproprio.com/en/montreal/ville-marie-centre-ville-et-vieux-montreal/triplex-for-sale/hab-2209-2211-2213-rue-coupal-1141884', '2026-09-28',
   'Triplex près du métro Frontenac, 100 % occupé.'),
  ('5-3960, rue Saint-Hubert', 'Montréal', 'Le Plateau-Mont-Royal', 'condo', 1460000, 3, 3, 1535, null, 1910, 350, null, 45.5219814, -73.5737169,
   'https://duproprio.com/fr/montreal/le-plateau-mont-royal/condo-a-vendre/hab-5-3960-rue-saint-hubert-1142542', '2026-09-28',
   'Terrasse commune de l''immeuble (pas privée). Garage souterrain.'),
  ('401-5295, rue Drolet', 'Montréal', 'Le Plateau-Mont-Royal', 'condo', 789000, 3, 1, 1111, null, null, 591.25, null, 45.5276340, -73.5925740,
   'https://duproprio.com/fr/montreal/le-plateau-mont-royal/condo-a-vendre/hab-401-5295-rue-drolet-1142187', '2026-09-28',
   'Penthouse sur 2 niveaux, terrasse privée sur le toit.'),
  ('11729, av. Claude-Legault', 'Montréal', 'Montréal-Nord', 'house', 699000, 4, 2.5, 1882, 4514.38, 1967, null, null, 45.6095839, -73.6268274,
   'https://duproprio.com/fr/montreal/montreal-nord/maison-a-vendre/hab-11729-avenue-claude-legault-1130974', '2026-09-28',
   'Garage privé, piscine hors terre.'),
  ('11481, rue Joseph-Casavant', 'Montréal', 'Ahuntsic-Cartierville', 'plex', 1600000, 9, 5, null, 3360.49, 1961, null, 46200, 45.5332162, -73.6917292,
   'https://duproprio.com/en/montreal/ahuntsic-cartierville/triplex-for-sale/hab-11481-rue-joseph-casavant-1137050', '2026-09-28',
   'Triplex détaché, extension 2020, 100 % occupé.'),
  ('5457-5461-5459, rue Mignault', 'Montréal', 'Mercier–Hochelaga-Maisonneuve', 'plex', 1057000, 3, 1, null, 2999.90, 1960, null, 62520, 45.5858895, -73.5496313,
   'https://duproprio.com/fr/montreal/mercier-hochelaga-maisonneuve/triplex-a-vendre/hab-5457-5461-5459-rue-mignault-1142306', '2026-09-28',
   'Triplex semi-détaché rénové.'),
  ('301-9995, rue Lajeunesse', 'Montréal', 'Ahuntsic-Cartierville', 'condo', 452000, 2, 1, null, null, null, null, null, 45.5522792, -73.6572393,
   'https://duproprio.com/fr/montreal/ahuntsic-cartierville/condo-a-vendre/hab-301-9995-rue-lajeunesse-1142364', '2026-09-28',
   'Stationnement extérieur.'),
  ('2264, rue Harriet-Quimby', 'Montréal', 'Saint-Laurent', 'condo', 439000, 1, 1, 680, null, null, null, null, 45.5133944, -73.7092455,
   'https://duproprio.com/fr/montreal/saint-laurent/condo-a-vendre/hab-2264-rue-harriet-quimby-1132242', '2026-09-28',
   'Garage, proximité REM.'),
  ('3745, boul. Gouin E.', 'Montréal', 'Montréal-Nord', 'house', 845000, 4, 2, 2000, 11336.55, null, null, null, 45.5939362, -73.6484521,
   'https://duproprio.com/fr/montreal/montreal-nord/maison-a-vendre/hab-3745-boulevard-gouin-est-1111837', '2026-09-28',
   'Bord de l''eau (Rivière-des-Prairies).'),
  ('2529-2537, rue Chapleau', 'Montréal', 'Ville-Marie', 'plex', 2150000, null, null, null, 2947, null, null, 123048, 45.5346755, -73.5599743,
   'https://duproprio.com/fr/montreal/ville-marie-centre-ville-et-vieux-montreal/quintuplex-a-vendre/hab-2529-2531-2533-2535-2537-rue-c-1141922', '2026-09-28',
   'Quintuplex, 100 % occupé. Garage : info à confirmer (double vs triple selon la fiche).'),
  ('127, chemin de la Pointe-Sud', 'Montréal', 'L''Île-des-Sœurs', 'house', 1595000, 4, 3.5, 2105, null, 2006, null, null, 45.4490703, -73.5521483,
   'https://duproprio.com/fr/montreal/lile-des-soeurs/maison-en-rangee-de-ville-a-vendre/hab-127-chemin-de-la-pointe-sud-1142011', '2026-09-28',
   'Maison en rangée sur 2 étages.'),
  ('4315, rue d''Amiens', 'Montréal', 'Montréal-Nord', 'plex', 875000, 3, 1.5, null, 2413.27, null, null, null, 45.5905457, -73.6332465,
   'https://duproprio.com/fr/montreal/montreal-nord/duplex-a-vendre/hab-4315-rue-damiens-1141984', '2026-09-28',
   'Duplex, garage intégré chauffé, occupation immédiate.'),
  ('800-802, 3e Avenue', 'Montréal', 'Lachine', 'plex', 679000, 8, 3, null, 2407, 1949, null, 38040, 45.4433962, -73.6664761,
   'https://duproprio.com/fr/montreal/lachine/duplex-a-vendre/hab-800-802-3e-avenue-1072236', '2026-09-28',
   'Toiture refaite 2025, fondation imperméabilisée.'),
  ('11899, rue Valmont', 'Montréal', 'Ahuntsic-Cartierville', 'house', 750000, 3, 1.5, 1153, 3942, 1956, null, null, 45.5408638, -73.6928623,
   'https://duproprio.com/fr/montreal/ahuntsic-cartierville/bungalow-a-vendre/hab-11899-rue-valmont-1141365', '2026-09-28',
   'Bungalow, garage.'),
  ('5578, rue Louis-Dumouchel', 'Montréal', 'Mercier–Hochelaga-Maisonneuve', 'house', 839000, 3, 2, 1576.91, 2378.82, 1998, null, null, 45.6009229, -73.5424218,
   'https://duproprio.com/fr/montreal/mercier-hochelaga-maisonneuve/jumele-a-vendre/hab-5578-rue-louis-dumouchel-1135103', '2026-09-28',
   'Jumelé, garage, près du métro Honoré-Beaugrand.'),
  ('914, rue Gilbert-Langevin', 'Montréal', 'Le Plateau-Mont-Royal', 'condo', 409000, 1, 1, 850, null, 2005, null, null, 45.5322686, -73.5927090,
   'https://duproprio.com/fr/montreal/le-plateau-mont-royal/condo-a-vendre/hab-914-rue-gilbert-langevin-1137676', '2026-09-28',
   'Rez-de-jardin avec terrasse.'),
  ('2902, rue Bossuet', 'Montréal', 'Mercier–Hochelaga-Maisonneuve', 'condo', 282000, 2, 1, 771, null, 2007, 458.39, null, 45.5740856, -73.5417183,
   'https://duproprio.com/fr/montreal/mercier-hochelaga-maisonneuve/condo-a-vendre/hab-2902-rue-bossuet-1125425', '2026-09-28',
   'Condo divise de coin, terrasse et entrée privées.'),
  ('48, rue Charlevoix', 'Kirkland', null, 'house', 828000, 3, 1.5, 1096, 6000, 1979, null, null, 45.4499493, -73.8779239,
   'https://duproprio.com/fr/montreal/kirkland/maison-a-vendre/hab-48-rue-charlevoix-1130781', '2026-09-28',
   'Maison à paliers multiples.'),
  ('2270-2272-2274, rue Lacordaire', 'Montréal', 'Mercier–Hochelaga-Maisonneuve', 'plex', 1195000, 5, 5, null, 2890, null, null, null, 45.5698713, -73.5340264,
   'https://duproprio.com/fr/montreal/mercier-hochelaga-maisonneuve/triplex-a-vendre/hab-2270-2272-2274-rue-lacordaire-1137741', '2026-09-28',
   'Triplex intergénérationnel, vente sans garantie légale.');
