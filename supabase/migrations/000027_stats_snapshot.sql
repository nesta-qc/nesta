-- VEYLA — Centralisation des statistiques du marché.
-- Avec ~5 000 nouvelles propriétés par jour, recalculer les agrégats à
-- chaque visite serait du gaspillage : UNE seule ligne porte les agrégats
-- pré-calculés pour tout le site (lib/statistiques/snapshot.ts).
-- Le snapshot se rafraîchit automatiquement dès qu'il dépasse 1 h
-- (fonction refresh_stats_snapshot, verrou anti-concurrence).
-- Lecture publique, écriture réservée à la fonction SECURITY DEFINER.

CREATE TABLE IF NOT EXISTS public.stats_snapshot (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  payload jsonb NOT NULL,
  row_count integer NOT NULL DEFAULT 0,
  computed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stats_snapshot ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lecture publique du snapshot stats" ON public.stats_snapshot;
CREATE POLICY "Lecture publique du snapshot stats"
  ON public.stats_snapshot FOR SELECT
  TO anon, authenticated
  USING (true);

-- Recalcule les agrégats via market_stats() et remplace le snapshot.
-- pg_try_advisory_lock : un seul rafraîchissement à la fois même si
-- plusieurs instances (Vercel) le demandent simultanément.
CREATE OR REPLACE FUNCTION public.refresh_stats_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_payload jsonb;
  v_total integer;
BEGIN
  IF NOT pg_try_advisory_lock(874215) THEN
    RETURN; -- un autre worker rafraîchit déjà, on ne fait rien
  END IF;
  BEGIN
    v_payload := public.market_stats();
    v_total := COALESCE((v_payload ->> 'total')::integer, 0);
    INSERT INTO public.stats_snapshot (id, payload, row_count, computed_at)
    VALUES (1, v_payload, v_total, now())
    ON CONFLICT (id) DO UPDATE SET
      payload = EXCLUDED.payload,
      row_count = EXCLUDED.row_count,
      computed_at = EXCLUDED.computed_at;
  EXCEPTION WHEN OTHERS THEN
    PERFORM pg_advisory_unlock(874215);
    RAISE;
  END;
  PERFORM pg_advisory_unlock(874215);
END;
$$;

REVOKE ALL ON FUNCTION public.refresh_stats_snapshot() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.refresh_stats_snapshot() TO anon, authenticated;

-- Amorçage immédiat : le premier snapshot existe dès l'application.
SELECT public.refresh_stats_snapshot();

-- Rafraîchissement proactif toutes les heures (optionnel).
-- À activer manuellement dans le SQL Editor si pg_cron est disponible :
--   CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
--   SELECT cron.schedule('refresh-stats-snapshot', '0 * * * *',
--     'SELECT public.refresh_stats_snapshot();');
