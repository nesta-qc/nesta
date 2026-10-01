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
-- Fichier 2d/2a/2b/2c/2d — 310 lignes.
-- ============================================================

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12353, 4e Avenue', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.628731, -73.60832, NULL, NULL, NULL, NULL, 323900.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de la Famille-Dubreuil', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.693846, -73.495263, NULL, NULL, NULL, NULL, 1201433.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10198, boulevard Perras', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.662483, -73.55659, 317.0, 1989, NULL, NULL, 329867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3153, rue Francois-Harel', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.666564, -73.508741, NULL, NULL, NULL, NULL, 363667.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11757, rue de Montigny', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.638974, -73.507385, 509.0, 1957, NULL, NULL, 273133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11872, rue Notre-Dame Est', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.638013, -73.490844, 1289.0, 1967, NULL, NULL, 841840.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1035, rue J.-Omer-Marchand', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.692033, -73.492561, 121.0, 1994, NULL, NULL, 161900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8579, avenue Louis-Lumiere', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.643047, -73.586481, NULL, NULL, NULL, NULL, 224033.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12420, 64e Avenue', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.657688, -73.563567, NULL, NULL, NULL, NULL, 339233.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12500, rue Edmond-Archambault', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Montréal', 45.6291, -73.613678, 404.0, 1993, NULL, NULL, 508367.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('320, rue Meloche', 'Saint-Laurent', 'Montréal', 45.528754, -73.675218, 341.0, 1963, NULL, NULL, 541500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4540, place Claire-Oddera', 'Saint-Laurent', 'Montréal', 45.510422, -73.724209, 872.0, 2021, NULL, NULL, 1696933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('490, boulevard Alexis-Nihon', 'Saint-Laurent', 'Montréal', 45.500407, -73.683548, 445.0, 1963, NULL, NULL, 678333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2175, rue Robichaud', 'Saint-Laurent', 'Montréal', 45.523728, -73.721269, 358.0, 1976, NULL, NULL, 699300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2600, rue Dragon', 'Saint-Laurent', 'Montréal', 45.498599, -73.692866, 518.0, 1984, NULL, NULL, 1032367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2715, rue Diab', 'Saint-Laurent', 'Montréal', 45.49501, -73.747494, 4843.0, 1973, NULL, NULL, 750000.0, 2021, 'Entreposage de tout genre', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1471, rue Decarie', 'Saint-Laurent', 'Montréal', 45.518317, -73.688467, NULL, NULL, NULL, NULL, 696200.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1275, rue Couvrette', 'Saint-Laurent', 'Montréal', 45.525442, -73.675348, 258.0, 1962, NULL, NULL, 719100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2593, boulevard Poirier', 'Saint-Laurent', 'Montréal', 45.511375, -73.709597, 316.0, 1998, NULL, NULL, 707100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2365, rue Charles-Darwin', 'Saint-Laurent', 'Montréal', 45.512772, -73.70722, 94.0, 1999, NULL, NULL, 234100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1785, avenue O''Brien', 'Saint-Laurent', 'Montréal', 45.522324, -73.690547, 428.0, 1948, NULL, NULL, 446100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, Transcanadienne', 'Saint-Laurent', 'Montréal', 45.494875, -73.689268, NULL, NULL, NULL, NULL, 900000.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2278, rue Mantha', 'Saint-Laurent', 'Montréal', 45.49867, -73.682762, 362.0, 1959, NULL, NULL, 664500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11111, boulevard Cavendish', 'Saint-Laurent', 'Montréal', 45.500392, -73.702347, 60.0, 1990, NULL, NULL, 414467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2243, rue Maryse-Bastie', 'Saint-Laurent', 'Montréal', 45.515803, -73.706689, 324.0, 2002, NULL, NULL, 1181900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('230, rue Hebert', 'Saint-Laurent', 'Montréal', 45.487586, -73.84731, NULL, NULL, NULL, NULL, 446833.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('530, boulevard Alexis-Nihon', 'Saint-Laurent', 'Montréal', 45.500737, -73.68409, 452.0, 1962, NULL, NULL, 659067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('520, boulevard Alexis-Nihon', 'Saint-Laurent', 'Montréal', 45.50065, -73.683946, 381.0, 1962, NULL, NULL, 598933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('14361, boulevard Cavendish', 'Saint-Laurent', 'Montréal', 45.511881, -73.718317, 92.0, 2012, NULL, NULL, 369033.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1015, rue Decarie', 'Saint-Laurent', 'Montréal', 45.514694, -73.682634, NULL, NULL, NULL, NULL, 2426600.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2880, rue des Harfangs', 'Saint-Laurent', 'Montréal', 45.507479, -73.712431, 462.0, 2002, NULL, NULL, 1148267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2262, rue Kaufman', 'Saint-Laurent', 'Montréal', 45.521488, -73.719102, 253.0, 1975, NULL, NULL, 469000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2267, rue Maryse-Bastie', 'Saint-Laurent', 'Montréal', 45.51535, -73.707214, 684.0, 2001, NULL, NULL, 1506333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('500, boulevard Alexis-Nihon', 'Saint-Laurent', 'Montréal', 45.500492, -73.683683, 445.0, 1963, NULL, NULL, 634600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2415, rue Mantha', 'Saint-Laurent', 'Montréal', 45.497369, -73.685288, 452.0, 1955, NULL, NULL, 482300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2535, place de Miniac', 'Saint-Laurent', 'Montréal', 45.492545, -73.74511, 5483.0, 1975, NULL, NULL, 750000.0, 2021, 'Entreposage de tout genre', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3660, rue Pierre-Daviault', 'Saint-Laurent', 'Montréal', 45.507834, -73.721559, 718.0, 2005, NULL, NULL, 1984800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('720, boulevard Montpellier', 'Saint-Laurent', 'Montréal', 45.519004, -73.669226, 120.0, 1981, NULL, NULL, 238333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('940, rue Ouimet', 'Saint-Laurent', 'Montréal', 45.513747, -73.680644, 361.0, 1948, NULL, NULL, 579233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('981, rue Tait', 'Saint-Laurent', 'Montréal', 45.509287, -73.688169, 152.0, 2012, NULL, NULL, 435500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('210, rue Hebert', 'Saint-Laurent', 'Montréal', 45.487492, -73.846015, NULL, NULL, NULL, NULL, 541133.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1101, rue Decarie', 'Saint-Laurent', 'Montréal', 45.515838, -73.683813, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5350, boulevard Henri-Bourassa Ouest', 'Saint-Laurent', 'Montréal', 45.519036, -73.711857, 313.0, 2021, NULL, NULL, 900000.0, 2026, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2239, rue Maryse-Bastie', 'Saint-Laurent', 'Montréal', 45.515854, -73.706625, 324.0, 2002, NULL, NULL, 1134467.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2620, rue Dragon', 'Saint-Laurent', 'Montréal', 45.49838, -73.693175, 518.0, 1985, NULL, NULL, 940733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4045, place Albert-Dreux', 'Saint-Laurent', 'Montréal', 45.505589, -73.728134, 925.0, 2000, NULL, NULL, 1163300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2665, rue Robitaille', 'Saint-Laurent', 'Montréal', 45.520629, -73.728301, 431.0, 1961, NULL, NULL, 587700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2603, rue de Chamonix', 'Saint-Laurent', 'Montréal', 45.511067, -73.710049, 291.0, 1999, NULL, NULL, 798600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('920, rue Ouimet', 'Saint-Laurent', 'Montréal', 45.513579, -73.680353, 465.0, 1945, NULL, NULL, 779933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('830, avenue Sainte-Croix', 'Saint-Laurent', 'Montréal', 45.513873, -73.676633, 629.0, 1946, NULL, NULL, 371587.0, 2021, 'Service de garderie (prématernelle, moins de 50 % de poupons)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2529, rue Guenette', 'Saint-Laurent', 'Montréal', 45.501222, -73.729739, NULL, NULL, NULL, NULL, 592833.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('970, rue Saint-Germain', 'Saint-Laurent', 'Montréal', 45.514656, -73.681181, 441.0, 1989, NULL, NULL, 842900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2595, rue de Chamonix', 'Saint-Laurent', 'Montréal', 45.511178, -73.709947, 191.0, 1999, NULL, NULL, 616100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('768, boulevard Decarie', 'Saint-Laurent', 'Montréal', 45.510994, -73.678123, NULL, NULL, NULL, NULL, 750000.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2675, rue Robitaille', 'Saint-Laurent', 'Montréal', 45.520521, -73.72844, 431.0, 1961, NULL, NULL, 590800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2525, rue Guenette', 'Saint-Laurent', 'Montréal', 45.501222, -73.72974, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2165, boulevard Thimens', 'Saint-Laurent', 'Montréal', 45.510391, -73.697272, 141.0, 2010, NULL, NULL, 445600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('788, avenue Sainte-Croix', 'Saint-Laurent', 'Montréal', 45.513164, -73.675472, 1550.0, 1900, NULL, NULL, 750000.0, 2021, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2085, rue Guertin', 'Saint-Laurent', 'Montréal', 45.526474, -73.694198, 331.0, 1958, NULL, NULL, 621300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1280, rue Chameran', 'Saint-Laurent', 'Montréal', 45.529856, -73.673487, 576.0, 1963, NULL, NULL, 769700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1090, rue Guertin', 'Saint-Laurent', 'Montréal', 45.518174, -73.680428, 313.0, 1971, NULL, NULL, 543400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2533, rue Guenette', 'Saint-Laurent', 'Montréal', 45.501222, -73.729738, NULL, NULL, NULL, NULL, 602900.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2271, rue Maryse-Bastie', 'Saint-Laurent', 'Montréal', 45.515179, -73.707171, 403.0, 2002, NULL, NULL, 1305200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('657, boulevard Dr.-Frederik-Philips', 'Saint-Laurent', 'Montréal', 45.497099, -73.693883, 375.0, 1989, NULL, NULL, 659533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('590, boulevard Alexis-Nihon', 'Saint-Laurent', 'Montréal', 45.501253, -73.684889, 387.0, 1961, NULL, NULL, 569100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3215, boulevard Pitfield', 'Saint-Laurent', 'Montréal', 45.500403, -73.751493, 380.0, 1967, NULL, NULL, 325767.0, 2024, 'Autres industries de produits manufacturés', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5505, boulevard Henri-Bourassa Ouest', 'Saint-Laurent', 'Montréal', 45.519034, -73.714019, 845.0, 1970, NULL, NULL, 539467.0, 2023, 'Autres services de l''automobile', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2455, rue Major', 'Saint-Laurent', 'Montréal', 45.501882, -73.692615, 533.0, 1958, NULL, NULL, 862067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1221, rue Couvrette', 'Saint-Laurent', 'Montréal', 45.524823, -73.674346, 251.0, 1963, NULL, NULL, 730400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2075, rue Guertin', 'Saint-Laurent', 'Montréal', 45.526419, -73.694112, 337.0, 1958, NULL, NULL, 662567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('980, rue Bertrand', 'Saint-Laurent', 'Montréal', 45.502629, -73.69619, 578.0, 1954, NULL, NULL, 628733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2345, rue Mantha', 'Saint-Laurent', 'Montréal', 45.498118, -73.684255, 436.0, 1958, NULL, NULL, 773933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2135, rue du Boree', 'Saint-Laurent', 'Montréal', 45.516327, -73.713035, NULL, NULL, NULL, NULL, 685300.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('250, rue Meloche', 'Saint-Laurent', 'Montréal', 45.437885, -73.925591, 761.0, 1993, NULL, NULL, 522300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('190, rue Meloche', 'Saint-Laurent', 'Montréal', 45.437278, -73.927915, 573.0, 1992, NULL, NULL, 546800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1095, place Guertin', 'Saint-Laurent', 'Montréal', 45.51901, -73.679388, 291.0, 1971, NULL, NULL, 581500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('335, boulevard Marcel-Laurin', 'Saint-Laurent', 'Montréal', 45.50403, -73.675572, 51.0, 2011, NULL, NULL, 237233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1111, boulevard de la Cote-Vertu', 'Saint-Laurent', 'Montréal', 45.517747, -73.678695, 65.0, 2000, NULL, NULL, 284100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('950, rue Ouimet', 'Saint-Laurent', 'Montréal', 45.513785, -73.680771, 336.0, 1958, NULL, NULL, 882133.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3535, rue Beausejour', 'Saint-Laurent', 'Montréal', 45.522293, -73.729853, NULL, NULL, NULL, NULL, 649200.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3345, rue Beausejour', 'Saint-Laurent', 'Montréal', 45.520339, -73.726724, NULL, NULL, NULL, NULL, 1127400.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('815, rue Muir', 'Saint-Laurent', 'Montréal', 45.522861, -73.669623, 89.0, 1990, NULL, NULL, 4800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1565, rue Decarie', 'Saint-Laurent', 'Montréal', 45.519235, -73.689992, NULL, NULL, NULL, NULL, 6069633.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2131, rue du Boree', 'Saint-Laurent', 'Montréal', 45.516327, -73.713043, NULL, NULL, NULL, NULL, 563567.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3126, rue Saint-Charles', 'Saint-Laurent', 'Montréal', 45.512878, -73.728294, 437.0, 1980, NULL, NULL, 847500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2180, place Saint-Louis', 'Saint-Laurent', 'Montréal', 45.500415, -73.681694, 483.0, 1957, NULL, NULL, 648700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2363, rue Charles-Darwin', 'Saint-Laurent', 'Montréal', 45.512772, -73.70722, 84.0, 1999, NULL, NULL, 219000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2795, rue Sabourin', 'Saint-Laurent', 'Montréal', 45.493612, -73.749919, 1672.0, 1977, NULL, NULL, 738900.0, 2023, 'Autres transports par véhicule automobile', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3000, rue Saint-Charles', 'Saint-Laurent', 'Montréal', 45.513054, -73.724394, 351.0, 1980, NULL, NULL, 538000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5405, boulevard Henri-Bourassa Ouest', 'Saint-Laurent', 'Montréal', 45.519586, -73.712706, NULL, NULL, NULL, NULL, 258200.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('290, rue Meloche', 'Saint-Laurent', 'Montréal', 45.528997, -73.674934, 499.0, 1963, NULL, NULL, 685900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1097, place Guertin', 'Saint-Laurent', 'Montréal', 45.519049, -73.679442, 186.0, 1971, NULL, NULL, 468600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2615, rue de Chamonix', 'Saint-Laurent', 'Montréal', 45.510965, -73.710219, 191.0, 1999, NULL, NULL, 635400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1113, place Guertin', 'Saint-Laurent', 'Montréal', 45.519143, -73.67964, 187.0, 1971, NULL, NULL, 467267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1065, place Guertin', 'Saint-Laurent', 'Montréal', 45.518478, -73.679698, 372.0, 1971, NULL, NULL, 653000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('470, boulevard Decarie', 'Saint-Laurent', 'Montréal', 45.508265, -73.673641, NULL, NULL, NULL, NULL, 1044167.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1755, avenue O''Brien', 'Saint-Laurent', 'Montréal', 45.522048, -73.690099, 428.0, 1948, NULL, NULL, 492900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('661, boulevard Dr.-Frederik-Philips', 'Saint-Laurent', 'Montréal', 45.497265, -73.694153, 375.0, 1988, NULL, NULL, 665767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1325, rue Saint-Louis', 'Saint-Laurent', 'Montréal', 45.50979, -73.670964, 272.0, 2013, NULL, NULL, 664400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1885, avenue O''Brien', 'Saint-Laurent', 'Montréal', 45.523899, -73.693062, 348.0, 1950, NULL, NULL, 444000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('100, boulevard Montpellier', 'Saint-Laurent', 'Montréal', 45.516823, -73.658519, 6620.0, 2009, NULL, NULL, 900000.0, 2022, 'Vente au détail de véhicules automobiles neufs et usagés', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3545, rue Beausejour', 'Saint-Laurent', 'Montréal', 45.522395, -73.73001, NULL, NULL, NULL, NULL, 631800.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2279, rue Maryse-Bastie', 'Saint-Laurent', 'Montréal', 45.515059, -73.706963, 243.0, 2001, NULL, NULL, 1043600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3700, rue Pierre-Daviault', 'Saint-Laurent', 'Montréal', 45.5081, -73.721958, 1185.0, 2006, NULL, NULL, 2976367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2635, rue de Chamonix', 'Saint-Laurent', 'Montréal', 45.510755, -73.710495, 191.0, 1999, NULL, NULL, 834833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2445, rue Major', 'Saint-Laurent', 'Montréal', 45.501986, -73.692465, 586.0, 1959, NULL, NULL, 969367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2600, boulevard Thimens', 'Saint-Laurent', 'Montréal', 45.505045, -73.702294, 9.0, 1988, NULL, NULL, 284667.0, 2023, 'Stationnement extérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1351, rue Saint-Louis', 'Saint-Laurent', 'Montréal', 45.50946, -73.670737, 342.0, 1890, NULL, NULL, 338000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5515, boulevard Henri-Bourassa Ouest', 'Saint-Laurent', 'Montréal', 45.518882, -73.714261, 578.0, 1935, NULL, NULL, 321767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3195, boulevard Pitfield', 'Saint-Laurent', 'Montréal', 45.500346, -73.7514, 517.0, 1967, NULL, NULL, 577267.0, 2024, 'Autres industries de produits manufacturés', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8915, rue de Coulanges', 'Saint-Léonard', 'Montréal', 45.59529, -73.602223, 412.0, 1966, NULL, NULL, 667633.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6600, rue Bombardier', 'Saint-Léonard', 'Montréal', 45.601301, -73.591925, 511.0, 1967, NULL, NULL, 238767.0, 2023, 'Service de débosselage et de peinture d''automobiles', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8705, rue Girardin', 'Saint-Léonard', 'Montréal', 45.590982, -73.600744, 506.0, 1959, NULL, NULL, 370433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7063, rue Dumesnil', 'Saint-Léonard', 'Montréal', 45.588063, -73.569297, 543.0, 1974, NULL, NULL, 905700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8330, rue du Laus', 'Saint-Léonard', 'Montréal', 45.582731, -73.599112, 655.0, 1968, NULL, NULL, 928000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6005, rue de Meriel', 'Saint-Léonard', 'Montréal', 45.599254, -73.605847, NULL, NULL, NULL, NULL, 474633.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8815, rue de Coulanges', 'Saint-Léonard', 'Montréal', 45.594374, -73.600286, 420.0, 1964, NULL, NULL, 531733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5815, rue Thierry', 'Saint-Léonard', 'Montréal', 45.591782, -73.595277, 475.0, 1963, NULL, NULL, 708400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6785, rue de Choisy', 'Saint-Léonard', 'Montréal', 45.582607, -73.568797, 495.0, 1968, NULL, NULL, 911933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5800, rue Mennereuil', 'Saint-Léonard', 'Montréal', 45.581863, -73.574229, 449.0, 1958, NULL, NULL, 746367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6680, rue Bombardier', 'Saint-Léonard', 'Montréal', 45.602392, -73.590792, 1758.0, 1973, NULL, NULL, 900000.0, 2023, 'Autres services de travaux de construction spécialisés', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6660, rue Bombardier', 'Saint-Léonard', 'Montréal', 45.602086, -73.591137, 939.0, 1969, NULL, NULL, 542667.0, 2023, 'Entreposage de tout genre', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6815, rue de Choisy', 'Saint-Léonard', 'Montréal', 45.582771, -73.569308, 433.0, 1967, NULL, NULL, 751767.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8280, rue du Laus', 'Saint-Léonard', 'Montréal', 45.582282, -73.598469, 332.0, 1967, NULL, NULL, 817900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9404, rue du Saguenay', 'Saint-Léonard', 'Montréal', 45.593521, -73.61821, 463.0, 2002, NULL, NULL, 750167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5087, rue Rimbaud', 'Saint-Léonard', 'Montréal', 45.585656, -73.604372, 351.0, 1968, NULL, NULL, 794000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6620, rue Bombardier', 'Saint-Léonard', 'Montréal', 45.601529, -73.591707, 511.0, 1967, NULL, NULL, 238767.0, 2023, 'Service de construction non résidentielle, commerciale et institutionnelle (entrepreneur général)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5835, rue des Artisans', 'Saint-Léonard', 'Montréal', 45.589897, -73.590446, 435.0, 1962, NULL, NULL, 401700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7320, boulevard Viau', 'Saint-Léonard', 'Montréal', 45.574889, -73.58578, 628.0, 1969, NULL, NULL, 1433133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5730, rue Mennereuil', 'Saint-Léonard', 'Montréal', 45.581349, -73.574694, 440.0, 1958, NULL, NULL, 727333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8300, rue du Laus', 'Saint-Léonard', 'Montréal', 45.582407, -73.598732, 332.0, 1967, NULL, NULL, 755900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9083, rue Perinault', 'Saint-Léonard', 'Montréal', 45.598213, -73.604447, NULL, NULL, NULL, NULL, 1156300.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8735, rue Girardin', 'Saint-Léonard', 'Montréal', 45.591382, -73.601195, 502.0, 1959, NULL, NULL, 376433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9000, rue Boissonneault', 'Saint-Léonard', 'Montréal', 45.597727, -73.60283, 675.0, 1973, NULL, NULL, 992567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6165, rue de Meriel', 'Saint-Léonard', 'Montréal', 45.600833, -73.604208, NULL, NULL, NULL, NULL, 736133.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7150, boulevard Viau', 'Saint-Léonard', 'Montréal', 45.574279, -73.583316, 1513.0, 1974, NULL, NULL, 11727333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4679, boulevard Lavoisier', 'Saint-Léonard', 'Montréal', 45.584013, -73.612234, 559.0, 1974, NULL, NULL, 406680.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5785, rue Thierry', 'Saint-Léonard', 'Montréal', 45.591495, -73.59576, 418.0, 1965, NULL, NULL, 487733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6115, rue de Meriel', 'Saint-Léonard', 'Montréal', 45.600406, -73.604753, NULL, NULL, NULL, NULL, 739900.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8250, rue du Laus', 'Saint-Léonard', 'Montréal', 45.582107, -73.598062, 332.0, 1967, NULL, NULL, 754300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9163, rue Larin', 'Saint-Léonard', 'Montréal', 45.590311, -73.613765, 515.0, 1973, NULL, NULL, 1146600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7340, boulevard Viau', 'Saint-Léonard', 'Montréal', 45.575047, -73.586095, 628.0, 1968, NULL, NULL, 1636133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6810, rue de Choisy', 'Saint-Léonard', 'Montréal', 45.582399, -73.569581, 441.0, 1967, NULL, NULL, 923933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7070, rue Lienart', 'Saint-Léonard', 'Montréal', 45.585291, -73.572162, NULL, NULL, NULL, NULL, 1070100.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6840, rue de Choisy', 'Saint-Léonard', 'Montréal', 45.582553, -73.570064, 459.0, 1972, NULL, NULL, 1011167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6135, rue Le Normand', 'Saint-Léonard', 'Montréal', 45.598814, -73.600592, 279.0, 1973, NULL, NULL, 430200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4721, boulevard Lavoisier', 'Saint-Léonard', 'Montréal', 45.584566, -73.612133, 728.0, 1973, NULL, NULL, 610640.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5180, rue Francois-Ier', 'Saint-Léonard', 'Montréal', 45.590833, -73.613196, NULL, NULL, NULL, NULL, 1136467.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5143, rue Brazier', 'Saint-Léonard', 'Montréal', 45.589326, -73.610384, 480.0, 1972, NULL, NULL, 863133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4915, rue Perrier', 'Saint-Léonard', 'Montréal', 45.584409, -73.60677, 410.0, 1969, NULL, NULL, 922267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4533, rue de la Haye', 'Saint-Léonard', 'Montréal', 45.582767, -73.614449, 696.0, 1976, NULL, NULL, 984467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5188, rue Leo-Ouellet', 'Saint-Léonard', 'Montréal', 45.592504, -73.616592, 349.0, 2002, NULL, NULL, 556900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9014, rue de Belmont', 'Saint-Léonard', 'Montréal', 45.600035, -73.601245, 286.0, 1973, NULL, NULL, 459333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9295, rue Grandbois', 'Saint-Léonard', 'Montréal', 45.597266, -73.611069, 471.0, 1966, NULL, NULL, 376200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6165, rue Le Normand', 'Saint-Léonard', 'Montréal', 45.59913, -73.600446, 279.0, 1973, NULL, NULL, 425500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5735, rue des Artisans', 'Saint-Léonard', 'Montréal', 45.588906, -73.5913, 497.0, 1967, NULL, NULL, 413100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7035, rue Daveluy', 'Saint-Léonard', 'Montréal', 45.58885, -73.567792, 292.0, 1985, NULL, NULL, 686500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Chatelain', 'Saint-Léonard', 'Montréal', 45.576609, -73.564764, NULL, NULL, NULL, NULL, 23933.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7630, rue du Mans', 'Saint-Léonard', 'Montréal', 45.583556, -73.583695, 20.0, 2003, NULL, NULL, 16533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9155, rue Grandbois', 'Saint-Léonard', 'Montréal', 45.59592, -73.608589, 530.0, 2013, NULL, NULL, 940800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9020, rue de Belmont', 'Saint-Léonard', 'Montréal', 45.600072, -73.601338, 286.0, 1973, NULL, NULL, 517300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5865, rue Thierry', 'Saint-Léonard', 'Montréal', 45.592416, -73.594696, 475.0, 1963, NULL, NULL, 529233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8805, rue de Coulanges', 'Saint-Léonard', 'Montréal', 45.594314, -73.600138, 420.0, 1964, NULL, NULL, 527433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5775, boulevard Robert', 'Saint-Léonard', 'Montréal', 45.590636, -73.594098, 441.0, 1962, NULL, NULL, 461200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5855, boulevard Robert', 'Saint-Léonard', 'Montréal', 45.591508, -73.593283, 475.0, 1967, NULL, NULL, 509367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9143, rue Perinault', 'Saint-Léonard', 'Montréal', 45.598698, -73.605522, NULL, NULL, NULL, NULL, 1169933.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6195, rue Le Normand', 'Saint-Léonard', 'Montréal', 45.599396, -73.600306, 279.0, 1973, NULL, NULL, 358400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6203, rue de Meriel', 'Saint-Léonard', 'Montréal', 45.601157, -73.603782, NULL, NULL, NULL, NULL, 788367.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9030, rue Le Royer', 'Saint-Léonard', 'Montréal', 45.600667, -73.601069, 399.0, 1974, NULL, NULL, 983433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6105, rue Le Normand', 'Saint-Léonard', 'Montréal', 45.598423, -73.600776, 279.0, 1972, NULL, NULL, 350967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8565, rue des Prevoyants', 'Saint-Léonard', 'Montréal', 45.590794, -73.59703, NULL, NULL, NULL, NULL, 615067.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9061, rue Giovanni-Caboto', 'Saint-Léonard', 'Montréal', 45.603822, -73.597857, 338.0, 1999, NULL, NULL, 631733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6125, rue de Bellefeuille', 'Saint-Léonard', 'Montréal', 45.589419, -73.580062, 465.0, 1989, NULL, NULL, 853867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6145, rue de Pontbriand', 'Saint-Léonard', 'Montréal', 45.592754, -73.58737, 351.0, 1969, NULL, NULL, 579600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7430, boulevard Viau', 'Saint-Léonard', 'Montréal', 45.575143, -73.587866, 571.0, 1971, NULL, NULL, 1112800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7622, place de Monastir', 'Saint-Léonard', 'Montréal', 45.577916, -73.589142, 588.0, 1988, NULL, NULL, 1386400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4520, rue Plinguet', 'Saint-Léonard', 'Montréal', 45.581932, -73.612889, 414.0, 1974, NULL, NULL, 1012467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5680, rue des Artisans', 'Saint-Léonard', 'Montréal', 45.588103, -73.591437, 650.0, 1957, NULL, NULL, 524500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7280, rue de Lisieux', 'Saint-Léonard', 'Montréal', 45.578975, -73.581456, 360.0, 1963, NULL, NULL, 891900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5123, rue Ragueneau', 'Saint-Léonard', 'Montréal', 45.58952, -73.611281, 480.0, 1972, NULL, NULL, 1044300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5122, rue Raymond-Renaud', 'Saint-Léonard', 'Montréal', 45.592122, -73.618842, 772.0, 2005, NULL, NULL, 824833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7119, boulevard Lacordaire', 'Saint-Léonard', 'Montréal', 45.583453, -73.575341, 390.0, 1962, NULL, NULL, 692100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5735, boulevard Robert', 'Saint-Léonard', 'Montréal', 45.590279, -73.594433, 442.0, 1963, NULL, NULL, 559767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8745, rue Girardin', 'Saint-Léonard', 'Montréal', 45.591485, -73.601329, 502.0, 1959, NULL, NULL, 341900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8885, rue de Coulanges', 'Saint-Léonard', 'Montréal', 45.595124, -73.601887, 486.0, 1967, NULL, NULL, 732100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4701, boulevard Lavoisier', 'Saint-Léonard', 'Montréal', 45.584253, -73.612195, 419.0, 1974, NULL, NULL, 355640.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5101, rue Rimbaud', 'Saint-Léonard', 'Montréal', 45.585512, -73.603547, 351.0, 1968, NULL, NULL, 844600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5780, rue Mennereuil', 'Saint-Léonard', 'Montréal', 45.581743, -73.574334, 432.0, 1958, NULL, NULL, 708567.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7130, rue Lienart', 'Saint-Léonard', 'Montréal', 45.585608, -73.573041, NULL, NULL, NULL, NULL, 1196600.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7180, rue Lienart', 'Saint-Léonard', 'Montréal', 45.585925, -73.573946, NULL, NULL, NULL, NULL, 1127500.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6630, rue Bombardier', 'Saint-Léonard', 'Montréal', 45.601617, -73.591631, 511.0, 1967, NULL, NULL, 238767.0, 2023, 'Service de débosselage et de peinture d''automobiles', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8940, rue de Coulanges', 'Saint-Léonard', 'Montréal', 45.595231, -73.603071, 572.0, 1967, NULL, NULL, 899833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8905, rue Mauriac', 'Saint-Léonard', 'Montréal', 45.595709, -73.601542, 469.0, 1965, NULL, NULL, 780800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9103, rue Boissonneault', 'Saint-Léonard', 'Montréal', 45.598679, -73.604791, 502.0, 1974, NULL, NULL, 919967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8785, rue Mauriac', 'Saint-Léonard', 'Montréal', 45.594658, -73.599242, 468.0, 1965, NULL, NULL, 636933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6135, rue de Meriel', 'Saint-Léonard', 'Montréal', 45.600622, -73.604478, NULL, NULL, NULL, NULL, 760833.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5865, rue des Artisans', 'Saint-Léonard', 'Montréal', 45.590132, -73.590219, 435.0, 1962, NULL, NULL, 398000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7270, rue de Lisieux', 'Saint-Léonard', 'Montréal', 45.578901, -73.581295, 325.0, 1961, NULL, NULL, 711200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5033, rue Brazier', 'Saint-Léonard', 'Montréal', 45.588529, -73.611794, 486.0, 1972, NULL, NULL, 866233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8855, rue de Coulanges', 'Saint-Léonard', 'Montréal', 45.594873, -73.601348, 486.0, 1968, NULL, NULL, 638033.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4885, rue Perrier', 'Saint-Léonard', 'Montréal', 45.584076, -73.607072, 427.0, 1969, NULL, NULL, 987400.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7490, boulevard Provencher', 'Saint-Léonard', 'Montréal', 45.571513, -73.592478, 509.0, 1973, NULL, NULL, 1124733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9100, rue Grandbois', 'Saint-Léonard', 'Montréal', 45.595112, -73.607772, 809.0, 1960, NULL, NULL, 575400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5231, rue Paul-Emile-Petit', 'Saint-Léonard', 'Montréal', 45.593557, -73.616538, NULL, NULL, NULL, NULL, 823800.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5745, boulevard Robert', 'Saint-Léonard', 'Montréal', 45.590398, -73.594319, 441.0, 1963, NULL, NULL, 467433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7610, boulevard Provencher', 'Saint-Léonard', 'Montréal', 45.571577, -73.594745, 667.0, 1973, NULL, NULL, 1111467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7570, boulevard Provencher', 'Saint-Léonard', 'Montréal', 45.57226, -73.594324, 538.0, 1973, NULL, NULL, 1124833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7175, boulevard Lacordaire', 'Saint-Léonard', 'Montréal', 45.583492, -73.576659, 390.0, 1962, NULL, NULL, 730600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7153, rue Dumesnil', 'Saint-Léonard', 'Montréal', 45.588833, -73.570156, 556.0, 1974, NULL, NULL, 911100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5825, rue des Artisans', 'Saint-Léonard', 'Montréal', 45.589789, -73.590518, 435.0, 1962, NULL, NULL, 385500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('18, rue Saulnier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506001, -73.871353, 700.0, 1995, NULL, NULL, 739433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('434, croissant Boyer', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.4989, -73.874197, 557.0, 1986, NULL, NULL, 425333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('314, rue Alphonse-Desjardins', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.502801, -73.902626, 7501.0, 1993, NULL, NULL, 1811200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2033, chemin du Bord-du-Lac', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.507973, -73.902458, 670.0, 1972, NULL, NULL, 312400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('18, place Denis', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.494949, -73.864766, 1455.0, 2012, NULL, NULL, 979933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('15724, rue de la Caserne', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.48158, -73.865968, 408.0, 1957, NULL, NULL, 376800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('415, rue Brayer', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.49077, -73.880617, 557.0, 1974, NULL, NULL, 463633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('460, place Blaise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.494309, -73.874154, 186.0, 1980, NULL, NULL, 319400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('284, rue Soupras', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.495996, -73.865206, 684.0, 1997, NULL, NULL, 717200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('813, rue Pierre-Marc-Masson', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.491655, -73.889226, 357.0, 2012, NULL, NULL, 683000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1108, rue Bellevue', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.510439, -73.862789, 915.0, 2017, NULL, NULL, 983800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('433, rue Roumefort', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.496985, -73.876677, 639.0, 1987, NULL, NULL, 467533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('206, croissant Joncaire', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.501755, -73.86598, 547.0, 1984, NULL, NULL, 403300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('30, Barabe', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506767, -73.905826, NULL, NULL, NULL, NULL, 474400.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('14829, rue Aumais', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.486427, -73.860379, 755.0, 1989, NULL, NULL, 954867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('440, place Blaise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.49376, -73.873839, 183.0, 1980, NULL, NULL, 309633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('15, rue de Blanzy', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.49106, -73.8654, 4269.0, 1994, NULL, NULL, 2025733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('408, rue de la Vieille-Ecole', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506415, -73.904039, 908.0, 2005, NULL, NULL, 578567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('36, terrasse Martin', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506647, -73.90873, 1622.0, 1987, NULL, NULL, 704600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('482, rue Roumefort', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.496686, -73.875679, 714.0, 1987, NULL, NULL, 494000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('14729, rue Aumais', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.48679, -73.859938, 707.0, 1989, NULL, NULL, 1035700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('108, rue Pierre-Panet', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.503986, -73.871131, 700.0, 1994, NULL, NULL, 492900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3163, boulevard Chevremont', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506471, -73.863093, 702.0, 1994, NULL, NULL, 546900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('894, rue Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.498851, -73.882685, 568.0, 1989, NULL, NULL, 579000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('130, rue Sauve', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.511603, -73.895987, NULL, NULL, NULL, NULL, 1179467.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('27, croissant Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499199, -73.880863, 540.0, 1989, NULL, NULL, 572600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('511, rue Triolet', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.503974, -73.866839, 700.0, 1992, NULL, NULL, 491967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('202, croissant Joncaire', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.501817, -73.86649, 543.0, 1984, NULL, NULL, 452200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1111, de l''Eglise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.504243, -73.898173, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11, rue Lachapelle', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.490463, -73.872337, 1073.0, 1987, NULL, NULL, 716280.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('427, rue Roumefort', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.497096, -73.876832, 700.0, 1990, NULL, NULL, 463433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2039, chemin du Bord-du-Lac', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.509476, -73.902889, 5100.0, 2003, NULL, NULL, 1567200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('965, 1re Avenue', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.518794, -73.872303, NULL, NULL, NULL, NULL, 557800.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('71, rue Cardinal', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.48232, -73.883997, 807.0, 1986, NULL, NULL, 365033.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('19, croissant Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499273, -73.881671, 613.0, 1990, NULL, NULL, 587600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1, rue Tomassini', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499677, -73.915957, 3662.0, 1989, NULL, NULL, 1211833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('16670, boulevard Gouin Ouest', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.473447, -73.87426, 134.0, 2008, NULL, NULL, 235000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('40, croissant Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499583, -73.880303, 652.0, 1990, NULL, NULL, 538500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('63, rue Cardinal', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.48199, -73.883192, 592.0, 1976, NULL, NULL, 322967.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('397, rue Claude', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.498191, -73.877239, 848.0, 1989, NULL, NULL, 835733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('16167, boulevard Gouin Ouest', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.478868, -73.873292, 1910.0, 1933, NULL, NULL, 541700.0, 2022, 'Service de garderie (prématernelle, moins de 50 % de poupons)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('16000, rue Wilfrid-Boileau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.4794, -73.870274, NULL, NULL, NULL, NULL, 190700.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('438, place Blaise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.49371, -73.873803, 183.0, 1980, NULL, NULL, 317933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('100, boulevard Jacques-Bizard', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.489319, -73.871798, 13149.0, 1989, NULL, NULL, 900000.0, 2024, 'Centre commercial de voisinage (14 magasins et moins)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('450, place Blaise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.494037, -73.874101, 186.0, 1979, NULL, NULL, 319867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('17020, boulevard Gouin Ouest', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.470795, -73.878137, 164.0, 2002, NULL, NULL, 310100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('16678, boulevard Gouin Ouest', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.473447, -73.87426, 159.0, 2008, NULL, NULL, 233300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('488, rue Roumefort', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.496534, -73.875476, 572.0, 1988, NULL, NULL, 385433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('129, rue Doral', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.504039, -73.906826, 923.0, 1995, NULL, NULL, 989533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('104, rue Bastien', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499533, -73.878914, 441.0, 1995, NULL, NULL, 575333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('23, rue Leo-Lorrain', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.496793, -73.861816, 1150.0, 1989, NULL, NULL, 869733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('115, rue Philippe-Delisle', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.512704, -73.897131, 1422.0, 2004, NULL, NULL, 800367.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('454, croissant Boyer', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.500242, -73.875336, 606.0, 1987, NULL, NULL, 712567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('434, rue J.-O.-Nantel', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.502295, -73.87115, 485.0, 1991, NULL, NULL, 574500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1086, rue Bellevue', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.510662, -73.8652, 740.0, 2022, NULL, NULL, 1121933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('827, rue Pierre-Marc-Masson', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.492083, -73.888476, 357.0, 2010, NULL, NULL, 611167.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('166, avenue du Manoir', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.487613, -73.87373, 105.0, 1990, NULL, NULL, 181500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('300, rue Sainte-Marie', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.486461, -73.877822, 318.0, 2009, NULL, NULL, 307200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('233, rue Saint-Raphael', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.503333, -73.906086, NULL, NULL, NULL, NULL, 757400.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('15, rue Grilli', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.457402, -73.860541, 818.0, 1997, NULL, NULL, 1284500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('34, rue Robert', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.494176, -73.886982, 650.0, 1979, NULL, NULL, 565167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3149, boulevard Chevremont', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.507702, -73.86361, 701.0, 1994, NULL, NULL, 509500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1027, rue Bellevue', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.507452, -73.872006, 755.0, 2002, NULL, NULL, 686700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('106, rue Bastien', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.49954, -73.878998, 499.0, 1995, NULL, NULL, 566400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('578, rue Simonet', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.501733, -73.872951, 697.0, 1986, NULL, NULL, 767000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de la Vieille-Ecole', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506459, -73.903468, NULL, NULL, NULL, NULL, 50400.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2199, chemin du Bord-du-Lac', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.517418, -73.8922, 19941.0, 1995, NULL, NULL, 4300900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1088, rue Bellevue', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.510621, -73.864951, 740.0, 2018, NULL, NULL, 911233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('906, rue Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.498872, -73.88125, 704.0, 1990, NULL, NULL, 730100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('458, place Blaise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.494255, -73.874135, 186.0, 1980, NULL, NULL, 336100.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('17, croissant Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499259, -73.881904, 597.0, 1989, NULL, NULL, 762500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('29, croissant Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.49899, -73.880862, 540.0, 1989, NULL, NULL, 681000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3, rue Leo-Lorrain', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.496063, -73.863047, 1089.0, 1983, NULL, NULL, 571767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10, rue Saulnier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506073, -73.870331, 700.0, 1994, NULL, NULL, 753433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('406, rue J.-O.-Nantel', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.501099, -73.869774, 512.0, 1988, NULL, NULL, 690200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Cherrier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.522872, -73.565751, NULL, NULL, NULL, NULL, 213967.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('418, rue J.-O.-Nantel', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.501677, -73.870735, 589.0, 1990, NULL, NULL, 663300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('16782, boulevard Gouin Ouest', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.472282, -73.875961, 156.0, 1950, NULL, NULL, 224300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('361, rue Claude', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.499084, -73.877213, 648.0, 1990, NULL, NULL, 699900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('135, rue Doral', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.503557, -73.907436, 1096.0, 1994, NULL, NULL, 889733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('36, rue Saulnier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.50449, -73.871493, 735.0, 1994, NULL, NULL, 775000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1029, rue Bellevue', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.507655, -73.872019, 740.0, 2005, NULL, NULL, 630733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('96, rue Roussin', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.513346, -73.897822, 2299.0, NULL, NULL, NULL, 515600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('590, rue Simonet', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.500741, -73.872897, 697.0, 1986, NULL, NULL, 716300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('971, rue Cherrier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.474433, -73.910653, 1723.0, 1992, NULL, NULL, 449467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('26, terrasse Page', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.505477, -73.910238, NULL, NULL, NULL, NULL, 558700.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1252, montée Wilson', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.480651, -73.926735, 2505.0, 1977, NULL, NULL, 602800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('376, rue Cherrier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.488538, -73.875649, 1749.0, 1843, NULL, NULL, 544520.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3208, rue Leon-Brisebois', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.497288, -73.866146, 568.0, 1995, NULL, NULL, 396467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('436, rue J.-O.-Nantel', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.502403, -73.871239, 485.0, 1992, NULL, NULL, 755500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1530, chemin du Bord-du-Lac', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.489671, -73.934474, 156182.0, 1929, NULL, NULL, 610233.0, 2023, 'Autres activités agricoles', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('20, rue Saulnier', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.505985, -73.87163, 1220.0, 1994, NULL, NULL, 801267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('837, rue Pierre-Marc-Masson', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.492428, -73.887858, 357.0, 2011, NULL, NULL, 382500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, de l''Eglise', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.488485, -73.881449, NULL, NULL, NULL, NULL, 900000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('15085, boulevard Gouin Ouest', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.486997, -73.862029, 3799.0, 1890, NULL, NULL, 78500.0, 2022, 'Parc de maisons mobiles (fonds de terre seulement)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('18, rue Begin', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.509669, -73.861433, NULL, NULL, NULL, NULL, 627300.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('400, rue de la Vieille-Ecole', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.506149, -73.902875, 1252.0, 2005, NULL, NULL, 939967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('914, rue Thibaudeau', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.498849, -73.879627, 528.0, 1989, NULL, NULL, 364200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('35, rue Gatien-Claude', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.476922, -73.872636, 852.0, 1989, NULL, NULL, 581100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('23, rue Jean-Yves', 'L''Île-Bizard–Sainte-Geneviève', 'Montréal', 45.483161, -73.880663, 713.0, 1982, NULL, NULL, 447700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

