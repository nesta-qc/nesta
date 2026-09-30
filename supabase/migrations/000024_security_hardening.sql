-- ============================================================
-- 000024_security_hardening.sql — Durcissement sécurité NESTA
--
-- Contexte (2026-09-30) : audit live complet (clé service_role)
-- + relevé officiel du Security Advisor du dashboard :
--   Errors: 1, Warnings: 30, Info: 0.
--
-- CONCLUSION DE L'AUDIT : AUCUNE FUITE DE DONNÉES.
-- Les 10 tables sensibles (profiles, prospects, transactions,
-- user_roles, revenue_events, admin_audit_log, etc.) sont
-- inaccessibles en anonyme ; leurs politiques soi/admin sont
-- saines. Les tables lisibles publiquement (properties publiés,
-- property_profiles, market_comparables, agencies) le sont
-- PAR DESIGN (annonces publiques d'un site immobilier).
--
-- Tri des 30 warnings :
--  - 2 « Extension in Public » (postgis, pg_trgm) : installation
--    standard Supabase, sans risque réel. Laissé tel quel.
--  - 4 « RLS Policy Always True » (development_alerts, page_views,
--    pro_leads, pro_waitlist) : insertions anonymes VOLONTAIRES
--    (formulaires de capture de leads) ; la lecture reste
--    restreinte (vérifié en direct). Laissé tel quel.
--  - 1 « Public Bucket Allows Listing » (property-media) : bucket
--    public VOLONTAIRE (photos des annonces). Laissé tel quel.
--  - 22 « SECURITY DEFINER exécutable » (11 public + 11 connectés) :
--    helpers is_admin(), is_property_visible(), etc. Ils DOIVENT
--    rester exécutables pour que les politiques RLS fonctionnent ;
--    tous ont SET search_path (vérifié). Laissé tel quel.
--  - 1 « Leaked Password Protection Disabled » : réservé au plan
--    Pro (projet sur plan Free) — non activable. Laissé tel quel.
--
-- SEULE ERREUR du Advisor : « RLS Disabled in Public » sur
-- public.spatial_ref_sys (table système PostGIS de métadonnées
-- de référentiels — lecture seule, AUCUNE donnée sensible ;
-- c'est elle que le mail d'alerte signalait comme « table
-- publiquement accessible » : fausse alerte en pratique).
-- L'activation du RLS échoue avec « must be owner of table »
-- car la table appartient au superutilisateur postgres, rôle
-- non disponible sur Supabase : le bloc ci-dessous tente
-- l'activation et l'ignore proprement si les droits manquent.
-- Idempotent : peut être rejoué sans risque.
-- ============================================================

do $$
begin
  alter table public.spatial_ref_sys enable row level security;
exception
  when insufficient_privilege then
    raise notice 'spatial_ref_sys : RLS non activable (proprietaire postgres requis) — alerte Advisor acceptee, table systeme PostGIS sans donnees sensibles.';
end
$$;
