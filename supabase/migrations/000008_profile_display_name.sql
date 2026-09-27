-- ============================================================
-- NESTA — Migration 000008 : nom affiché depuis les métadonnées
-- Ordre d'exécution : 8 / 8 — après 000007_rls.
-- Rôle : handle_new_user() utilise désormais le nom affiché fourni
--        à l'inscription (auth.users.raw_user_meta_data ->> 'display_name'),
--        avec repli sur l'email si absent.
-- Idempotent : CREATE OR REPLACE de la fonction.
-- Prérequis : 000002 (fonction et trigger on_auth_user_created).
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_display_name text := nullif(
    trim(coalesce(new.raw_user_meta_data ->> 'display_name', '')),
    ''
  );
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(v_display_name, new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;
