-- ============================================================
-- NESTA — Migration 000006 : buckets Storage + policies
-- Ordre d'exécution : 6 / 7 — après 000005_pro.
-- Rôle : crée les buckets 'property-media' (public, photos/
--        vidéos des annonces) et 'property-documents' (privé),
--        + policies sur storage.objects : lecture publique des
--        médias, écriture réservée au owner de la propriété ou
--        à un admin ; documents accessibles owner/admin only.
-- Convention de chemins : "<property_id>/<fichier>" dans
-- chaque bucket — le property_id est extrait du chemin par
-- storage_property_id() pour vérifier la propriété.
-- Idempotent : INSERT ... ON CONFLICT DO NOTHING,
--              CREATE OR REPLACE pour les fonctions,
--              DROP POLICY IF EXISTS avant recréation.
-- Prérequis : 000002 (is_admin), 000003 (properties).
-- ============================================================

-- ---------- Buckets ----------

insert into storage.buckets (id, name, public)
values
  ('property-media', 'property-media', true),
  ('property-documents', 'property-documents', false)
on conflict (id) do nothing;

-- ---------- Fonctions helper ----------

-- Extrait le property_id (uuid) du début d'un chemin d'objet
-- "<property_id>/...". Retourne NULL si le chemin ne commence
-- pas par un uuid valide (objet refusé par les policies).
create or replace function public.storage_property_id(object_name text)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select case
    when object_name ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/'
      then split_part(object_name, '/', 1)::uuid
    else null
  end;
$$;

-- Vrai si l'utilisateur courant est owner de la propriété
-- ou admin. SECURITY DEFINER : lit properties en contournant
-- la RLS (évite toute récursion dans les policies).
create or replace function public.is_property_owner_or_admin(p_property_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_property_id is not null
    and (
      public.is_admin()
      or exists (
        select 1
        from public.properties p
        where p.id = p_property_id
          and p.owner_id = auth.uid()
      )
    );
$$;

-- ---------- Policies : bucket property-media (public en lecture) ----------

drop policy if exists "property-media : lecture publique" on storage.objects;
create policy "property-media : lecture publique"
  on storage.objects for select
  using (bucket_id = 'property-media');

drop policy if exists "property-media : ajout (owner/admin)" on storage.objects;
create policy "property-media : ajout (owner/admin)"
  on storage.objects for insert
  with check (
    bucket_id = 'property-media'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );

drop policy if exists "property-media : modification (owner/admin)" on storage.objects;
create policy "property-media : modification (owner/admin)"
  on storage.objects for update
  using (
    bucket_id = 'property-media'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  )
  with check (
    bucket_id = 'property-media'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );

drop policy if exists "property-media : suppression (owner/admin)" on storage.objects;
create policy "property-media : suppression (owner/admin)"
  on storage.objects for delete
  using (
    bucket_id = 'property-media'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );

-- ---------- Policies : bucket property-documents (owner/admin only) ----------

drop policy if exists "property-documents : lecture (owner/admin)" on storage.objects;
create policy "property-documents : lecture (owner/admin)"
  on storage.objects for select
  using (
    bucket_id = 'property-documents'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );

drop policy if exists "property-documents : ajout (owner/admin)" on storage.objects;
create policy "property-documents : ajout (owner/admin)"
  on storage.objects for insert
  with check (
    bucket_id = 'property-documents'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );

drop policy if exists "property-documents : modification (owner/admin)" on storage.objects;
create policy "property-documents : modification (owner/admin)"
  on storage.objects for update
  using (
    bucket_id = 'property-documents'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  )
  with check (
    bucket_id = 'property-documents'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );

drop policy if exists "property-documents : suppression (owner/admin)" on storage.objects;
create policy "property-documents : suppression (owner/admin)"
  on storage.objects for delete
  using (
    bucket_id = 'property-documents'
    and public.is_property_owner_or_admin(public.storage_property_id(name))
  );
