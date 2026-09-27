-- ============================================================
-- NESTA — Migration 000010 : demandes de services
-- Rôle : table service_requests (devis → suivi) + bucket privé
--        service-request-files pour les plans/PDF joints.
-- Statuts : pending → in_review → quoted → in_progress → delivered
--           (+ cancelled). Seul un admin fait avancer le statut.
-- ============================================================

-- ---------- Table ----------
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  service_id text not null,
  project_name text not null,
  description text not null default '',
  contact_email text,
  contact_phone text,
  status text not null default 'pending'
    check (status in ('pending', 'in_review', 'quoted', 'in_progress', 'delivered', 'cancelled')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_requests_user_idx
  on public.service_requests (user_id, created_at desc);

-- ---------- updated_at ----------
drop trigger if exists service_requests_updated_at on public.service_requests;
create trigger service_requests_updated_at
  before update on public.service_requests
  for each row execute function public.set_updated_at();

-- ---------- RLS ----------
alter table public.service_requests enable row level security;

drop policy if exists "service_requests : lecture (soi + admin)" on public.service_requests;
create policy "service_requests : lecture (soi + admin)"
  on public.service_requests for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "service_requests : création (connecté)" on public.service_requests;
create policy "service_requests : création (connecté)"
  on public.service_requests for insert
  with check (user_id = auth.uid());

drop policy if exists "service_requests : annulation (soi)" on public.service_requests;
create policy "service_requests : annulation (soi)"
  on public.service_requests for update
  using (user_id = auth.uid() and status in ('pending', 'in_review', 'quoted'))
  with check (status = 'cancelled');

drop policy if exists "service_requests : gestion (admin)" on public.service_requests;
create policy "service_requests : gestion (admin)"
  on public.service_requests for update
  using (public.is_admin());

-- ---------- Bucket privé : fichiers joints ----------
insert into storage.buckets (id, name, public)
values ('service-request-files', 'service-request-files', false)
on conflict (id) do nothing;

drop policy if exists "service-request-files : lecture (soi + admin)" on storage.objects;
create policy "service-request-files : lecture (soi + admin)"
  on storage.objects for select
  using (
    bucket_id = 'service-request-files'
    and (
      public.is_admin()
      or (storage.foldername(name))[1] = auth.uid()::text
    )
  );

drop policy if exists "service-request-files : ajout (soi)" on storage.objects;
create policy "service-request-files : ajout (soi)"
  on storage.objects for insert
  with check (
    bucket_id = 'service-request-files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "service-request-files : suppression (soi + admin)" on storage.objects;
create policy "service-request-files : suppression (soi + admin)"
  on storage.objects for delete
  using (
    bucket_id = 'service-request-files'
    and (
      public.is_admin()
      or (storage.foldername(name))[1] = auth.uid()::text
    )
  );
