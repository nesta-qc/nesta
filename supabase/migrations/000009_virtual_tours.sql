-- ============================================================
-- 000009 — Visites virtuelles : activation + analytics.
--
-- properties.virtual_tour_provider / _url / _id existent déjà
-- (000003). On ajoute :
--   - virtual_tour_enabled : la visite est configurée ET valide ;
--   - contrainte sur le provider (extensible : ajouter un
--     fournisseur = élargir la liste du CHECK) ;
--   - table virtual_tour_events : événements 'opened' / 'fullscreen'
--     pour le compteur "X visites 3D" du dashboard vendeur.
-- ============================================================

alter table public.properties
  add column if not exists virtual_tour_enabled boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'properties_virtual_tour_provider_check'
  ) then
    alter table public.properties
      add constraint properties_virtual_tour_provider_check
      check (
        virtual_tour_provider is null
        or virtual_tour_provider in ('matterport', 'external')
      );
  end if;
end
$$;

-- Cohérence : pas de visite "activée" sans URL.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'properties_virtual_tour_enabled_check'
  ) then
    alter table public.properties
      add constraint properties_virtual_tour_enabled_check
      check (
        virtual_tour_enabled = false
        or (virtual_tour_url is not null and virtual_tour_provider is not null)
      );
  end if;
end
$$;

create index if not exists idx_properties_virtual_tour_enabled
  on public.properties (virtual_tour_enabled)
  where virtual_tour_enabled = true;

-- ---------- Événements analytics ----------

create table if not exists public.virtual_tour_events (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  event_type text not null check (event_type in ('opened', 'fullscreen')),
  created_at timestamptz not null default now()
);

create index if not exists idx_virtual_tour_events_property
  on public.virtual_tour_events (property_id, event_type);

alter table public.virtual_tour_events enable row level security;

-- Insertion ouverte (visiteurs anonymes inclus) : la propriété
-- doit exister. Aucune donnée personnelle stockée.
drop policy if exists "virtual_tour_events : insertion (public)"
  on public.virtual_tour_events;
create policy "virtual_tour_events : insertion (public)"
  on public.virtual_tour_events for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.properties p where p.id = property_id
    )
  );

-- Lecture : propriétaire de l'annonce ou admin uniquement.
drop policy if exists "virtual_tour_events : lecture (owner / admin)"
  on public.virtual_tour_events;
create policy "virtual_tour_events : lecture (owner / admin)"
  on public.virtual_tour_events for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.properties p
      where p.id = property_id
        and p.owner_id = auth.uid()
    )
  );
