-- ============================================================
-- NESTA — seed « vraies adresses » (données ouvertes) — LOT 3
-- Généré le 2026-09-30 par scripts/import-profiles-batch2.py
-- (même méthodologie que le lot 1 : taxes municipales, unités
-- d'évaluation foncière, adresse ponctuelle — CC-BY 4.0 ;
-- coordonnées manquantes via Nominatim (OpenStreetMap, ODbL) ;
-- photos de rue : NULL — retirées du site.)
-- Champ absent dans les jeux -> NULL (jamais inventé).
-- IMPORTANT : one-shot, PAS d'upsert — ne contient QUE des profils
-- inédits (dédupliqués contre le lot 1 et dans le lot). Ne pas
-- réappliquer. RLS : lecture publique seule.
-- Fichier 3b/3a/3b/3c/3d/3e/3f/3g — 450 lignes.
-- ============================================================

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('261, rue de la Poudriere', 'Verdun', 'Montréal', 45.473051, -73.567639, NULL, NULL, NULL, NULL, 423133.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('355, rue Gordon', 'Verdun', 'Montréal', 45.460917, -73.569306, 283.0, 1910, NULL, NULL, 997767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('311, rue Moffat', 'Verdun', 'Montréal', 45.450172, -73.569423, 100.0, 1932, NULL, NULL, 454667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('825, rue Melrose', 'Verdun', 'Montréal', 45.454176, -73.575574, 451.0, 1929, NULL, NULL, 1093600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5307, boulevard Lasalle', 'Verdun', 'Montréal', 45.45343, -73.567295, 236.0, 1926, NULL, NULL, 950033.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3640, rue Evelyn', 'Verdun', 'Montréal', 45.467534, -73.569577, 53.0, 2006, NULL, NULL, 299500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('351, avenue Desmarchais', 'Verdun', 'Montréal', 45.454467, -73.570662, 237.0, 1926, NULL, NULL, 667000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3891, boulevard Lasalle', 'Verdun', 'Montréal', 45.464992, -73.565454, 468.0, 1926, NULL, NULL, 1200667.0, 2023, 'Maison de chambres et pension', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3535, rue Ethel', 'Verdun', 'Montréal', 45.468338, -73.567828, 232.0, 1920, NULL, NULL, 696000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('523, rue de la Metairie', 'Verdun', 'Montréal', 45.462293, -73.551158, NULL, NULL, NULL, NULL, 479300.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('507, rue Rielle', 'Verdun', 'Montréal', 45.460472, -73.570717, 283.0, 1924, NULL, NULL, 825700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('452, rue Woodland', 'Verdun', 'Montréal', 45.452324, -73.571659, 114.0, 1960, NULL, NULL, 495967.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('398, rue de la Sagittaire', 'Verdun', 'Montréal', 45.464983, -73.545914, 342.0, 2000, NULL, NULL, 2138267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5224, rue Wellington', 'Verdun', 'Montréal', 45.454244, -73.567531, 65.0, 1928, NULL, NULL, 228167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1230, rue Godin', 'Verdun', 'Montréal', 45.448105, -73.581929, 195.0, 1949, NULL, NULL, 488600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3309, rue de Verdun', 'Verdun', 'Montréal', 45.470715, -73.570906, 48.0, 1925, NULL, NULL, 237200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Jacques-Le Ber', 'Verdun', 'Montréal', 45.471652, -73.538662, NULL, NULL, NULL, NULL, 2215767.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('582, rue Dupret', 'Verdun', 'Montréal', 45.463369, -73.5481, 282.0, 1994, NULL, NULL, 1004000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('223, rue Hickson', 'Verdun', 'Montréal', 45.465124, -73.566179, 279.0, 1902, NULL, NULL, 504433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('157, rue Roland-Jeanneau', 'Verdun', 'Montréal', 45.46438, -73.553613, 270.0, 1986, NULL, NULL, 949633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('261, rue Osborne', 'Verdun', 'Montréal', 45.451053, -73.568646, 130.0, 1926, NULL, NULL, 640967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('517, rue de la Metairie', 'Verdun', 'Montréal', 45.462293, -73.551162, NULL, NULL, NULL, NULL, 505900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3636, rue Gertrude', 'Verdun', 'Montréal', 45.46746, -73.568447, 49.0, 2018, NULL, NULL, 313133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3634, rue Evelyn', 'Verdun', 'Montréal', 45.467459, -73.569992, 47.0, 2006, NULL, NULL, 279000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3942, rue Cool', 'Verdun', 'Montréal', 45.464777, -73.577446, 533.0, 1939, NULL, NULL, 640667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6038, rue Bannantyne', 'Verdun', 'Montréal', 45.447018, -73.576895, 230.0, 1943, NULL, NULL, 574400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('470, rue de la Grande-Allee', 'Verdun', 'Montréal', 45.463251, -73.54664, 278.0, 1999, NULL, NULL, 707700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('227, rue de la Noue', 'Verdun', 'Montréal', 45.462844, -73.554307, 196.0, 1987, NULL, NULL, 874600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('72, rue Terry-Fox', 'Verdun', 'Montréal', 45.465986, -73.539975, 186.0, 1985, NULL, NULL, 589200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('145, rue Roland-Jeanneau', 'Verdun', 'Montréal', 45.464577, -73.553692, 265.0, 1986, NULL, NULL, 836433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('142, rue Roland-Jeanneau', 'Verdun', 'Montréal', 45.464619, -73.553158, 269.0, 1985, NULL, NULL, 965000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('179, rue Lafleur', 'Verdun', 'Montréal', 45.467457, -73.565631, 232.0, 1922, NULL, NULL, 1045933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('30, rue Berlioz', 'Verdun', 'Montréal', 45.465224, -73.537231, 7.0, 1983, NULL, NULL, 16600.0, 2025, 'Stationnement extérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('323, avenue Desmarchais', 'Verdun', 'Montréal', 45.454419, -73.570044, 237.0, 1926, NULL, NULL, 668200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('315, avenue Desmarchais', 'Verdun', 'Montréal', 45.454413, -73.569838, 237.0, 1926, NULL, NULL, 651000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('759, rue Melrose', 'Verdun', 'Montréal', 45.454138, -73.574731, 475.0, 1928, NULL, NULL, 1048700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3575, rue Ethel', 'Verdun', 'Montréal', 45.467924, -73.567816, 232.0, 1908, NULL, NULL, 641400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1200, rue Godin', 'Verdun', 'Montréal', 45.447694, -73.581428, 297.0, 1948, NULL, NULL, 505500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('401, rue de la Sagittaire', 'Verdun', 'Montréal', 45.465461, -73.546041, 362.0, 1999, NULL, NULL, 1978300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('293, rue Gordon', 'Verdun', 'Montréal', 45.461224, -73.568297, 283.0, 1920, NULL, NULL, 665500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('335, 1e Avenue', 'Verdun', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 831800.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('474, rue de la Grande-Allee', 'Verdun', 'Montréal', 45.463212, -73.546794, 316.0, 1999, NULL, NULL, 804000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('441, rue Rielle', 'Verdun', 'Montréal', 45.460437, -73.569985, 340.0, 1921, NULL, NULL, 1100467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1193, rue Osborne', 'Verdun', 'Montréal', 45.451923, -73.580598, 136.0, 1946, NULL, NULL, 575700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('141, rue Roland-Jeanneau', 'Verdun', 'Montréal', 45.464688, -73.553687, 177.0, 1986, NULL, NULL, 831067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1260, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.519751, -73.557331, 42.0, 2019, NULL, NULL, 665933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1076, rue de Bleury', 'Ville-Marie', 'Montréal', 45.504747, -73.563274, 145.0, NULL, NULL, NULL, 750000.0, 2021, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1871, boulevard Rene-Levesque Est', 'Ville-Marie', 'Montréal', 45.522395, -73.549267, NULL, NULL, NULL, NULL, 331500.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1166, rue Ontario Est', 'Ville-Marie', 'Montréal', 45.520832, -73.562369, 43.0, 2001, NULL, NULL, 504500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2526, rue Wurtele', 'Ville-Marie', 'Montréal', 45.538669, -73.556993, 52.0, 2002, NULL, NULL, 295667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1016, rue de la Montagne', 'Ville-Marie', 'Montréal', 45.495647, -73.571, 298.0, 2014, NULL, NULL, 750000.0, 2021, 'Restaurant et établissement avec service restreint ( commande au comptoir ou par téléphone)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2107, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.491289, -73.582545, 594.0, 1912, NULL, NULL, 900000.0, 2022, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2342, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529316, -73.562173, 182.0, 1900, NULL, NULL, 948333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('684, rue Saint-Timothee', 'Ville-Marie', 'Montréal', 45.513784, -73.550931, NULL, NULL, NULL, NULL, 535433.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2121, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.49117, -73.582724, 440.0, 1885, NULL, NULL, 900000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2333, rue Sherbrooke Ouest', 'Ville-Marie', 'Montréal', 45.4919, -73.58817, 116.0, 1911, NULL, NULL, 1830067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1800, boulevard Rene-Levesque Ouest', 'Ville-Marie', 'Montréal', 45.491292, -73.576974, NULL, NULL, NULL, NULL, 345000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2316, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529169, -73.561879, 182.0, 1915, NULL, NULL, 892833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1672, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517455, -73.56163, 220.0, 1875, NULL, NULL, 1094967.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('310, rue Le Royer Est', 'Ville-Marie', 'Montréal', 45.508606, -73.552633, 39.0, 1999, NULL, NULL, 411800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2169, rue Cartier', 'Ville-Marie', 'Montréal', 45.527725, -73.560907, 40.0, 2018, NULL, NULL, 407200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1181, rue Bishop', 'Ville-Marie', 'Montréal', 45.495867, -73.574393, 8.0, 2015, NULL, NULL, 361000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2328, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529209, -73.561945, 182.0, 1981, NULL, NULL, 661167.0, 2024, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1140, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.518714, -73.557767, 37.0, 2001, NULL, NULL, 35733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1264, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.519751, -73.557331, 41.0, 2019, NULL, NULL, 665933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1764, rue Panet', 'Ville-Marie', 'Montréal', 45.521813, -73.559148, 68.0, 1955, NULL, NULL, 576600.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1698, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517417, -73.562075, 110.0, 1875, NULL, NULL, 922333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2301, rue Bercy', 'Ville-Marie', 'Montréal', 45.536423, -73.555805, 43.0, 1925, NULL, NULL, 302300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1971, boulevard Rene-Levesque Est', 'Ville-Marie', 'Montréal', 45.523004, -73.548879, NULL, NULL, NULL, NULL, 900000.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1299, rue de la Visitation', 'Ville-Marie', 'Montréal', 45.519143, -73.554807, 159.0, 1900, NULL, NULL, 1445000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1259, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.519194, -73.55583, 295.0, 2010, NULL, NULL, 606635.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('410, boulevard Saint-Laurent', 'Ville-Marie', 'Montréal', 45.505616, -73.554467, 28.0, 1980, NULL, NULL, 83567.0, 2026, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1171, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.518366, -73.556594, 652.0, 1870, NULL, NULL, 900000.0, 2024, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1800, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519856, -73.561116, 129.0, 1875, NULL, NULL, 501867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('308, rue Le Royer Est', 'Ville-Marie', 'Montréal', 45.508593, -73.552646, 33.0, 1999, NULL, NULL, 354533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1254, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.519688, -73.557379, 30.0, 2019, NULL, NULL, 456333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('786, rue Lusignan', 'Ville-Marie', 'Montréal', 45.492784, -73.570848, 87.0, 1875, NULL, NULL, 621367.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1648, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517131, -73.561461, 110.0, 1875, NULL, NULL, 570000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2250, avenue des Erables', 'Ville-Marie', 'Montréal', 45.530251, -73.560472, NULL, NULL, NULL, NULL, 415367.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1800, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.527957, -73.563562, 189.0, 1925, NULL, NULL, 1098367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1900, rue Sherbrooke Ouest', 'Ville-Marie', 'Montréal', 45.494331, -73.583407, 3670.0, NULL, NULL, NULL, 47376.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Beaudry', 'Ville-Marie', 'Montréal', 45.658891, -73.509742, NULL, NULL, NULL, NULL, 259433.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2301, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.489847, -73.584262, 9846.0, 1943, NULL, NULL, 900000.0, 2022, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1676, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.527355, -73.563792, 1405.0, NULL, NULL, NULL, 7526767.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1430, rue de la Montagne', 'Ville-Marie', 'Montréal', 45.498093, -73.576105, 1.0, 2019, NULL, NULL, 14465900.0, 2021, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1155, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.518162, -73.55678, 611.0, 1960, NULL, NULL, 900000.0, 2024, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1716, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519379, -73.560102, 258.0, 1875, NULL, NULL, 625167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1800, avenue du Docteur-Penfield', 'Ville-Marie', 'Montréal', 45.494847, -73.590006, 2152.0, 1941, NULL, NULL, 6681667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1980, rue Sherbrooke Ouest', 'Ville-Marie', 'Montréal', 45.493786, -73.583787, 1628.0, 1954, NULL, NULL, 900000.0, 2024, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1232, rue de la Montagne', 'Ville-Marie', 'Montréal', 45.497768, -73.574362, 1362.0, 1870, NULL, NULL, 750000.0, 2021, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1654, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519005, -73.559339, 237.0, 1987, NULL, NULL, 1123933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4000, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.48892, -73.584729, 147.0, 1976, NULL, NULL, 183000.0, 2022, 'Restaurant et établissement avec service complet (sans terrasse) -Établissements avec permis alcool, inclus pub,café et brasserie', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1605, avenue du Docteur-Penfield', 'Ville-Marie', 'Montréal', 45.496161, -73.587346, 50.0, 2002, NULL, NULL, 1960567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2015, rue Wolfe', 'Ville-Marie', 'Montréal', 45.520888, -73.562797, 2902.0, NULL, NULL, NULL, 7423333.0, 2021, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1684, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519175, -73.559734, 129.0, 1931, NULL, NULL, 815867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1440, rue Fullum', 'Ville-Marie', 'Montréal', 45.527403, -73.549085, 86.0, 1900, NULL, NULL, 310167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2332, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.52924, -73.562026, 182.0, 1910, NULL, NULL, 625567.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1390, rue du Fort', 'Ville-Marie', 'Montréal', 45.491654, -73.581434, 5.0, 1990, NULL, NULL, 305100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2549, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.530572, -73.547352, 47.0, 2003, NULL, NULL, 319433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de Bleury', 'Ville-Marie', 'Montréal', 45.504736, -73.563655, NULL, NULL, NULL, NULL, 47600.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1302, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.519422, -73.555522, 320.0, 1948, NULL, NULL, 847667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('50, rue Mcgill', 'Ville-Marie', 'Montréal', 45.498896, -73.554044, 22.0, 2003, NULL, NULL, 1446500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1450, boulevard Rene-Levesque Ouest', 'Ville-Marie', 'Montréal', 45.494852, -73.573076, NULL, NULL, NULL, NULL, 433000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('731, rue de la Commune Ouest', 'Ville-Marie', 'Montréal', 45.496528, -73.553214, 1051.0, 1957, NULL, NULL, 900000.0, 2025, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1438, rue Fullum', 'Ville-Marie', 'Montréal', 45.527403, -73.549085, 86.0, 1900, NULL, NULL, 348300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2298, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529074, -73.561729, 119.0, 1910, NULL, NULL, 386633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1875, boulevard Rene-Levesque Est', 'Ville-Marie', 'Montréal', 45.522395, -73.549264, NULL, NULL, NULL, NULL, 309700.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2398, avenue des Erables', 'Ville-Marie', 'Montréal', 45.530932, -73.561921, NULL, NULL, NULL, NULL, 730733.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('221, rue Saint-Jacques', 'Ville-Marie', 'Montréal', 45.503932, -73.558617, 20.0, 1908, NULL, NULL, 280900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2060, rue Saint-Dominique', 'Ville-Marie', 'Montréal', 45.512219, -73.567813, 669.0, 1956, NULL, NULL, 900000.0, 2025, 'Hôtel (incluant les hôtels-motels)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2290, rue du Souvenir', 'Ville-Marie', 'Montréal', 45.487502, -73.581607, 66.0, 1900, NULL, NULL, 592800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1628, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.516999, -73.561154, 74.0, 1882, NULL, NULL, 728100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1293, rue de la Visitation', 'Ville-Marie', 'Montréal', 45.519101, -73.554739, 163.0, 1870, NULL, NULL, 1049400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1201, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.518332, -73.555902, 1510.0, 1890, NULL, NULL, 900000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2244, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529043, -73.560828, 182.0, 1910, NULL, NULL, 950500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('360, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.51653, -73.567331, 219.0, 1910, NULL, NULL, 288046.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('157, rue Saint-Paul Ouest', 'Ville-Marie', 'Montréal', 45.503346, -73.555164, 63.0, 1914, NULL, NULL, 446633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1262, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.519751, -73.557331, 40.0, 2019, NULL, NULL, 640100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2392, avenue des Erables', 'Ville-Marie', 'Montréal', 45.530902, -73.561865, NULL, NULL, NULL, NULL, 627900.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1329, rue Sainte-Rose', 'Ville-Marie', 'Montréal', 45.51919, -73.55402, 93.0, 1875, NULL, NULL, 560833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1652, rue Wolfe', 'Ville-Marie', 'Montréal', 45.518954, -73.559212, 237.0, 1987, NULL, NULL, 1154567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2336, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529278, -73.562098, 182.0, 1911, NULL, NULL, 611167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1806, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.528319, -73.564179, 210.0, 1924, NULL, NULL, 979567.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1846, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.528343, -73.563435, 320.0, 1926, NULL, NULL, 989333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('38, rue Mcgill', 'Ville-Marie', 'Montréal', 45.498896, -73.554044, 26.0, 2003, NULL, NULL, 741300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1480, rue Saint-Jacques', 'Ville-Marie', 'Montréal', 45.49192, -73.568922, 106.0, 1985, NULL, NULL, 525100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2292, rue du Souvenir', 'Ville-Marie', 'Montréal', 45.487502, -73.581607, 74.0, 1900, NULL, NULL, 495600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3175, chemin de la Vigne', 'Ville-Marie', 'Montréal', 45.492021, -73.592404, 912.0, 2016, NULL, NULL, 8091867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1957, rue Falardeau', 'Ville-Marie', 'Montréal', 45.523224, -73.549863, 254.0, 1910, NULL, NULL, 805967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('945, rue du Glacis', 'Ville-Marie', 'Montréal', 45.513786, -73.550856, 51.0, 2003, NULL, NULL, 508400.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2365, avenue de Lorimier', 'Ville-Marie', 'Montréal', 45.530586, -73.5622, 109.0, 1910, NULL, NULL, 285900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3150, place de Ramezay', 'Ville-Marie', 'Montréal', 45.493663, -73.592738, 664.0, 1894, NULL, NULL, 101000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1510, rue Saint-Jacques', 'Ville-Marie', 'Montréal', 45.491678, -73.569321, 118.0, 1985, NULL, NULL, 572000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2262, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.529114, -73.560978, 117.0, 1913, NULL, NULL, 1004867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1704, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517455, -73.562153, 110.0, 1870, NULL, NULL, 865833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('185, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.507549, -73.56643, 29019.0, 1977, NULL, NULL, 900000.0, 2025, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de la Visitation', 'Ville-Marie', 'Montréal', 45.523009, -73.563485, NULL, NULL, NULL, NULL, 365900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1383, boulevard Rene-Levesque Est', 'Ville-Marie', 'Montréal', 45.519297, -73.552172, NULL, NULL, NULL, NULL, 996033.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2537, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.530572, -73.547352, 49.0, 2003, NULL, NULL, 280067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1101, rue Saint-Urbain', 'Ville-Marie', 'Montréal', 45.507473, -73.561708, 20.0, 1985, NULL, NULL, 358400.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1988, rue Montcalm', 'Ville-Marie', 'Montréal', 45.52093, -73.562277, 37.0, 2001, NULL, NULL, 387367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2117, rue Tupper', 'Ville-Marie', 'Montréal', 45.490599, -73.581735, 10.0, 2017, NULL, NULL, 237033.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2916, rue de Rouen', 'Ville-Marie', 'Montréal', 45.538371, -73.552964, 25.0, 2013, NULL, NULL, 151867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1883, boulevard Rene-Levesque Est', 'Ville-Marie', 'Montréal', 45.522395, -73.549258, NULL, NULL, NULL, NULL, 241567.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1812, rue Wolfe', 'Ville-Marie', 'Montréal', 45.5199, -73.561217, 129.0, 1875, NULL, NULL, 464667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('20, rue des Soeurs-Grises', 'Ville-Marie', 'Montréal', 45.498185, -73.553459, 22.0, 1998, NULL, NULL, 433600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1090, rue de Bleury', 'Ville-Marie', 'Montréal', 45.504442, -73.563411, 2575.0, 2019, NULL, NULL, 73760000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1271, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.519252, -73.555696, 295.0, 1900, NULL, NULL, 665896.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1706, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519334, -73.559995, 129.0, 1870, NULL, NULL, 478800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2427, avenue des Erables', 'Ville-Marie', 'Montréal', 45.531441, -73.562192, NULL, NULL, NULL, NULL, 1199767.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('650, rue Jean-d''Estrees', 'Ville-Marie', 'Montréal', 45.494779, -73.565403, NULL, NULL, NULL, NULL, 413000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('301, rue Saint-Paul Est', 'Ville-Marie', 'Montréal', 45.508574, -73.552219, 35.0, 1999, NULL, NULL, 612200.0, 2024, 'Autres services d''affaires', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2238, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.528833, -73.56113, 182.0, 1910, NULL, NULL, 823300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('350, boulevard de Maisonneuve Ouest', 'Ville-Marie', 'Montréal', 45.506833, -73.568924, 5.0, 2010, NULL, NULL, 461400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('479, rue Saint-Alexis', 'Ville-Marie', 'Montréal', 45.502683, -73.558038, 52.0, 1884, NULL, NULL, 415433.0, 2021, 'Restaurant et établissement avec service complet (sans terrasse) -Établissements avec permis alcool, inclus pub,café et brasserie', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1684, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517353, -73.561913, 110.0, 1880, NULL, NULL, 703967.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1638, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517039, -73.561276, 221.0, 1875, NULL, NULL, 1168167.0, 2024, 'Maison de chambres et pension', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1297, rue Panet', 'Ville-Marie', 'Montréal', 45.519726, -73.554013, 76.0, 1918, NULL, NULL, 538100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('550, rue Jean-d''Estrees', 'Ville-Marie', 'Montréal', 45.49442, -73.564588, NULL, NULL, NULL, NULL, 451867.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1345, rue Sainte-Rose', 'Ville-Marie', 'Montréal', 45.519374, -73.55383, 113.0, 1895, NULL, NULL, 680933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1050, rue de la Montagne', 'Ville-Marie', 'Montréal', 45.495997, -73.571548, 1057.0, NULL, NULL, NULL, 750000.0, 2021, 'Immeuble résidentiel en construction', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('366, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.516601, -73.56731, 167.0, 1900, NULL, NULL, 315326.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2061, rue Wolfe', 'Ville-Marie', 'Montréal', 45.521183, -73.563501, 46.0, 1875, NULL, NULL, 205600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2539, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.530572, -73.547352, 47.0, 2003, NULL, NULL, 264467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1341, rue Sainte-Rose', 'Ville-Marie', 'Montréal', 45.519328, -73.553889, 78.0, 1895, NULL, NULL, 664200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2522, rue Wurtele', 'Ville-Marie', 'Montréal', 45.538939, -73.556797, 52.0, 2002, NULL, NULL, 251533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('312, rue Le Royer Est', 'Ville-Marie', 'Montréal', 45.50862, -73.552622, 49.0, 1999, NULL, NULL, 878267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1728, rue Wolfe', 'Ville-Marie', 'Montréal', 45.5194, -73.560223, 129.0, 1875, NULL, NULL, 523367.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2178, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.490387, -73.582876, 233.0, 1885, NULL, NULL, 900000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('412, rue Saint-Claude', 'Ville-Marie', 'Montréal', 45.508665, -73.55238, 6.0, 1999, NULL, NULL, 57200.0, 2024, 'Stationnement intérieur ( condo non résidentiel)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3480, rue Simpson', 'Ville-Marie', 'Montréal', 45.498205, -73.584059, 14.0, 1972, NULL, NULL, 280600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1450, rue Parthenais', 'Ville-Marie', 'Montréal', 45.526341, -73.550066, 28.0, 2012, NULL, NULL, 394933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1188, rue Ontario Est', 'Ville-Marie', 'Montréal', 45.520832, -73.562369, 60.0, 2001, NULL, NULL, 286800.0, 2024, 'Autres services d''affaires', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1816, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.528108, -73.563502, 232.0, 1925, NULL, NULL, 901733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2524, rue Wurtele', 'Ville-Marie', 'Montréal', 45.538669, -73.556993, 47.0, 2002, NULL, NULL, 263467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2152, rue Lesperance', 'Ville-Marie', 'Montréal', 45.538204, -73.55165, NULL, NULL, NULL, NULL, 283400.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2004, boulevard Saint-Laurent', 'Ville-Marie', 'Montréal', 45.511277, -73.567157, 22.0, 1907, NULL, NULL, 182700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2274, rue de Bordeaux', 'Ville-Marie', 'Montréal', 45.528992, -73.561499, 205.0, 1910, NULL, NULL, 735100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('365, rue Saint-Andre', 'Ville-Marie', 'Montréal', 45.513091, -73.549614, 9.0, 2017, NULL, NULL, 408633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1223, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.518794, -73.556092, 283.0, 1900, NULL, NULL, 900000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('447, avenue Viger Ouest', 'Ville-Marie', 'Montréal', 45.502713, -73.562862, 9.0, 2001, NULL, NULL, 318100.0, 2023, 'Autres activités de vente au détail (inclus les kiosques d''autres choses que vêtements et accessoires de vêtements)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1850, rue Sherbrooke Ouest', 'Ville-Marie', 'Montréal', 45.494727, -73.582954, 2118.0, 1929, NULL, NULL, 900000.0, 2024, 'Autres services personnels', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2170, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.490487, -73.582781, 517.0, NULL, NULL, NULL, 1306160.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2404, avenue des Erables', 'Ville-Marie', 'Montréal', 45.530957, -73.561982, NULL, NULL, NULL, NULL, 702267.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1692, rue Saint-Christophe', 'Ville-Marie', 'Montréal', 45.517389, -73.561989, 110.0, 1875, NULL, NULL, 1006867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1818, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519933, -73.561294, 129.0, 1875, NULL, NULL, 556600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1281, rue de la Visitation', 'Ville-Marie', 'Montréal', 45.519034, -73.554593, 270.0, 1875, NULL, NULL, 1386100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('614, rue Saint-Jacques', 'Ville-Marie', 'Montréal', 45.500716, -73.560609, 108.0, 1940, NULL, NULL, 0.0, 2026, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1213, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.518751, -73.556269, 344.0, 1910, NULL, NULL, 810667.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1500, rue Saint-Jacques', 'Ville-Marie', 'Montréal', 45.491691, -73.569304, 97.0, 1985, NULL, NULL, 416000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('901, rue de la Commune Est', 'Ville-Marie', 'Montréal', 45.513011, -73.549255, 20.0, 2013, NULL, NULL, 57300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3156, chemin de Trafalgar-Heights', 'Ville-Marie', 'Montréal', 45.493173, -73.599732, 710.0, 1953, NULL, NULL, 4384267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1950, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.529342, -73.563152, 372.0, 1931, NULL, NULL, 219800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('334, rue Notre-Dame Est', 'Ville-Marie', 'Montréal', 45.509545, -73.552725, 30.0, 1918, NULL, NULL, 682833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4005, rue Redpath', 'Ville-Marie', 'Montréal', 45.500134, -73.584517, 154.0, 1982, NULL, NULL, 53033.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2520, rue Wurtele', 'Ville-Marie', 'Montréal', 45.538939, -73.556797, 38.0, 2002, NULL, NULL, 245900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1852, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.528434, -73.563433, 219.0, 1924, NULL, NULL, 979733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2000, rue Sherbrooke Ouest', 'Ville-Marie', 'Montréal', 45.49361, -73.584083, 1498.0, NULL, NULL, NULL, 5568500.0, 2024, 'Immeuble à bureaux', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1333, rue Sainte-Rose', 'Ville-Marie', 'Montréal', 45.519238, -73.553979, 94.0, 1895, NULL, NULL, 641033.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('500, rue de la Montagne', 'Ville-Marie', 'Montréal', 45.493048, -73.565587, 46.0, 1993, NULL, NULL, 573300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1442, rue Fullum', 'Ville-Marie', 'Montréal', 45.527403, -73.549085, 86.0, 1900, NULL, NULL, 343700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2437, avenue des Erables', 'Ville-Marie', 'Montréal', 45.531481, -73.562293, NULL, NULL, NULL, NULL, 1281533.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1272, rue Sainte-Catherine Est', 'Ville-Marie', 'Montréal', 45.519252, -73.555696, 295.0, 1900, NULL, NULL, 900000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('306, rue Le Royer Est', 'Ville-Marie', 'Montréal', 45.508579, -73.552656, 52.0, 1999, NULL, NULL, 491900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1180, rue de la Montagne', 'Ville-Marie', 'Montréal', 45.496927, -73.573399, 540.0, 1991, NULL, NULL, 750000.0, 2021, 'Autres services de l''automobile', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1836, rue Sherbrooke Ouest', 'Ville-Marie', 'Montréal', 45.495015, -73.582773, 299.0, 1919, NULL, NULL, 415564.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('405, rue Notre-Dame Est', 'Ville-Marie', 'Montréal', 45.510411, -73.552524, 36.0, 1989, NULL, NULL, 359900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('372, rue Sherbrooke Est', 'Ville-Marie', 'Montréal', 45.51667, -73.567268, 202.0, 1900, NULL, NULL, 578280.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1225, rue Alexandre-Deseve', 'Ville-Marie', 'Montréal', 45.520666, -73.552053, 2905.0, 1894, NULL, NULL, 12503900.0, 2024, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3470, rue Simpson', 'Ville-Marie', 'Montréal', 45.498205, -73.584059, 10.0, 1972, NULL, NULL, 186300.0, 2025, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10635, avenue de l''Esplanade', 'Ahuntsic-Cartierville', 'Montréal', 45.547452, -73.671674, 395.0, 1953, NULL, NULL, 780100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10445, rue Andre-Jobin', 'Ahuntsic-Cartierville', 'Montréal', 45.577217, -73.648901, NULL, NULL, NULL, NULL, 624700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2230, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.542532, -73.703789, 467.0, 1969, NULL, NULL, 822600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1975, avenue Etienne-Brule', 'Ahuntsic-Cartierville', 'Montréal', 45.573113, -73.660812, NULL, NULL, NULL, NULL, 523867.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11490, rue Drouart', 'Ahuntsic-Cartierville', 'Montréal', 45.536487, -73.688155, 438.0, 1962, NULL, NULL, 667533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10550, rue de la Roche', 'Ahuntsic-Cartierville', 'Montréal', 45.560096, -73.662652, 465.0, 1950, NULL, NULL, 735400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8980, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.550188, -73.642404, 326.0, 1950, NULL, NULL, 904100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11562, rue Tanguay', 'Ahuntsic-Cartierville', 'Montréal', 45.546541, -73.681723, 303.0, 1959, NULL, NULL, 821400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10645, rue d''Iberville', 'Ahuntsic-Cartierville', 'Montréal', 45.577362, -73.652428, 255.0, 1958, NULL, NULL, 707300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12412, rue Odette-Oligny', 'Ahuntsic-Cartierville', 'Montréal', 45.53236, -73.723238, 76.0, 1987, NULL, NULL, 217267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10631, rue Andre-Jobin', 'Ahuntsic-Cartierville', 'Montréal', 45.578349, -73.651627, NULL, NULL, NULL, NULL, 1000700.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10515, rue Andre-Jobin', 'Ahuntsic-Cartierville', 'Montréal', 45.577706, -73.65005, NULL, NULL, NULL, NULL, 526100.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8910, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.549786, -73.640952, 297.0, 1959, NULL, NULL, 975000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11440, rue Drouart', 'Ahuntsic-Cartierville', 'Montréal', 45.536062, -73.687338, 410.0, 1962, NULL, NULL, 649367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1264, rue Etienne-Blanchard', 'Ahuntsic-Cartierville', 'Montréal', 45.556109, -73.633267, 61.0, 1983, NULL, NULL, 283800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11871, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.529882, -73.705448, NULL, NULL, NULL, NULL, 398700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10465, rue Andre-Jobin', 'Ahuntsic-Cartierville', 'Montréal', 45.577322, -73.649149, NULL, NULL, NULL, NULL, 542800.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10345, rue Tolhurst', 'Ahuntsic-Cartierville', 'Montréal', 45.544757, -73.668153, 342.0, 1949, NULL, NULL, 878500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7524, rue de Villebon', 'Ahuntsic-Cartierville', 'Montréal', 45.52414, -73.734085, 443.0, 1958, NULL, NULL, 450900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10349, avenue Vianney', 'Ahuntsic-Cartierville', 'Montréal', 45.578057, -73.64644, 301.0, 1955, NULL, NULL, 487400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10221, avenue Millen', 'Ahuntsic-Cartierville', 'Montréal', 45.554409, -73.660522, 302.0, 1958, NULL, NULL, 904800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11460, rue Drouart', 'Ahuntsic-Cartierville', 'Montréal', 45.536238, -73.687671, 410.0, 1962, NULL, NULL, 675933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1925, rue Olivier-Berthelet', 'Ahuntsic-Cartierville', 'Montréal', 45.533655, -73.67115, 163.0, 2001, NULL, NULL, 647000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2330, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.542294, -73.704688, 703.0, 1946, NULL, NULL, 627700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8513, avenue Andre-Grasset', 'Ahuntsic-Cartierville', 'Montréal', 45.554877, -73.62861, 417.0, 1984, NULL, NULL, 855900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9775, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.568132, -73.64521, 254.0, 1957, NULL, NULL, 511700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10331, avenue Vianney', 'Ahuntsic-Cartierville', 'Montréal', 45.577605, -73.646421, 247.0, 1964, NULL, NULL, 442000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8651, rue Joseph-Quintal', 'Ahuntsic-Cartierville', 'Montréal', 45.554032, -73.629877, 88.0, NULL, NULL, NULL, 360467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10535, rue Verville', 'Ahuntsic-Cartierville', 'Montréal', 45.544537, -73.671769, 335.0, 1953, NULL, NULL, 648500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6993, place de Nevers', 'Ahuntsic-Cartierville', 'Montréal', 45.526376, -73.729905, 469.0, 1954, NULL, NULL, 511600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12087, place Deschamps', 'Ahuntsic-Cartierville', 'Montréal', 45.545315, -73.695549, 296.0, 1957, NULL, NULL, 457600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8642, rue Joseph-Quintal', 'Ahuntsic-Cartierville', 'Montréal', 45.553974, -73.629768, 94.0, 1986, NULL, NULL, 329067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10525, rue Waverly', 'Ahuntsic-Cartierville', 'Montréal', 45.547625, -73.669923, 277.0, 1949, NULL, NULL, 679800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8764, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.548817, -73.637598, 428.0, 1950, NULL, NULL, 954200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10265, avenue Larose', 'Ahuntsic-Cartierville', 'Montréal', 45.578034, -73.644209, 465.0, 1948, NULL, NULL, 594800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8954, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.54999, -73.641703, 331.0, 1950, NULL, NULL, 893400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12082, rue Lachapelle', 'Ahuntsic-Cartierville', 'Montréal', 45.527946, -73.71713, 532.0, 1982, NULL, NULL, 1077800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8681, rue Joseph-Quintal', 'Ahuntsic-Cartierville', 'Montréal', 45.55426, -73.630417, 98.0, 1986, NULL, NULL, 402067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1576, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.544465, -73.701052, 856.0, 1862, NULL, NULL, 593467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8741, rue Basile-Routhier', 'Ahuntsic-Cartierville', 'Montréal', 45.547311, -73.638284, 145.0, 1942, NULL, NULL, 432000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10396, boulevard Olympia', 'Ahuntsic-Cartierville', 'Montréal', 45.562201, -73.658931, 437.0, 1943, NULL, NULL, 881667.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9162, boulevard Saint-Laurent', 'Ahuntsic-Cartierville', 'Montréal', 45.543698, -73.649384, 1139.0, 1938, NULL, NULL, 1151467.0, 2024, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10809, avenue de l''Esplanade', 'Ahuntsic-Cartierville', 'Montréal', 45.548428, -73.67495, 390.0, 1949, NULL, NULL, 1016667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10225, avenue Larose', 'Ahuntsic-Cartierville', 'Montréal', 45.577911, -73.643859, 465.0, 1981, NULL, NULL, 1202900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10415, avenue Curotte', 'Ahuntsic-Cartierville', 'Montréal', 45.563894, -73.657816, 317.0, 1951, NULL, NULL, 781500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11660, rue Tanguay', 'Ahuntsic-Cartierville', 'Montréal', 45.54686, -73.682797, 404.0, 1957, NULL, NULL, 932267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12082, rue James-Morrice', 'Ahuntsic-Cartierville', 'Montréal', 45.539324, -73.70081, 276.0, 1961, NULL, NULL, 693167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8880, rue Lajeunesse', 'Ahuntsic-Cartierville', 'Montréal', 45.547321, -73.641694, 210.0, 1932, NULL, NULL, 476200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11360, rue de Saint-Real', 'Ahuntsic-Cartierville', 'Montréal', 45.539912, -73.683683, 174.0, 1963, NULL, NULL, 378633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10861, rue Clark', 'Ahuntsic-Cartierville', 'Montréal', 45.550426, -73.674123, 346.0, 1949, NULL, NULL, 538000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8765, rue Basile-Routhier', 'Ahuntsic-Cartierville', 'Montréal', 45.547428, -73.638709, 338.0, 1944, NULL, NULL, 590400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11275, avenue du Bois-de-Boulogne', 'Ahuntsic-Cartierville', 'Montréal', 45.53945, -73.682884, 348.0, 1960, NULL, NULL, 436700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2206, boulevard Henri-Bourassa Est', 'Ahuntsic-Cartierville', 'Montréal', 45.57499, -73.655414, NULL, NULL, NULL, NULL, 562200.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10425, avenue Curotte', 'Ahuntsic-Cartierville', 'Montréal', 45.56396, -73.657976, 317.0, 1951, NULL, NULL, 698900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9755, avenue Vianney', 'Ahuntsic-Cartierville', 'Montréal', 45.574974, -73.639007, 359.0, 1962, NULL, NULL, 618000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8974, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.550145, -73.642241, 328.0, 1950, NULL, NULL, 786500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10375, rue Tolhurst', 'Ahuntsic-Cartierville', 'Montréal', 45.544885, -73.66856, 427.0, 1950, NULL, NULL, 1156000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10465, rue Verville', 'Ahuntsic-Cartierville', 'Montréal', 45.544132, -73.670478, 335.0, 1954, NULL, NULL, 583000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10340, boulevard Olympia', 'Ahuntsic-Cartierville', 'Montréal', 45.561888, -73.657856, 437.0, 1953, NULL, NULL, 911867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8900, rue Lajeunesse', 'Ahuntsic-Cartierville', 'Montréal', 45.547507, -73.642231, 217.0, 1926, NULL, NULL, 293100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9843, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.568605, -73.646348, 367.0, 1966, NULL, NULL, 733833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8962, rue Lajeunesse', 'Ahuntsic-Cartierville', 'Montréal', 45.547856, -73.643486, 213.0, 1930, NULL, NULL, 488600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12060, rue Lachapelle', 'Ahuntsic-Cartierville', 'Montréal', 45.527598, -73.716562, 613.0, NULL, NULL, NULL, 750800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12057, rue Deschamps', 'Ahuntsic-Cartierville', 'Montréal', 45.545031, -73.69466, 296.0, 1957, NULL, NULL, 450700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1630, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.544087, -73.701671, 603.0, 1910, NULL, NULL, 169187.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12267, rue Cousineau', 'Ahuntsic-Cartierville', 'Montréal', 45.528774, -73.723358, 190.0, 1998, NULL, NULL, 525000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9960, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.568664, -73.647582, 195.0, 1963, NULL, NULL, 515900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11860, rue Zotique-Racicot', 'Ahuntsic-Cartierville', 'Montréal', 45.543147, -73.690049, 534.0, 1959, NULL, NULL, 503833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9875, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.568756, -73.646653, 390.0, 1969, NULL, NULL, 836633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10130, rue Parthenais', 'Ahuntsic-Cartierville', 'Montréal', 45.571316, -73.647797, 422.0, 1951, NULL, NULL, 858200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10235, avenue Larose', 'Ahuntsic-Cartierville', 'Montréal', 45.577976, -73.644047, 465.0, 1954, NULL, NULL, 603700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1710, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.54369, -73.702363, 458.0, 1911, NULL, NULL, 336033.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11450, rue Drouart', 'Ahuntsic-Cartierville', 'Montréal', 45.536155, -73.687511, 410.0, 1962, NULL, NULL, 668633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10910, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.546536, -73.677304, 254.0, 1956, NULL, NULL, 575833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10756, rue Clark', 'Ahuntsic-Cartierville', 'Montréal', 45.549617, -73.672694, 296.0, 1965, NULL, NULL, 899933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11295, avenue du Bois-de-Boulogne', 'Ahuntsic-Cartierville', 'Montréal', 45.5395, -73.683057, 348.0, 1961, NULL, NULL, 384800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10325, avenue Vianney', 'Ahuntsic-Cartierville', 'Montréal', 45.577934, -73.646144, 227.0, 1959, NULL, NULL, 434000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10792, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.546007, -73.67557, 348.0, 1951, NULL, NULL, 599367.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3220, avenue Louis-Dantin', 'Ahuntsic-Cartierville', 'Montréal', 45.538703, -73.704184, 395.0, 1962, NULL, NULL, 650500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1642, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.543966, -73.701851, 857.0, 1934, NULL, NULL, 210349.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10837, rue Clark', 'Ahuntsic-Cartierville', 'Montréal', 45.55029, -73.673691, 346.0, 1949, NULL, NULL, 597633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12065, rue Deschamps', 'Ahuntsic-Cartierville', 'Montréal', 45.545105, -73.694858, 296.0, 1957, NULL, NULL, 451100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10780, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.545957, -73.675354, 352.0, 1951, NULL, NULL, 688400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12069, rue Deschamps', 'Ahuntsic-Cartierville', 'Montréal', 45.545137, -73.694962, 429.0, 1957, NULL, NULL, 519767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11829, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.529207, -73.704383, NULL, NULL, NULL, NULL, 371900.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1605, rue Louis-Carrier', 'Ahuntsic-Cartierville', 'Montréal', 45.536164, -73.678208, 40.0, NULL, NULL, NULL, 13533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10388, boulevard Olympia', 'Ahuntsic-Cartierville', 'Montréal', 45.562165, -73.658726, 437.0, 1953, NULL, NULL, 1360867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11782, rue de Meulles', 'Ahuntsic-Cartierville', 'Montréal', 45.525877, -73.705282, 330.0, 1959, NULL, NULL, 446533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1608, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.544257, -73.701392, 426.0, 1910, NULL, NULL, 396567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10535, rue Waverly', 'Ahuntsic-Cartierville', 'Montréal', 45.547682, -73.670045, 288.0, 2000, NULL, NULL, 840633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2015, avenue Etienne-Brule', 'Ahuntsic-Cartierville', 'Montréal', 45.573305, -73.660717, NULL, NULL, NULL, NULL, 493233.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11057, rue Frigon', 'Ahuntsic-Cartierville', 'Montréal', 45.534106, -73.684188, 305.0, 1961, NULL, NULL, 709467.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12444, rue Odette-Oligny', 'Ahuntsic-Cartierville', 'Montréal', 45.532145, -73.723522, 104.0, 1987, NULL, NULL, 308500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3060, avenue Louis-Dantin', 'Ahuntsic-Cartierville', 'Montréal', 45.538927, -73.703959, 395.0, 1960, NULL, NULL, 732100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11640, rue Tanguay', 'Ahuntsic-Cartierville', 'Montréal', 45.546802, -73.682595, 404.0, 1959, NULL, NULL, 894167.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8988, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.550837, -73.641791, 302.0, 1948, NULL, NULL, 454500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10540, rue de la Roche', 'Ahuntsic-Cartierville', 'Montréal', 45.560032, -73.662459, 465.0, 1944, NULL, NULL, 925467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10635, avenue Saint-Charles', 'Ahuntsic-Cartierville', 'Montréal', 45.559488, -73.664852, 232.0, 1931, NULL, NULL, 432200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8750, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.548759, -73.637407, 300.0, 1945, NULL, NULL, 808700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8783, rue Basile-Routhier', 'Ahuntsic-Cartierville', 'Montréal', 45.547511, -73.638952, 226.0, 1934, NULL, NULL, 579900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10, avenue de l''Alliance', 'Ahuntsic-Cartierville', 'Montréal', 45.511083, -73.753593, 794.0, 1999, NULL, NULL, 808433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10395, avenue Curotte', 'Ahuntsic-Cartierville', 'Montréal', 45.563822, -73.657531, 423.0, 1951, NULL, NULL, 898800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10770, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.545915, -73.6752, 348.0, 1951, NULL, NULL, 649100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10595, rue Verville', 'Ahuntsic-Cartierville', 'Montréal', 45.54476, -73.672535, 348.0, 1951, NULL, NULL, 617400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8892, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.550316, -73.639977, 242.0, 1946, NULL, NULL, 497167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10495, rue Verville', 'Ahuntsic-Cartierville', 'Montréal', 45.54425, -73.670843, 298.0, 1953, NULL, NULL, 665800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8914, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.550528, -73.640671, 350.0, 1932, NULL, NULL, 541667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12130, rue James-Morrice', 'Ahuntsic-Cartierville', 'Montréal', 45.540245, -73.701573, 283.0, 1961, NULL, NULL, 699433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8956, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.55071, -73.641329, 302.0, 1948, NULL, NULL, 490167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11386, rue de Saint-Real', 'Ahuntsic-Cartierville', 'Montréal', 45.540294, -73.683547, 348.0, 1925, NULL, NULL, 307100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11350, rue de Saint-Real', 'Ahuntsic-Cartierville', 'Montréal', 45.539886, -73.683621, 174.0, 1963, NULL, NULL, 375867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10631, avenue Saint-Charles', 'Ahuntsic-Cartierville', 'Montréal', 45.559463, -73.664756, 232.0, 1927, NULL, NULL, 455100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1266, rue Etienne-Blanchard', 'Ahuntsic-Cartierville', 'Montréal', 45.556109, -73.633267, 67.0, 1983, NULL, NULL, 293900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10335, rue Tolhurst', 'Ahuntsic-Cartierville', 'Montréal', 45.54473, -73.668059, 328.0, 1950, NULL, NULL, 1207300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10815, avenue de l''Esplanade', 'Ahuntsic-Cartierville', 'Montréal', 45.548499, -73.675216, 390.0, 1949, NULL, NULL, 877867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2280, boulevard Gouin Ouest', 'Ahuntsic-Cartierville', 'Montréal', 45.542404, -73.704147, 626.0, 1947, NULL, NULL, 672400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12452, rue Odette-Oligny', 'Ahuntsic-Cartierville', 'Montréal', 45.532512, -73.724101, 70.0, 1987, NULL, NULL, 214800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10320, rue Parthenais', 'Ahuntsic-Cartierville', 'Montréal', 45.572503, -73.650649, 279.0, 1952, NULL, NULL, 648433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8497, avenue Andre-Grasset', 'Ahuntsic-Cartierville', 'Montréal', 45.553756, -73.62724, 417.0, 1984, NULL, NULL, 855900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10641, avenue Saint-Charles', 'Ahuntsic-Cartierville', 'Montréal', 45.559512, -73.664938, 232.0, 1924, NULL, NULL, 490300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12320, rue Lachapelle', 'Ahuntsic-Cartierville', 'Montréal', 45.531022, -73.722396, 29.0, 2008, NULL, NULL, 260100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10760, rue Clark', 'Ahuntsic-Cartierville', 'Montréal', 45.549946, -73.672604, 159.0, 1953, NULL, NULL, 610867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8652, rue Joseph-Quintal', 'Ahuntsic-Cartierville', 'Montréal', 45.554032, -73.629877, 65.0, 1987, NULL, NULL, 283000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1871, rue Olivier-Berthelet', 'Ahuntsic-Cartierville', 'Montréal', 45.534116, -73.671096, 269.0, 2001, NULL, NULL, 895400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8930, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.550574, -73.64096, 372.0, 1958, NULL, NULL, 667633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9258, rue Lajeunesse', 'Ahuntsic-Cartierville', 'Montréal', 45.549082, -73.647757, 49.0, 1999, NULL, NULL, 271633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de la Roche', 'Ahuntsic-Cartierville', 'Montréal', 45.539463, -73.602833, NULL, NULL, NULL, NULL, 306800.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10283, avenue Larose', 'Ahuntsic-Cartierville', 'Montréal', 45.578204, -73.644576, 236.0, 1958, NULL, NULL, 707000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10850, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.546287, -73.67642, 335.0, 1953, NULL, NULL, 761400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9950, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.568635, -73.647514, 195.0, 1963, NULL, NULL, 494300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8972, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.550775, -73.641564, 302.0, 1948, NULL, NULL, 447133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11798, rue de Meulles', 'Ahuntsic-Cartierville', 'Montréal', 45.525609, -73.705954, 690.0, 1959, NULL, NULL, 739633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11430, rue Drouart', 'Ahuntsic-Cartierville', 'Montréal', 45.535971, -73.687172, 410.0, 1962, NULL, NULL, 688233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9295, rue Tolhurst', 'Ahuntsic-Cartierville', 'Montréal', 45.540153, -73.653354, 186.0, 1958, NULL, NULL, 683500.0, 2025, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11265, avenue du Bois-de-Boulogne', 'Ahuntsic-Cartierville', 'Montréal', 45.539373, -73.682675, 363.0, 1958, NULL, NULL, 426400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8465, avenue Andre-Grasset', 'Ahuntsic-Cartierville', 'Montréal', 45.554485, -73.627718, 417.0, 1985, NULL, NULL, 855500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11990, rue Pasteur', 'Ahuntsic-Cartierville', 'Montréal', 45.539487, -73.696491, 762.0, 1966, NULL, NULL, 2302267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1815, rue Olivier-Berthelet', 'Ahuntsic-Cartierville', 'Montréal', 45.534455, -73.671234, 159.0, 2001, NULL, NULL, 642900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12086, rue Lachapelle', 'Ahuntsic-Cartierville', 'Montréal', 45.528006, -73.717305, 533.0, NULL, NULL, NULL, 642700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12375, avenue de la Misericorde', 'Ahuntsic-Cartierville', 'Montréal', 45.534633, -73.719366, NULL, NULL, NULL, NULL, 691200.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10560, rue Francis', 'Ahuntsic-Cartierville', 'Montréal', 45.564869, -73.659876, 423.0, 1953, NULL, NULL, 681300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10271, avenue Larose', 'Ahuntsic-Cartierville', 'Montréal', 45.578107, -73.64433, 232.0, 1958, NULL, NULL, 564300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10665, rue d''Iberville', 'Ahuntsic-Cartierville', 'Montréal', 45.577804, -73.652471, 286.0, 1955, NULL, NULL, 573767.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10600, rue Francis', 'Ahuntsic-Cartierville', 'Montréal', 45.564961, -73.660202, 211.0, 1994, NULL, NULL, 803567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10370, boulevard Olympia', 'Ahuntsic-Cartierville', 'Montréal', 45.562046, -73.658382, 437.0, 1953, NULL, NULL, 954533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8847, rue Basile-Routhier', 'Ahuntsic-Cartierville', 'Montréal', 45.547905, -73.640283, 339.0, 1945, NULL, NULL, 598400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12480, rue Odette-Oligny', 'Ahuntsic-Cartierville', 'Montréal', 45.532085, -73.724105, 113.0, 1987, NULL, NULL, 316400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10760, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.545841, -73.67496, 348.0, 1951, NULL, NULL, 581633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6823, place de Nevers', 'Ahuntsic-Cartierville', 'Montréal', 45.526899, -73.728771, 386.0, 1954, NULL, NULL, 373700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10229, avenue Millen', 'Ahuntsic-Cartierville', 'Montréal', 45.554853, -73.66028, 302.0, 1958, NULL, NULL, 878933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10840, rue Jeanne-Mance', 'Ahuntsic-Cartierville', 'Montréal', 45.546228, -73.67627, 335.0, 1954, NULL, NULL, 467100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10382, boulevard Olympia', 'Ahuntsic-Cartierville', 'Montréal', 45.562135, -73.658594, 437.0, 1925, NULL, NULL, 902733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12173, avenue Jean-Bouillet', 'Ahuntsic-Cartierville', 'Montréal', 45.525547, -73.727099, 351.0, 1976, NULL, NULL, 622267.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8964, avenue de Chateaubriand', 'Ahuntsic-Cartierville', 'Montréal', 45.550365, -73.641694, 272.0, 1949, NULL, NULL, 827300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10950, avenue Saint-Charles', 'Ahuntsic-Cartierville', 'Montréal', 45.560774, -73.670342, 878.0, 1952, NULL, NULL, 1221100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10785, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.573768, -73.658574, 432.0, 1975, NULL, NULL, 791000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10315, rue Tolhurst', 'Ahuntsic-Cartierville', 'Montréal', 45.544622, -73.66766, 328.0, 1956, NULL, NULL, 821800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10435, avenue Curotte', 'Ahuntsic-Cartierville', 'Montréal', 45.563992, -73.65808, 317.0, 1951, NULL, NULL, 714400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8996, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.550873, -73.641906, 302.0, 1948, NULL, NULL, 493967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10355, avenue Larose', 'Ahuntsic-Cartierville', 'Montréal', 45.578872, -73.646168, 232.0, 1972, NULL, NULL, 691900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11915, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.530429, -73.706316, NULL, NULL, NULL, NULL, 470800.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8457, avenue Andre-Grasset', 'Ahuntsic-Cartierville', 'Montréal', 45.554434, -73.627597, 465.0, 1985, NULL, NULL, 904300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12142, rue James-Morrice', 'Ahuntsic-Cartierville', 'Montréal', 45.540387, -73.701799, 259.0, 1961, NULL, NULL, 637067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9835, rue de Saint-Firmin', 'Ahuntsic-Cartierville', 'Montréal', 45.568549, -73.646201, 219.0, 1956, NULL, NULL, 447267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10153, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.555868, -73.65799, 244.0, 1952, NULL, NULL, 942033.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2260, rue Cardinal', 'Le Sud-Ouest', 'Montréal', 45.460172, -73.595265, 59.0, 1924, NULL, NULL, 210500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('433, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478369, -73.554931, 278.0, 1928, NULL, NULL, 546600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1564, rue du Centre', 'Le Sud-Ouest', 'Montréal', 45.484837, -73.558618, 177.0, 1900, NULL, NULL, 757500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2220, rue Delisle', 'Le Sud-Ouest', 'Montréal', 45.485482, -73.573314, 172.0, 1982, NULL, NULL, 622300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2124, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.458208, -73.593437, 189.0, 1932, NULL, NULL, 466000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6646, rue d''Aragon', 'Le Sud-Ouest', 'Montréal', 45.451791, -73.596811, 303.0, 1953, NULL, NULL, 805400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6656, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.452201, -73.592896, 196.0, 1954, NULL, NULL, 681000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5096, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.469225, -73.591213, 130.0, 2016, NULL, NULL, 1230033.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6568, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.453371, -73.592694, 223.0, 1925, NULL, NULL, 606467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1888, rue Payette', 'Le Sud-Ouest', 'Montréal', 45.486868, -73.568381, 669.0, 1948, NULL, NULL, 752333.0, 2024, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('457, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478676, -73.554967, 178.0, 1913, NULL, NULL, 434600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('451, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478679, -73.554881, 179.0, 1915, NULL, NULL, 637000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6620, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.452769, -73.592646, 221.0, 1957, NULL, NULL, 603533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2050, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.458177, -73.592458, 266.0, 1915, NULL, NULL, 491500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2154, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.458527, -73.593802, 186.0, 1957, NULL, NULL, 447900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('503, rue Sainte-Marguerite', 'Le Sud-Ouest', 'Montréal', 45.475546, -73.586448, 17.0, 2011, NULL, NULL, 329433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('439, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478702, -73.554702, 178.0, 1915, NULL, NULL, 602900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5150, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.468858, -73.592003, 130.0, 2020, NULL, NULL, 1536933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5068, chemin de la Cote-Saint-Paul', 'Le Sud-Ouest', 'Montréal', 45.470344, -73.592923, 378.0, 2018, NULL, NULL, 3775200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2231, rue Workman', 'Le Sud-Ouest', 'Montréal', 45.485259, -73.573148, 171.0, 1982, NULL, NULL, 642100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2060, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.458189, -73.59262, 193.0, 1956, NULL, NULL, 508600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2555, rue Raudot', 'Le Sud-Ouest', 'Montréal', 45.448133, -73.593899, 260.0, 1955, NULL, NULL, 662200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1570, rue du Centre', 'Le Sud-Ouest', 'Montréal', 45.484741, -73.55876, 160.0, 1885, NULL, NULL, 739400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2374, rue Allard', 'Le Sud-Ouest', 'Montréal', 45.451089, -73.592849, 193.0, 1931, NULL, NULL, 721033.0, 2026, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2439, rue de Coleraine', 'Le Sud-Ouest', 'Montréal', 45.476275, -73.5634, 203.0, 1900, NULL, NULL, 1027200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6606, rue Hadley', 'Le Sud-Ouest', 'Montréal', 45.453318, -73.591824, 58.0, 2009, NULL, NULL, 249200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1165, rue Wellington', 'Le Sud-Ouest', 'Montréal', 45.492518, -73.558455, 10.0, 2017, NULL, NULL, 337200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2425, rue de Coleraine', 'Le Sud-Ouest', 'Montréal', 45.476392, -73.563291, 189.0, 1900, NULL, NULL, 548567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1780, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.457747, -73.587865, 205.0, 1952, NULL, NULL, 540200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1756, rue Galt', 'Le Sud-Ouest', 'Montréal', 45.462677, -73.58777, 169.0, 1910, NULL, NULL, 95165.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1010, rue William', 'Le Sud-Ouest', 'Montréal', 45.495605, -73.560498, 10.0, 2012, NULL, NULL, 233933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5594, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.46211, -73.587813, 193.0, 1923, NULL, NULL, 854900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6634, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.452612, -73.592585, 223.0, 1964, NULL, NULL, 877267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2601, rue Jolicoeur', 'Le Sud-Ouest', 'Montréal', 45.456598, -73.597864, 62.0, 2009, NULL, NULL, 352900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6155, rue Hamilton', 'Le Sud-Ouest', 'Montréal', 45.456598, -73.597864, 53.0, 2009, NULL, NULL, 326400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue des Seigneurs', 'Le Sud-Ouest', 'Montréal', 45.486215, -73.56632, NULL, NULL, NULL, NULL, 155700.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('481, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478672, -73.555564, 225.0, 1900, NULL, NULL, 568700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Saint-Charles', 'Le Sud-Ouest', 'Montréal', 45.479667, -73.569044, NULL, NULL, NULL, NULL, 383000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6560, rue d''Aragon', 'Le Sud-Ouest', 'Montréal', 45.452558, -73.597103, 412.0, 1931, NULL, NULL, 828500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5588, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.462205, -73.588194, 193.0, 1900, NULL, NULL, 159000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6542, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.453681, -73.592788, 223.0, NULL, NULL, NULL, 218733.0, 2024, 'Autres immeubles résidentiels', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1722, rue du Centre', 'Le Sud-Ouest', 'Montréal', 45.483394, -73.560865, 431.0, 1985, NULL, NULL, 765700.0, 2022, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5562, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.462445, -73.587755, 92.0, 1985, NULL, NULL, 362500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5040, chemin de la Cote-Saint-Paul', 'Le Sud-Ouest', 'Montréal', 45.470742, -73.592832, 256.0, 2021, NULL, NULL, 1385633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('238, rue Bourget', 'Le Sud-Ouest', 'Montréal', 45.478726, -73.580317, 119.0, 1910, NULL, NULL, 392100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('485, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478673, -73.555663, 222.0, 1900, NULL, NULL, 516400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2136, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.458215, -73.59363, 195.0, 1931, NULL, NULL, 479700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1706, rue du Centre', 'Le Sud-Ouest', 'Montréal', 45.48352, -73.560648, 342.0, 1985, NULL, NULL, 765700.0, 2022, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5048, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.469556, -73.590399, 130.0, 1900, NULL, NULL, 425800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2130, rue Wellington', 'Le Sud-Ouest', 'Montréal', 45.47742, -73.558957, 2647.0, 1971, NULL, NULL, 9541167.0, 2024, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6646, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.452399, -73.592973, 191.0, 1960, NULL, NULL, 769600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5082, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.469301, -73.591003, 130.0, 1900, NULL, NULL, 563000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5120, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.46907, -73.591621, 130.0, 1915, NULL, NULL, 760067.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5020, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.469694, -73.589963, 130.0, 1890, NULL, NULL, 361467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1682, rue Galt', 'Le Sud-Ouest', 'Montréal', 45.462593, -73.586516, 382.0, 1963, NULL, NULL, 977067.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('400, rue de l''Inspecteur', 'Le Sud-Ouest', 'Montréal', 45.496682, -73.561525, 12.0, 2008, NULL, NULL, 346533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6550, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.453598, -73.592831, 230.0, 1945, NULL, NULL, 659267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de la Commune Ouest', 'Le Sud-Ouest', 'Montréal', 45.504352, -73.553574, NULL, NULL, NULL, NULL, 3518400.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2696, rue de Coleraine', 'Le Sud-Ouest', 'Montréal', 45.474508, -73.564607, 153.0, 1900, NULL, NULL, 1000400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6700, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.45211, -73.592375, 379.0, 1949, NULL, NULL, 1029500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1750, rue Galt', 'Le Sud-Ouest', 'Montréal', 45.462671, -73.58764, 220.0, 1900, NULL, NULL, 820667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6602, rue d''Aragon', 'Le Sud-Ouest', 'Montréal', 45.452063, -73.596919, 203.0, 1925, NULL, NULL, 468300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1110, Jardin', 'Le Sud-Ouest', 'Montréal', 45.481585, -73.562203, 88.0, 1885, NULL, NULL, 467100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2352, rue Saint-Charles', 'Le Sud-Ouest', 'Montréal', 45.48055, -73.567195, 198.0, 1986, NULL, NULL, 584533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5124, rue Sainte-Marie', 'Le Sud-Ouest', 'Montréal', 45.46903, -73.591671, 130.0, 1910, NULL, NULL, 528133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1702, rue Galt', 'Le Sud-Ouest', 'Montréal', 45.462585, -73.586831, 308.0, 1928, NULL, NULL, 913867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('465, avenue Ash', 'Le Sud-Ouest', 'Montréal', 45.478671, -73.555141, 178.0, 1900, NULL, NULL, 484800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('185, avenue du Seminaire', 'Le Sud-Ouest', 'Montréal', NULL, NULL, NULL, NULL, NULL, NULL, 492900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5540, rue Saint-Patrick', 'Le Sud-Ouest', 'Montréal', 45.463161, -73.594994, 17.0, 2009, NULL, NULL, 109100.0, 2024, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6562, rue Briand', 'Le Sud-Ouest', 'Montréal', 45.453416, -73.592873, 223.0, 1986, NULL, NULL, 753700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('857, rue Desnoyers', 'Le Sud-Ouest', 'Montréal', 45.474582, -73.59466, 136.0, 1915, NULL, NULL, 847200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5564, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.462445, -73.587755, 94.0, 1985, NULL, NULL, 295900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6554, rue d''Aragon', 'Le Sud-Ouest', 'Montréal', 45.452528, -73.597542, 208.0, 1957, NULL, NULL, 762300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1655, rue Saint-Patrick', 'Le Sud-Ouest', 'Montréal', 45.485824, -73.562839, 96.0, 2000, NULL, NULL, 500900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2148, rue de Maricourt', 'Le Sud-Ouest', 'Montréal', 45.458523, -73.593695, 186.0, 1959, NULL, NULL, 495500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

