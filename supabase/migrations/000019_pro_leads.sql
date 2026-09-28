-- ============================================================
-- NESTA — Migration 000019 : demandes entrantes NESTA Pro
-- Rôle : table pro_leads — un promoteur laisse ses coordonnées
--        depuis la section NESTA Pro du site (pas de courriel
--        de contact Nesta pour l'instant : le formulaire
--        remplace le mailto).
--        Insertion publique, lecture réservée aux admins.
-- ============================================================

create table if not exists public.pro_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.pro_leads enable row level security;

drop policy if exists "pro_leads : création (public)" on public.pro_leads;
create policy "pro_leads : création (public)"
  on public.pro_leads for insert
  with check (true);

drop policy if exists "pro_leads : lecture (admin)" on public.pro_leads;
create policy "pro_leads : lecture (admin)"
  on public.pro_leads for select
  using (public.is_admin());
