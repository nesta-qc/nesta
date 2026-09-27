-- ============================================================
-- NESTA — Migration 000002 : socle auth (profils + rôles)
-- Ordre d'exécution : 2 / 7 — après 000001_extensions.
-- Rôle : fonctions utilitaires (set_updated_at, is_admin),
--        tables profiles / user_roles, trigger de création
--        automatique du profil à l'inscription (auth.users).
-- Idempotent : CREATE OR REPLACE pour les fonctions,
--              CREATE TABLE IF NOT EXISTS,
--              DROP TRIGGER IF EXISTS avant recréation.
-- Prérequis : 000001 (pgcrypto pour gen_random_uuid()).
-- Note : aucune donnée réelle inventée ; handle_new_user()
--        utilise simplement l'email comme display_name par défaut.
-- ============================================================

-- ---------- Fonctions utilitaires ----------

-- Trigger générique : maintient updated_at = now() à chaque UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Tables ----------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  phone text,
  locale text default 'fr',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('BUYER','SELLER','BROKER','AGENCY','DEVELOPER','ADMIN')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create index if not exists idx_user_roles_user_id
  on public.user_roles (user_id);

-- ---------- Fonction is_admin (après les tables) ----------
-- NOTE : une fonction LANGUAGE sql voit son corps validé à la
-- création ; la table user_roles doit donc exister avant.

-- Vrai si l'utilisateur courant a le rôle 'ADMIN' dans user_roles.
-- SECURITY DEFINER : lit user_roles en contournant la RLS,
-- ce qui évite toute récursion dans les policies RLS.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'ADMIN'
  );
$$;

-- Trigger updated_at sur profiles.
drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------- Création automatique du profil à l'inscription ----------

-- SECURITY DEFINER : s'exécute avec les droits du propriétaire
-- (postgres), donc l'INSERT contourne la RLS de profiles.
-- Aucun rôle par défaut n'est attribué ici : l'utilisateur
-- s'auto-attribue BUYER/SELLER via la policy dédiée (000007),
-- les autres rôles sont réservés à un admin.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
