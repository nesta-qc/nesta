-- ============================================================
-- NESTA — seed « vraies adresses » (données ouvertes) — LOT 2
-- Généré le 2026-09-30 par scripts/import-profiles-batch2.py
-- (même méthodologie que le lot 1 : taxes municipales, unités
-- d'évaluation foncière, adresse ponctuelle — CC-BY 4.0 ;
-- coordonnées manquantes via Nominatim (OpenStreetMap, ODbL) ;
-- photos de rue : NULL — retirées du site.)
-- Champ absent dans les jeux -> NULL (jamais inventé).
-- IMPORTANT : one-shot, PAS d'upsert — ne contient QUE des profils
-- inédits (dédupliqués contre le lot 1 et dans le lot). Ne pas
-- réappliquer. RLS : lecture publique seule.
-- Fichier 2b/2a/2b/2c/2d — 450 lignes.
-- ============================================================

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3620, rue Legendre Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.574826, -73.624347, 473.0, 1945, NULL, NULL, 735133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7605, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539926, -73.622262, 220.0, 1927, NULL, NULL, 710300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7547, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539677, -73.621357, 192.0, 1929, NULL, NULL, 714400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9013, 8e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.569797, -73.62807, NULL, NULL, NULL, NULL, 549200.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7715, rue Louis-Hemon', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.555227, -73.610639, 781.0, 1953, NULL, NULL, 900000.0, 2024, 'Service de garderie (prématernelle, moins de 50 % de poupons)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7724, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540374, -73.623749, 143.0, 1928, NULL, NULL, 842600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8261, avenue Casgrain', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.541009, -73.633285, 177.0, 1932, NULL, NULL, 853833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8550, rue Waverly', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.538478, -73.640003, 263.0, 1951, NULL, NULL, 539000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7722, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540046, -73.623861, 139.0, 1928, NULL, NULL, 988633.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7370, rue Cartier', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.549693, -73.60954, 409.0, 1960, NULL, NULL, 1544400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4225, avenue Marcil', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.475498, -73.62182, 156.0, 1924, NULL, NULL, 740500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5287, avenue Cumberland', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.47011, -73.645395, 314.0, 1951, NULL, NULL, 544933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8405, rue Bougainville', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.502178, -73.661417, 978.0, 1962, NULL, NULL, 2747533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5350, avenue Patricia', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.46035, -73.654888, 231.0, 1968, NULL, NULL, 845700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5198, avenue de Westbury', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.485801, -73.629753, 375.0, 1936, NULL, NULL, 845700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4048, avenue de Vendome', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.479222, -73.615114, NULL, NULL, NULL, NULL, 888067.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4374, avenue de Melrose', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.474042, -73.626071, 221.0, 1927, NULL, NULL, 1290100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4029, avenue de Hampton', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.469559, -73.623075, 249.0, 1915, NULL, NULL, 1511900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5340, avenue Patricia', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.460313, -73.654784, 292.0, 1968, NULL, NULL, 835200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5265, avenue Cumberland', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.469862, -73.64477, 308.0, 1951, NULL, NULL, 490400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6524, avenue Mclynn', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489082, -73.647527, 323.0, 1949, NULL, NULL, 772633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4552, avenue Wilson', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.476035, -73.628523, 298.0, 1928, NULL, NULL, 1258500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5172, rue West Broadway', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.460402, -73.650761, 358.0, 1950, NULL, NULL, 485900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3135, rue Jean-Brillant', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.499518, -73.618732, 439.0, 1949, NULL, NULL, 1465100.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5924, avenue Coolbrook', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.487769, -73.641824, 195.0, 1944, NULL, NULL, 576633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6365, avenue Lennox', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.513165, -73.625285, 235.0, 1951, NULL, NULL, 688500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4990, Grand Boulevard', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.472922, -73.637673, NULL, NULL, NULL, NULL, 1421500.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4250, avenue Carlton', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.49823, -73.63654, 286.0, 1950, NULL, NULL, 681300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4210, avenue Carlton', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.498314, -73.636477, 286.0, 1950, NULL, NULL, 681300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5231, avenue Cumberland', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.469616, -73.644141, 300.0, 1952, NULL, NULL, 526833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4356, avenue de Melrose', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.473935, -73.625826, 223.0, 1927, NULL, NULL, 1070900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5565, avenue de Stirling', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.508051, -73.616408, 810.0, 1950, NULL, NULL, 1663233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4182, avenue Hingston', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.469586, -73.626073, 238.0, 1922, NULL, NULL, 1234100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5141, avenue Macdonald', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.480968, -73.632844, 371.0, 1951, NULL, NULL, 692900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4160, avenue Carlton', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.498446, -73.636362, 286.0, 1950, NULL, NULL, 681300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4638, avenue Lacombe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.491847, -73.62753, 177.0, 1947, NULL, NULL, 679567.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4600, avenue de Mayfair', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.461999, -73.641416, 295.0, 1947, NULL, NULL, 931700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5320, avenue Notre-Dame-de-Grace', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.476897, -73.615362, 117.0, 1930, NULL, NULL, 566000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3831, avenue Marlowe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.478189, -73.613648, 255.0, 1919, NULL, NULL, 1468400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6658, avenue Mclynn', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489633, -73.648815, NULL, NULL, NULL, NULL, 676667.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4335, avenue West Hill', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.467685, -73.630811, 222.0, 1922, NULL, NULL, 460833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4960, Grand Boulevard', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.472778, -73.637319, NULL, NULL, NULL, NULL, 866400.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4364, avenue de Melrose', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.473646, -73.626214, 294.0, 1926, NULL, NULL, 1375900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4723, avenue Grosvenor', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.486513, -73.617715, 266.0, 1927, NULL, NULL, 594500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6335, avenue Lennox', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.513163, -73.624466, 295.0, 1943, NULL, NULL, 931800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5220, avenue de Westbury', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.486034, -73.630234, 436.0, 1950, NULL, NULL, 26817.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5924, rue Sherbrooke Ouest', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.46868, -73.619005, 249.0, 1927, NULL, NULL, 468080.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4910, avenue Walkley', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.466558, -73.641579, 870.0, 1950, NULL, NULL, 1549967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2365, avenue Beaconsfield', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.467174, -73.621641, 23.0, 2015, NULL, NULL, 654700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5077, avenue Randall', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.471075, -73.639963, 235.0, 1950, NULL, NULL, 613800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6280, rue Saint-Jacques', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.462612, -73.619139, 5455.0, 1977, NULL, NULL, 900000.0, 2025, 'Service de réparation d''automobiles (garage) sans pompes à essence(5531)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5833, chemin de la Cote-des-Neiges', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.499966, -73.629652, 31.0, 2004, NULL, NULL, 186033.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6640, avenue Mclynn', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489562, -73.648594, 323.0, 1949, NULL, NULL, 620033.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4309, avenue West Hill', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.467559, -73.630438, 221.0, 1981, NULL, NULL, 671133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4709, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.480961, -73.627731, 225.0, 1928, NULL, NULL, 578733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5255, rue West Broadway', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.461253, -73.651886, 346.0, 1952, NULL, NULL, 451133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, chemin de la Cote-des-Neiges', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.495026, -73.617168, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4350, avenue de Melrose', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.473564, -73.626028, 223.0, 1928, NULL, NULL, 846900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3439, avenue Rosedale', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.461536, -73.634539, 435.0, 1924, NULL, NULL, 1116500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4699, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.480873, -73.627541, 276.0, 1928, NULL, NULL, 662300.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7545, chemin Westover', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.459857, -73.657179, 285.0, 2003, NULL, NULL, 622800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4275, avenue West Hill', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.467335, -73.63, 251.0, 1949, NULL, NULL, 629067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4693, boulevard Edouard-Montpetit', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.492102, -73.629281, 595.0, 1951, NULL, NULL, 1331067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5247, avenue Cumberland', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.469701, -73.644359, 241.0, 1954, NULL, NULL, 511500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4969, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481665, -73.629385, 336.0, 1929, NULL, NULL, 671900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3263, avenue Van Horne', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.503577, -73.630176, 473.0, 1936, NULL, NULL, 2414633.0, 2026, 'Maison de chambres et pension', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4939, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481143, -73.629239, 278.0, 1930, NULL, NULL, 707400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5149, avenue Macdonald', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481032, -73.632987, 446.0, 1910, NULL, NULL, 782567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5152, avenue de Westbury', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.485458, -73.62894, 360.0, 1936, NULL, NULL, 830100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5916, rue Sherbrooke Ouest', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.468728, -73.618913, 320.0, 1923, NULL, NULL, 326640.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4386, chemin Circle', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.485334, -73.626413, 498.0, 1946, NULL, NULL, 950233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5309, avenue Patricia', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.460448, -73.654088, 225.0, 1961, NULL, NULL, 558700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4329, avenue Harvard', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.474946, -73.62433, 241.0, 1924, NULL, NULL, 757400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4827, avenue Isabella', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489403, -73.628536, 352.0, 1946, NULL, NULL, 968900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2243, avenue d''Oxford', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.470599, -73.612931, 105.0, 1910, NULL, NULL, 662000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4685, boulevard Edouard-Montpetit', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.492234, -73.629157, 589.0, 1951, NULL, NULL, 1397733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5856, avenue Coolbrook', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.487403, -73.640968, 232.0, 1944, NULL, NULL, 592700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4857, rue Jean-Brillant', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.488898, -73.628462, 287.0, 1951, NULL, NULL, 916700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5870, avenue de Westbury', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.490166, -73.638425, 379.0, 1952, NULL, NULL, 680900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6600, avenue Trans Island', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.491909, -73.645963, 279.0, 1951, NULL, NULL, 765900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5375, avenue Macdonald', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.482696, -73.636726, 331.0, 1955, NULL, NULL, 704200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5235, avenue Macdonald', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481557, -73.63417, 446.0, 1953, NULL, NULL, 1068300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4981, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481747, -73.629603, 336.0, 1930, NULL, NULL, 710367.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4830, avenue Lacombe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489827, -73.62933, 304.0, 1946, NULL, NULL, 884400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4580, avenue de Mayfair', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.461879, -73.64112, 336.0, 1929, NULL, NULL, 935400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6664, avenue Mclynn', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489669, -73.648878, 323.0, 1949, NULL, NULL, 612067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5153, avenue Coolbrook', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.482972, -73.631105, 158.0, 1930, NULL, NULL, 681800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4390, chemin Circle', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.485432, -73.626256, 529.0, 1946, NULL, NULL, 1196700.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4007, avenue Marlowe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.478543, -73.614446, 239.0, 1920, NULL, NULL, 1596600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6195, avenue de Monkland', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.469449, -73.628727, 55.0, 1999, NULL, NULL, 512800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4331, avenue Rosedale', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.462021, -73.635775, 427.0, 1938, NULL, NULL, 905300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5850, avenue de Westbury', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.490067, -73.638169, 406.0, 1952, NULL, NULL, 751300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6950, avenue Victoria', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.497364, -73.645265, 849.0, 1968, NULL, NULL, 2901100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4255, avenue West Hill', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.467258, -73.62981, 250.0, 1950, NULL, NULL, 535533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5257, avenue Cumberland', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.4698, -73.644599, 308.0, 1951, NULL, NULL, 470133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5144, rue West Broadway', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.460173, -73.650343, 552.0, 1953, NULL, NULL, 921133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5185, rue West Broadway', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.460788, -73.650677, 468.0, 1950, NULL, NULL, 428667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4241, avenue Harvard', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.474403, -73.6232, 258.0, 1922, NULL, NULL, 937400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2278, avenue Marcil', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.471263, -73.612536, 81.0, 1916, NULL, NULL, 450400.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4985, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481789, -73.629694, 336.0, 1929, NULL, NULL, 701800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4850, chemin de la Cote-Saint-Luc', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.483231, -73.615956, 4689.0, 1961, NULL, NULL, 35753333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4625, boulevard Edouard-Montpetit', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.49262, -73.628807, 661.0, 1951, NULL, NULL, 1489667.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4962, avenue Earnscliffe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.481611, -73.629286, 278.0, 1929, NULL, NULL, 888400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2031, avenue de Melrose', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.467776, -73.61193, 42.0, 2011, NULL, NULL, 446700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4039, avenue Marlowe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.478775, -73.614977, 256.0, 1910, NULL, NULL, 1504700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5160, avenue de Westbury', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.485517, -73.629085, 426.0, 1936, NULL, NULL, 845800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5315, rue West Broadway', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.461705, -73.653051, 456.0, 1950, NULL, NULL, 459233.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6560, avenue Mclynn', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.489221, -73.647834, 323.0, 1949, NULL, NULL, 642067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3825, avenue Marlowe', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.478152, -73.613567, 255.0, 1919, NULL, NULL, 1562200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5155, avenue Coolbrook', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Montréal', 45.483188, -73.630569, 85.0, 1930, NULL, NULL, 451700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7791, place Pigeon', 'Anjou', 'Montréal', 45.612361, -73.557876, 468.0, 1965, NULL, NULL, 594200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8354, place Croissy', 'Anjou', 'Montréal', 45.606104, -73.547562, 444.0, 1959, NULL, NULL, 404300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5746, avenue Baldwin', 'Anjou', 'Montréal', 45.607085, -73.541684, 240.0, 1960, NULL, NULL, 394600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8496, place Verdelles', 'Anjou', 'Montréal', 45.609494, -73.550245, 299.0, 1960, NULL, NULL, 712100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7770, avenue de la Loire', 'Anjou', 'Montréal', 45.610292, -73.558592, 298.0, 1966, NULL, NULL, 582500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7227, impasse de la Boulance', 'Anjou', 'Montréal', 45.609282, -73.589445, 71.0, 1991, NULL, NULL, 295800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7206, impasse de l''Eau-Vive', 'Anjou', 'Montréal', 45.608383, -73.587352, 164.0, 1997, NULL, NULL, 446767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8376, place Croissy', 'Anjou', 'Montréal', 45.607146, -73.549077, 436.0, 1959, NULL, NULL, 383300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8220, place Vaujours', 'Anjou', 'Montréal', 45.607173, -73.555327, 402.0, 1960, NULL, NULL, 466933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8347, place Croissy', 'Anjou', 'Montréal', 45.606382, -73.546934, 425.0, 1959, NULL, NULL, 530667.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7364, avenue Rheaume', 'Anjou', 'Montréal', 45.61437, -73.550606, NULL, NULL, NULL, NULL, 725500.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8100, boulevard Yves-Prevost', 'Anjou', 'Montréal', 45.601498, -73.54656, NULL, NULL, NULL, NULL, 526667.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7504, avenue Levesque', 'Anjou', 'Montréal', 45.615431, -73.551796, NULL, NULL, NULL, NULL, 470367.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8778, boulevard Chateauneuf', 'Anjou', 'Montréal', 45.614569, -73.553118, NULL, NULL, NULL, NULL, 648200.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7326, avenue Mousseau', 'Anjou', 'Montréal', 45.613146, -73.550622, 270.0, 1983, NULL, NULL, 349300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5904, avenue du Bocage', 'Anjou', 'Montréal', 45.590626, -73.548912, 314.0, 1973, NULL, NULL, 503300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7171, rue Beaubien Est', 'Anjou', 'Montréal', 45.594507, -73.55744, 84.0, 1992, NULL, NULL, 183767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5776, avenue Baldwin', 'Anjou', 'Montréal', 45.607339, -73.542204, 280.0, 1950, NULL, NULL, 282100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8795, boulevard Chateauneuf', 'Anjou', 'Montréal', 45.615021, -73.553326, NULL, NULL, NULL, NULL, 639967.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7200, impasse de l''Eau-Vive', 'Anjou', 'Montréal', 45.608272, -73.587457, 273.0, 1997, NULL, NULL, 467400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7202, impasse de la Boulance', 'Anjou', 'Montréal', 45.608964, -73.589149, 160.0, 1993, NULL, NULL, 417533.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7830, avenue Guy', 'Anjou', 'Montréal', 45.615865, -73.555368, 209.0, 1981, NULL, NULL, 419067.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7787, avenue Mousseau', 'Anjou', 'Montréal', 45.61543, -73.554997, 418.0, 1982, NULL, NULL, 669167.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5758, avenue Baldwin', 'Anjou', 'Montréal', 45.607181, -73.541878, 435.0, 1955, NULL, NULL, 306500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7796, avenue Levesque', 'Anjou', 'Montréal', 45.61636, -73.5539, NULL, NULL, NULL, NULL, 515967.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7649, avenue de Fougeray', 'Anjou', 'Montréal', 45.611543, -73.55494, 309.0, 1965, NULL, NULL, 584700.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9361, avenue Tourelles', 'Anjou', 'Montréal', 45.609203, -73.580187, 284.0, 1979, NULL, NULL, 437800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7838, avenue Pigeon', 'Anjou', 'Montréal', 45.612209, -73.558422, 302.0, 1965, NULL, NULL, 519900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7171, rue Saint-Zotique Est', 'Anjou', 'Montréal', 45.595505, -73.560301, 81.0, 1993, NULL, NULL, 159700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8500, place Verdelles', 'Anjou', 'Montréal', 45.609535, -73.550347, 425.0, 1960, NULL, NULL, 770933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5896, avenue du Bocage', 'Anjou', 'Montréal', 45.590804, -73.548789, 301.0, 1973, NULL, NULL, 573000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7202, impasse de l''Eau-Vive', 'Anjou', 'Montréal', 45.608309, -73.587418, 164.0, 1997, NULL, NULL, 445600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7030, avenue Giraud Est', 'Anjou', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 290633.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7320, avenue Mousseau', 'Anjou', 'Montréal', 45.6131, -73.550492, 302.0, 1984, NULL, NULL, 371200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7790, avenue de la Loire', 'Anjou', 'Montréal', 45.610403, -73.558859, 298.0, 1966, NULL, NULL, 571800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5820, avenue Azilda', 'Anjou', 'Montréal', 45.608037, -73.54236, 198.0, 1935, NULL, NULL, 327800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7831, avenue Cure-Clermont', 'Anjou', 'Montréal', 45.600939, -73.546393, 443.0, 1956, NULL, NULL, 556167.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7670, avenue Villars', 'Anjou', 'Montréal', 45.599935, -73.552171, 800.0, 1961, NULL, NULL, 926267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7461, avenue des Halles', 'Anjou', 'Montréal', 45.596522, -73.566341, 70.0, 1997, NULL, NULL, 231533.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7111, rue Saint-Zotique Est', 'Anjou', 'Montréal', 45.594981, -73.560654, 120.0, 1994, NULL, NULL, 160767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7821, avenue Cure-Clermont', 'Anjou', 'Montréal', 45.600772, -73.546441, 443.0, 1956, NULL, NULL, 566600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7261, avenue de l''Alsace', 'Anjou', 'Montréal', 45.605778, -73.581263, 221.0, 1984, NULL, NULL, 243100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9696, boulevard des Galeries-d''Anjou', 'Anjou', 'Montréal', 45.605914, -73.586024, 237.0, 1992, NULL, NULL, 319600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7650, avenue Villars', 'Anjou', 'Montréal', 45.599684, -73.552262, 644.0, 1961, NULL, NULL, 993167.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8201, place Vaujours', 'Anjou', 'Montréal', 45.607046, -73.555924, 464.0, 2013, NULL, NULL, 857400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10062, promenade des Riverains', 'Anjou', 'Montréal', 45.605641, -73.590035, 58.0, 1989, NULL, NULL, 124800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8641, avenue Chaumont', 'Anjou', 'Montréal', 45.609867, -73.547424, 72.0, 1965, NULL, NULL, 346067.0, 2023, 'Vente au détail de médicaments et d''articles divers (pharmacie)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10012, promenade des Riverains', 'Anjou', 'Montréal', 45.605367, -73.589412, 225.0, 1989, NULL, NULL, 303700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6411, avenue des Ormeaux', 'Anjou', 'Montréal', 45.609679, -73.543535, 323.0, 1982, NULL, NULL, 394500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7791, avenue Mousseau', 'Anjou', 'Montréal', 45.615486, -73.55515, 209.0, 1983, NULL, NULL, 475133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7710, avenue de la Loire', 'Anjou', 'Montréal', 45.60999, -73.557899, 298.0, 1965, NULL, NULL, 615900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6280, place Bois-de-Coulonge', 'Anjou', 'Montréal', 45.600805, -73.553122, 623.0, 1960, NULL, NULL, 905333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6891, avenue Guy', 'Anjou', 'Montréal', 45.612145, -73.546002, 353.0, 1979, NULL, NULL, 890600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5830, boulevard Joseph-Renaud', 'Anjou', 'Montréal', 45.603919, -73.544055, 271.0, 1959, NULL, NULL, 515000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8363, place Croissy', 'Anjou', 'Montréal', 45.606567, -73.548269, 433.0, 1959, NULL, NULL, 393433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10032, promenade des Riverains', 'Anjou', 'Montréal', 45.606097, -73.589503, 95.0, 1989, NULL, NULL, 144600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7803, place Chambon', 'Anjou', 'Montréal', 45.609278, -73.560647, 149.0, 1964, NULL, NULL, 382700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7740, avenue Levesque', 'Anjou', 'Montréal', 45.616029, -73.553126, NULL, NULL, NULL, NULL, 521900.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6020, avenue des Angevins', 'Anjou', 'Montréal', 45.605342, -73.546856, 417.0, 1959, NULL, NULL, 581767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8195, avenue Peterborough', 'Anjou', 'Montréal', 45.607219, -73.556743, 486.0, 1960, NULL, NULL, 570000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Panneau-Reclame', 'Anjou', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 25300.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10016, promenade des Riverains', 'Anjou', 'Montréal', 45.605367, -73.589412, 79.0, 1989, NULL, NULL, 124800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Mirabeau', 'Anjou', 'Montréal', 45.616313, -73.583268, NULL, NULL, NULL, NULL, 90800.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7631, avenue de Fougeray', 'Anjou', 'Montréal', 45.611418, -73.554653, 243.0, 1965, NULL, NULL, 526233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7793, place Chambon', 'Anjou', 'Montréal', 45.609027, -73.560465, 149.0, 1964, NULL, NULL, 313167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6300, place Bois-de-Coulonge', 'Anjou', 'Montréal', 45.601013, -73.553001, 750.0, 1960, NULL, NULL, 874500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7024, avenue de la Batture', 'Anjou', 'Montréal', 45.608022, -73.595286, 292.0, 2004, NULL, NULL, 670500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7871, avenue de Nantilly', 'Anjou', 'Montréal', 45.612102, -73.558978, 232.0, 1965, NULL, NULL, 483500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7880, avenue Pigeon', 'Anjou', 'Montréal', 45.612396, -73.558848, 303.0, 1965, NULL, NULL, 501300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8190, place Vaujours', 'Anjou', 'Montréal', 45.606716, -73.555928, 482.0, 1960, NULL, NULL, 504100.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8346, place Croissy', 'Anjou', 'Montréal', 45.606009, -73.546567, 681.0, 1959, NULL, NULL, 495600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7380, avenue Rheaume', 'Anjou', 'Montréal', 45.614453, -73.550802, NULL, NULL, NULL, NULL, 750000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6810, boulevard Roi-Rene', 'Anjou', 'Montréal', 45.610055, -73.55066, NULL, NULL, NULL, NULL, 696900.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7061, avenue Giraud', 'Anjou', 'Montréal', 45.60301, -73.581236, 225.0, 1980, NULL, NULL, 337667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10018, promenade des Riverains', 'Anjou', 'Montréal', 45.605367, -73.589412, 79.0, 1989, NULL, NULL, 124800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7841, avenue Cure-Clermont', 'Anjou', 'Montréal', 45.601109, -73.546302, 449.0, 1956, NULL, NULL, 551833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10024, promenade des Riverains', 'Anjou', 'Montréal', 45.605367, -73.589412, 161.0, 1989, NULL, NULL, 234500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10008, promenade des Riverains', 'Anjou', 'Montréal', 45.605367, -73.589412, 184.0, 1989, NULL, NULL, 254700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7231, avenue de l''Alsace', 'Anjou', 'Montréal', 45.606047, -73.581901, 120.0, 1984, NULL, NULL, 262800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7730, avenue de la Loire', 'Anjou', 'Montréal', 45.610061, -73.558055, 298.0, 1965, NULL, NULL, 637400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7795, place Chambon', 'Anjou', 'Montréal', 45.609077, -73.560424, 149.0, 1964, NULL, NULL, 318400.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7811, avenue Mousseau', 'Anjou', 'Montréal', 45.615582, -73.555358, 307.0, 1983, NULL, NULL, 491400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6771, place d''Antioche', 'Anjou', 'Montréal', 45.594117, -73.559898, 112.0, 1983, NULL, NULL, 256333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5820, boulevard Joseph-Renaud', 'Anjou', 'Montréal', 45.603894, -73.543939, 354.0, 1959, NULL, NULL, 519167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7830, boulevard Yves-Prevost', 'Anjou', 'Montréal', 45.601008, -73.546746, NULL, NULL, NULL, NULL, 535200.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8500, boulevard Parkway', 'Anjou', 'Montréal', 45.613645, -73.564356, 5186.0, 1986, NULL, NULL, 900000.0, 2026, 'Entreposage de tout genre', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7349, avenue Guy', 'Anjou', 'Montréal', 45.614097, -73.550456, 390.0, 1950, NULL, NULL, 470300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7850, avenue Pigeon', 'Anjou', 'Montréal', 45.612274, -73.558567, 302.0, 1965, NULL, NULL, 519900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7750, avenue de la Loire', 'Anjou', 'Montréal', 45.610174, -73.558319, 298.0, 1966, NULL, NULL, 613000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7784, avenue Levesque', 'Anjou', 'Montréal', 45.616277, -73.553711, NULL, NULL, NULL, NULL, 499200.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10600, rue Secant', 'Anjou', 'Montréal', 45.618316, -73.579285, 12263.0, 1969, NULL, NULL, 3135000.0, 2022, 'Service de location d''outils ou d''équipements', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8850, boulevard des Galeries-d''Anjou', 'Anjou', 'Montréal', 45.602764, -73.577892, 95.0, 1986, NULL, NULL, 272100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6285, avenue Cairns', 'Anjou', 'Montréal', 45.600538, -73.553468, 733.0, 1959, NULL, NULL, 997833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7028, avenue de la Batture', 'Anjou', 'Montréal', 45.608056, -73.595363, 292.0, 2003, NULL, NULL, 697300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8211, place Vaujours', 'Anjou', 'Montréal', 45.607221, -73.555836, 494.0, 1960, NULL, NULL, 519500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7440, boulevard des Galeries-d''Anjou', 'Anjou', 'Montréal', 45.597531, -73.565448, NULL, NULL, NULL, NULL, 900000.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9000, boulevard des Sciences', 'Anjou', 'Montréal', 45.618585, -73.557353, 39707.0, 2002, NULL, NULL, 900000.0, 2025, 'Autres industries de produits alimentaires', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7740, avenue de la Loire', 'Anjou', 'Montréal', 45.610106, -73.558166, 298.0, 1965, NULL, NULL, 603200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7789, place Chambon', 'Anjou', 'Montréal', 45.608935, -73.560542, 149.0, 1964, NULL, NULL, 315833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7241, avenue de l''Alsace', 'Anjou', 'Montréal', 45.605938, -73.581656, 134.0, 1984, NULL, NULL, 323267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('381, 37e Avenue', 'Lachine', 'Montréal', 45.438408, -73.698482, NULL, NULL, NULL, NULL, 556200.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('412, 16e Avenue', 'Lachine', 'Montréal', 45.436634, -73.677662, NULL, NULL, NULL, NULL, 540100.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('35, 9e Avenue', 'Lachine', 'Montréal', 45.4281, -73.596193, NULL, NULL, NULL, NULL, 323267.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('585, 6e Avenue', 'Lachine', 'Montréal', 45.43978, -73.669738, NULL, NULL, NULL, NULL, 143233.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('117, avenue Vincent', 'Lachine', 'Montréal', 45.447519, -73.642541, 3062.0, 1995, NULL, NULL, 900000.0, 2025, 'Autres services de l''automobile', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('557, 24e Avenue', 'Lachine', 'Montréal', 45.438872, -73.685736, NULL, NULL, NULL, NULL, 589500.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('795, avenue George-V', 'Lachine', 'Montréal', 45.442462, -73.663678, 43521.0, 1926, NULL, NULL, 900000.0, 2023, 'Autres industries de produits manufacturés', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('746, 1e Avenue', 'Lachine', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 277500.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('62, avenue du Moulin', 'Lachine', 'Montréal', 45.445701, -73.653164, 220.0, 1924, NULL, NULL, 153267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('420, avenue Jenkins', 'Lachine', 'Montréal', 45.437892, -73.66092, 250.0, 2019, NULL, NULL, 722800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('76, avenue Saint-Pierre', 'Lachine', 'Montréal', 45.443829, -73.649271, 402.0, 1961, NULL, NULL, 521000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12, 9e Avenue', 'Lachine', 'Montréal', 45.50687, -73.80321, NULL, NULL, NULL, NULL, 365233.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('530, 1e Avenue', 'Lachine', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 803400.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('290, rue Acadia', 'Lachine', 'Montréal', 45.440356, -73.712344, 374.0, 1951, NULL, NULL, 1.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('155, 54e Avenue', 'Lachine', 'Montréal', 45.441052, -73.717498, NULL, NULL, NULL, NULL, 815633.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('880, 10e Avenue', 'Lachine', 'Montréal', 45.446081, -73.672675, NULL, NULL, NULL, NULL, 418300.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('860, 10e Avenue', 'Lachine', 'Montréal', 45.445871, -73.672656, NULL, NULL, NULL, NULL, 196500.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('616, 1e Avenue', 'Lachine', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 476700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('355, 37e Avenue', 'Lachine', 'Montréal', 45.438041, -73.698438, NULL, NULL, NULL, NULL, 612100.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('725, 38e Avenue', 'Lachine', 'Montréal', 45.442844, -73.699232, NULL, NULL, NULL, NULL, 467033.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('645, 6e Avenue', 'Lachine', 'Montréal', 45.440747, -73.669616, NULL, NULL, NULL, NULL, 317067.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('375, rue Acadia', 'Lachine', 'Montréal', 45.441219, -73.713196, 331.0, 1963, NULL, NULL, 493667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('840, 10e Avenue', 'Lachine', 'Montréal', 45.445695, -73.672666, NULL, NULL, NULL, NULL, 538500.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('799, 9e Avenue', 'Lachine', 'Montréal', 45.444649, -73.672137, NULL, NULL, NULL, NULL, 678000.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('295, 35e Avenue', 'Lachine', 'Montréal', 45.436723, -73.695978, NULL, NULL, NULL, NULL, 462133.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('149, avenue Duranceau', 'Lachine', 'Montréal', 45.446513, -73.648884, 177.0, 1928, NULL, NULL, 430133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('235, rue Camille', 'Lachine', 'Montréal', 45.444657, -73.645695, 291.0, 1957, NULL, NULL, 677000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('85, avenue Duranceau', 'Lachine', 'Montréal', 45.445888, -73.647208, 177.0, 1903, NULL, NULL, 615367.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('22, avenue Vincent', 'Lachine', 'Montréal', 45.446632, -73.641338, 221.0, 1910, NULL, NULL, 265800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('885, 52e Avenue', 'Lachine', 'Montréal', 45.447432, -73.717316, NULL, NULL, NULL, NULL, 426467.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('365, 37e Avenue', 'Lachine', 'Montréal', 45.438165, -73.698451, NULL, NULL, NULL, NULL, 565300.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('900, 54e Avenue', 'Lachine', 'Montréal', 45.44764, -73.719015, NULL, NULL, NULL, NULL, 430900.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('285, rue Acadia', 'Lachine', 'Montréal', 45.440287, -73.712877, 694.0, 1978, NULL, NULL, 646700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('784, 38e Avenue', 'Lachine', 'Montréal', 45.444631, -73.698943, NULL, NULL, NULL, NULL, 433867.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('132, rue Saint-Jacques', 'Lachine', 'Montréal', 45.445658, -73.644465, 383.0, 1965, NULL, NULL, 18.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3740, boulevard Saint-Joseph', 'Lachine', 'Montréal', 45.434837, -73.69805, 590.0, 1910, NULL, NULL, 1129100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('65, 10e Avenue', 'Lachine', 'Montréal', 45.432682, -73.672885, NULL, NULL, NULL, NULL, 589667.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('438, avenue Jenkins', 'Lachine', 'Montréal', 45.438162, -73.660592, 264.0, 2019, NULL, NULL, 732633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1645, rue Provost', 'Lachine', 'Montréal', 45.441808, -73.678552, 327.0, 1925, NULL, NULL, 488933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('980, 25e Avenue', 'Lachine', 'Montréal', 45.446973, -73.686338, NULL, NULL, NULL, NULL, 900000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('75, avenue Duranceau', 'Lachine', 'Montréal', 45.445638, -73.647517, 251.0, 1927, NULL, NULL, 463100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2400, rue Victoria', 'Lachine', 'Montréal', 45.43606, -73.686128, 6933.0, 2020, NULL, NULL, 900000.0, 2023, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('765, 47e Avenue', 'Lachine', 'Montréal', 45.444413, -73.70936, NULL, NULL, NULL, NULL, 538100.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4190, rue Sir-George-Simpson', 'Lachine', 'Montréal', 45.447653, -73.703497, 557.0, 1951, NULL, NULL, 466733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('565, 25e Avenue', 'Lachine', 'Montréal', 45.439174, -73.68669, NULL, NULL, NULL, NULL, 563867.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('345, 37e Avenue', 'Lachine', 'Montréal', 45.437922, -73.698403, NULL, NULL, NULL, NULL, 506900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('442, avenue Jenkins', 'Lachine', 'Montréal', 45.438377, -73.660835, 193.0, 2019, NULL, NULL, 659433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('745, 47e Avenue', 'Lachine', 'Montréal', 45.444144, -73.709329, NULL, NULL, NULL, NULL, 524967.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('55, avenue Vincent', 'Lachine', 'Montréal', 45.447015, -73.64134, 465.0, 1939, NULL, NULL, 570800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1970, rue Victoria', 'Lachine', 'Montréal', 45.435988, -73.682113, 178.0, 2004, NULL, NULL, 628167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('255, 51e Avenue', 'Lachine', 'Montréal', 45.440367, -73.71391, NULL, NULL, NULL, NULL, 467367.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('668, 1e Avenue', 'Lachine', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 506900.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('29, 50e Avenue', 'Lachine', 'Montréal', 45.437484, -73.711514, NULL, NULL, NULL, NULL, 663800.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('600, boulevard Saint-Joseph', 'Lachine', 'Montréal', 45.431679, -73.669512, 1305.0, 1910, NULL, NULL, 504453.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('15, 50e Avenue', 'Lachine', 'Montréal', 45.437129, -73.711422, NULL, NULL, NULL, NULL, 609000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('395, rue Acadia', 'Lachine', 'Montréal', 45.44134, -73.713177, 509.0, 1951, NULL, NULL, 456267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('765, 38e Avenue', 'Lachine', 'Montréal', 45.44405, -73.699437, NULL, NULL, NULL, NULL, 427733.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2125, rue Remembrance', 'Lachine', 'Montréal', 45.437686, -73.683655, 4.0, 2012, NULL, NULL, 31067.0, 2026, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('940, 10e Avenue', 'Lachine', 'Montréal', 45.446636, -73.672689, NULL, NULL, NULL, NULL, 450300.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('293, avenue Emile-Pominville', 'Lachine', 'Montréal', 45.447911, -73.650523, 177.0, 1949, NULL, NULL, 223500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('813, 55e Avenue', 'Lachine', 'Montréal', 45.44507, -73.719935, NULL, NULL, NULL, NULL, 568367.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('663, 7e Avenue', 'Lachine', 'Montréal', 45.441017, -73.670576, NULL, NULL, NULL, NULL, 398700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('517, 24e Avenue', 'Lachine', 'Montréal', 45.438261, -73.685712, NULL, NULL, NULL, NULL, 508400.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('245, 51e Avenue', 'Lachine', 'Montréal', 45.440288, -73.713874, NULL, NULL, NULL, NULL, 446533.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('410, 1e Avenue', 'Lachine', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 116300.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('45, 9e Avenue', 'Lachine', 'Montréal', 45.42815, -73.596341, NULL, NULL, NULL, NULL, 453300.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('723, 43e Avenue', 'Lachine', 'Montréal', 45.442766, -73.704225, NULL, NULL, NULL, NULL, 515333.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('278, rue Saint-Jacques', 'Lachine', 'Montréal', 45.444371, -73.646636, 492.0, 1940, NULL, NULL, 492200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('75, rue Camille', 'Lachine', 'Montréal', 45.446205, -73.642991, 381.0, 1956, NULL, NULL, 608500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3525, rue Broadway', 'Lachine', 'Montréal', 45.436961, -73.696084, 405.0, 1923, NULL, NULL, 462800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2640, boulevard Saint-Joseph', 'Lachine', 'Montréal', 45.434175, -73.687605, 367.0, 1930, NULL, NULL, 432200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('33, 50e Avenue', 'Lachine', 'Montréal', 45.437739, -73.711712, NULL, NULL, NULL, NULL, 658200.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('235, rue Acadia', 'Lachine', 'Montréal', 45.439607, -73.712631, 762.0, 1950, NULL, NULL, 630333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('275, 35e Avenue', 'Lachine', 'Montréal', 45.436385, -73.695934, NULL, NULL, NULL, NULL, 497333.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('93, avenue Duranceau', 'Lachine', 'Montréal', 45.445785, -73.647818, 172.0, 1944, NULL, NULL, 453067.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('55, 18e Avenue', 'Lachine', 'Montréal', 45.433824, -73.68065, NULL, NULL, NULL, NULL, 302600.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('400, 16e Avenue', 'Lachine', 'Montréal', 45.436493, -73.677663, NULL, NULL, NULL, NULL, 579367.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12, avenue du Moulin', 'Lachine', 'Montréal', 45.445314, -73.652166, 212.0, 1929, NULL, NULL, 247433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('714, 38e Avenue', 'Lachine', 'Montréal', 45.44252, -73.698635, NULL, NULL, NULL, NULL, 488833.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9, rue Onesime-Brossoit', 'Lachine', 'Montréal', 45.44667, -73.654611, 197.0, 1990, NULL, NULL, 392600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('719, 43e Avenue', 'Lachine', 'Montréal', 45.442579, -73.704184, NULL, NULL, NULL, NULL, 428933.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1005, rue Saint-Louis', 'Lachine', 'Montréal', 45.433473, -73.672851, 331.0, 1929, NULL, NULL, 541433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1950, rue Victoria', 'Lachine', 'Montréal', 45.435988, -73.681953, 178.0, 2004, NULL, NULL, 587433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('745, 1e Avenue', 'Lachine', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 297000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('183, avenue Saint-Pierre', 'Lachine', 'Montréal', 45.444922, -73.651081, 455.0, 1976, NULL, NULL, 874200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('920, rue Sherbrooke', 'Lachine', 'Montréal', 45.445148, -73.672173, 214.0, 1940, NULL, NULL, 247800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('799, 55e Avenue', 'Lachine', 'Montréal', 45.444769, -73.719835, NULL, NULL, NULL, NULL, 527800.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('115, rue Camille', 'Lachine', 'Montréal', 45.445826, -73.64366, 331.0, 1988, NULL, NULL, 450133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, 51e Avenue', 'Lachine', 'Montréal', 45.446381, -73.715621, NULL, NULL, NULL, NULL, 189667.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('37, 26e Avenue', 'Lachine', 'Montréal', 45.434592, -73.687575, NULL, NULL, NULL, NULL, 395900.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('185, 51e Avenue', 'Lachine', 'Montréal', 45.439397, -73.713844, NULL, NULL, NULL, NULL, 647167.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('25, 50e Avenue', 'Lachine', 'Montréal', 45.43745, -73.711909, NULL, NULL, NULL, NULL, 688200.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('315, 37e Avenue', 'Lachine', 'Montréal', 45.437502, -73.698476, NULL, NULL, NULL, NULL, 524200.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('48, avenue du Moulin', 'Lachine', 'Montréal', 45.445551, -73.652792, 210.0, 1981, NULL, NULL, 469100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('770, 38e Avenue', 'Lachine', 'Montréal', 45.444175, -73.69889, NULL, NULL, NULL, NULL, 463267.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4410, rue Sir-George-Simpson', 'Lachine', 'Montréal', 45.447715, -73.706005, 371.0, 1988, NULL, NULL, 566467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('165, avenue du Moulin', 'Lachine', 'Montréal', 45.446868, -73.655194, 603.0, 1986, NULL, NULL, 559100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('225, rue Camille', 'Lachine', 'Montréal', 45.444615, -73.64552, 309.0, 1957, NULL, NULL, 677000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('57, 18e Avenue', 'Lachine', 'Montréal', 45.433861, -73.680643, NULL, NULL, NULL, NULL, 332533.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('625, rue Acadia', 'Lachine', 'Montréal', 45.443295, -73.713346, 414.0, 1955, NULL, NULL, 407567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9645, rue Clement', 'LaSalle', 'Montréal', 45.435251, -73.652216, NULL, NULL, NULL, NULL, 297700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('477, 31e Avenue', 'LaSalle', 'Montréal', 45.418279, -73.610318, NULL, NULL, NULL, NULL, 584133.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('551, avenue Gerald', 'LaSalle', 'Montréal', 45.436642, -73.595262, NULL, NULL, NULL, NULL, 487433.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2192, rue Emile-Nelligan', 'LaSalle', 'Montréal', 45.433215, -73.633671, 232.0, 1997, NULL, NULL, 487400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('437, rue Duhamel', 'LaSalle', 'Montréal', 45.418162, -73.609859, 341.0, 1983, NULL, NULL, 769400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('354, rue d''Amour', 'LaSalle', 'Montréal', 45.430251, -73.643758, 408.0, 1959, NULL, NULL, 710000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7110, rue Chouinard', 'LaSalle', 'Montréal', 45.4428, -73.612943, 87.0, 1994, NULL, NULL, 297000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1064, rue Thierry', 'LaSalle', 'Montréal', 45.433231, -73.608754, 122.0, 1992, NULL, NULL, 323967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7670, rue Broadway', 'LaSalle', 'Montréal', 45.43116, -73.60156, 326.0, 1950, NULL, NULL, 439400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1011, rue Melatti', 'LaSalle', 'Montréal', 45.432626, -73.607147, 169.0, 1995, NULL, NULL, 478167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('231, 4e Avenue', 'LaSalle', 'Montréal', 45.432037, -73.599446, NULL, NULL, NULL, NULL, 661233.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('513, 31e Avenue', 'LaSalle', 'Montréal', 45.418717, -73.610619, NULL, NULL, NULL, NULL, 588167.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('740, rue Charron', 'LaSalle', 'Montréal', 45.423812, -73.608277, 312.0, 1987, NULL, NULL, 509900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('421, rue Duhamel', 'LaSalle', 'Montréal', 45.418672, -73.610199, 332.0, 1984, NULL, NULL, 762133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7864, rue Duranceau', 'LaSalle', 'Montréal', 45.425332, -73.59782, 268.0, 1980, NULL, NULL, 700833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('641, avenue Senecal', 'LaSalle', 'Montréal', 45.436225, -73.597008, NULL, NULL, NULL, NULL, 482033.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('493, 31e Avenue', 'LaSalle', 'Montréal', 45.41846, -73.610442, NULL, NULL, NULL, NULL, 604467.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7682, rue Desaulniers', 'LaSalle', 'Montréal', 45.440291, -73.627422, 315.0, 1972, NULL, NULL, 618333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1471, rue Thierry', 'LaSalle', 'Montréal', 45.435706, -73.621067, 274.0, 1969, NULL, NULL, 450133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('195, rue Mcvey', 'LaSalle', 'Montréal', 45.429908, -73.663468, 208.0, 1967, NULL, NULL, 625700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('427, rue Duhamel', 'LaSalle', 'Montréal', 45.418477, -73.610068, 341.0, 1983, NULL, NULL, 771000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7600, rue Ravary', 'LaSalle', 'Montréal', 45.437212, -73.621304, 382.0, 1971, NULL, NULL, 779400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('569, avenue Gerald', 'LaSalle', 'Montréal', 45.436714, -73.595719, NULL, NULL, NULL, NULL, 445900.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('650, 16e Avenue', 'LaSalle', 'Montréal', 45.440827, -73.6772, NULL, NULL, NULL, NULL, 533100.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('483, rue d''Oka', 'LaSalle', 'Montréal', 45.434929, -73.640549, 319.0, 1973, NULL, NULL, 715200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1451, rue Thierry', 'LaSalle', 'Montréal', 45.435658, -73.620796, 224.0, 1969, NULL, NULL, 411067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2107, rue Lapierre', 'LaSalle', 'Montréal', 45.439738, -73.618866, 50606.0, 1971, NULL, NULL, 750000.0, 2021, 'Centre commercial local (45 à 99 magasins)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1391, rue Thierry', 'LaSalle', 'Montréal', 45.435479, -73.619545, 380.0, 1969, NULL, NULL, 697733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('445, rue d''Oka', 'LaSalle', 'Montréal', 45.434285, -73.64053, 423.0, 1962, NULL, NULL, 717867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('413, rue Duhamel', 'LaSalle', 'Montréal', 45.418919, -73.610357, 375.0, 1983, NULL, NULL, 729533.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('71, avenue Lafleur', 'LaSalle', 'Montréal', 45.422743, -73.650554, 446.0, 1948, NULL, NULL, 429233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1475, rue Thierry', 'LaSalle', 'Montréal', 45.435723, -73.621176, 224.0, 1969, NULL, NULL, 468067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('734, rue Charron', 'LaSalle', 'Montréal', 45.423411, -73.608301, 370.0, 1988, NULL, NULL, 706733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2290, rue Lise', 'LaSalle', 'Montréal', 45.435107, -73.63301, 216.0, 1967, NULL, NULL, 672333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('150, rue Chatelle', 'LaSalle', 'Montréal', 45.421598, -73.649459, 427.0, 1948, NULL, NULL, 307600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8147, boulevard Lasalle', 'LaSalle', 'Montréal', 45.41998, -73.604816, 579.0, 1988, NULL, NULL, 890867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('112, rue Larente', 'LaSalle', 'Montréal', 45.434034, -73.644545, 372.0, 1957, NULL, NULL, 508600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7944, rue George', 'LaSalle', 'Montréal', 45.426292, -73.607219, 309.0, 1964, NULL, NULL, 686333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('420, 8e Avenue', 'LaSalle', 'Montréal', 45.430053, -73.606355, NULL, NULL, NULL, NULL, 392267.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7661, rue Ravary', 'LaSalle', 'Montréal', 45.437615, -73.62218, 243.0, 1972, NULL, NULL, 788167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8172, rue Cordner', 'LaSalle', 'Montréal', 45.436936, -73.635649, 207.0, 1979, NULL, NULL, 405900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2282, rue Lise', 'LaSalle', 'Montréal', 45.435029, -73.632823, 216.0, 1967, NULL, NULL, 696667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('268, rue Beauchamp', 'LaSalle', 'Montréal', 45.432818, -73.659298, 234.0, 1967, NULL, NULL, 658700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2164, rue Gervais', 'LaSalle', 'Montréal', 45.436738, -73.628935, 235.0, 1969, NULL, NULL, 846400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9251, boulevard Lasalle', 'LaSalle', 'Montréal', 45.416683, -73.642475, 132.0, 2003, NULL, NULL, 223300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('238, rue de Cabano', 'LaSalle', 'Montréal', 45.417819, -73.63486, 153.0, 1995, NULL, NULL, 281700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('230, rue Beauchamp', 'LaSalle', 'Montréal', 45.43201, -73.659857, 206.0, 1967, NULL, NULL, 590000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('432, 8e Avenue', 'LaSalle', 'Montréal', 45.430118, -73.606657, NULL, NULL, NULL, NULL, 354933.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7852, rue Duranceau', 'LaSalle', 'Montréal', 45.425767, -73.597349, 338.0, 1980, NULL, NULL, 733767.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('684, avenue Gerald', 'LaSalle', 'Montréal', 45.436634, -73.597675, NULL, NULL, NULL, NULL, 617900.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('272, rue Beauchamp', 'LaSalle', 'Montréal', 45.432902, -73.659289, 234.0, 1967, NULL, NULL, 635000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1425, rue Thierry', 'LaSalle', 'Montréal', 45.43557, -73.620199, 224.0, 1969, NULL, NULL, 418300.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('182, rue Chatelle', 'LaSalle', 'Montréal', 45.421349, -73.6488, 324.0, 1932, NULL, NULL, 287400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('192, rue Smith', 'LaSalle', 'Montréal', 45.433941, -73.641224, 496.0, NULL, NULL, NULL, 921067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1034, rue Thierry', 'LaSalle', 'Montréal', 45.433051, -73.607746, 122.0, 1993, NULL, NULL, 323967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7638, rue Ravary', 'LaSalle', 'Montréal', 45.437453, -73.62183, 293.0, 1971, NULL, NULL, 693667.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('40, avenue Latour', 'LaSalle', 'Montréal', 45.416403, -73.623794, 86.0, 1992, NULL, NULL, 384800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('509, rue d''Oka', 'LaSalle', 'Montréal', 45.43517, -73.64089, 331.0, 1961, NULL, NULL, 490867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2204, rue Lise', 'LaSalle', 'Montréal', 45.434661, -73.632018, 266.0, 1967, NULL, NULL, 755033.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('156, rue Larente', 'LaSalle', 'Montréal', 45.43368, -73.642946, 372.0, 1950, NULL, NULL, 460100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7770, rue Dufresne', 'LaSalle', 'Montréal', 45.438914, -73.62779, 361.0, 1973, NULL, NULL, 629600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7961, rue George', 'LaSalle', 'Montréal', 45.426391, -73.607877, 99.0, 2016, NULL, NULL, 324500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('238, rue Beauchamp', 'LaSalle', 'Montréal', 45.43216, -73.659853, 232.0, 1967, NULL, NULL, 607500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1005, rue d''Upton', 'LaSalle', 'Montréal', 45.42557, -73.63276, 4565.0, 1961, NULL, NULL, 900000.0, 2023, 'Entreposage de tout genre', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1501, rue Thierry', 'LaSalle', 'Montréal', 45.435406, -73.621589, 450.0, 1969, NULL, NULL, 720833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('517, rue d''Oka', 'LaSalle', 'Montréal', 45.435012, -73.641347, 440.0, 1962, NULL, NULL, 572600.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('356, rue Raymond', 'LaSalle', 'Montréal', 45.419256, -73.608422, 375.0, 1980, NULL, NULL, 999133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2286, rue Lise', 'LaSalle', 'Montréal', 45.435068, -73.632918, 216.0, 1957, NULL, NULL, 677933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7980, rue George', 'LaSalle', 'Montréal', 45.425796, -73.607569, 392.0, 1966, NULL, NULL, 761333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('425, rue Duhamel', 'LaSalle', 'Montréal', 45.418552, -73.61012, 341.0, 1983, NULL, NULL, 805733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('104, rue Larente', 'LaSalle', 'Montréal', 45.434098, -73.644868, 372.0, 1947, NULL, NULL, 339500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('683, avenue Senecal', 'LaSalle', 'Montréal', 45.436332, -73.597729, NULL, NULL, NULL, NULL, 471933.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1009, rue Melatti', 'LaSalle', 'Montréal', 45.432626, -73.607147, 169.0, 1995, NULL, NULL, 424900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1124, rue Louis-Jolliet', 'LaSalle', 'Montréal', NULL, NULL, 386.0, 1988, NULL, NULL, 1033733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1184, rue Louis-Jolliet', 'LaSalle', 'Montréal', NULL, NULL, 34.0, 1990, NULL, NULL, 440000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('497, 31e Avenue', 'LaSalle', 'Montréal', 45.41854, -73.610501, NULL, NULL, NULL, NULL, 624500.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9651, rue Clement', 'LaSalle', 'Montréal', 45.435251, -73.652214, NULL, NULL, NULL, NULL, 297700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('159, rue Mcvey', 'LaSalle', 'Montréal', 45.429183, -73.663452, 204.0, 1966, NULL, NULL, 654100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1046, 30e Avenue', 'LaSalle', 'Montréal', 45.424476, -73.614822, NULL, NULL, NULL, NULL, 676400.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1309, rue Maurice', 'LaSalle', 'Montréal', 45.430535, -73.620081, 216.0, 1967, NULL, NULL, 524400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('471, rue d''Oka', 'LaSalle', 'Montréal', 45.434768, -73.640383, 317.0, 1973, NULL, NULL, 699633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7698, rue Desaulniers', 'LaSalle', 'Montréal', 45.440108, -73.627611, 315.0, 1972, NULL, NULL, 631800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8272, rue Cordner', 'LaSalle', 'Montréal', 45.436328, -73.636255, 207.0, 1977, NULL, NULL, 367200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('286, 4e Avenue', 'LaSalle', 'Montréal', 45.456555, -73.568236, NULL, NULL, NULL, NULL, 486600.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7449, rue Chouinard', 'LaSalle', 'Montréal', 45.439213, -73.617016, 57.0, 1987, NULL, NULL, 292233.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7651, rue Ravary', 'LaSalle', 'Montréal', 45.437906, -73.621789, 362.0, 1970, NULL, NULL, 760767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('76, avenue Senecal', 'LaSalle', 'Montréal', 45.434476, -73.588398, NULL, NULL, NULL, NULL, 464233.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('633, avenue Gerald', 'LaSalle', 'Montréal', 45.436873, -73.596733, NULL, NULL, NULL, NULL, 550700.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('397, avenue Paquin', 'LaSalle', 'Montréal', 45.420005, -73.638357, 314.0, 1966, NULL, NULL, 606833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2219, boulevard Shevchenko', 'LaSalle', 'Montréal', 45.434086, -73.633467, 238.0, 1992, NULL, NULL, 319267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('315, avenue Senecal', 'LaSalle', 'Montréal', 45.435436, -73.592008, NULL, NULL, NULL, NULL, 675333.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('231, avenue Senecal', 'LaSalle', 'Montréal', 45.435196, -73.590507, NULL, NULL, NULL, NULL, 708100.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2325, rue John-Campbell', 'LaSalle', 'Montréal', 45.440467, -73.625677, 284.0, 1972, NULL, NULL, 763300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('815, rue Gagne', 'LaSalle', 'Montréal', 45.42617, -73.609834, NULL, NULL, NULL, NULL, 30700000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7670, rue Desaulniers', 'LaSalle', 'Montréal', 45.440393, -73.627311, 293.0, 1973, NULL, NULL, 608333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1360, rue Patrice', 'LaSalle', 'Montréal', 45.428899, -73.6229, 341.0, 1967, NULL, NULL, 644800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7656, rue Ravary', 'LaSalle', 'Montréal', 45.437566, -73.622085, 293.0, 1972, NULL, NULL, 691933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2291, rue John-Campbell', 'LaSalle', 'Montréal', 45.440154, -73.625013, 234.0, 1971, NULL, NULL, 674067.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7856, rue Duranceau', 'LaSalle', 'Montréal', 45.425633, -73.597438, 252.0, 1980, NULL, NULL, 684267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('651, avenue Senecal', 'LaSalle', 'Montréal', 45.436244, -73.597107, NULL, NULL, NULL, NULL, 494100.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6568, rue Cabrini', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.581243, -73.566235, 296.0, 1962, NULL, NULL, 644533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3190, rue Arcand', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.584557, -73.539897, 316.0, 1960, NULL, NULL, 569900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8940, avenue Dubuisson', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603158, -73.515761, 73.0, 1981, NULL, NULL, 224367.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5810, avenue de Repentigny', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.583706, -73.554474, 305.0, 1962, NULL, NULL, 706867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9538, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.61094, -73.521595, 199.0, 1962, NULL, NULL, 761233.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2704, rue Cuvillier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.54624, -73.555072, 182.0, 1956, NULL, NULL, 976733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6420, rue Cabrini', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.58051, -73.56408, 309.0, 1975, NULL, NULL, 721200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9484, rue Rousseau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.613127, -73.53605, 62.0, 2010, NULL, NULL, 262200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2575, rue Bossuet', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573263, -73.537464, 337.0, 1956, NULL, NULL, 842333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8995, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.60747, -73.528083, 1417.0, 1989, NULL, NULL, 900000.0, 2025, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2543, avenue Letourneux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.555171, -73.547493, 232.0, 1918, NULL, NULL, 888000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1965, place Arthur-Buies', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.592068, -73.514887, 328.0, 1961, NULL, NULL, 640467.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1929, place Arthur-Buies', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.592353, -73.5148, 335.0, 1961, NULL, NULL, 607500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2635, rue Bossuet', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573487, -73.538245, 192.0, 1956, NULL, NULL, 598967.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9494, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.610435, -73.521841, 193.0, 1964, NULL, NULL, 743400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6640, avenue de Renty', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.585375, -73.548913, 504.0, 1957, NULL, NULL, 492900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4326, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.55672, -73.549306, 149.0, 1998, NULL, NULL, 332267.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3230, rue Arcand', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.584636, -73.540175, 286.0, 1965, NULL, NULL, 579000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2931, rue Saint-Emile', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.598187, -73.527991, 455.0, 1977, NULL, NULL, 724100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3155, boulevard de l''Assomption', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.569921, -73.548329, 3468.0, NULL, NULL, NULL, 900000.0, 2023, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Tellier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.58851, -73.520752, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2505, avenue Letourneux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554931, -73.546888, 158.0, 1990, NULL, NULL, 127600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9510, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.610729, -73.521684, 193.0, 1961, NULL, NULL, 639467.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5040, avenue Mercier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.602611, -73.535522, 284.0, 1954, NULL, NULL, 287433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1948, avenue Emile-Legrand', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.580745, -73.521321, 240.0, 1955, NULL, NULL, 381667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4659, rue Adam', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554749, -73.533825, 192.0, 1910, NULL, NULL, 755100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('560, rue Darling', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.540189, -73.539724, 209.0, 1885, NULL, NULL, 419700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9065, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.608223, -73.528413, 446.0, 1960, NULL, NULL, 1190000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9402, rue Hochelaga', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.608538, -73.515809, 327.0, 1952, NULL, NULL, 658500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4640, rue Sainte-Catherine Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.55389, -73.53176, 403.0, 1951, NULL, NULL, 364100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2533, avenue d''Orleans', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.550996, -73.549697, NULL, NULL, NULL, NULL, 412333.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9460, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.610226, -73.521926, 195.0, 1965, NULL, NULL, 625600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9308, rue Hochelaga', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.608053, -73.516037, 157.0, 1953, NULL, NULL, 540300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7501, rue Tellier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.585606, -73.522065, 30194.0, 2000, NULL, NULL, 900000.0, 2026, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2625, rue Bossuet', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573458, -73.538153, 192.0, 1956, NULL, NULL, 628200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4975, rue Joseph-A.-Rodier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.596476, -73.539258, 209.0, 1993, NULL, NULL, 499467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2665, rue Bossuet', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573631, -73.538695, 193.0, 1956, NULL, NULL, 568500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6661, rue Jean-Milot', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.59196, -73.561241, 362.0, 1975, NULL, NULL, 796400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9695, rue Hochelaga', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.611749, -73.514854, 482.0, 1953, NULL, NULL, 598300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2645, rue Dickson', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.570802, -73.540317, 195.0, 1915, NULL, NULL, 535533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

