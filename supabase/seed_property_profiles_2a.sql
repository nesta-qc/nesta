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
-- Fichier 2a/2a/2b/2c/2d — 450 lignes.
-- ============================================================

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4437, avenue de l''Esplanade', 'Le Plateau-Mont-Royal', 'Montréal', 45.518377, -73.586679, 46.0, 1968, NULL, NULL, 401500.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5384, rue Waverly', 'Le Plateau-Mont-Royal', 'Montréal', 45.523266, -73.599298, 204.0, 1910, NULL, NULL, 1100467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5354, rue Waverly', 'Le Plateau-Mont-Royal', 'Montréal', 45.523068, -73.59885, 164.0, 1900, NULL, NULL, 913667.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4593, rue de Bordeaux', 'Le Plateau-Mont-Royal', 'Montréal', 45.53542, -73.574466, 210.0, 1910, NULL, NULL, 844467.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('266, boulevard Saint-Joseph Ouest', 'Le Plateau-Mont-Royal', 'Montréal', 45.519353, -73.59371, 260.0, 1910, NULL, NULL, 1342600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5295, rue Marquette', 'Le Plateau-Mont-Royal', 'Montréal', 45.536677, -73.584564, 225.0, 1915, NULL, NULL, 869300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4015, rue Dorion', 'Le Plateau-Mont-Royal', 'Montréal', 45.531051, -73.566669, 172.0, 1900, NULL, NULL, 1264900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4443, rue Chapleau', 'Le Plateau-Mont-Royal', 'Montréal', 45.538352, -73.568325, 174.0, 1925, NULL, NULL, 735633.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4645, rue Chambord', 'Le Plateau-Mont-Royal', 'Montréal', 45.530981, -73.579644, 157.0, 1900, NULL, NULL, 887200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1471, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.531269, -73.576396, 216.0, 1955, NULL, NULL, 633413.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4661, rue Chambord', 'Le Plateau-Mont-Royal', 'Montréal', 45.53091, -73.580285, 161.0, 1900, NULL, NULL, 1155600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('275, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.522714, -73.584195, 149.0, 2012, NULL, NULL, 900000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4749, rue Rivard', 'Le Plateau-Mont-Royal', 'Montréal', 45.525922, -73.585155, 22.0, 1999, NULL, NULL, 267567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5415, rue Drolet', 'Le Plateau-Mont-Royal', 'Montréal', 45.528307, -73.594056, 38.0, 1994, NULL, NULL, 345933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5721, rue Hutchison', 'Le Plateau-Mont-Royal', 'Montréal', 45.522782, -73.605151, 89.0, NULL, NULL, NULL, 570900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4289, avenue de l''Esplanade', 'Le Plateau-Mont-Royal', 'Montréal', 45.517231, -73.584875, 322.0, 1910, NULL, NULL, 2288600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('803, rue Rachel Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.523711, -73.576623, 45.0, 1993, NULL, NULL, 419967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5130, rue Cartier', 'Le Plateau-Mont-Royal', 'Montréal', 45.536539, -73.580615, 81.0, 1989, NULL, NULL, 504333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4432, rue Marquette', 'Le Plateau-Mont-Royal', 'Montréal', 45.5316, -73.574563, 247.0, 1908, NULL, NULL, 1074967.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4320, rue Garnier', 'Le Plateau-Mont-Royal', 'Montréal', 45.529281, -73.573577, 69.0, 1900, NULL, NULL, 487433.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5208, avenue Henri-Julien', 'Le Plateau-Mont-Royal', 'Montréal', 45.526194, -73.592264, 67.0, 1998, NULL, NULL, 382800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4678, avenue Christophe-Colomb', 'Le Plateau-Mont-Royal', 'Montréal', 45.529058, -73.582031, 80.0, 1910, NULL, NULL, 387733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4225, rue Saint-Dominique', 'Le Plateau-Mont-Royal', 'Montréal', 45.518792, -73.581527, 39.0, 1952, NULL, NULL, 528300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1465, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.53121, -73.576435, 216.0, 1900, NULL, NULL, 577340.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5234, avenue Casgrain', 'Le Plateau-Mont-Royal', 'Montréal', 45.525282, -73.594282, 170.0, 1910, NULL, NULL, 540467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3479, rue Hutchison', 'Le Plateau-Mont-Royal', 'Montréal', 45.50879, -73.573671, 207.0, 1900, NULL, NULL, 2003400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5065, rue de la Roche', 'Le Plateau-Mont-Royal', 'Montréal', 45.531692, -73.584498, 62.0, 1925, NULL, NULL, 412933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4315, rue Rivard', 'Le Plateau-Mont-Royal', 'Montréal', 45.523348, -73.57957, 43.0, 1885, NULL, NULL, 341133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5316, rue Jeanne-Mance', 'Le Plateau-Mont-Royal', 'Montréal', 45.521624, -73.599183, 232.0, 1910, NULL, NULL, 1083600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5288, rue Jeanne-Mance', 'Le Plateau-Mont-Royal', 'Montréal', 45.521693, -73.598434, 186.0, 1910, NULL, NULL, 1066333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3953, rue Saint-Andre', 'Le Plateau-Mont-Royal', 'Montréal', 45.522723, -73.572083, 166.0, 1912, NULL, NULL, 969100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('431, rue Roy Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.519776, -73.57237, 390.0, 1986, NULL, NULL, 2960000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('329, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.523305, -73.583681, 113.0, 1910, NULL, NULL, 381840.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4920, rue Hutchison', 'Le Plateau-Mont-Royal', 'Montréal', 45.518067, -73.594817, 79.0, 1910, NULL, NULL, 725700.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5409, rue Clark', 'Le Plateau-Mont-Royal', 'Montréal', 45.524895, -73.599077, 204.0, 1900, NULL, NULL, 190760.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1012, rue Marie-Anne Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.526486, -73.577054, 196.0, 1900, NULL, NULL, 664000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5174, avenue Casgrain', 'Le Plateau-Mont-Royal', 'Montréal', 45.524789, -73.593291, 211.0, 1924, NULL, NULL, 756133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5132, rue Cartier', 'Le Plateau-Mont-Royal', 'Montréal', 45.536539, -73.580615, 81.0, 1989, NULL, NULL, 504333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4266, avenue Laval', 'Le Plateau-Mont-Royal', 'Montréal', 45.52071, -73.580884, 52.0, 1885, NULL, NULL, 361467.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4614, rue de Bordeaux', 'Le Plateau-Mont-Royal', 'Montréal', 45.535272, -73.574899, 163.0, 1900, NULL, NULL, 711500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4247, rue Messier', 'Le Plateau-Mont-Royal', 'Montréal', 45.535365, -73.566794, 41.0, 1915, NULL, NULL, 371600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5061, rue de la Roche', 'Le Plateau-Mont-Royal', 'Montréal', 45.531692, -73.584498, 62.0, 1925, NULL, NULL, 338033.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('256, boulevard Saint-Joseph Ouest', 'Le Plateau-Mont-Royal', 'Montréal', 45.51947, -73.593596, 269.0, 1910, NULL, NULL, 1505800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4757, rue Rivard', 'Le Plateau-Mont-Royal', 'Montréal', 45.525922, -73.585155, 45.0, 1999, NULL, NULL, 455867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4359, rue de Brebeuf', 'Le Plateau-Mont-Royal', 'Montréal', 45.528424, -73.575783, NULL, NULL, NULL, NULL, 404500.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('960, rue Roy Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.522379, -73.569266, 47.0, 1989, NULL, NULL, 437233.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3411, rue Chapleau', 'Le Plateau-Mont-Royal', 'Montréal', 45.535583, -73.562122, 72.0, 1930, NULL, NULL, 209300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5686, rue Saint-Urbain', 'Le Plateau-Mont-Royal', 'Montréal', 45.525826, -73.602087, 233.0, 1910, NULL, NULL, 1264300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5901, rue Waverly', 'Le Plateau-Mont-Royal', 'Montréal', 45.526393, -73.605223, 204.0, 1910, NULL, NULL, 892800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4627, rue Franchere', 'Le Plateau-Mont-Royal', 'Montréal', 45.539077, -73.571448, NULL, NULL, NULL, NULL, 402800.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('151, avenue Laurier Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.524509, -73.591807, 432.0, NULL, NULL, NULL, 2218200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4737, rue Rivard', 'Le Plateau-Mont-Royal', 'Montréal', 45.525878, -73.585057, 22.0, 1999, NULL, NULL, 267567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1145, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.528596, -73.578894, 171.0, 1910, NULL, NULL, 900000.0, 2025, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5019, rue Clark', 'Le Plateau-Mont-Royal', 'Montréal', 45.522215, -73.592216, 83.0, 1910, NULL, NULL, 381133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1201, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.528898, -73.578587, 197.0, 1941, NULL, NULL, 900000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('263, avenue du Mont-Royal Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.522621, -73.584282, 149.0, 1950, NULL, NULL, 786060.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4586, rue de Bordeaux', 'Le Plateau-Mont-Royal', 'Montréal', 45.535059, -73.574502, 163.0, 1910, NULL, NULL, 773433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('56, rue Marie-Anne Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.519614, -73.583307, 34.0, 1959, NULL, NULL, 234000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4299, avenue de l''Esplanade', 'Le Plateau-Mont-Royal', 'Montréal', 45.517266, -73.584978, 339.0, 1910, NULL, NULL, 2451300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1010, rue Marie-Anne Est', 'Le Plateau-Mont-Royal', 'Montréal', 45.526429, -73.577106, 189.0, 1900, NULL, NULL, 683500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6335, rue Viau', 'Rosemont–La Petite-Patrie', 'Montréal', 45.570911, -73.570806, 393.0, 1953, NULL, NULL, 759900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6295, rue Viau', 'Rosemont–La Petite-Patrie', 'Montréal', 45.570735, -73.570235, 399.0, 1949, NULL, NULL, 643200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7052, rue Saint-Urbain', 'Rosemont–La Petite-Patrie', 'Montréal', 45.532335, -73.617282, 81.0, 1946, NULL, NULL, 1113900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6405, rue Viau', 'Rosemont–La Petite-Patrie', 'Montréal', 45.571079, -73.571349, 414.0, 1953, NULL, NULL, 764300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6814, 36e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.57215, -73.578696, NULL, NULL, NULL, NULL, 597533.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6862, avenue de Lorimier', 'Rosemont–La Petite-Patrie', 'Montréal', 45.548156, -73.600705, 108.0, 1935, NULL, NULL, 418833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4405, rue du Canadien-Pacifique', 'Rosemont–La Petite-Patrie', 'Montréal', 45.547771, -73.564114, 232.0, 1998, NULL, NULL, 792400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2300, rue Belanger', 'Rosemont–La Petite-Patrie', 'Montréal', 45.55027, -73.599737, NULL, NULL, NULL, NULL, 636800.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6740, 36e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.571775, -73.577494, NULL, NULL, NULL, NULL, 556633.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6175, 19e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.559283, -73.577042, NULL, NULL, NULL, NULL, 1153367.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6257, avenue Christophe-Colomb', 'Rosemont–La Petite-Patrie', 'Montréal', 45.536959, -73.599032, 302.0, 1922, NULL, NULL, 1226700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6991, rue de Lanaudiere', 'Rosemont–La Petite-Patrie', 'Montréal', 45.544312, -73.606534, NULL, NULL, NULL, NULL, 977400.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6820, 36e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.572198, -73.578862, NULL, NULL, NULL, NULL, 594867.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4459, rue Saint-Zotique Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.56748, -73.579903, 203.0, 1954, NULL, NULL, 568167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6295, 40e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.572373, -73.56796, NULL, NULL, NULL, NULL, 813167.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3333, boulevard Saint-Joseph Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.550581, -73.56801, 690.0, 1969, NULL, NULL, 2600867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7042, rue Saint-Urbain', 'Rosemont–La Petite-Patrie', 'Montréal', 45.532335, -73.617282, 97.0, 1946, NULL, NULL, 1084600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4888, rue Molson', 'Rosemont–La Petite-Patrie', 'Montréal', 45.542026, -73.571277, 11910.0, 1969, NULL, NULL, 900000.0, 2026, 'Entreposage de tout genre', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3523, avenue du Mont-Royal Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.550996, -73.563207, 62.0, 2000, NULL, NULL, 2200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5560, 9e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.550379, -73.576572, NULL, NULL, NULL, NULL, 1000000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3651, avenue du Mont-Royal Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.552083, -73.562021, 55.0, 1987, NULL, NULL, 196533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5275, avenue des Sapins', 'Rosemont–La Petite-Patrie', 'Montréal', 45.571563, -73.559044, 465.0, 1961, NULL, NULL, 1162233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6780, rue Boyer', 'Rosemont–La Petite-Patrie', 'Montréal', 45.539063, -73.607241, 224.0, 1910, NULL, NULL, 946400.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6314, avenue de Gaspe', 'Rosemont–La Petite-Patrie', 'Montréal', 45.531061, -73.605418, NULL, NULL, NULL, NULL, 350000.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6750, 36e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.571855, -73.57775, NULL, NULL, NULL, NULL, 582333.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5687, 9e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.551205, -73.578186, NULL, NULL, NULL, NULL, 523100.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3405, rue William-Tremblay', 'Rosemont–La Petite-Patrie', 'Montréal', 45.548284, -73.561854, 96.0, 1990, NULL, NULL, 305200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5630, 9e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.550758, -73.577804, NULL, NULL, NULL, NULL, 729000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6025, avenue Papineau', 'Rosemont–La Petite-Patrie', 'Montréal', 45.541229, -73.592891, 161.0, 1910, NULL, NULL, 1925633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3677, avenue du Mont-Royal Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.552186, -73.561912, 62.0, 1987, NULL, NULL, 199167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3145, rue de la Forge', 'Rosemont–La Petite-Patrie', 'Montréal', 45.547087, -73.564065, 193.0, 1998, NULL, NULL, 1161833.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6367, avenue Casgrain', 'Rosemont–La Petite-Patrie', 'Montréal', 45.530621, -73.606098, 232.0, 1910, NULL, NULL, 966367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6653, rue de Saint-Vallier', 'Rosemont–La Petite-Patrie', 'Montréal', 45.53607, -73.606785, 232.0, 1914, NULL, NULL, 817000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, 1re Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.550351, -73.590404, NULL, NULL, NULL, NULL, 48400.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6263, avenue Christophe-Colomb', 'Rosemont–La Petite-Patrie', 'Montréal', 45.536998, -73.599118, 302.0, 1924, NULL, NULL, 1203500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6285, rue Viau', 'Rosemont–La Petite-Patrie', 'Montréal', 45.570677, -73.570052, 398.0, 1949, NULL, NULL, 698800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6593, rue de Saint-Vallier', 'Rosemont–La Petite-Patrie', 'Montréal', 45.535709, -73.605965, 232.0, 1900, NULL, NULL, 662600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2865, avenue Laurier Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.54666, -73.57155, 60.0, 1944, NULL, NULL, 388767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6316, avenue de Gaspe', 'Rosemont–La Petite-Patrie', 'Montréal', 45.531061, -73.605406, NULL, NULL, NULL, NULL, 246100.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5976, 2e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.548944, -73.585763, NULL, NULL, NULL, NULL, 506100.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6792, rue Boyer', 'Rosemont–La Petite-Patrie', 'Montréal', 45.539132, -73.607406, 224.0, 1910, NULL, NULL, 825733.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6585, rue de Saint-Vallier', 'Rosemont–La Petite-Patrie', 'Montréal', 45.535621, -73.605808, 232.0, 1910, NULL, NULL, 715200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6802, rue Boyer', 'Rosemont–La Petite-Patrie', 'Montréal', 45.539168, -73.607483, 224.0, 1910, NULL, NULL, 815900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Saint-Andre', 'Rosemont–La Petite-Patrie', 'Montréal', 45.514244, -73.552844, NULL, NULL, NULL, NULL, 329800.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4678, rue Henri-Deslongchamps', 'Rosemont–La Petite-Patrie', 'Montréal', 45.552948, -73.564055, 76.0, 1998, NULL, NULL, 396900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5971, avenue Papineau', 'Rosemont–La Petite-Patrie', 'Montréal', 45.541305, -73.592223, 424.0, 2025, NULL, NULL, 13337.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6963, rue Saint-Andre', 'Rosemont–La Petite-Patrie', 'Montréal', 45.53994, -73.609998, NULL, NULL, NULL, NULL, 337567.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6425, 44e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.575392, -73.567247, NULL, NULL, NULL, NULL, 827900.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5905, rue Saint-Hubert', 'Rosemont–La Petite-Patrie', 'Montréal', 45.533957, -73.597882, 202.0, 1910, NULL, NULL, 676067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6825, 42e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.575921, -73.574604, NULL, NULL, NULL, NULL, 860000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3655, avenue du Mont-Royal Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.552083, -73.562021, 55.0, 1987, NULL, NULL, 196533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6764, rue de Lanaudiere', 'Rosemont–La Petite-Patrie', 'Montréal', 45.542613, -73.603749, NULL, NULL, NULL, NULL, 1008000.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6500, avenue de l''Esplanade', 'Rosemont–La Petite-Patrie', 'Montréal', 45.52823, -73.611978, 44.0, 2003, NULL, NULL, 483267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6415, 44e Avenue', 'Rosemont–La Petite-Patrie', 'Montréal', 45.575341, -73.567098, NULL, NULL, NULL, NULL, 796500.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3665, avenue du Mont-Royal Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.552186, -73.561912, 67.0, 1987, NULL, NULL, 269400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5605, avenue de Lorimier', 'Rosemont–La Petite-Patrie', 'Montréal', 45.541072, -73.584472, 31.0, 2019, NULL, NULL, 459133.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6830, rue Boyer', 'Rosemont–La Petite-Patrie', 'Montréal', 45.539671, -73.607612, 208.0, 1910, NULL, NULL, 802233.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4447, rue Saint-Zotique Est', 'Rosemont–La Petite-Patrie', 'Montréal', 45.567322, -73.580103, 211.0, 1953, NULL, NULL, 511067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5599, avenue de Lorimier', 'Rosemont–La Petite-Patrie', 'Montréal', 45.541062, -73.584456, 57.0, 2019, NULL, NULL, 530267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, avenue Bourbonniere', 'Rosemont–La Petite-Patrie', 'Montréal', 45.556545, -73.569856, NULL, NULL, NULL, NULL, 207000.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5251, rue Wellington', 'Verdun', 'Montréal', 45.454013, -73.568034, 75.0, 1928, NULL, NULL, 352433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1287, rue Valiquette', 'Verdun', 'Montréal', 45.4465, -73.583469, 284.0, 1949, NULL, NULL, 875233.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1644, rue Lloyd-George', 'Verdun', 'Montréal', 45.43813, -73.590858, 475.0, 1944, NULL, NULL, 693800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1265, rue Valiquette', 'Verdun', 'Montréal', 45.44676, -73.58301, 293.0, 1949, NULL, NULL, 875667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3180, rue de Verdun', 'Verdun', 'Montréal', 45.471712, -73.570813, 332.0, 1929, NULL, NULL, 685433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('22, rue Terry-Fox', 'Verdun', 'Montréal', 45.465544, -73.53968, 373.0, 1983, NULL, NULL, 863500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5570, rue Beurling', 'Verdun', 'Montréal', 45.452065, -73.582151, 178.0, 1949, NULL, NULL, 761400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3978, rue Claude', 'Verdun', 'Montréal', 45.464262, -73.573082, 73.0, 2013, NULL, NULL, 455567.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('590, rue Osborne', 'Verdun', 'Montréal', 45.451198, -73.57178, 184.0, 1928, NULL, NULL, 878167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3162, rue de Verdun', 'Verdun', 'Montréal', 45.471928, -73.570341, 111.0, 1927, NULL, NULL, 462900.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1335, rue Valiquette', 'Verdun', 'Montréal', 45.446772, -73.585136, 263.0, 1951, NULL, NULL, 1129000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1247, rue Valiquette', 'Verdun', 'Montréal', 45.446698, -73.58265, 293.0, 1949, NULL, NULL, 787100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4311, rue de Verdun', 'Verdun', 'Montréal', 45.461072, -73.571782, 56.0, 2002, NULL, NULL, 374200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4332, rue Bannantyne', 'Verdun', 'Montréal', 45.460918, -73.575598, 178.0, 1956, NULL, NULL, 576400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3478, rue de Verdun', 'Verdun', 'Montréal', 45.469134, -73.571047, 136.0, 1927, NULL, NULL, 650000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3208, rue de Verdun', 'Verdun', 'Montréal', 45.471516, -73.570842, 355.0, 1912, NULL, NULL, 826667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3494, rue Joseph', 'Verdun', 'Montréal', 45.469022, -73.571643, 232.0, 1915, NULL, NULL, 1108900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('99, rue de l''Eglise', 'Verdun', 'Montréal', 45.462883, -73.565454, NULL, NULL, NULL, NULL, 1022800.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('723, rue Riverview', 'Verdun', 'Montréal', 45.446779, -73.574854, 149.0, 1928, NULL, NULL, 559267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('721, 5e Avenue', 'Verdun', 'Montréal', 45.456522, -73.573784, NULL, NULL, NULL, NULL, 1138533.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('387, rue Osborne', 'Verdun', 'Montréal', 45.451476, -73.569385, 254.0, 1928, NULL, NULL, 799333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1082, avenue Desmarchais', 'Verdun', 'Montréal', 45.454948, -73.57894, 297.0, 1932, NULL, NULL, 1038800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4020, rue Evelyn', 'Verdun', 'Montréal', 45.46378, -73.569851, 49.0, 2023, NULL, NULL, 625867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('67, rue Berlioz', 'Verdun', 'Montréal', 45.463764, -73.542118, 130.0, 1988, NULL, NULL, 436733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4309, rue de Verdun', 'Verdun', 'Montréal', 45.461072, -73.571782, 60.0, 2002, NULL, NULL, 387500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('850, rue Allard', 'Verdun', 'Montréal', 45.445945, -73.576256, 474.0, 1941, NULL, NULL, 1044533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('74, rue Gordon', 'Verdun', 'Montréal', 45.461062, -73.564471, 283.0, 1910, NULL, NULL, 1416700.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('394, rue de la Noue', 'Verdun', 'Montréal', 45.461639, -73.552794, 93.0, 1988, NULL, NULL, 395533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3949, boulevard Lasalle', 'Verdun', 'Montréal', 45.464254, -73.564906, 312.0, 1910, NULL, NULL, 1205800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3901, boulevard Lasalle', 'Verdun', 'Montréal', 45.465086, -73.564957, 334.0, 1924, NULL, NULL, 1528900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4201, rue de Verdun', 'Verdun', 'Montréal', 45.461978, -73.571623, 293.0, 1968, NULL, NULL, 118345.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3350, rue Joseph', 'Verdun', 'Montréal', 45.47025, -73.571521, 232.0, 1949, NULL, NULL, 932033.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5589, boulevard Champlain', 'Verdun', 'Montréal', 45.451905, -73.583468, 316.0, 1951, NULL, NULL, 1283300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1661, rue Lloyd-George', 'Verdun', 'Montréal', 45.438546, -73.591199, 478.0, 1944, NULL, NULL, 708133.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('734, rue Allard', 'Verdun', 'Montréal', 45.446211, -73.575801, 381.0, 1930, NULL, NULL, 680500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('733, 5e Avenue', 'Verdun', 'Montréal', 45.442963, -73.668743, NULL, NULL, NULL, NULL, 1046700.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1235, rue Leclair', 'Verdun', 'Montréal', 45.439309, -73.585138, 465.0, 1947, NULL, NULL, 962800.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('367, rue Corot', 'Verdun', 'Montréal', 45.460813, -73.542026, 648.0, 1980, NULL, NULL, 1087800.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('724, rue Osborne', 'Verdun', 'Montréal', 45.45127, -73.573716, 213.0, 1981, NULL, NULL, 922000.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('382, rue de la Noue', 'Verdun', 'Montréal', 45.461642, -73.552994, 125.0, 1988, NULL, NULL, 516233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('707, rue Riverview', 'Verdun', 'Montréal', 45.44674, -73.574566, 226.0, 1930, NULL, NULL, 763400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1231, rue Valiquette', 'Verdun', 'Montréal', 45.446318, -73.58241, 234.0, 1949, NULL, NULL, 797667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4340, rue Bannantyne', 'Verdun', 'Montréal', 45.460811, -73.575607, 179.0, 1956, NULL, NULL, 524533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1430, rue Rolland', 'Verdun', 'Montréal', 45.446299, -73.586674, 368.0, 1957, NULL, NULL, 1191967.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1516, rue Rolland', 'Verdun', 'Montréal', 45.446464, -73.587695, 235.0, 1954, NULL, NULL, 821567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('383, avenue Desmarchais', 'Verdun', 'Montréal', 45.454972, -73.571565, 163.0, 1930, NULL, NULL, 486600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3991, boulevard Lasalle', 'Verdun', 'Montréal', 45.463745, -73.564551, 174.0, 1913, NULL, NULL, 885000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4207, rue de Verdun', 'Verdun', 'Montréal', 45.461913, -73.571721, 204.0, 1927, NULL, NULL, 613900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('489, rue Brault', 'Verdun', 'Montréal', 45.447926, -73.572411, 91.0, 1998, NULL, NULL, 330000.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4301, rue de Verdun', 'Verdun', 'Montréal', 45.461072, -73.571782, 85.0, 2002, NULL, NULL, 500033.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3286, rue de Verdun', 'Verdun', 'Montréal', 45.47085, -73.570375, 237.0, 1929, NULL, NULL, 506833.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3972, rue Claude', 'Verdun', 'Montréal', 45.464365, -73.573072, 102.0, 2013, NULL, NULL, 680067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1299, rue Leclair', 'Verdun', 'Montréal', 45.439447, -73.585999, 227.0, 1945, NULL, NULL, 594900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('321, rue de la Noue', 'Verdun', 'Montréal', 45.461655, -73.554012, 103.0, 1987, NULL, NULL, 341133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1491, rue Leclair', 'Verdun', 'Montréal', 45.439867, -73.58862, 348.0, 1954, NULL, NULL, 649200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4336, boulevard Lasalle', 'Verdun', 'Montréal', 45.460441, -73.562765, 554.0, 1869, NULL, NULL, 1100300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('738, rue Allard', 'Verdun', 'Montréal', 45.446234, -73.575942, 217.0, 1931, NULL, NULL, 746933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3626, rue Joseph', 'Verdun', 'Montréal', 45.46784, -73.571744, 57.0, 1928, NULL, NULL, 304500.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('586, rue Osborne', 'Verdun', 'Montréal', 45.451187, -73.571684, 184.0, 1928, NULL, NULL, 552367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('331, rue Caisse', 'Verdun', 'Montréal', 45.470931, -73.567052, 110.0, 1995, NULL, NULL, 441600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1248, avenue de l''Hotel-de-Ville', 'Ville-Marie', 'Montréal', 45.511189, -73.561235, NULL, NULL, NULL, NULL, 545067.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('120, rue de la Gauchetiere Ouest', 'Ville-Marie', 'Montréal', 45.506381, -73.561145, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('869, avenue Viger Est', 'Ville-Marie', 'Montréal', 45.514263, -73.553709, 66.0, 1990, NULL, NULL, 167900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2479, rue La Fontaine', 'Ville-Marie', 'Montréal', 45.531288, -73.550882, 178.0, 1885, NULL, NULL, 120000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1480, rue Wolfe', 'Ville-Marie', 'Montréal', 45.518315, -73.557902, 22.0, 2014, NULL, NULL, 294400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('630, rue William', 'Ville-Marie', 'Montréal', 45.499124, -73.556493, 16.0, 2006, NULL, NULL, 351600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('810, rue Lusignan', 'Ville-Marie', 'Montréal', 45.492961, -73.571155, 126.0, 1998, NULL, NULL, 739433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1586, rue de Champlain', 'Ville-Marie', 'Montréal', 45.522916, -73.55487, 78.0, 1890, NULL, NULL, 639267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1334, rue Logan', 'Ville-Marie', 'Montréal', 45.521076, -73.558099, 157.0, NULL, NULL, NULL, 855867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2521, rue La Fontaine', 'Ville-Marie', 'Montréal', 45.531656, -73.5503, 167.0, 1885, NULL, NULL, 584400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('827, avenue Viger Est', 'Ville-Marie', 'Montréal', 45.513814, -73.554153, 60.0, 1895, NULL, NULL, 427500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1215, rue Dorion', 'Ville-Marie', 'Montréal', 45.52314, -73.550039, 69.0, 1895, NULL, NULL, 372933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1109, rue Cypress', 'Ville-Marie', 'Montréal', 45.499168, -73.572012, 79.0, 1900, NULL, NULL, 433100.0, 2021, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, avenue Pierre-Dupuy', 'Ville-Marie', 'Montréal', 45.496454, -73.544784, NULL, NULL, NULL, NULL, 8943600.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1071, boulevard Saint-Laurent', 'Ville-Marie', 'Montréal', 45.508483, -73.560387, 264.0, 1974, NULL, NULL, 900000.0, 2022, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('703, rue de la Commune Est', 'Ville-Marie', 'Montréal', 45.511232, -73.550186, 46.0, 1994, NULL, NULL, 582867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('796, rue Lusignan', 'Ville-Marie', 'Montréal', 45.492855, -73.570988, 95.0, 1875, NULL, NULL, 303700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('81, rue de Bresoles', 'Ville-Marie', 'Montréal', 45.504875, -73.555753, NULL, NULL, NULL, NULL, 315467.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1215, boulevard Saint-Laurent', 'Ville-Marie', 'Montréal', 45.509762, -73.56312, 305.0, 1975, NULL, NULL, 436020.0, 2022, 'Hôtel (incluant les hôtels-motels)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('441, avenue du President-Kennedy', 'Ville-Marie', 'Montréal', 45.506715, -73.570579, NULL, NULL, NULL, NULL, 483467.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1687, rue Logan', 'Ville-Marie', 'Montréal', 45.523577, -73.555773, 62.0, 2000, NULL, NULL, 553233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('20, rue Saint-Paul Ouest', 'Ville-Marie', 'Montréal', 45.505204, -73.553906, 47.0, 1894, NULL, NULL, 586400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1200, boulevard de Maisonneuve Ouest', 'Ville-Marie', 'Montréal', 45.499902, -73.575478, 13.0, 2005, NULL, NULL, 612767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1070, rue de Bleury', 'Ville-Marie', 'Montréal', 45.504325, -73.563111, 17.0, 2007, NULL, NULL, 311567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('440, rue Sainte-Helene', 'Ville-Marie', 'Montréal', 45.501164, -73.558215, 200.0, 1870, NULL, NULL, 900000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5, place de Richelieu', 'Ville-Marie', 'Montréal', 45.499875, -73.580484, 83.0, 1925, NULL, NULL, 1306900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('141, avenue du President-Kennedy', 'Ville-Marie', 'Montréal', 45.509355, -73.569439, NULL, NULL, NULL, NULL, 900000.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1800, rue Sainte-Catherine Ouest', 'Ville-Marie', 'Montréal', 45.493616, -73.579174, 1501.0, NULL, NULL, NULL, 900000.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('831, avenue Viger Est', 'Ville-Marie', 'Montréal', 45.513814, -73.554153, 95.0, 1895, NULL, NULL, 445100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2251, rue de Champlain', 'Ville-Marie', 'Montréal', 45.526694, -73.563133, 90.0, 1910, NULL, NULL, 523433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2, terrasse Summerhill', 'Ville-Marie', 'Montréal', 45.497798, -73.582926, 215.0, 1923, NULL, NULL, 2206667.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1575, avenue Summerhill', 'Ville-Marie', 'Montréal', 45.496984, -73.584415, 2190.0, 1947, NULL, NULL, 21159133.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, place Phillips', 'Ville-Marie', 'Montréal', 45.503512, -73.567481, NULL, NULL, NULL, NULL, 33100.0, 2025, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1689, rue Logan', 'Ville-Marie', 'Montréal', 45.523577, -73.555773, 62.0, 2000, NULL, NULL, 553233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('259, rue de la Gauchetiere Ouest', 'Ville-Marie', 'Montréal', 45.505132, -73.562254, NULL, NULL, NULL, NULL, 1272733.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1691, rue Logan', 'Ville-Marie', 'Montréal', 45.523577, -73.555773, 62.0, 2000, NULL, NULL, 450700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2531, rue La Fontaine', 'Ville-Marie', 'Montréal', 45.53177, -73.550206, 335.0, 1926, NULL, NULL, 2352000.0, 2025, 'Maison de chambres et pension', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2521, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.530266, -73.54711, 47.0, 2003, NULL, NULL, 283433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1219, rue Dorion', 'Ville-Marie', 'Montréal', 45.52314, -73.550039, 39.0, 1895, NULL, NULL, 320833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('54, rue de Bresoles', 'Ville-Marie', 'Montréal', 45.505287, -73.555206, NULL, NULL, NULL, NULL, 746033.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('267, rue de la Gauchetiere Ouest', 'Ville-Marie', 'Montréal', 45.505044, -73.562321, NULL, NULL, NULL, NULL, 1303833.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1631, rue Wolfe', 'Ville-Marie', 'Montréal', 45.519084, -73.558788, 141.0, 1987, NULL, NULL, 899033.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1209, boulevard Saint-Laurent', 'Ville-Marie', 'Montréal', 45.509701, -73.563027, 597.0, 1982, NULL, NULL, 900000.0, 2022, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2500, avenue Pierre-Dupuy', 'Ville-Marie', 'Montréal', 45.497218, -73.544341, 169.0, 1989, NULL, NULL, 837067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1411, boulevard Saint-Laurent', 'Ville-Marie', 'Montréal', 45.509939, -73.564311, 486.0, 1880, NULL, NULL, 900000.0, 2022, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1221, rue Dorion', 'Ville-Marie', 'Montréal', 45.522986, -73.550224, 69.0, 1895, NULL, NULL, 372933.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('18, place Upper-Trafalgar', 'Ville-Marie', 'Montréal', 45.495914, -73.596847, 190.0, 1967, NULL, NULL, 1538433.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2421, rue La Fontaine', 'Ville-Marie', 'Montréal', 45.530538, -73.551158, 97.0, 1900, NULL, NULL, 810000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('28, place Upper-Trafalgar', 'Ville-Marie', 'Montréal', 45.496101, -73.596261, 246.0, 1967, NULL, NULL, 1243200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('830, rue Lusignan', 'Ville-Marie', 'Montréal', 45.493015, -73.571277, 124.0, 1998, NULL, NULL, 743733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1160, rue Mackay', 'Ville-Marie', 'Montréal', 45.494601, -73.574767, 6.0, 1942, NULL, NULL, 286333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue Wolfe', 'Ville-Marie', 'Montréal', 45.51741, -73.555576, NULL, NULL, NULL, NULL, 524267.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('699, rue de la Commune Est', 'Ville-Marie', 'Montréal', 45.511232, -73.550186, 29.0, 1994, NULL, NULL, 783333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1490, rue Montcalm', 'Ville-Marie', 'Montréal', 45.518714, -73.557767, 33.0, 2001, NULL, NULL, 352100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1229, rue Cartier', 'Ville-Marie', 'Montréal', 45.522755, -73.550267, 44.0, 1910, NULL, NULL, 306633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1300, rue Montcalm', 'Ville-Marie', 'Montréal', 45.517891, -73.555622, 256.0, 1900, NULL, NULL, 1155400.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1833, rue Tupper', 'Ville-Marie', 'Montréal', 45.492907, -73.579086, 215.0, 1875, NULL, NULL, 935333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2517, boulevard de Maisonneuve Est', 'Ville-Marie', 'Montréal', 45.530266, -73.54711, 47.0, 2003, NULL, NULL, 11167.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('0, rue de la Gauchetiere Ouest', 'Ville-Marie', 'Montréal', 45.501553, -73.564701, NULL, NULL, NULL, NULL, 900000.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1285, rue Wolfe', 'Ville-Marie', 'Montréal', 45.517634, -73.555682, 33.0, 1998, NULL, NULL, 246333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8717, avenue de l''Esplanade', 'Ahuntsic-Cartierville', 'Montréal', 45.538827, -73.644274, 392.0, 1957, NULL, NULL, 809933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10050, place de l''Acadie', 'Ahuntsic-Cartierville', 'Montréal', 45.53304, -73.681061, 29.0, 2014, NULL, NULL, 30800.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9617, rue d''Iberville', 'Ahuntsic-Cartierville', 'Montréal', 45.572516, -73.639751, 233.0, 1965, NULL, NULL, 634367.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10720, rue d''Iberville', 'Ahuntsic-Cartierville', 'Montréal', 45.57829, -73.654679, 511.0, 1960, NULL, NULL, 757233.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8790, rue Waverly', 'Ahuntsic-Cartierville', 'Montréal', 45.53943, -73.644973, 178.0, 1949, NULL, NULL, 631900.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12395, boulevard Toupin', 'Ahuntsic-Cartierville', 'Montréal', 45.525551, -73.737984, 795.0, 1982, NULL, NULL, 1879900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8796, rue Waverly', 'Ahuntsic-Cartierville', 'Montréal', 45.539735, -73.644904, 186.0, 1972, NULL, NULL, 580567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10710, rue d''Iberville', 'Ahuntsic-Cartierville', 'Montréal', 45.578238, -73.654516, 512.0, 1957, NULL, NULL, 933200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10752, rue d''Iberville', 'Ahuntsic-Cartierville', 'Montréal', 45.578503, -73.655143, 252.0, 1937, NULL, NULL, 403333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10095, avenue d''Auteuil', 'Ahuntsic-Cartierville', 'Montréal', 45.550436, -73.660112, 496.0, 1955, NULL, NULL, 990200.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8661, rue Joseph-Quintal', 'Ahuntsic-Cartierville', 'Montréal', 45.554125, -73.630079, 88.0, 1987, NULL, NULL, 465567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1842, rue Olivier-Berthelet', 'Ahuntsic-Cartierville', 'Montréal', 45.534429, -73.670677, 201.0, 1999, NULL, NULL, 557000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('350, rue Farly', 'Ahuntsic-Cartierville', 'Montréal', 45.545781, -73.642469, 76.0, 2001, NULL, NULL, 291933.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12460, rue Cousineau', 'Ahuntsic-Cartierville', 'Montréal', 45.530651, -73.726802, 336.0, 1989, NULL, NULL, 545767.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10850, rue Brousseau', 'Ahuntsic-Cartierville', 'Montréal', 45.577275, -73.657524, 649.0, 1976, NULL, NULL, 809500.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10420, rue Garnier', 'Ahuntsic-Cartierville', 'Montréal', 45.566628, -73.656199, 251.0, 1966, NULL, NULL, 734600.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8501, rue Joseph-Quintal', 'Ahuntsic-Cartierville', 'Montréal', 45.55355, -73.627617, 148.0, 1985, NULL, NULL, 482700.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10135, avenue d''Auteuil', 'Ahuntsic-Cartierville', 'Montréal', 45.550604, -73.660737, 496.0, 1952, NULL, NULL, 780133.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8730, rue Waverly', 'Ahuntsic-Cartierville', 'Montréal', 45.53919, -73.644156, 195.0, 1953, NULL, NULL, 590567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9999, boulevard de l''Acadie', 'Ahuntsic-Cartierville', 'Montréal', 45.535945, -73.666997, 40.0, 2005, NULL, NULL, 335300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12270, boulevard Toupin', 'Ahuntsic-Cartierville', 'Montréal', 45.523496, -73.736044, 474.0, 1961, NULL, NULL, 728767.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12315, boulevard Toupin', 'Ahuntsic-Cartierville', 'Montréal', 45.524363, -73.736548, 613.0, 1980, NULL, NULL, 1030200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12054, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.532017, -73.709628, NULL, NULL, NULL, NULL, 436967.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1542, rue Palmieri', 'Ahuntsic-Cartierville', 'Montréal', 45.561911, -73.647654, 201.0, 1984, NULL, NULL, 505633.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10320, avenue du Sacre-Coeur', 'Ahuntsic-Cartierville', 'Montréal', 45.56038, -73.658333, NULL, NULL, NULL, NULL, 894300.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1554, rue Palmieri', 'Ahuntsic-Cartierville', 'Montréal', 45.562307, -73.647814, 203.0, 1985, NULL, NULL, 507067.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12580, rue Odette-Oligny', 'Ahuntsic-Cartierville', 'Montréal', 45.532224, -73.724884, 239.0, 1988, NULL, NULL, 440867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1155, rue Fleury Est', 'Ahuntsic-Cartierville', 'Montréal', 45.558856, -73.658965, 197.0, 1955, NULL, NULL, 598180.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2375, boulevard Henri-Bourassa Est', 'Ahuntsic-Cartierville', 'Montréal', 45.576446, -73.655158, 696.0, 1963, NULL, NULL, 2891933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10260, avenue Curotte', 'Ahuntsic-Cartierville', 'Montréal', 45.56296, -73.655978, 48.0, 2001, NULL, NULL, 468867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1220, rue Etienne-Blanchard', 'Ahuntsic-Cartierville', 'Montréal', 45.555613, -73.633713, 108.0, 1983, NULL, NULL, 309900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8816, rue Waverly', 'Ahuntsic-Cartierville', 'Montréal', 45.539538, -73.645344, 170.0, 1960, NULL, NULL, 720067.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10328, avenue du Sacre-Coeur', 'Ahuntsic-Cartierville', 'Montréal', 45.560416, -73.658525, NULL, NULL, NULL, NULL, 807533.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10184, rue Saint-Hubert', 'Ahuntsic-Cartierville', 'Montréal', 45.555593, -73.658464, 440.0, 1949, NULL, NULL, 949567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1980, rue Pierre-Ayot', 'Ahuntsic-Cartierville', 'Montréal', 45.534404, -73.669411, 136.0, 1999, NULL, NULL, 504600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2405, boulevard Henri-Bourassa Est', 'Ahuntsic-Cartierville', 'Montréal', 45.577186, -73.654994, 427.0, 1964, NULL, NULL, 1145867.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11475, rue Frigon', 'Ahuntsic-Cartierville', 'Montréal', 45.536207, -73.688233, 373.0, 1961, NULL, NULL, 573767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1029, avenue Louis-Archambault', 'Ahuntsic-Cartierville', 'Montréal', 45.555857, -73.644079, 254.0, 1981, NULL, NULL, 635333.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10585, rue Chambord', 'Ahuntsic-Cartierville', 'Montréal', 45.561211, -73.66262, 465.0, 1916, NULL, NULL, 1090900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10440, rue Garnier', 'Ahuntsic-Cartierville', 'Montréal', 45.566668, -73.656294, 280.0, 1966, NULL, NULL, 721167.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('10201, rue Rene-Bauset', 'Ahuntsic-Cartierville', 'Montréal', 45.538867, -73.669895, 209.0, 2005, NULL, NULL, 563400.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8391, rue Aurele-Allard', 'Ahuntsic-Cartierville', 'Montréal', 45.555144, -73.625456, NULL, NULL, NULL, NULL, 1087900.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1795, rue Prieur Est', 'Ahuntsic-Cartierville', 'Montréal', 45.568947, -73.656129, 503.0, 1957, NULL, NULL, 540433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12111, rue de Saint-Real', 'Ahuntsic-Cartierville', 'Montréal', 45.544441, -73.697307, 143.0, 2004, NULL, NULL, 686267.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('680, rue Fleury Est', 'Ahuntsic-Cartierville', 'Montréal', 45.555275, -73.660503, 362.0, 1946, NULL, NULL, 875200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11794, rue de Meulles', 'Ahuntsic-Cartierville', 'Montréal', 45.525662, -73.705697, 444.0, 1958, NULL, NULL, 549867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8939, rue Berri', 'Ahuntsic-Cartierville', 'Montréal', 45.547361, -73.64303, 186.0, 1949, NULL, NULL, 504200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12129, boulevard de l''Acadie', 'Ahuntsic-Cartierville', 'Montréal', 45.542193, -73.699113, 602.0, 1953, NULL, NULL, 547867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12080, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.532289, -73.71007, NULL, NULL, NULL, NULL, 399667.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9620, boulevard Saint-Michel', 'Ahuntsic-Cartierville', 'Montréal', 45.575906, -73.636959, 250.0, 1960, NULL, NULL, 437700.0, 2024, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1722, rue Joseph-Lamarche', 'Ahuntsic-Cartierville', 'Montréal', 45.563775, -73.647051, 203.0, 1983, NULL, NULL, 501333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9319, rue Saint-Denis', 'Ahuntsic-Cartierville', 'Montréal', 45.548416, -73.649191, 174.0, 1959, NULL, NULL, 874300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12181, boulevard Taylor', 'Ahuntsic-Cartierville', 'Montréal', 45.541109, -73.70207, 466.0, 1958, NULL, NULL, 793200.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1507, rue Sauve Est', 'Ahuntsic-Cartierville', 'Montréal', 45.560988, -73.650513, NULL, NULL, NULL, NULL, 401000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1375, rue Sauve Est', 'Ahuntsic-Cartierville', 'Montréal', 45.559071, -73.65166, NULL, NULL, NULL, NULL, 429433.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1041, avenue Louis-Archambault', 'Ahuntsic-Cartierville', 'Montréal', 45.556109, -73.643927, 254.0, 1981, NULL, NULL, 613233.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1012, boulevard Henri-Bourassa Est', 'Ahuntsic-Cartierville', 'Montréal', 45.559844, -73.665673, 227.0, 1922, NULL, NULL, 237440.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('656, rue Fleury Est', 'Ahuntsic-Cartierville', 'Montréal', 45.554999, -73.660736, 292.0, 1946, NULL, NULL, 717400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('11960, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.530692, -73.707545, NULL, NULL, NULL, NULL, 364833.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('12086, rue Saint-Evariste', 'Ahuntsic-Cartierville', 'Montréal', 45.532381, -73.710217, NULL, NULL, NULL, NULL, 451800.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6097, rue d''Aragon', 'Le Sud-Ouest', 'Montréal', 45.456944, -73.599135, 157.0, 1910, NULL, NULL, 521433.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1958, rue Workman', 'Le Sud-Ouest', 'Montréal', 45.486607, -73.570468, 149.0, 1983, NULL, NULL, 781000.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('737, rue d''Hibernia', 'Le Sud-Ouest', 'Montréal', 45.477334, -73.561676, 193.0, 1890, NULL, NULL, 720200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1946, rue Workman', 'Le Sud-Ouest', 'Montréal', 45.486745, -73.570344, 149.0, 1983, NULL, NULL, 710500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2807, rue Springland', 'Le Sud-Ouest', 'Montréal', 45.453366, -73.598913, 242.0, 1938, NULL, NULL, 364600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6237, rue d''Aragon', 'Le Sud-Ouest', 'Montréal', 45.455676, -73.598667, 209.0, 1922, NULL, NULL, 620667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2211, rue Workman', 'Le Sud-Ouest', 'Montréal', 45.485336, -73.573011, 171.0, 1982, NULL, NULL, 782100.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1045, rue Wellington', 'Le Sud-Ouest', 'Montréal', 45.493441, -73.556713, 10.0, 2013, NULL, NULL, 269100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1221, rue Island', 'Le Sud-Ouest', 'Montréal', 45.48187, -73.564708, 485.0, NULL, NULL, NULL, 1454600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('314, rue Charon', 'Le Sud-Ouest', 'Montréal', 45.479032, -73.552523, 786.0, 2003, NULL, NULL, 2943300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6914, avenue Irwin', 'Le Sud-Ouest', 'Montréal', 45.447665, -73.604145, 92.0, 2004, NULL, NULL, 460667.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6085, rue Hurteau', 'Le Sud-Ouest', 'Montréal', 45.456775, -73.600972, 155.0, 1964, NULL, NULL, 801767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4150, rue Saint-Ambroise', 'Le Sud-Ouest', 'Montréal', 45.474, -73.581064, 56.0, 2008, NULL, NULL, 425300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1946, boulevard Desmarchais', 'Le Sud-Ouest', 'Montréal', 45.455505, -73.592019, 232.0, 1946, NULL, NULL, 669533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('705, rue Bourassa', 'Le Sud-Ouest', 'Montréal', 45.470906, -73.59475, 143.0, 1885, NULL, NULL, 427200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5673, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.461558, -73.588254, 204.0, 1910, NULL, NULL, 409167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2280, rue Notre-Dame Ouest', 'Le Sud-Ouest', 'Montréal', 45.484237, -73.572689, 55.0, 1988, NULL, NULL, 242300.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2347, rue Coursol', 'Le Sud-Ouest', 'Montréal', 45.487203, -73.577666, 167.0, 1875, NULL, NULL, 542367.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1209, rue Island', 'Le Sud-Ouest', 'Montréal', 45.481718, -73.564611, 510.0, NULL, NULL, NULL, 1098300.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1244, rue Charlevoix', 'Le Sud-Ouest', 'Montréal', 45.478944, -73.569874, 46.0, 2003, NULL, NULL, 258300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1400, rue Ottawa', 'Le Sud-Ouest', 'Montréal', 45.490124, -73.562548, 25.0, 2022, NULL, NULL, 686767.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3470, rue Fabien-Laberge', 'Le Sud-Ouest', 'Montréal', 45.450611, -73.604733, 213.0, 1990, NULL, NULL, 727367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2592, rue Saint-Charles', 'Le Sud-Ouest', 'Montréal', 45.478666, -73.5704, 58.0, 2003, NULL, NULL, 291300.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2582, rue Saint-Charles', 'Le Sud-Ouest', 'Montréal', 45.478666, -73.5704, 70.0, 2003, NULL, NULL, 347900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6922, avenue Irwin', 'Le Sud-Ouest', 'Montréal', 45.447602, -73.604113, 95.0, 2004, NULL, NULL, 428033.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2680, rue Raudot', 'Le Sud-Ouest', 'Montréal', 45.447556, -73.595278, 216.0, 1955, NULL, NULL, 605533.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6823, avenue de Monts', 'Le Sud-Ouest', 'Montréal', 45.448647, -73.604034, 68.0, 1996, NULL, NULL, 401400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('860, rue Charlevoix', 'Le Sud-Ouest', 'Montréal', 45.475846, -73.565016, 277.0, 1985, NULL, NULL, 1086567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('309, rue Bourgeoys', 'Le Sud-Ouest', 'Montréal', 45.480095, -73.552177, 73.0, 2011, NULL, NULL, 408100.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2230, rue Delisle', 'Le Sud-Ouest', 'Montréal', 45.48544, -73.573376, 172.0, 1982, NULL, NULL, 720833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3430, rue Fabien-Laberge', 'Le Sud-Ouest', 'Montréal', 45.450693, -73.604308, 213.0, 1990, NULL, NULL, 755900.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2080, rue Saint-Jacques', 'Le Sud-Ouest', 'Montréal', 45.48722, -73.573462, 125.0, 1986, NULL, NULL, 306333.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1900, rue Sullivan', 'Le Sud-Ouest', 'Montréal', 45.482223, -73.562168, 546.0, 1912, NULL, NULL, 425933.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2243, rue Coursol', 'Le Sud-Ouest', 'Montréal', 45.487828, -73.576598, 151.0, 1875, NULL, NULL, 958800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1117, rue Soulanges', 'Le Sud-Ouest', 'Montréal', 45.481384, -73.562612, 164.0, 1885, NULL, NULL, 845867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2201, rue Workman', 'Le Sud-Ouest', 'Montréal', 45.485375, -73.572945, 171.0, 1982, NULL, NULL, 702067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5651, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.461807, -73.58781, 242.0, 1950, NULL, NULL, 101691.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1117, rue Island', 'Le Sud-Ouest', 'Montréal', 45.480727, -73.56336, 169.0, 1900, NULL, NULL, 669567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('819, rue d''Hibernia', 'Le Sud-Ouest', 'Montréal', 45.477912, -73.56211, 363.0, 1890, NULL, NULL, 961467.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1155, rue Island', 'Le Sud-Ouest', 'Montréal', 45.481016, -73.563686, 494.0, 1976, NULL, NULL, 1170567.0, 2026, 'Logements sociaux et abordables', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6910, avenue Irwin', 'Le Sud-Ouest', 'Montréal', 45.447713, -73.604139, 92.0, 2004, NULL, NULL, 460667.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2074, rue Delisle', 'Le Sud-Ouest', 'Montréal', 45.486301, -73.571972, 149.0, 1984, NULL, NULL, 718500.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1950, boulevard Desmarchais', 'Le Sud-Ouest', 'Montréal', 45.455504, -73.592134, 232.0, 1944, NULL, NULL, 646767.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('870, rue Charlevoix', 'Le Sud-Ouest', 'Montréal', 45.475968, -73.565205, 252.0, 1985, NULL, NULL, 1029833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1301, rue de Conde', 'Le Sud-Ouest', 'Montréal', 45.486553, -73.559781, NULL, NULL, NULL, NULL, 900000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2270, rue Notre-Dame Ouest', 'Le Sud-Ouest', 'Montréal', 45.484332, -73.57254, 77.0, 1990, NULL, NULL, 270967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2241, rue Workman', 'Le Sud-Ouest', 'Montréal', 45.485214, -73.573219, 171.0, 1982, NULL, NULL, 709667.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4200, rue Saint-Ambroise', 'Le Sud-Ouest', 'Montréal', 45.474, -73.581064, 33.0, 2008, NULL, NULL, 602967.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6000, rue Laurendeau', 'Le Sud-Ouest', 'Montréal', 45.458343, -73.588098, 1405.0, 1956, NULL, NULL, 1248600.0, 2025, 'Vente au détail de produits d''épicerie (avec boucherie)', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('152, rue Saint-Augustin', 'Le Sud-Ouest', 'Montréal', 45.477249, -73.580413, 61.0, 1875, NULL, NULL, 832800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1721, rue du Centre', 'Le Sud-Ouest', 'Montréal', 45.483635, -73.56119, 396.0, 2005, NULL, NULL, 1954200.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2604, rue Raudot', 'Le Sud-Ouest', 'Montréal', 45.447723, -73.594346, 190.0, 1955, NULL, NULL, 593967.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2825, rue Springland', 'Le Sud-Ouest', 'Montréal', 45.453303, -73.599227, 242.0, 1929, NULL, NULL, 387100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('5999, rue Hurteau', 'Le Sud-Ouest', 'Montréal', 45.457564, -73.601267, 154.0, 1910, NULL, NULL, 767800.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('681, rue Bourgeoys', 'Le Sud-Ouest', 'Montréal', 45.480079, -73.560186, 184.0, 1885, NULL, NULL, 814200.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2240, rue Delisle', 'Le Sud-Ouest', 'Montréal', 45.485402, -73.573451, 172.0, 1982, NULL, NULL, 784400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1888, rue Wellington', 'Le Sud-Ouest', 'Montréal', 45.481006, -73.558105, 34.0, 2012, NULL, NULL, 412733.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('665, boulevard Georges-Vanier', 'Le Sud-Ouest', 'Montréal', 45.487004, -73.5737, 148.0, 1986, NULL, NULL, 304167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('2245, rue Jacques-Hertel', 'Le Sud-Ouest', 'Montréal', 45.459811, -73.595072, 296.0, 1960, NULL, NULL, 945333.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1954, boulevard Desmarchais', 'Le Sud-Ouest', 'Montréal', 45.455502, -73.592232, 278.0, 1946, NULL, NULL, 958067.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7372, 2e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.556852, -73.604089, NULL, NULL, NULL, NULL, 443800.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8823, 14e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.571278, -73.621554, NULL, NULL, NULL, NULL, 352433.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7584, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.53954, -73.622078, 174.0, 1926, NULL, NULL, 1043633.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7083, avenue de l''Epee', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.527833, -73.622971, NULL, NULL, NULL, NULL, 379733.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8011, avenue Champagneur', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.530118, -73.635038, 530.0, 1933, NULL, NULL, 153700.0, 2023, 'Église, synagogue, mosquée et temple', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9067, 8e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.570299, -73.629224, NULL, NULL, NULL, NULL, 576367.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7451, 20e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.566881, -73.596723, NULL, NULL, NULL, NULL, 522000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8525, avenue Stuart', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.530804, -73.64403, 325.0, 1954, NULL, NULL, 816633.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6970, 20e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.563553, -73.589417, NULL, NULL, NULL, NULL, 686167.0, 2024, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7715, avenue Musset', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.564168, -73.603757, 211.0, 1965, NULL, NULL, 732100.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8851, 14e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.571556, -73.622183, NULL, NULL, NULL, NULL, 390433.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8843, 14e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.571475, -73.622003, NULL, NULL, NULL, NULL, 397233.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7311, 20e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.565941, -73.594621, NULL, NULL, NULL, NULL, 432000.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7965, avenue Champagneur', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.529898, -73.634371, 318.0, 1957, NULL, NULL, 931833.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('1, rue de Castelnau Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.535899, -73.619748, 36.0, 2004, NULL, NULL, 312833.0, 2021, 'Immeuble commercial', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7742, rue Saint-Denis', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540848, -73.623895, 279.0, 1927, NULL, NULL, 1016200.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8831, 14e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.571339, -73.621737, NULL, NULL, NULL, NULL, 352333.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8508, rue Waverly', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.538271, -73.639291, 263.0, 1951, NULL, NULL, 525167.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7362, rue Cartier', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.549639, -73.609415, 204.0, 1962, NULL, NULL, 818400.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7468, avenue Wiseman', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.526812, -73.628179, 338.0, 1950, NULL, NULL, 749767.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7695, avenue Musset', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.564036, -73.603472, 271.0, 1957, NULL, NULL, 750567.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7979, avenue Champagneur', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.529963, -73.634599, 177.0, 1947, NULL, NULL, 584900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7170, boulevard Pie-Ix', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.566164, -73.591168, 322.0, 1950, NULL, NULL, 496100.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7593, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539567, -73.622163, 220.0, 1928, NULL, NULL, 893800.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7340, 13e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.561093, -73.599407, NULL, NULL, NULL, NULL, 360433.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7600, avenue Bloomfield', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.528721, -73.629295, 166.0, 1967, NULL, NULL, 750267.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7452, avenue Wiseman', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.526468, -73.628083, 174.0, 1958, NULL, NULL, 674900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7939, rue Garnier', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.550592, -73.618166, 407.0, 1951, NULL, NULL, 800100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8500, rue Waverly', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.538237, -73.639182, 289.0, 1951, NULL, NULL, 538533.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7735, rue Berri', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.541459, -73.623392, 221.0, 1925, NULL, NULL, 1042400.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8267, avenue Casgrain', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.54103, -73.633366, 177.0, 1917, NULL, NULL, 803000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7885, rue Garnier', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.550168, -73.617296, 232.0, 1955, NULL, NULL, 983100.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7478, avenue Wiseman', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.526556, -73.628436, 168.0, 1929, NULL, NULL, 489000.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7301, 20e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.565869, -73.594438, NULL, NULL, NULL, NULL, 444733.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7805, rue Louis-Hemon', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.555765, -73.611895, 314.0, 1952, NULL, NULL, 595367.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7401, 20e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.566524, -73.595903, NULL, NULL, NULL, NULL, 551100.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3845, rue Jean-Talon Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.564768, -73.593385, 908.0, 1961, NULL, NULL, 900000.0, 2026, 'Autres services de l''automobile', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('657, rue Gounod', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.544741, -73.62512, 259.0, 1910, NULL, NULL, 244013.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7467, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539082, -73.620608, 174.0, 1910, NULL, NULL, 829967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8945, 14e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.572683, -73.623955, NULL, NULL, NULL, NULL, 433500.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7190, rue Sagard', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.551489, -73.604958, 369.0, 1942, NULL, NULL, 980933.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7270, avenue Stuart', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.525486, -73.626778, 181.0, 1950, NULL, NULL, 433600.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7540, 2e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.557864, -73.606379, NULL, NULL, NULL, NULL, 427700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7775, rue Louis-Hemon', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.555613, -73.611613, 418.0, 1950, NULL, NULL, 597700.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6960, 19e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.562843, -73.589918, NULL, NULL, NULL, NULL, 449567.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7068, rue Durocher', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.528573, -73.621897, 177.0, 2011, NULL, NULL, 676900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3931, rue Jean-Talon Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.565794, -73.592463, 313.0, 1986, NULL, NULL, 472333.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7310, rue Cartier', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.54932, -73.608694, 346.0, 1947, NULL, NULL, 760000.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9271, 15e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.575907, -73.629696, NULL, NULL, NULL, NULL, 758900.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8953, 14e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.572763, -73.624139, NULL, NULL, NULL, NULL, 427200.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8125, avenue Champagneur', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.530617, -73.636771, 359.0, 1945, NULL, NULL, 457567.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7702, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539989, -73.623661, 279.0, 1926, NULL, NULL, 465760.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6965, 19e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.563151, -73.589646, NULL, NULL, NULL, NULL, 506700.0, 2021, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7270, avenue Wiseman', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.526008, -73.626451, 173.0, 1947, NULL, NULL, 548900.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7441, 20e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.566811, -73.59656, NULL, NULL, NULL, NULL, 500300.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8553, avenue Stuart', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.530958, -73.644609, 244.0, 1953, NULL, NULL, 548267.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8595, avenue Stuart', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.530882, -73.645392, 195.0, 1948, NULL, NULL, 636200.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('6992, rue Sagard', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.549951, -73.601442, 205.0, 1925, NULL, NULL, 618167.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('4041, rue Jean-Talon Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.566205, -73.59197, 733.0, 1960, NULL, NULL, 4384600.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7720, avenue Bloomfield', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.529038, -73.630444, 192.0, 1953, NULL, NULL, 792667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3608, rue Legendre Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.574688, -73.62443, 244.0, 1958, NULL, NULL, 569867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('3775, rue Jean-Talon Est', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.563813, -73.594198, 244.0, 1959, NULL, NULL, 1210867.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8235, avenue Casgrain', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540881, -73.632853, 177.0, 1923, NULL, NULL, 887067.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7535, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539624, -73.62117, 211.0, 1939, NULL, NULL, 890533.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9291, 15e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.576052, -73.630029, NULL, NULL, NULL, NULL, 868100.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7776, avenue Bloomfield', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.529635, -73.631248, 166.0, 1947, NULL, NULL, 360433.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7506, avenue Wiseman', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.526647, -73.628864, 336.0, 1952, NULL, NULL, 790400.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7730, avenue Bloomfield', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.529074, -73.630559, 192.0, 1953, NULL, NULL, 792667.0, 2021, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7435, rue Sagard', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.553259, -73.607907, 475.0, 1950, NULL, NULL, 663133.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7785, rue Louis-Hemon', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.555693, -73.611793, 418.0, 1950, NULL, NULL, 774867.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7553, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539693, -73.621441, 228.0, 1921, NULL, NULL, 506700.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7975, avenue Champagneur', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.529934, -73.634502, 212.0, 1945, NULL, NULL, 534967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7768, rue Foucher', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.543442, -73.623326, 174.0, 1946, NULL, NULL, 826300.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7112, 15e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.561054, -73.594312, NULL, NULL, NULL, NULL, 677233.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8135, avenue Champagneur', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.530658, -73.636957, 353.0, 1943, NULL, NULL, 482867.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7432, avenue Wiseman', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.526374, -73.627808, 176.0, 1923, NULL, NULL, 335700.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7712, rue Foucher', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.54324, -73.622438, 135.0, 1910, NULL, NULL, 639900.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7241, rue Marquette', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.548224, -73.609183, 194.0, 1949, NULL, NULL, 619833.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7541, rue Drolet', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.539652, -73.621265, 220.0, 1910, NULL, NULL, 727967.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9231, 15e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.57562, -73.629034, NULL, NULL, NULL, NULL, 846333.0, 2023, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8247, avenue Casgrain', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540985, -73.633026, 312.0, 1950, NULL, NULL, 965733.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7710, rue Foucher', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.543211, -73.622338, 153.0, 1910, NULL, NULL, 749500.0, 2025, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('8253, avenue Casgrain', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540964, -73.633147, 177.0, 1914, NULL, NULL, 577500.0, 2023, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7690, rue Saint-Denis', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.540591, -73.622939, 232.0, 1929, NULL, NULL, 443960.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7217, rue Marquette', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.548041, -73.608767, 200.0, 1944, NULL, NULL, 681600.0, 2024, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7180, rue Sagard', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.551408, -73.604766, 410.0, 1944, NULL, NULL, 995667.0, 2026, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('404, rue Saint-Roch', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.53204, -73.628373, 73.0, 2009, NULL, NULL, 220900.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('9017, 8e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.569839, -73.628172, NULL, NULL, NULL, NULL, 573867.0, 2026, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7264, avenue Stuart', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.525459, -73.626665, 181.0, 1950, NULL, NULL, 454700.0, 2022, 'Logement', 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

INSERT INTO public.property_profiles (address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source)
VALUES ('7530, 2e Avenue', 'Villeray–Saint-Michel–Parc-Extension', 'Montréal', 45.557838, -73.606317, NULL, NULL, NULL, NULL, 540700.0, 2022, NULL, 'Ville de Montréal — Données ouvertes', 'https://donnees.montreal.ca/dataset/taxes-municipales', NULL, NULL, NULL, NULL);

