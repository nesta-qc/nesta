-- ============================================================
-- NESTA — Migration 000014 : centre de contrôle admin (/admin)
-- Rôle : journal d'audit des actions admin + policies RLS
--        manquantes pour le dashboard interne.
--
-- 1. Table admin_audit_log : trace horodatée des actions
--    administratives (property.approved, user.role_changed…).
--    Lecture + écriture réservées aux ADMIN via is_admin().
--    L'INSERT exige admin_id = auth.uid() (anti-usurpation).
-- 2. Lecture admin sur favorites / saved_searches (accès
--    strictement propriétaire jusqu'ici ; l'admin a besoin
--    des compteurs pour l'Overview et les fiches utilisateurs).
-- 3. Attribution / révocation de rôles par un admin sur
--    user_roles (INSERT + DELETE réservés à is_admin()).
--    Les auto-attributions BUYER/SELLER existantes sont
--    inchangées (policies permissives : OU logique).
--
-- Idempotent : CREATE TABLE IF NOT EXISTS, DROP POLICY IF
--              EXISTS avant chaque CREATE POLICY.
-- Prérequis : 000002 (is_admin, profiles), 000004 (favorites,
--             saved_searches), 000007 (RLS de base).
-- Fichier écrit le 2026-09-27 — NON APPLIQUÉ en production.
-- ============================================================

-- ---------- 1. Journal d'audit admin ----------

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.profiles(id) on delete cascade,
  action text not null,
  object_type text not null,
  object_id text not null,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_audit_log_created
  on public.admin_audit_log (created_at desc);

create index if not exists idx_admin_audit_log_object
  on public.admin_audit_log (object_type, object_id, created_at desc);

alter table public.admin_audit_log enable row level security;

drop policy if exists "admin_audit_log : lecture (admin)" on public.admin_audit_log;
create policy "admin_audit_log : lecture (admin)"
  on public.admin_audit_log for select
  using (public.is_admin());

drop policy if exists "admin_audit_log : écriture (admin, soi)" on public.admin_audit_log;
create policy "admin_audit_log : écriture (admin, soi)"
  on public.admin_audit_log for insert
  with check (public.is_admin() and admin_id = auth.uid());
-- Pas d'UPDATE/DELETE : le journal est immuable.

-- ---------- 2. Lecture admin : favoris / recherches ----------

drop policy if exists "favorites : lecture (admin)" on public.favorites;
create policy "favorites : lecture (admin)"
  on public.favorites for select
  using (public.is_admin());

drop policy if exists "saved_searches : lecture (admin)" on public.saved_searches;
create policy "saved_searches : lecture (admin)"
  on public.saved_searches for select
  using (public.is_admin());

-- ---------- 3. Gestion des rôles par un admin ----------

drop policy if exists "user_roles : attribution (admin)" on public.user_roles;
create policy "user_roles : attribution (admin)"
  on public.user_roles for insert
  with check (public.is_admin());

drop policy if exists "user_roles : révocation (admin)" on public.user_roles;
create policy "user_roles : révocation (admin)"
  on public.user_roles for delete
  using (public.is_admin());
