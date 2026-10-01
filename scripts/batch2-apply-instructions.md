# Application lots 2 + 3 — consignes pour la tâche navigateur (parent)

## Fichiers (générés, à appliquer DANS L'ORDRE, UN SEUL À LA FOIS)
Lot 2 (~1 660 profils) :
- `~/workspace/nesta/supabase/seed_property_profiles_2a.sql`
- `~/workspace/nesta/supabase/seed_property_profiles_2b.sql`
- `~/workspace/nesta/supabase/seed_property_profiles_2c.sql`
- `~/workspace/nesta/supabase/seed_property_profiles_2d.sql`

Lot 3 (~3 135 profils) :
- `~/workspace/nesta/supabase/seed_property_profiles_3a.sql`
- … `3b`, `3c`, `3d`, `3e`, `3f`, `3g.sql`

Chaque fichier : INSERTs one-shot (pas d'upsert), profils inédits uniquement
(dédupliqués contre le lot 1 et entre lots). ~450 INSERTs / ~450 Ko par fichier.
Total visé : 240 (lot 1) + ~1 660 (lot 2) + ~3 135 (lot 3) ≈ 5 035 profils.

## Procédure par fichier (SÉQUENTIELLE — jamais deux imports en parallèle)
1. https://supabase.com/dashboard/project/txvqkqwedwhtkoimosbg → SQL Editor → nouvelle requête.
2. AVANT : noter le count actuel :
   `select count(*) from property_profiles;`
3. Coller TOUT le contenu du fichier, exécuter. Si le collage est trop gros,
   découper le fichier en 2 moitiés et exécuter chaque moitié séparément
   (toujours séquentiel, dans l'ordre du fichier).
4. APRÈS : vérifier le delta (doit égaler le nombre d'INSERTs du fichier) :
   ```sql
   select count(*), count(distinct borough), count(distinct city) from property_profiles;
   select city, borough, count(*) from property_profiles group by city, borough order by city, borough;
   ```
5. Passer au fichier suivant SEULEMENT si le précédent a réussi.

## Vérification finale anti-doublons
```sql
select address, count(*) from property_profiles group by address having count(*) > 1;
```
Attendu : 0 ligne.

## En cas d'erreur ou de delta incomplet
- Ne PAS réappliquer un fichier déjà appliqué (one-shot, sinon doublons).
- Noter le fichier concerné, le count avant/après exact, le message d'erreur.
- STOPPER la séquence et rapporter : un fichier complémentaire sera généré
  pour les profils manquants.
