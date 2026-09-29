-- ============================================================
-- NESTA — Migration 000022 : journal des estimations
-- Rôle : table estimation_requests — un enregistrement par appel à
--        l'API d'estimation sur le site public. Aucune IP, aucun
--        identifiant : compatible Loi 25 (même philosophie que
--        page_views, migration 000020).
--        Insertion publique (API d'estimation), lecture réservée
--        aux admins. Sert notamment aux notifications de nouvelles
--        demandes.
-- ============================================================

create table if not exists public.estimation_requests (
  id uuid primary key default gen_random_uuid(),
  ville text not null check (char_length(ville) between 1 and 60),
  adresse text not null check (char_length(adresse) between 1 and 200),
  type_bien text not null check (char_length(type_bien) between 1 and 30),
  valeur_estimee integer check (valeur_estimee is null or valeur_estimee > 0),
  trouve boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists estimation_requests_created_at_idx
  on public.estimation_requests (created_at desc);

alter table public.estimation_requests enable row level security;

drop policy if exists "estimation_requests : enregistrement (public)" on public.estimation_requests;
create policy "estimation_requests : enregistrement (public)"
  on public.estimation_requests for insert
  with check (true);

drop policy if exists "estimation_requests : lecture (admin)" on public.estimation_requests;
create policy "estimation_requests : lecture (admin)"
  on public.estimation_requests for select
  using (public.is_admin());
