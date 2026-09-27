-- ============================================================
-- NESTA — seed.demo.sql (OPTIONNEL — développement uniquement)
--
-- DEMO — DONNÉES DE DÉVELOPPEMENT UNIQUEMENT.
-- Ne jamais exécuter en production.
-- ============================================================
-- Rôle : insère 2 propriétés FICTIVES aux adresses évidemment
-- fausses ('1000 rue de la Démo', '999 boulevard Fictif') pour
-- tester l'affichage / la recherche en environnement de dev.
--
-- PRÉREQUIS :
--   1. Migrations 000001 → 000007 exécutées dans l'ordre.
--   2. Remplacer v_owner_id ci-dessous par l'id d'un profil
--      existant :
--        select id, display_name from public.profiles;
--      (Exécuté comme postgres dans l'éditeur SQL, la RLS est
--      contournée ; via l'API, le profil devrait aussi avoir un
--      rôle SELLER/BROKER/AGENCY/DEVELOPER/ADMIN.)
--
-- SÉCURITÉ : si v_owner_id ne correspond à aucun profil, le
-- script ne fait RIEN (simple notice) — il est inoffensif par
-- défaut. Aucune donnée réelle n'est inventée : tout est
-- marqué comme démo, y compris dans la description.
-- ============================================================

do $$
declare
  v_owner_id uuid := '00000000-0000-0000-0000-000000000000'; -- <<-- REMPLACER par un profiles.id existant
  v_p1 uuid;
  v_p2 uuid;
begin
  if not exists (select 1 from public.profiles where id = v_owner_id) then
    raise notice 'seed.demo.sql : v_owner_id ne correspond à aucun profil — aucune donnée insérée. Remplacez v_owner_id par un profiles.id existant.';
    return;
  end if;

  -- Propriété démo #1 : condo fictif, adresse évidemment fausse.
  insert into public.properties (
    owner_id, listing_type, status,
    address, city, province, postal_code,
    latitude, longitude,
    asking_price, property_type,
    bedrooms, bathrooms, living_area,
    year_built, description
  ) values (
    v_owner_id, 'sale', 'published',
    '1000 rue de la Démo', 'Montréal', 'QC', 'H0H 0H0',
    45.5017, -73.5673,
    499000, 'condo',
    2, 1.0, 85.5,
    1999, 'DONNÉES DE DÉMO — annonce fictive pour le développement local uniquement.'
  ) returning id into v_p1;

  insert into public.property_media (property_id, kind, storage_path, caption, position)
  values (v_p1, 'photo', 'demo/1000-rue-de-la-demo/photo-01.jpg', 'Photo de démonstration', 0);

  -- Propriété démo #2 : maison fictive, adresse évidemment fausse.
  insert into public.properties (
    owner_id, listing_type, status,
    address, city, province, postal_code,
    latitude, longitude,
    asking_price, property_type,
    bedrooms, bathrooms, lot_area,
    description
  ) values (
    v_owner_id, 'sale', 'published',
    '999 boulevard Fictif', 'Laval', 'QC', 'H0H 0H0',
    45.6066, -73.7124,
    749000, 'house',
    4, 2.5, 450.0,
    'DONNÉES DE DÉMO — annonce fictive pour le développement local uniquement.'
  ) returning id into v_p2;

  insert into public.property_media (property_id, kind, storage_path, caption, position)
  values (v_p2, 'photo', 'demo/999-boulevard-fictif/photo-01.jpg', 'Photo de démonstration', 0);

  raise notice 'seed.demo.sql : 2 propriétés de démo insérées (ids % et %).', v_p1, v_p2;
end
$$;
