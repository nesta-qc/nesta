-- NESTA — migration 000015 : cache des agrégats /statistiques.
-- Contexte : market_stats() (000014) met ~5 s en SQL Editor mais dépasse le
-- statement_timeout du rôle anon via l'API PostgREST (erreur 57014).
-- Solution : vue matérialisée + la fonction lit le cache (< 10 ms) ;
-- rafraîchissement quotidien via pg_cron (les données ne changent qu'aux imports).
CREATE MATERIALIZED VIEW IF NOT EXISTS public.market_stats_mv AS
  SELECT public.market_stats() AS stats;

GRANT SELECT ON public.market_stats_mv TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.market_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT stats FROM public.market_stats_mv
$$;

GRANT EXECUTE ON FUNCTION public.market_stats() TO anon, authenticated;

CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'refresh-market-stats',
  '0 4 * * *',
  'REFRESH MATERIALIZED VIEW public.market_stats_mv'
);
