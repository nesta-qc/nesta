-- ============================================================
-- NESTA — Migration 000020 : compteur de visites (récap mensuel)
-- Rôle : table page_views — un enregistrement par page vue sur
--        le site public. Aucune IP, aucun identifiant : compatible
--        Loi 25, chiffres approximatifs mais honnêtes.
--        Insertion publique (tracker), lecture réservée aux admins.
-- ============================================================

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null check (char_length(path) between 1 and 500),
  referrer text check (referrer is null or char_length(referrer) <= 1000),
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);

alter table public.page_views enable row level security;

drop policy if exists "page_views : enregistrement (public)" on public.page_views;
create policy "page_views : enregistrement (public)"
  on public.page_views for insert
  with check (true);

drop policy if exists "page_views : lecture (admin)" on public.page_views;
create policy "page_views : lecture (admin)"
  on public.page_views for select
  using (public.is_admin());
