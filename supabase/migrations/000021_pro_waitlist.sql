-- ============================================================
-- NESTA — Migration 000021 : liste d'attente des professionnels
-- Rôle : table pro_waitlist — un courtier, notaire, estimateur
--        ou autre partenaire laisse son courriel depuis /pro
--        pour être prévenu à l'ouverture de l'espace pros.
--        Insertion publique, lecture réservée aux admins.
-- ============================================================

create table if not exists public.pro_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  profession text not null,
  created_at timestamptz not null default now()
);

alter table public.pro_waitlist enable row level security;

drop policy if exists "pro_waitlist : création (public)" on public.pro_waitlist;
create policy "pro_waitlist : création (public)"
  on public.pro_waitlist for insert
  with check (true);

drop policy if exists "pro_waitlist : lecture (admin)" on public.pro_waitlist;
create policy "pro_waitlist : lecture (admin)"
  on public.pro_waitlist for select
  using (public.is_admin());
