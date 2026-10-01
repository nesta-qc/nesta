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
-- Fichier 3e/3a/3b/3c/3d/3e/3f/3g — 450 lignes.
-- ============================================================

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('673, rue Radisson', 'LaSalle', 'Montréal', 45.427298, -73.638724, 197.0, 1965, NULL, NULL, 442200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('656, 12e Avenue', 'LaSalle', 'Montréal', 45.441405, -73.674682, NULL, NULL, NULL, NULL, 653533.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('404, rue Comte', 'LaSalle', 'Montréal', 45.43104, -73.642321, 517.0, 1984, NULL, NULL, 1105600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7753, rue Anita', 'LaSalle', 'Montréal', 45.436608, -73.619137, 291.0, 1973, NULL, NULL, 761567.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('569, 14e Avenue', 'LaSalle', 'Montréal', 45.425719, -73.603519, NULL, NULL, NULL, NULL, 638667.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('201, terrasse Ouellette', 'LaSalle', 'Montréal', 45.417861, -73.637509, 745.0, 2013, NULL, NULL, 1586767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1635, rue Beique', 'LaSalle', 'Montréal', 45.427624, -73.630238, NULL, NULL, NULL, NULL, 845867.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2018, rue Hebert', 'LaSalle', 'Montréal', 45.435591, -73.614091, NULL, NULL, NULL, NULL, 380000.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('149, rue Gravel', 'LaSalle', 'Montréal', 45.433391, -73.643244, 279.0, 1988, NULL, NULL, 403700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('620, avenue Gerald', 'LaSalle', 'Montréal', 45.436476, -73.596599, NULL, NULL, NULL, NULL, 617433.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7640, rue Anita', 'LaSalle', 'Montréal', 45.437731, -73.620098, 224.0, 1970, NULL, NULL, 632267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('544, 80e Avenue', 'LaSalle', 'Montréal', 45.420987, -73.635601, NULL, NULL, NULL, NULL, 575967.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('597, 16e Avenue', 'LaSalle', 'Montréal', 45.424738, -73.604715, NULL, NULL, NULL, NULL, 672033.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7, 8e Avenue', 'LaSalle', 'Montréal', 45.428564, -73.594958, NULL, NULL, NULL, NULL, 750000.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('377, avenue Paquin', 'LaSalle', 'Montréal', 45.419803, -73.638467, 319.0, 1966, NULL, NULL, 729900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2057, rue de Chambly', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.546137, -73.545452, 229.0, 1910, NULL, NULL, 833300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2009, place Arthur-Buies', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.592146, -73.516486, 330.0, 1961, NULL, NULL, 412800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6475, avenue Guillaume-Couture', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.586085, -73.558395, 261.0, 1965, NULL, NULL, 841433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4404, rue du Quesne', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.577965, -73.548396, 111.0, 1994, NULL, NULL, 292767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1483, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.539714, -73.542489, NULL, NULL, NULL, NULL, 2911533.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3045, boulevard de l''Assomption', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.56954, -73.54624, 10.0, 2023, NULL, NULL, 320100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3080, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578705, -73.541523, 240.0, 1964, NULL, NULL, 655500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8364, rue Sainte-Claire', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.598847, -73.525943, 435.0, 1929, NULL, NULL, 300933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5900, rue Claude-Masson', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.613403, -73.53948, 168.0, 2012, NULL, NULL, 580200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1426, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554547, -73.532325, 133.0, 1910, NULL, NULL, 456867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9591, rue Notre-Dame Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.609696, -73.511352, 72.0, 2010, NULL, NULL, 200733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2723, rue Aubry', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.608538, -73.51882, 121.0, 1999, NULL, NULL, 321433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2715, rue Aubry', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.608538, -73.51882, 116.0, 1999, NULL, NULL, 315733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3026, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578388, -73.540571, 242.0, 1965, NULL, NULL, 721800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.543433, -73.555449, NULL, NULL, NULL, NULL, 266100.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2126, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.541417, -73.549304, NULL, NULL, NULL, NULL, 400000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, boulevard Rosemont', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.538582, -73.592376, NULL, NULL, NULL, NULL, 107167.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2017, place Arthur-Buies', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.592228, -73.516764, 330.0, 1961, NULL, NULL, 432000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.655898, -73.509788, NULL, NULL, NULL, NULL, 48000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5540, rue des Ormeaux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.607395, -73.539403, 485.0, 1981, NULL, NULL, 1072000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1460, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554716, -73.532836, 145.0, 1910, NULL, NULL, 468300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9583, rue Notre-Dame Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.609696, -73.511352, 61.0, 2010, NULL, NULL, 172767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1409, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.539428, -73.541577, NULL, NULL, NULL, NULL, 921233.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3075, rue Paul-Pau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.607573, -73.524719, 299.0, 1962, NULL, NULL, 716033.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3160, avenue Hector', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612012, -73.523939, 73.0, 1994, NULL, NULL, 283333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6515, avenue Alexis-Contant', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.585953, -73.556593, 268.0, 1963, NULL, NULL, 608833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6675, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.582268, -73.538985, 832.0, 1970, NULL, NULL, 432053.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1442, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554637, -73.532607, 131.0, 1910, NULL, NULL, 381533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3563, rue La Fontaine', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.54424, -73.543263, 378.0, 1928, NULL, NULL, 1211000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9490, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.611165, -73.52612, 217.0, 1986, NULL, NULL, 466433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6625, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.581545, -73.539481, 228.0, 1963, NULL, NULL, 278740.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2121, rue Desmarteau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603891, -73.513254, 446.0, 1952, NULL, NULL, 552467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3521, rue La Fontaine', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.54392, -73.543568, 207.0, 1930, NULL, NULL, 1580133.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1466, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554782, -73.532993, 169.0, 1922, NULL, NULL, 863267.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3020, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578349, -73.540448, 347.0, 1965, NULL, NULL, 1261300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3211, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573679, -73.546623, NULL, NULL, NULL, NULL, 426700.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3050, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578534, -73.540999, 242.0, 1965, NULL, NULL, 670500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1437, rue Lepailleur', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.587, -73.510224, 314.0, 1962, NULL, NULL, 347200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3597, rue La Fontaine', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.544687, -73.543012, 236.0, 1910, NULL, NULL, 630133.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2735, avenue Gonthier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612037, -73.517314, 354.0, 1985, NULL, NULL, 515200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2069, rue Aylwin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.544819, -73.54656, 199.0, 1900, NULL, NULL, 606467.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6951, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.583886, -73.533248, 55.0, 2001, NULL, NULL, 195600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1468, rue Saint-Germain', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.540058, -73.541963, 116.0, 1885, NULL, NULL, 672200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9465, rue de Grosbois', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612116, -73.530527, 67.0, 2010, NULL, NULL, 198000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3193, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573582, -73.546298, NULL, NULL, NULL, NULL, 546000.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6481, avenue Chouinard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.584912, -73.55412, 335.0, 1961, NULL, NULL, 782400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8805, rue Sainte-Claire', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603884, -73.523519, 358.0, 1955, NULL, NULL, 432733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8400, rue Hochelaga', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.597946, -73.521643, 190.0, NULL, NULL, NULL, 306133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1840, rue Lepailleur', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.58805, -73.514678, 331.0, NULL, NULL, NULL, 463700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5390, rue des Ormeaux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.606779, -73.538024, 471.0, 1981, NULL, NULL, 1057600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2421, avenue Bourbonniere', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.550033, -73.548911, NULL, NULL, NULL, NULL, 567000.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5155, rue Baldwin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.604742, -73.535551, 704.0, 1946, NULL, NULL, 496600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1523, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.539874, -73.543079, NULL, NULL, NULL, NULL, 671233.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8338, rue Hochelaga', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.597597, -73.522487, 176.0, 1927, NULL, NULL, 99187.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6491, avenue Chouinard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.584986, -73.554064, 293.0, 1962, NULL, NULL, 782400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('566, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554113, -73.531019, 279.0, NULL, NULL, NULL, 1123767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3074, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578669, -73.541415, 242.0, 1964, NULL, NULL, 700500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3520, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.547331, -73.554942, 525.0, 1931, NULL, NULL, 11638.0, 2022, 'Maison de chambres et pension', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5900, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.575984, -73.546798, 1484.0, 2002, NULL, NULL, 750000.0, 2021, 'Restaurant et établissement avec service restreint ( commande au comptoir ou par téléphone)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3131, rue Paul-Pau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.607488, -73.525584, 286.0, 1961, NULL, NULL, 638267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2641, place Lepailleur', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.592503, -73.526505, 669.0, 1954, NULL, NULL, 462067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8554, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.601425, -73.526889, 251.0, 1957, NULL, NULL, 737867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3039, avenue Mercier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.600856, -73.528302, 395.0, 1988, NULL, NULL, 1123267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('571, rue Lepailleur', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.586675, -73.509122, 220.0, 1985, NULL, NULL, 391600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('353, rue Desmarteau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603365, -73.5116, 247.0, 1958, NULL, NULL, 388933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2771, avenue Gonthier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612095, -73.517852, 367.0, 1983, NULL, NULL, 297967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7826, rue Chenier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.600113, -73.542844, NULL, NULL, NULL, NULL, 566833.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3684, rue de Rouen', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.547127, -73.547487, 39.0, 1927, NULL, NULL, 264000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2815, rue Saint-Emile', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.597616, -73.52603, 425.0, 1954, NULL, NULL, 669200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('544, rue Theodore', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.555456, -73.529863, NULL, NULL, NULL, NULL, 321800.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8562, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.601505, -73.526843, 251.0, 1957, NULL, NULL, 661800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6957, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.583886, -73.533248, 71.0, 2001, NULL, NULL, 217800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3209, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573642, -73.546449, NULL, NULL, NULL, NULL, 509733.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2801, avenue Gonthier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612155, -73.518197, 435.0, 1983, NULL, NULL, 300167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1403, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.539369, -73.541412, NULL, NULL, NULL, NULL, 101750.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2016, rue Joliette', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.544945, -73.545634, 201.0, 1923, NULL, NULL, 674000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2560, rue Bossuet', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.572567, -73.537566, 7.0, 2018, NULL, NULL, 269800.0, 2025, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1531, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.539906, -73.543186, NULL, NULL, NULL, NULL, 1186300.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1436, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.554607, -73.532503, 145.0, 1910, NULL, NULL, 503067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9473, rue Jean-Pierre-Ronfard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.613053, -73.53567, 38.0, 2010, NULL, NULL, 138200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('594, rue Mousseau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.600299, -73.513721, 209.0, 1951, NULL, NULL, 448067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2781, avenue Gonthier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612112, -73.517941, 351.0, 1983, NULL, NULL, 316500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2385, avenue Bourbonniere', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.549899, -73.548559, NULL, NULL, NULL, NULL, 848500.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('363, rue Desmarteau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603418, -73.511784, 238.0, 1959, NULL, NULL, 404933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9469, rue Jean-Pierre-Ronfard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.613053, -73.53567, 58.0, 2010, NULL, NULL, 186367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('381, rue Desmarteau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603475, -73.511971, 505.0, 1910, NULL, NULL, 512467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6410, avenue Rodolphe-Mathieu', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.586019, -73.560397, 292.0, 1966, NULL, NULL, 814567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2048, rue Moreau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.53975, -73.54934, 112.0, 1900, NULL, NULL, 502233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.599582, -73.523378, NULL, NULL, NULL, NULL, 80933.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3355, place de Lery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.54128, -73.557749, NULL, NULL, NULL, NULL, 637633.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2741, avenue Gonthier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.611675, -73.517504, 588.0, NULL, NULL, NULL, 415367.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1614, rue Sicard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.555078, -73.533985, 163.0, 1935, NULL, NULL, 752967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6420, avenue Ernest-Lavigne', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.585793, -73.558959, 279.0, 1966, NULL, NULL, 853733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5395, rue Gabriele-Frascadore', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612825, -73.534436, 118.0, 2014, NULL, NULL, 343500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3411, rue Ontario Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.543088, -73.545812, 168.0, 1925, NULL, NULL, 333960.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('586, rue Mousseau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.600253, -73.513545, 209.0, 1942, NULL, NULL, 357433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9635, rue Sainte-Claire', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.611805, -73.519313, 342.0, 1960, NULL, NULL, 480533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4605, rue Saint-Donat', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.601676, -73.534029, 426.0, 1958, NULL, NULL, 550133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, boulevard de l''Assomption', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.572987, -73.55875, NULL, NULL, NULL, NULL, 19200.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2119, rue Prefontaine', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.540929, -73.54932, NULL, NULL, NULL, NULL, 331500.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2860, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578314, -73.539163, 226.0, 1963, NULL, NULL, 638300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6625, place Beaubien', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.584202, -73.564659, 191.0, 1986, NULL, NULL, 431200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2045, rue de Chambly', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.546098, -73.545296, 232.0, 1910, NULL, NULL, 838200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6316, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578224, -73.539573, 226.0, 1964, NULL, NULL, 679400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5980, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.576466, -73.546604, 202.0, 1953, NULL, NULL, 202442.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5968, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.576374, -73.546666, 380.0, 1963, NULL, NULL, 750000.0, 2021, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2363, avenue Bourbonniere', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.549843, -73.548354, NULL, NULL, NULL, NULL, 434900.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5410, rue des Ormeaux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.606829, -73.538144, 518.0, 1981, NULL, NULL, 1089600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5370, rue des Ormeaux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.60666, -73.537755, 467.0, 1981, NULL, NULL, 1062700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8446, rue Hochelaga', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.598288, -73.521421, 197.0, 1948, NULL, NULL, 477000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2142, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.541466, -73.549496, NULL, NULL, NULL, NULL, 630000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2930, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.540589, -73.558545, 301.0, 1951, NULL, NULL, 654200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9467, rue de Grosbois', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612116, -73.530527, 86.0, 2010, NULL, NULL, 233000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5146, rue Pierre-Tetreault', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.605247, -73.53572, NULL, NULL, NULL, NULL, 390500.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3100, rue Guillaume-Lahaise', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.590575, -73.535406, 54.0, 2010, NULL, NULL, 368833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3425, rue Ontario Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.543388, -73.546074, 256.0, 1925, NULL, NULL, 379080.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9697, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.61218, -73.516911, 238.0, 1961, NULL, NULL, 545300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6505, avenue Alexis-Contant', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.585845, -73.556668, 268.0, 1963, NULL, NULL, 611767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5960, rue Sherbrooke Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.576278, -73.54673, 247.0, 1958, NULL, NULL, 201020.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1471, rue Lepailleur', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.587216, -73.51091, 595.0, 1915, NULL, NULL, 605767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2325, avenue Bourbonniere', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.549665, -73.547792, NULL, NULL, NULL, NULL, 388200.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3575, rue La Fontaine', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.544448, -73.543102, 200.0, 1960, NULL, NULL, 321693.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3155, avenue Parkville', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.583405, -73.541139, 18.0, 2023, NULL, NULL, 472767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3285, rue Saint-Donat', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.600958, -73.531631, 334.0, 1957, NULL, NULL, 507667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3163, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573422, -73.545901, NULL, NULL, NULL, NULL, 343633.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9483, rue de Grosbois', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.61217, -73.53111, 89.0, 2010, NULL, NULL, 241000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3255, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573835, -73.547103, NULL, NULL, NULL, NULL, 650700.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9485, rue Jean-Pierre-Ronfard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.613053, -73.53567, 62.0, 2010, NULL, NULL, 214700.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3682, rue de Rouen', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.547127, -73.547487, 39.0, 1927, NULL, NULL, 256600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4243, rue Saint-Donat', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.601577, -73.533697, 423.0, 1964, NULL, NULL, 561100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3385, place de Lery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.541117, -73.558132, NULL, NULL, NULL, NULL, 709433.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2155, rue Desmarteau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.603973, -73.513498, 223.0, 1958, NULL, NULL, 468267.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9710, rue Sainte-Claire', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612468, -73.518427, 341.0, 1962, NULL, NULL, 396600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1517, rue Dezery', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.539845, -73.542985, NULL, NULL, NULL, NULL, 760733.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2037, avenue Aird', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.556093, -73.538637, 3.0, 1910, NULL, NULL, 328800.0, 2025, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5154, rue Pierre-Tetreault', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.605288, -73.535861, NULL, NULL, NULL, NULL, 456633.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3637, rue Ontario Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.545623, -73.544729, 176.0, 1946, NULL, NULL, 305053.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1463, rue Lepailleur', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.587123, -73.510643, 297.0, 1925, NULL, NULL, 300333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9479, rue de Grosbois', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.61217, -73.53111, 89.0, 2010, NULL, NULL, 234900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7725, rue Fonteneau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.596658, -73.542043, 253.0, 1992, NULL, NULL, 512600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3219, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.573697, -73.546694, NULL, NULL, NULL, NULL, 421400.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1859, rue de Beaurivage', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.590788, -73.513306, 200.0, 1910, NULL, NULL, 672567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5381, rue Gabriele-Frascadore', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612412, -73.534602, 98.0, 2014, NULL, NULL, 321533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3209, rue Paul-Pau', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.607927, -73.526129, 218.0, 1961, NULL, NULL, 603267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8979, rue Bellerive', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.60237, -73.510836, 68.0, 1998, NULL, NULL, 324533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3617, rue Ontario Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.545449, -73.544834, 234.0, 1931, NULL, NULL, 253920.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5031, rue Jacques-Porlier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.610767, -73.531134, 253.0, 1982, NULL, NULL, 365000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6244, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.57759, -73.540014, 667.0, 1965, NULL, NULL, 3707833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9585, rue Notre-Dame Est', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.609744, -73.510698, 71.0, 2010, NULL, NULL, 203300.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9483, rue Jean-Pierre-Ronfard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.612956, -73.535157, 86.0, 2010, NULL, NULL, 266233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6963, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.583942, -73.533214, 79.0, 2000, NULL, NULL, 247700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4951, rue Jacques-Porlier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.610554, -73.530203, 265.0, 1981, NULL, NULL, 395900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3062, avenue de Carignan', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.578602, -73.541207, 242.0, 1965, NULL, NULL, 707200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6461, avenue Chouinard', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.584726, -73.554248, 335.0, 1962, NULL, NULL, 800000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5224, rue des Ormeaux', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.605944, -73.535535, 313.0, 1963, NULL, NULL, 686900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6967, avenue Pierre-de Coubertin', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.583942, -73.533214, 71.0, 2000, NULL, NULL, 249700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5870, rue Claude-Masson', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.613307, -73.539007, 168.0, 2012, NULL, NULL, 583500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2785, rue Saint-Emile', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.597528, -73.525743, 425.0, 1955, NULL, NULL, 634200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3317, rue Monsabre', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.574083, -73.547854, NULL, NULL, NULL, NULL, 565733.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3155, rue Saint-Donat', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.600569, -73.530346, 367.0, 1957, NULL, NULL, 344133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('533, avenue Aird', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.553638, -73.530794, 273.0, 1900, NULL, NULL, 635067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4901, rue Jacques-Porlier', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.610426, -73.529639, 287.0, 1981, NULL, NULL, 407800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6735, rue de Marseille', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.582934, -73.538602, 749.0, 1963, NULL, NULL, 568260.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2845, rue Saint-Emile', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.597702, -73.52632, 516.0, 1954, NULL, NULL, 808100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6545, avenue Alexis-Contant', 'Mercier–Hochelaga-Maisonneuve', 'Montréal', 45.586216, -73.556423, 268.0, 1963, NULL, NULL, 617933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10421, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.583897, -73.639287, 418.0, 2002, NULL, NULL, 724000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4707, rue de Charleroi', 'Montréal-Nord', 'Montréal', 45.59656, -73.632176, 847.0, 1977, NULL, NULL, 593680.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6140, rue Arthur-Chevrier', 'Montréal-Nord', 'Montréal', 45.617102, -73.622758, 331.0, 1971, NULL, NULL, 481133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12365, avenue Fortin', 'Montréal-Nord', 'Montréal', 45.617517, -73.626052, 353.0, 1969, NULL, NULL, 455500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10155, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.580849, -73.639359, 224.0, 1969, NULL, NULL, 607433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11992, avenue Desy', 'Montréal-Nord', 'Montréal', 45.613617, -73.624109, NULL, NULL, NULL, NULL, 410700.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11410, avenue de London', 'Montréal-Nord', 'Montréal', 45.594059, -73.645399, 379.0, 1947, NULL, NULL, 695133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6395, rue de Beaucourt', 'Montréal-Nord', 'Montréal', 45.614412, -73.614233, 279.0, 1967, NULL, NULL, 357800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10490, boulevard Pie-Ix', 'Montréal-Nord', 'Montréal', 45.587346, -73.63404, 1427.0, 1998, NULL, NULL, 900000.0, 2025, 'Restaurant et établissement avec service complet (sans terrasse) -Établissements avec permis alcool, inclus pub,café et brasserie', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12324, avenue Corbeil', 'Montréal-Nord', 'Montréal', 45.617736, -73.624585, 249.0, 1971, NULL, NULL, 251933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10227, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.583319, -73.636162, 290.0, 1957, NULL, NULL, 486267.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6331, rue Lamy', 'Montréal-Nord', 'Montréal', 45.610787, -73.613445, 353.0, 1967, NULL, NULL, 443067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6300, rue Arthur-Chevrier', 'Montréal-Nord', 'Montréal', 45.617892, -73.621174, 443.0, 1972, NULL, NULL, 717500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6170, rue Arthur-Chevrier', 'Montréal-Nord', 'Montréal', 45.617299, -73.622357, 306.0, 1971, NULL, NULL, 456633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6372, rue de Beaucourt', 'Montréal-Nord', 'Montréal', 45.613505, -73.615227, 298.0, 1968, NULL, NULL, 573500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11982, avenue Desy', 'Montréal-Nord', 'Montréal', 45.613268, -73.623753, NULL, NULL, NULL, NULL, 355667.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10035, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.579792, -73.638235, 256.0, 1963, NULL, NULL, 473333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5860, rue Pascal', 'Montréal-Nord', 'Montréal', 45.615279, -73.624675, 368.0, 1969, NULL, NULL, 310233.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11501, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.594063, -73.646915, 378.0, 1957, NULL, NULL, 322500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6150, rue Arthur-Chevrier', 'Montréal-Nord', 'Montréal', 45.617179, -73.622603, 331.0, 1971, NULL, NULL, 487033.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11240, avenue Pigeon', 'Montréal-Nord', 'Montréal', 45.598947, -73.631255, 197.0, 1962, NULL, NULL, 483300.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12081, avenue Desaulniers', 'Montréal-Nord', 'Montréal', 45.608378, -73.635497, 561.0, 1953, NULL, NULL, 411000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6070, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.618685, -73.626193, 261.0, 1970, NULL, NULL, 315500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6322, rue Lamy', 'Montréal-Nord', 'Montréal', 45.610481, -73.61327, 355.0, 1967, NULL, NULL, 443867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11987, avenue Desy', 'Montréal-Nord', 'Montréal', 45.613538, -73.623423, NULL, NULL, NULL, NULL, 393733.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5602, boulevard Leger', 'Montréal-Nord', 'Montréal', 45.613543, -73.630622, NULL, NULL, NULL, NULL, 582633.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10226, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.583319, -73.636162, 290.0, 1957, NULL, NULL, 447167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12380, avenue Fortin', 'Montréal-Nord', 'Montréal', 45.617394, -73.626511, 325.0, 1971, NULL, NULL, 480900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12684, avenue Aime-Leonard', 'Montréal-Nord', 'Montréal', 45.618649, -73.631555, NULL, NULL, NULL, NULL, 448300.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11232, avenue de Paris', 'Montréal-Nord', 'Montréal', 45.592024, -73.644296, 115.0, 2014, NULL, NULL, 274900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6020, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.618385, -73.626453, 239.0, 1970, NULL, NULL, 300900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11226, avenue Hebert', 'Montréal-Nord', 'Montréal', 45.594604, -73.639448, NULL, NULL, NULL, NULL, 387600.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6141, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.619494, -73.626073, 693.0, 1975, NULL, NULL, 2943400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3482, rue de Mont-Joli', 'Montréal-Nord', 'Montréal', 45.579278, -73.637463, 45.0, 2019, NULL, NULL, 379200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11975, avenue Desy', 'Montréal-Nord', 'Montréal', 45.613293, -73.623151, NULL, NULL, NULL, NULL, 503100.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11184, avenue Hebert', 'Montréal-Nord', 'Montréal', 45.594223, -73.639045, NULL, NULL, NULL, NULL, 301833.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6080, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.618711, -73.626126, 172.0, 1970, NULL, NULL, 262300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6369, rue de Beaucourt', 'Montréal-Nord', 'Montréal', 45.614126, -73.61478, 279.0, 1967, NULL, NULL, 339100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5051, boulevard Industriel', 'Montréal-Nord', 'Montréal', 45.594058, -73.621717, 989.0, NULL, NULL, NULL, 602267.0, 2021, 'Autres services de l''automobile', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6383, rue de Beaucourt', 'Montréal-Nord', 'Montréal', 45.614307, -73.614445, 279.0, 1967, NULL, NULL, 373800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11554, avenue Hebert', 'Montréal-Nord', 'Montréal', 45.597348, -73.642382, NULL, NULL, NULL, NULL, 466000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11254, avenue Hebert', 'Montréal-Nord', 'Montréal', 45.594884, -73.639749, NULL, NULL, NULL, NULL, 406333.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11511, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.594185, -73.647025, 379.0, 1962, NULL, NULL, 383467.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10787, avenue Ethier', 'Montréal-Nord', 'Montréal', 45.594081, -73.628847, NULL, NULL, NULL, NULL, 644900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4060, rue Beaudin', 'Montréal-Nord', 'Montréal', 45.596327, -73.644059, 300.0, 1986, NULL, NULL, 439800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10983, avenue Masse', 'Montréal-Nord', 'Montréal', 45.604273, -73.614211, NULL, NULL, NULL, NULL, 276667.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, avenue Pelletier', 'Montréal-Nord', 'Montréal', 45.599725, -73.641192, NULL, NULL, NULL, NULL, 48800.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6026, rue de Charny', 'Montréal-Nord', 'Montréal', 45.610409, -73.619021, 286.0, 1966, NULL, NULL, 518067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12375, avenue Hurteau', 'Montréal-Nord', 'Montréal', 45.619022, -73.624041, 381.0, 1973, NULL, NULL, 850867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12314, avenue Corbeil', 'Montréal-Nord', 'Montréal', 45.617533, -73.624366, 153.0, 1971, NULL, NULL, 193567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10710, boulevard Pie-Ix', 'Montréal-Nord', 'Montréal', 45.589133, -73.636199, 2378.0, 2005, NULL, NULL, 900000.0, 2025, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10654, avenue Gariepy', 'Montréal-Nord', 'Montréal', 45.588164, -73.636843, NULL, NULL, NULL, NULL, 557800.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11579, avenue Hebert', 'Montréal-Nord', 'Montréal', 45.597616, -73.642101, NULL, NULL, NULL, NULL, 837600.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10156, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.582819, -73.635616, 290.0, 1957, NULL, NULL, 434000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11527, avenue des Recollets', 'Montréal-Nord', 'Montréal', 45.59543, -73.645135, NULL, NULL, NULL, NULL, 504900.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11012, avenue Brunet', 'Montréal-Nord', 'Montréal', 45.59924, -73.624866, 409.0, 1957, NULL, NULL, 266867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4070, rue Beaudin', 'Montréal-Nord', 'Montréal', 45.596441, -73.643957, 308.0, 1987, NULL, NULL, 491700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9935, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.578623, -73.637001, 981.0, 1965, NULL, NULL, 328633.0, 2021, 'Autres entreposages', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10616, avenue Gariepy', 'Montréal-Nord', 'Montréal', 45.587834, -73.636462, NULL, NULL, NULL, NULL, 550100.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12316, avenue Corbeil', 'Montréal-Nord', 'Montréal', 45.617572, -73.624406, 153.0, 1971, NULL, NULL, 213567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10735, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.586354, -73.641916, 314.0, 1987, NULL, NULL, 742067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6394, rue de Beaucourt', 'Montréal-Nord', 'Montréal', 45.613711, -73.61478, 298.0, 1968, NULL, NULL, 584000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5810, rue Ronald', 'Montréal-Nord', 'Montréal', 45.613204, -73.625453, 452.0, 1964, NULL, NULL, 421133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10001, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.580712, -73.635916, 462.0, 1964, NULL, NULL, 408333.0, 2023, 'Service de réparation d''automobiles (garage) sans pompes à essence(5531)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10960, avenue Masse', 'Montréal-Nord', 'Montréal', 45.603601, -73.614204, NULL, NULL, NULL, NULL, 242900.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12338, avenue Hurteau', 'Montréal-Nord', 'Montréal', 45.61829, -73.623888, 167.0, 1971, NULL, NULL, 300300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5815, rue de Vendee', 'Montréal-Nord', 'Montréal', 45.611348, -73.622937, NULL, NULL, NULL, NULL, 546033.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12355, avenue Hurteau', 'Montréal-Nord', 'Montréal', 45.618795, -73.62377, 382.0, 1973, NULL, NULL, 844700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11445, avenue Hebert', 'Montréal-Nord', 'Montréal', 45.596549, -73.641037, NULL, NULL, NULL, NULL, 330600.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12150, avenue Desaulniers', 'Montréal-Nord', 'Montréal', 45.608819, -73.636592, 502.0, 1951, NULL, NULL, 272100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10804, avenue Ethier', 'Montréal-Nord', 'Montréal', 45.59408, -73.629424, NULL, NULL, NULL, NULL, 623700.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12299, avenue Corbeil', 'Montréal-Nord', 'Montréal', 45.617527, -73.623658, 167.0, 1971, NULL, NULL, 210700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5586, rue des Marguerites', 'Montréal-Nord', 'Montréal', 45.606755, -73.624548, 460.0, 1958, NULL, NULL, 332100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12166, rue Pascal', 'Montréal-Nord', 'Montréal', 45.614006, -73.626788, 502.0, 1964, NULL, NULL, 416600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6118, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.618926, -73.625952, 342.0, 1970, NULL, NULL, 572300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5820, rue de Vendee', 'Montréal-Nord', 'Montréal', 45.61112, -73.622487, NULL, NULL, NULL, NULL, 572100.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10994, avenue Masse', 'Montréal-Nord', 'Montréal', 45.604203, -73.61494, NULL, NULL, NULL, NULL, 634267.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12376, avenue Hurteau', 'Montréal-Nord', 'Montréal', 45.618824, -73.624454, 307.0, 1971, NULL, NULL, 387767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10811, avenue Ethier', 'Montréal-Nord', 'Montréal', 45.594282, -73.62905, NULL, NULL, NULL, NULL, 644900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11220, avenue Pigeon', 'Montréal-Nord', 'Montréal', 45.598748, -73.631032, 592.0, 1952, NULL, NULL, 427433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11983, avenue Desy', 'Montréal-Nord', 'Montréal', 45.613435, -73.623319, NULL, NULL, NULL, NULL, 389100.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5315, boulevard Gouin Est', 'Montréal-Nord', 'Montréal', 45.614308, -73.636219, 871.0, 1975, NULL, NULL, 995100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10854, avenue Brunet', 'Montréal-Nord', 'Montréal', 45.597964, -73.623544, 278.0, 1966, NULL, NULL, 452833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10016, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.579369, -73.638493, 372.0, 1958, NULL, NULL, 564867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6010, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.618323, -73.626475, 227.0, 1970, NULL, NULL, 306800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5260, boulevard Gouin Est', 'Montréal-Nord', 'Montréal', 45.6131, -73.636721, 678.0, 1979, NULL, NULL, 1135700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10959, avenue l''Archeveque', 'Montréal-Nord', 'Montréal', 45.596363, -73.629011, NULL, NULL, NULL, NULL, 939000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10805, avenue Ethier', 'Montréal-Nord', 'Montréal', 45.594213, -73.628988, NULL, NULL, NULL, NULL, 644900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10982, avenue Brunet', 'Montréal-Nord', 'Montréal', 45.599045, -73.624661, 307.0, 1957, NULL, NULL, 217800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11801, avenue Desy', 'Montréal-Nord', 'Montréal', 45.61237, -73.622185, NULL, NULL, NULL, NULL, 623233.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11320, avenue Pigeon', 'Montréal-Nord', 'Montréal', 45.599533, -73.631824, 317.0, 1954, NULL, NULL, 450233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5255, boulevard Gouin Est', 'Montréal-Nord', 'Montréal', 45.6131, -73.636721, 1092.0, 1974, NULL, NULL, 1319867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11805, avenue Desy', 'Montréal-Nord', 'Montréal', 45.612442, -73.622255, NULL, NULL, NULL, NULL, 653533.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11528, avenue Ovide-Clermont', 'Montréal-Nord', 'Montréal', 45.610005, -73.617475, 288.0, 1966, NULL, NULL, 618200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11575, avenue Joseph-Boyer', 'Montréal-Nord', 'Montréal', 45.606787, -73.627574, 456.0, 1957, NULL, NULL, 461500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10982, avenue Masse', 'Montréal-Nord', 'Montréal', 45.603976, -73.6147, NULL, NULL, NULL, NULL, 283433.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11467, avenue de London', 'Montréal-Nord', 'Montréal', 45.59449, -73.645276, 395.0, 1943, NULL, NULL, 343967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10793, avenue Ethier', 'Montréal-Nord', 'Montréal', 45.594156, -73.628908, NULL, NULL, NULL, NULL, 644900.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6090, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.618782, -73.626111, 184.0, 1970, NULL, NULL, 286900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10161, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.5809, -73.639413, 224.0, 1969, NULL, NULL, 623700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10458, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.584019, -73.640186, 421.0, 1929, NULL, NULL, 330267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10171, avenue Pelletier', 'Montréal-Nord', 'Montréal', 45.587513, -73.627767, 4330.0, 1968, NULL, NULL, 750000.0, 2021, 'Autres activités d''impression commerciale', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10786, avenue Ethier', 'Montréal-Nord', 'Montréal', 45.593905, -73.629233, NULL, NULL, NULL, NULL, 609800.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5175, boulevard Leger', 'Montréal-Nord', 'Montréal', 45.608964, -73.634072, NULL, NULL, NULL, NULL, 717233.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10951, avenue l''Archeveque', 'Montréal-Nord', 'Montréal', 45.59629, -73.628943, NULL, NULL, NULL, NULL, 878600.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11388, avenue Racette', 'Montréal-Nord', 'Montréal', 45.602162, -73.62906, 311.0, 1958, NULL, NULL, 282533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10207, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.583528, -73.635692, 279.0, 1963, NULL, NULL, 542167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11400, avenue de London', 'Montréal-Nord', 'Montréal', 45.593959, -73.645282, 279.0, 1952, NULL, NULL, 237133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6001, rue Pascal', 'Montréal-Nord', 'Montréal', 45.615795, -73.624591, 332.0, 1967, NULL, NULL, 421300.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11512, avenue Ovide-Clermont', 'Montréal-Nord', 'Montréal', 45.609774, -73.617233, 315.0, 1967, NULL, NULL, 590700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6367, rue de Beaucourt', 'Montréal-Nord', 'Montréal', 45.61409, -73.614865, 279.0, 1967, NULL, NULL, 362200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4080, rue Beaudin', 'Montréal-Nord', 'Montréal', 45.596479, -73.643867, 292.0, 1987, NULL, NULL, 485467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4700, rue de Charleroi', 'Montréal-Nord', 'Montréal', 45.596212, -73.631915, 192.0, 1965, NULL, NULL, 140213.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3470, rue de Mont-Joli', 'Montréal-Nord', 'Montréal', 45.579341, -73.637544, 45.0, 2019, NULL, NULL, 275100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10405, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.583743, -73.639151, 477.0, 1953, NULL, NULL, 410933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10400, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.583398, -73.639568, 209.0, 2015, NULL, NULL, 575100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10976, avenue Brunet', 'Montréal-Nord', 'Montréal', 45.59894, -73.624555, 307.0, 1957, NULL, NULL, 222333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11545, avenue Joseph-Boyer', 'Montréal-Nord', 'Montréal', 45.605996, -73.626854, 502.0, 1957, NULL, NULL, 412900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11537, avenue Joseph-Boyer', 'Montréal-Nord', 'Montréal', 45.605727, -73.626608, 564.0, 1957, NULL, NULL, 432167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11467, avenue Olier', 'Montréal-Nord', 'Montréal', 45.61162, -73.61106, 247.0, 1965, NULL, NULL, 288067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6447, rue Pascal', 'Montréal-Nord', 'Montréal', 45.619234, -73.617885, 435.0, 1969, NULL, NULL, 642400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10182, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.580883, -73.640077, 223.0, 1935, NULL, NULL, 286733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12737, avenue Aime-Leonard', 'Montréal-Nord', 'Montréal', 45.619482, -73.631663, NULL, NULL, NULL, NULL, 386900.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4741, rue de Charleroi', 'Montréal-Nord', 'Montréal', 45.596734, -73.631742, 345.0, 1963, NULL, NULL, 225667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11433, avenue Racette', 'Montréal-Nord', 'Montréal', 45.602804, -73.629147, 311.0, 1971, NULL, NULL, 484767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11466, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.593607, -73.647089, 372.0, 1955, NULL, NULL, 336333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10391, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.583654, -73.639045, 360.0, 1955, NULL, NULL, 380500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6131, rue Villeneuve', 'Montréal-Nord', 'Montréal', 45.619351, -73.626181, 441.0, 1969, NULL, NULL, 880700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11395, avenue Racette', 'Montréal-Nord', 'Montréal', 45.602383, -73.62871, 409.0, 1959, NULL, NULL, 283600.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5431, boulevard Leger', 'Montréal-Nord', 'Montréal', 45.610837, -73.633233, NULL, NULL, NULL, NULL, 818300.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10938, avenue de Paris', 'Montréal-Nord', 'Montréal', 45.589646, -73.64173, 461.0, 1958, NULL, NULL, 377300.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11506, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.593941, -73.647431, 279.0, 1958, NULL, NULL, 440167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12623, avenue Aime-Leonard', 'Montréal-Nord', 'Montréal', 45.61826, -73.630452, NULL, NULL, NULL, NULL, 562267.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11319, avenue Pigeon', 'Montréal-Nord', 'Montréal', 45.599765, -73.631356, 471.0, 1930, NULL, NULL, 347467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11532, avenue Ovide-Clermont', 'Montréal-Nord', 'Montréal', 45.610066, -73.618129, 288.0, 1966, NULL, NULL, 590700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5599, rue des Marguerites', 'Montréal-Nord', 'Montréal', 45.607319, -73.624327, 508.0, 1958, NULL, NULL, 368900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5867, rue Pascal', 'Montréal-Nord', 'Montréal', 45.615677, -73.624803, 277.0, 1967, NULL, NULL, 405900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4664, rue de Charleroi', 'Montréal-Nord', 'Montréal', 45.595867, -73.632587, 406.0, 1960, NULL, NULL, 344960.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11744, avenue Garon', 'Montréal-Nord', 'Montréal', 45.599154, -73.642444, 284.0, 1956, NULL, NULL, 250667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12165, rue Pascal', 'Montréal-Nord', 'Montréal', 45.61423, -73.626335, 418.0, 1964, NULL, NULL, 400000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10457, boulevard Saint-Vital', 'Montréal-Nord', 'Montréal', 45.584213, -73.639652, 418.0, 1947, NULL, NULL, 327233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11206, avenue Pigeon', 'Montréal-Nord', 'Montréal', 45.598617, -73.630887, 197.0, 1954, NULL, NULL, 459000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12360, avenue Hurteau', 'Montréal-Nord', 'Montréal', 45.618625, -73.62423, 260.0, 1971, NULL, NULL, 434400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5814, rue de Vendee', 'Montréal-Nord', 'Montréal', 45.611053, -73.622616, NULL, NULL, NULL, NULL, 530300.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12614, avenue Aime-Leonard', 'Montréal-Nord', 'Montréal', 45.617891, -73.630768, NULL, NULL, NULL, NULL, 402800.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5313, boulevard Gouin Est', 'Montréal-Nord', 'Montréal', 45.614119, -73.636308, 866.0, 1975, NULL, NULL, 1517333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6328, rue Ouellette', 'Montréal-Nord', 'Montréal', 45.611063, -73.613701, 376.0, 1968, NULL, NULL, 501933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4044, rue Arthur-Champoux', 'Montréal-Nord', 'Montréal', 45.593271, -73.640724, 413.0, 1960, NULL, NULL, 646800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, boulevard Pie-Ix', 'Montréal-Nord', 'Montréal', 45.570276, -73.599818, NULL, NULL, NULL, NULL, 2999000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10937, avenue Henault', 'Montréal-Nord', 'Montréal', 45.596865, -73.62723, NULL, NULL, NULL, NULL, 382933.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11007, avenue Gervais', 'Montréal-Nord', 'Montréal', 45.604325, -73.615562, 371.0, 1969, NULL, NULL, 546467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10130, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.580338, -73.639509, 446.0, 1930, NULL, NULL, 707233.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10950, avenue Brunet', 'Montréal-Nord', 'Montréal', 45.598546, -73.624133, 409.0, 1957, NULL, NULL, 260400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10131, avenue du Parc-Georges', 'Montréal-Nord', 'Montréal', 45.580644, -73.639137, 234.0, 1960, NULL, NULL, 545667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11405, avenue Racette', 'Montréal-Nord', 'Montréal', 45.602527, -73.62888, 558.0, 1962, NULL, NULL, 354267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12322, avenue Corbeil', 'Montréal-Nord', 'Montréal', 45.617691, -73.624538, 153.0, 1971, NULL, NULL, 201267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6317, rue Ouellette', 'Montréal-Nord', 'Montréal', 45.610926, -73.613965, 376.0, 1968, NULL, NULL, 461533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11001, avenue Brunet', 'Montréal-Nord', 'Montréal', 45.599293, -73.624343, 413.0, 1956, NULL, NULL, 312100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6027, rue de Charny', 'Montréal-Nord', 'Montréal', 45.610409, -73.619021, 286.0, 1966, NULL, NULL, 539233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6036, rue de Charny', 'Montréal-Nord', 'Montréal', 45.610541, -73.618749, 285.0, 1966, NULL, NULL, 540333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11476, avenue Olier', 'Montréal-Nord', 'Montréal', 45.611731, -73.611703, 238.0, 1965, NULL, NULL, 236167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5825, rue de Vendee', 'Montréal-Nord', 'Montréal', 45.611485, -73.622696, NULL, NULL, NULL, NULL, 584233.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12170, avenue Pigeon', 'Montréal-Nord', 'Montréal', 45.607421, -73.63989, 516.0, 1988, NULL, NULL, 702500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11141, avenue Lausanne', 'Montréal-Nord', 'Montréal', 45.588467, -73.649674, 468.0, 1956, NULL, NULL, 279433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10157, avenue Plaza', 'Montréal-Nord', 'Montréal', 45.582819, -73.635616, 290.0, 1957, NULL, NULL, 445500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('840, avenue de l''Epee', 'Outremont', 'Montréal', 45.523412, -73.613249, NULL, NULL, NULL, NULL, 587500.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1521, avenue Bernard', 'Outremont', 'Montréal', 45.516758, -73.612301, 2193.0, 1928, NULL, NULL, 15065367.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5920, avenue Durocher', 'Outremont', 'Montréal', 45.522691, -73.608122, 223.0, 1913, NULL, NULL, 1525400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5459, avenue Durocher', 'Outremont', 'Montréal', 45.520538, -73.602363, 232.0, 1907, NULL, NULL, 1192800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1339, avenue Ducharme', 'Outremont', 'Montréal', 45.521886, -73.616541, 89.0, 1924, NULL, NULL, 596067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('552, chemin de la Cote-Sainte-Catherine', 'Outremont', 'Montréal', 45.51371, -73.611233, 664.0, 1948, NULL, NULL, 2767600.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('778, avenue de l''Epee', 'Outremont', 'Montréal', 45.522791, -73.611862, NULL, NULL, NULL, NULL, 845100.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('39, avenue Courcelette', 'Outremont', 'Montréal', 45.513075, -73.609502, 330.0, 1951, NULL, NULL, 1757600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1044, avenue Saint-Viateur', 'Outremont', 'Montréal', 45.520896, -73.603129, 351.0, 1956, NULL, NULL, 1731200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1571, avenue Bernard', 'Outremont', 'Montréal', 45.51606, -73.61264, 253.0, 1934, NULL, NULL, 2343533.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1565, avenue Bernard', 'Outremont', 'Montréal', 45.516118, -73.612591, 257.0, 1934, NULL, NULL, 1754900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('440, avenue Champagneur', 'Outremont', 'Montréal', 45.518595, -73.606475, 291.0, 1919, NULL, NULL, 1317467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('834, avenue de l''Epee', 'Outremont', 'Montréal', 45.523412, -73.613251, NULL, NULL, NULL, NULL, 555833.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('882, avenue de l''Epee', 'Outremont', 'Montréal', 45.523841, -73.614143, NULL, NULL, NULL, NULL, 842367.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5615, avenue Durocher', 'Outremont', 'Montréal', 45.521375, -73.604199, 205.0, 1912, NULL, NULL, 1431900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1771, avenue Glendale', 'Outremont', 'Montréal', 45.517422, -73.624366, 165.0, 2000, NULL, NULL, 1285633.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1138, avenue Bernard', 'Outremont', 'Montréal', 45.521331, -73.607356, 56.0, 1925, NULL, NULL, 900000.0, 2024, 'Autres activités de vente au détail de produits de l''alimentation', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6010, avenue Durocher', 'Outremont', 'Montréal', 45.523048, -73.608864, 385.0, 1912, NULL, NULL, 2656533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('748, avenue de l''Epee', 'Outremont', 'Montréal', 45.52252, -73.61124, NULL, NULL, NULL, NULL, 548433.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('757, avenue Outremont', 'Outremont', 'Montréal', 45.520989, -73.612887, 279.0, 1927, NULL, NULL, 1863367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5786, rue Hutchison', 'Outremont', 'Montréal', 45.522634, -73.605906, 76.0, 1909, NULL, NULL, 477300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('644, avenue Outremont', 'Outremont', 'Montréal', 45.519407, -73.610398, 62.0, 1927, NULL, NULL, 835100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5903, avenue Durocher', 'Outremont', 'Montréal', 45.52265, -73.608031, 247.0, 1914, NULL, NULL, 1319000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1250, avenue Ducharme', 'Outremont', 'Montréal', 45.522587, -73.615294, 188.0, 1927, NULL, NULL, 1020533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('836, avenue de l''Epee', 'Outremont', 'Montréal', 45.523412, -73.61325, NULL, NULL, NULL, NULL, 603767.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1341, avenue Ducharme', 'Outremont', 'Montréal', 45.521886, -73.616541, 82.0, 1924, NULL, NULL, 573933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('202, allée Glendale', 'Outremont', 'Montréal', 45.517303, -73.624863, 159.0, 2000, NULL, NULL, 911867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('808, avenue Wiseman', 'Outremont', 'Montréal', 45.520475, -73.615732, 406.0, 1900, NULL, NULL, 1859267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('25, avenue Robert', 'Outremont', 'Montréal', 45.510889, -73.617293, 335.0, 1919, NULL, NULL, 1161133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1312, avenue Saint-Viateur', 'Outremont', 'Montréal', 45.517414, -73.606223, 261.0, 1946, NULL, NULL, 2065800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('934, avenue Antonine-Maillet', 'Outremont', 'Montréal', 45.51731, -73.621373, 135.0, 1936, NULL, NULL, 868100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1034, avenue Pratt', 'Outremont', 'Montréal', 45.516011, -73.624775, 260.0, 1957, NULL, NULL, 899800.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('19, avenue Robert', 'Outremont', 'Montréal', 45.510828, -73.617118, 238.0, 1934, NULL, NULL, 1180567.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('28, avenue Courcelette', 'Outremont', 'Montréal', 45.513698, -73.609775, 305.0, 1925, NULL, NULL, 1720200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('891, avenue Mceachran', 'Outremont', 'Montréal', 45.519098, -73.618004, 79.0, 1924, NULL, NULL, 1786667.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1262, avenue Ducharme', 'Outremont', 'Montréal', 45.522486, -73.615393, 188.0, 1927, NULL, NULL, 1013833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1055, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.514828, -73.592063, 180.0, 1920, NULL, NULL, 858433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1465, avenue Van Horne', 'Outremont', 'Montréal', 45.519537, -73.616054, 205.0, 1933, NULL, NULL, 352609.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('20, avenue Courcelette', 'Outremont', 'Montréal', 45.513753, -73.609883, 530.0, 1927, NULL, NULL, 3018733.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('832, avenue de l''Epee', 'Outremont', 'Montréal', 45.523412, -73.613252, NULL, NULL, NULL, NULL, 629867.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1041, avenue Pratt', 'Outremont', 'Montréal', 45.516416, -73.62475, 236.0, 1947, NULL, NULL, 879467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1025, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.515276, -73.591382, 15.0, 1911, NULL, NULL, 996700.0, 2021, 'Stationnement intérieur (condo)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('480, avenue Champagneur', 'Outremont', 'Montréal', 45.518812, -73.607004, 291.0, 1920, NULL, NULL, 1317467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('770, avenue Wiseman', 'Outremont', 'Montréal', 45.519758, -73.61421, 511.0, 1934, NULL, NULL, 2788000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1304, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.511939, -73.602221, 910.0, 1964, NULL, NULL, 2942700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('460, avenue Champagneur', 'Outremont', 'Montréal', 45.518677, -73.606676, 291.0, 1919, NULL, NULL, 1296533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1159, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.51088, -73.610005, 544.0, 1986, NULL, NULL, 1916800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1045, avenue Saint-Viateur', 'Outremont', 'Montréal', 45.521093, -73.603586, 534.0, 1922, NULL, NULL, 2831533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1061, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.514868, -73.59263, 675.0, 1910, NULL, NULL, 2057467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1775, avenue Glendale', 'Outremont', 'Montréal', 45.517376, -73.624398, 167.0, 2000, NULL, NULL, 1270200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('394, chemin de la Cote-Sainte-Catherine', 'Outremont', 'Montréal', 45.515205, -73.605456, 987.0, 1900, NULL, NULL, 2782200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('20, avenue Robert', 'Outremont', 'Montréal', 45.510616, -73.617299, 229.0, 1925, NULL, NULL, 1195200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1465, avenue Bernard', 'Outremont', 'Montréal', 45.517523, -73.611491, 62.0, 1927, NULL, NULL, 437767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('818, avenue Outremont', 'Outremont', 'Montréal', 45.521277, -73.614717, 139.0, 1909, NULL, NULL, 687933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1466, avenue Ducharme', 'Outremont', 'Montréal', 45.520217, -73.61742, 938.0, 1953, NULL, NULL, 3166667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5891, avenue Durocher', 'Outremont', 'Montréal', 45.522614, -73.607951, 74.0, 1912, NULL, NULL, 478200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('712, avenue Champagneur', 'Outremont', 'Montréal', 45.520797, -73.611412, 84.0, 1922, NULL, NULL, 733867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1274, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.510274, -73.611304, 826.0, 1956, NULL, NULL, 1984633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('797, avenue Bloomfield', 'Outremont', 'Montréal', 45.522661, -73.612666, 27.0, 1930, NULL, NULL, 386700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5936, avenue Durocher', 'Outremont', 'Montréal', 45.522726, -73.608205, 214.0, 1912, NULL, NULL, 1343267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('614, chemin de la Cote-Sainte-Catherine', 'Outremont', 'Montréal', 45.51294, -73.612568, 545.0, 1945, NULL, NULL, 2404300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('983, avenue Rockland', 'Outremont', 'Montréal', 45.518739, -73.621005, 162.0, 1955, NULL, NULL, 1184000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5224, rue Hutchison', 'Outremont', 'Montréal', 45.519864, -73.598792, 91.0, 1918, NULL, NULL, 725200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('937, avenue Hartland', 'Outremont', 'Montréal', 45.51715, -73.621825, 181.0, 1928, NULL, NULL, 798500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('319, avenue Stuart', 'Outremont', 'Montréal', 45.515824, -73.606498, 346.0, 1914, NULL, NULL, 1892400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1090, avenue Saint-Viateur', 'Outremont', 'Montréal', 45.520289, -73.603592, 98.0, 1910, NULL, NULL, 896100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1163, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.515499, -73.590453, 318.0, 1900, NULL, NULL, 992500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6163, avenue Durocher', 'Outremont', 'Montréal', 45.524198, -73.610585, 77.0, 1912, NULL, NULL, 603800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('718, avenue de l''Epee', 'Outremont', 'Montréal', 45.52216, -73.610471, NULL, NULL, NULL, NULL, 886833.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('646, avenue Outremont', 'Outremont', 'Montréal', 45.519407, -73.610398, 62.0, 1927, NULL, NULL, 665000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('661, avenue Bloomfield', 'Outremont', 'Montréal', 45.521212, -73.60928, 87.0, 1912, NULL, NULL, 555867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1470, avenue Bernard', 'Outremont', 'Montréal', 45.517237, -73.610826, 976.0, 1923, NULL, NULL, 8824667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6118, rue Hutchison', 'Outremont', 'Montréal', 45.524374, -73.609845, 77.0, 1911, NULL, NULL, 535833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('844, avenue de l''Epee', 'Outremont', 'Montréal', 45.523412, -73.613247, NULL, NULL, NULL, NULL, 519000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1080, avenue Pratt', 'Outremont', 'Montréal', 45.516397, -73.6257, 3298.0, 1947, NULL, NULL, 750000.0, 2021, 'Industrie de peinture, de teinture et de vernis', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('608, chemin de la Cote-Sainte-Catherine', 'Outremont', 'Montréal', 45.513067, -73.612406, 343.0, 1980, NULL, NULL, 1870700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('765, avenue Stuart', 'Outremont', 'Montréal', 45.519398, -73.614463, 251.0, 1923, NULL, NULL, 1418233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1063, avenue Saint-Viateur', 'Outremont', 'Montréal', 45.52053, -73.603376, 583.0, 1954, NULL, NULL, 1569700.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('754, avenue Wiseman', 'Outremont', 'Montréal', 45.519573, -73.61377, 593.0, 1932, NULL, NULL, 2687700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('474, avenue Champagneur', 'Outremont', 'Montréal', 45.518757, -73.606878, 291.0, 1920, NULL, NULL, 1267033.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1268, avenue Van Horne', 'Outremont', 'Montréal', 45.521556, -73.61366, 251.0, 1934, NULL, NULL, 481747.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1331, avenue Van Horne', 'Outremont', 'Montréal', 45.52091, -73.614758, 191.0, 1934, NULL, NULL, 622320.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1369, avenue Ducharme', 'Outremont', 'Montréal', 45.521594, -73.616809, 259.0, 1924, NULL, NULL, 1059767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5268, rue Hutchison', 'Outremont', 'Montréal', 45.519806, -73.599547, 77.0, 1908, NULL, NULL, 573667.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('72, avenue Saint-Cyril', 'Outremont', 'Montréal', 45.520688, -73.615534, 68.0, 1914, NULL, NULL, 505833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1167, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.515499, -73.590453, 564.0, 1978, NULL, NULL, 1552900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('31, avenue Courcelette', 'Outremont', 'Montréal', 45.513238, -73.609829, 739.0, 1955, NULL, NULL, 2867100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1177, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.515499, -73.590453, 1400.0, 1931, NULL, NULL, 2271100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1083, boulevard du Mont-Royal', 'Outremont', 'Montréal', 45.514911, -73.593396, 471.0, 1927, NULL, NULL, 1788367.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('824, avenue de l''Epee', 'Outremont', 'Montréal', 45.523412, -73.613256, NULL, NULL, NULL, NULL, 626700.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6170, rue Hutchison', 'Outremont', 'Montréal', 45.524716, -73.61058, 93.0, 1911, NULL, NULL, 813433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('400, chemin de la Cote-Sainte-Catherine', 'Outremont', 'Montréal', 45.515622, -73.606001, 1024.0, 1911, NULL, NULL, 2402200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('90, avenue Willowdale', 'Outremont', 'Montréal', 45.509393, -73.614288, 81.0, 1989, NULL, NULL, 50100.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('46, avenue Joyce', 'Outremont', 'Montréal', 45.518981, -73.610743, 92.0, 1922, NULL, NULL, 863200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5784, rue Hutchison', 'Outremont', 'Montréal', 45.522634, -73.605906, 76.0, 1909, NULL, NULL, 457300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('663, avenue Bloomfield', 'Outremont', 'Montréal', 45.521212, -73.60928, 87.0, 1912, NULL, NULL, 592600.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1785, avenue Glendale', 'Outremont', 'Montréal', 45.517167, -73.624583, 167.0, 2000, NULL, NULL, 1238767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1070, avenue Saint-Viateur', 'Outremont', 'Montréal', 45.520435, -73.603464, 107.0, 1906, NULL, NULL, 1554933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('36, avenue Courcelette', 'Outremont', 'Montréal', 45.513519, -73.609399, 305.0, 1925, NULL, NULL, 2050200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5880, avenue Durocher', 'Outremont', 'Montréal', 45.522575, -73.607863, 214.0, 1913, NULL, NULL, 1120967.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('831, avenue Stuart', 'Outremont', 'Montréal', 45.520149, -73.616183, 216.0, 1928, NULL, NULL, 1507967.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('905, avenue de l''Epee', 'Outremont', 'Montréal', 45.524147, -73.613999, NULL, NULL, NULL, NULL, 711500.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5180, avenue Durocher', 'Outremont', 'Montréal', 45.518802, -73.598418, 71.0, 1911, NULL, NULL, 717100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('327, avenue Stuart', 'Outremont', 'Montréal', 45.515979, -73.606868, 330.0, 1911, NULL, NULL, 1764500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('498, chemin de la Cote-Sainte-Catherine', 'Outremont', 'Montréal', 45.514378, -73.608823, 817.0, 1951, NULL, NULL, 4699900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

