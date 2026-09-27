-- ============================================================
-- NESTA — Migration 000012 : demandes de services anonymes
-- (parcours « adresse → Passeport Nesta → demande d'analyse »)
--
-- Contexte : le parcours Passeport permet de demander l'analyse
-- d'une propriété SANS créer de compte. La table
-- public.service_requests (migration 000010) exigeait user_id
-- NOT NULL et sa policy « création (connecté) » imposait
-- user_id = auth.uid() : l'insert anonyme était donc bloqué.
--
-- Cette migration :
--   1. rend user_id NULLABLE (user_id NULL = demande anonyme) ;
--   2. ajoute contact_name (nom du demandeur anonyme) ;
--   3. ajoute la policy RLS « service_requests : création anonyme »
--      (insert autorisé si user_id IS NULL ET contact_email renseigné).
-- Les policies existantes (000010) restent inchangées.
--
-- Sécurité / confidentialité :
--   - un admin lit TOUTES les demandes via public.is_admin()
--     (policy « lecture (soi + admin) » inchangée) ;
--   - un visiteur anonyme ne peut PAS relire sa propre demande :
--     la policy de lecture exige user_id = auth.uid() ou is_admin(),
--     et user_id est NULL pour une demande anonyme (NULL = auth.uid()
--     n'est jamais vrai). C'est voulu : le suivi /services/suivi
--     reste réservé aux comptes connectés ; le demandeur anonyme
--     reçoit la réponse par courriel.
--
-- Fichier écrit le 2026-09-27 — NON APPLIQUÉ en production.
-- ============================================================

-- 1. user_id devient nullable : NULL = demande anonyme.
alter table public.service_requests
  alter column user_id drop not null;

-- 2. Nom du contact pour les demandes anonymes.
alter table public.service_requests
  add column if not exists contact_name text;

-- 3. Création anonyme : user_id NULL + courriel renseigné.
drop policy if exists "service_requests : création anonyme" on public.service_requests;
create policy "service_requests : création anonyme"
  on public.service_requests for insert
  with check (
    user_id is null
    and contact_email is not null
    and contact_email <> ''
  );
