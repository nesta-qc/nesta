-- Correctif doublon : 175 Verchères, Longueuil
-- Contexte : audit du 2026-10-01 sur les 527 199 lignes sources réellement
-- importées (csv_mont v1..v92 + seed_batch2_unique + seed_vaudreuil_unique).
-- Un seul doublon trouvé : deux lignes pour le même immeuble, issues du même
-- fichier source RL58227_2026.xml, avec une variante d'accent :
--   - "175, Verchères" (v55) : 546 000 $  <- STALE, ne correspond plus au XML
--   - "175, Vercheres"  (v57) : 512 600 $  <- CONFORME au XML actuel
--      (RL0402A=215600 terrain + RL0403A=297000 bâtiment = RL0404A=512600)
-- On garde la ligne v57 (sans accent), on supprime la ligne v55.
--
-- ÉTAPE 1 — vérifier (lecture seule) :
SELECT id, address, city, assessment_total, assessment_year, source_url
FROM property_profiles
WHERE city = 'Longueuil'
  AND address IN ('175, Verchères', '175, Vercheres');

-- Attendu : 2 lignes. Si autre chose, STOP, ne pas exécuter l'étape 2.

-- ÉTAPE 2 — supprimer la ligne stale (à approuver par Gabriel avant exécution) :
-- DELETE FROM property_profiles
-- WHERE city = 'Longueuil'
--   AND address = '175, Verchères'
--   AND assessment_total = 546000;

-- ÉTAPE 3 — vérifier après :
-- SELECT count(*) FROM property_profiles
-- WHERE city = 'Longueuil' AND address LIKE '%Vercheres%';
-- Attendu : 1 ligne restante ("175, Vercheres", 512600).
