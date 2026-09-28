-- NESTA — prospection commerciale (admin uniquement).
-- Liste des promoteurs/développeurs à contacter pour publier
-- leurs projets sur Nesta. Données de contact publiques uniquement.

create table if not exists public.prospects (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  website text,
  project_name text,
  project_location text,
  project_type text,
  status text not null default 'a_contacter'
    check (status in ('a_contacter', 'contacte', 'interesse', 'en_discussion', 'partenaire', 'refuse', 'sans_reponse')),
  source text,
  notes text,
  last_contact_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.prospects enable row level security;

drop policy if exists "prospects_admin_select" on public.prospects;
create policy "prospects_admin_select"
  on public.prospects for select
  using (public.is_admin());

drop policy if exists "prospects_admin_insert" on public.prospects;
create policy "prospects_admin_insert"
  on public.prospects for insert
  with check (public.is_admin());

drop policy if exists "prospects_admin_update" on public.prospects;
create policy "prospects_admin_update"
  on public.prospects for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "prospects_admin_delete" on public.prospects;
create policy "prospects_admin_delete"
  on public.prospects for delete
  using (public.is_admin());

create index if not exists prospects_status_idx on public.prospects (status);
create index if not exists prospects_company_idx on public.prospects (company_name);
