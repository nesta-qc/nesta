-- ============================================================
-- NESTA — Migration 000011 : alertes nouveaux projets
-- Rôle : table development_alerts — un visiteur laisse son
--        courriel pour être avisé des nouveaux développements.
--        Aucun projet fictif n'est créé.
-- ============================================================

create table if not exists public.development_alerts (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  city text,
  created_at timestamptz not null default now(),
  unique (email, city)
);

alter table public.development_alerts enable row level security;

-- Insertion publique (formulaire), lecture réservée aux admins.
drop policy if exists "development_alerts : inscription (public)" on public.development_alerts;
create policy "development_alerts : inscription (public)"
  on public.development_alerts for insert
  with check (true);

drop policy if exists "development_alerts : lecture (admin)" on public.development_alerts;
create policy "development_alerts : lecture (admin)"
  on public.development_alerts for select
  using (public.is_admin());
