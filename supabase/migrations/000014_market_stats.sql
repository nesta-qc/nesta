-- NESTA — agrégats de la page /statistiques calculés côté Postgres.
-- Remplace le balayage applicatif des 532k+ lignes (533 requêtes paginées,
-- timeout garanti) par UNE seule requête d'agrégation (~1 s).
-- Fonction en lecture seule : aucun INSERT/UPDATE/DELETE.
CREATE OR REPLACE FUNCTION public.market_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH base AS (
    SELECT
      COALESCE(NULLIF(city, ''), 'Non précisé') AS city,
      COALESCE(NULLIF(borough, ''), 'Non précisé') AS borough,
      assessment_total,
      assessment_year,
      COALESCE(NULLIF(property_category, ''), 'Non précisé') AS category,
      construction_year
    FROM public.property_profiles
  ),
  overall AS (
    SELECT
      COUNT(*) AS total,
      ROUND(percentile_cont(0.5) WITHIN GROUP (ORDER BY assessment_total)) AS median_assessment,
      MIN(assessment_total) AS min_assessment,
      MAX(assessment_total) AS max_assessment,
      ROUND(percentile_cont(0.5) WITHIN GROUP (ORDER BY construction_year)) AS median_year,
      MIN(construction_year) AS oldest_year,
      MAX(construction_year) AS newest_year
    FROM base
  ),
  by_borough AS (
    SELECT borough, COUNT(*) AS cnt,
           ROUND(percentile_cont(0.5) WITHIN GROUP (ORDER BY assessment_total)) AS med
    FROM base GROUP BY borough
  ),
  by_city_borough AS (
    SELECT city, borough, COUNT(*) AS cnt,
           ROUND(percentile_cont(0.5) WITHIN GROUP (ORDER BY assessment_total)) AS med
    FROM base GROUP BY city, borough
  ),
  city_totals AS (
    SELECT city, SUM(cnt) AS city_cnt FROM by_city_borough GROUP BY city
  ),
  by_category AS (
    SELECT category, COUNT(*) AS cnt FROM base GROUP BY category
  ),
  by_role_year AS (
    SELECT assessment_year AS yr, COUNT(*) AS cnt
    FROM base WHERE assessment_year IS NOT NULL
    GROUP BY assessment_year
  )
  SELECT jsonb_build_object(
    'total', (SELECT total FROM overall),
    'medianAssessment', (SELECT median_assessment FROM overall),
    'minAssessment', (SELECT min_assessment FROM overall),
    'maxAssessment', (SELECT max_assessment FROM overall),
    'medianConstructionYear', (SELECT median_year FROM overall),
    'oldestConstructionYear', (SELECT oldest_year FROM overall),
    'newestConstructionYear', (SELECT newest_year FROM overall),
    'boroughs', (
      SELECT COALESCE(
        jsonb_agg(
          jsonb_build_object('borough', borough, 'count', cnt, 'medianAssessment', med)
          ORDER BY cnt DESC, borough
        ), '[]'::jsonb)
      FROM by_borough
    ),
    'cities', (
      SELECT COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'city', c.city,
            'count', c.city_cnt,
            'boroughs', (
              SELECT jsonb_agg(
                jsonb_build_object('borough', b.borough, 'count', b.cnt, 'medianAssessment', b.med)
                ORDER BY b.cnt DESC, b.borough
              )
              FROM by_city_borough b WHERE b.city = c.city
            )
          )
          ORDER BY c.city_cnt DESC, c.city
        ), '[]'::jsonb)
      FROM city_totals c
    ),
    'categories', (
      SELECT COALESCE(
        jsonb_agg(
          jsonb_build_object('category', category, 'count', cnt)
          ORDER BY cnt DESC
        ), '[]'::jsonb)
      FROM by_category
    ),
    'assessmentYears', (
      SELECT COALESCE(
        jsonb_agg(
          jsonb_build_object('year', yr, 'count', cnt)
          ORDER BY yr
        ), '[]'::jsonb)
      FROM by_role_year
    )
  );
$$;

GRANT EXECUTE ON FUNCTION public.market_stats() TO anon, authenticated;
