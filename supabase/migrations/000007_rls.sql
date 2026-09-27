-- ============================================================
-- NESTA — Migration 000007 : Row Level Security (RLS)
-- Ordre d'exécution : 7 / 7 — EN DERNIER, après 000006_storage.
-- Rôle : active la RLS sur TOUTES les tables applicatives et
--        crée les policies d'accès (principe du moindre
--        privilège : refus par défaut, accès explicite).
-- Idempotent : ALTER TABLE ... ENABLE ROW LEVEL SECURITY
--              (réexécutable), DROP POLICY IF EXISTS avant
--              chaque CREATE POLICY, CREATE OR REPLACE pour
--              les fonctions helper.
-- Prérequis : 000001 → 000006 (tables + fonctions helper).
--
-- RÉSUMÉ DES RÈGLES (détail par table plus bas) :
--  - profiles        : soi-même (lecture/écriture), admin en lecture.
--  - user_roles      : lecture soi/admin ; auto-attribution
--                      BUYER/SELLER uniquement ; autres rôles
--                      réservés à un admin (service_role).
--  - properties      : lecture si publiée, owner ou admin ;
--                      création si owner + rôle vendeur
--                      (SELLER/BROKER/AGENCY/DEVELOPER/ADMIN) ;
--                      update/delete si owner ou admin.
--  - property_*      : suivent la visibilité / propriété de
--                      la propriété parente.
--  - favorites,
--    saved_searches  : accès strict au propriétaire.
--  - viewings        : lecture acheteur/owner/admin ; création
--                      par l'acheteur ; update acheteur (annuler)
--                      ou owner (confirmer) ; pas de delete
--                      self-service (annulation via CANCELLED).
--  - offers          : lecture acheteur/owner/admin ; création
--                      par l'acheteur ; pas d'update/delete
--                      self-service.
--  - transactions    : lecture si lié (acheteur de l'offre,
--                      owner de la propriété) ou admin.
--  - professionals   : lecture si vérifié, soi ou admin ;
--                      écriture soi ou admin.
--  - agencies        : lecture publique ; écriture admin only.
--  - developments    : lecture si non-brouillon, développeur
--                      ou admin ; gestion développeur/admin.
--  - development_units : suivent le développement parent.
--  - subscriptions   : lecture/création soi ou admin ;
--                      changements de plan via backend (phase
--                      ultérieure), pas d'update self-service.
-- ============================================================

-- ---------- Fonctions helper RLS ----------

-- Vrai si l'utilisateur courant a un rôle autorisé à publier
-- une annonce (SELLER/BROKER/AGENCY/DEVELOPER/ADMIN).
create or replace function public.has_listing_role()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles r
    where r.user_id = auth.uid()
      and r.role in ('SELLER','BROKER','AGENCY','DEVELOPER','ADMIN')
  );
$$;

-- Vrai si la propriété est visible par l'utilisateur courant
-- (publiée, owner ou admin).
create or replace function public.is_property_visible(p_property_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.properties p
    where p.id = p_property_id
      and (p.status = 'published' or p.owner_id = auth.uid() or public.is_admin())
  );
$$;

-- Vrai si le développement est visible (non-brouillon,
-- développeur ou admin).
create or replace function public.is_development_visible(p_development_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.developments d
    where d.id = p_development_id
      and (d.status is distinct from 'draft'
           or d.developer_id = auth.uid()
           or public.is_admin())
  );
$$;

-- Vrai si l'utilisateur courant est le développeur du projet
-- ou admin.
create or replace function public.is_development_owner_or_admin(p_development_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_development_id is not null
    and (
      public.is_admin()
      or exists (
        select 1
        from public.developments d
        where d.id = p_development_id
          and d.developer_id = auth.uid()
      )
    );
$$;

-- ---------- Activation de la RLS sur toutes les tables ----------

alter table public.profiles            enable row level security;
alter table public.user_roles          enable row level security;
alter table public.properties          enable row level security;
alter table public.property_media      enable row level security;
alter table public.property_features   enable row level security;
alter table public.property_documents  enable row level security;
alter table public.favorites           enable row level security;
alter table public.saved_searches      enable row level security;
alter table public.viewings            enable row level security;
alter table public.offers              enable row level security;
alter table public.transactions        enable row level security;
alter table public.agencies            enable row level security;
alter table public.professionals       enable row level security;
alter table public.developments        enable row level security;
alter table public.development_units   enable row level security;
alter table public.subscriptions       enable row level security;

-- ============================================================
-- profiles
-- ============================================================

drop policy if exists "profiles : lecture (soi + admin)" on public.profiles;
create policy "profiles : lecture (soi + admin)"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles : mise à jour (soi)" on public.profiles;
create policy "profiles : mise à jour (soi)"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());
-- Pas d'INSERT/DELETE en self-service : l'INSERT est fait par le
-- trigger on_auth_user_created (SECURITY DEFINER, 000002).

-- ============================================================
-- user_roles
-- ============================================================

drop policy if exists "user_roles : lecture (soi + admin)" on public.user_roles;
create policy "user_roles : lecture (soi + admin)"
  on public.user_roles for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "user_roles : auto-attribution BUYER/SELLER" on public.user_roles;
create policy "user_roles : auto-attribution BUYER/SELLER"
  on public.user_roles for insert
  with check (user_id = auth.uid() and role in ('BUYER','SELLER'));
-- Pas d'UPDATE/DELETE en self-service. Les rôles
-- BROKER/AGENCY/DEVELOPER/ADMIN sont attribués par un admin
-- via service_role / dashboard Supabase, jamais en self-service.

-- ============================================================
-- properties
-- ============================================================

drop policy if exists "properties : lecture (publié / owner / admin)" on public.properties;
create policy "properties : lecture (publié / owner / admin)"
  on public.properties for select
  using (status = 'published' or owner_id = auth.uid() or public.is_admin());

drop policy if exists "properties : création (rôle vendeur requis)" on public.properties;
create policy "properties : création (rôle vendeur requis)"
  on public.properties for insert
  with check (owner_id = auth.uid() and public.has_listing_role());

drop policy if exists "properties : mise à jour (owner / admin)" on public.properties;
create policy "properties : mise à jour (owner / admin)"
  on public.properties for update
  using (owner_id = auth.uid() or public.is_admin());

drop policy if exists "properties : suppression (owner / admin)" on public.properties;
create policy "properties : suppression (owner / admin)"
  on public.properties for delete
  using (owner_id = auth.uid() or public.is_admin());

-- ============================================================
-- property_media / property_features / property_documents
-- (suivent la visibilité et la propriété de l'annonce parente)
-- ============================================================

drop policy if exists "property_media : lecture (annonce visible)" on public.property_media;
create policy "property_media : lecture (annonce visible)"
  on public.property_media for select
  using (public.is_property_visible(property_id));

drop policy if exists "property_media : écriture (owner / admin)" on public.property_media;
create policy "property_media : écriture (owner / admin)"
  on public.property_media for insert
  with check (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_media : modification (owner / admin)" on public.property_media;
create policy "property_media : modification (owner / admin)"
  on public.property_media for update
  using (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_media : suppression (owner / admin)" on public.property_media;
create policy "property_media : suppression (owner / admin)"
  on public.property_media for delete
  using (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_features : lecture (annonce visible)" on public.property_features;
create policy "property_features : lecture (annonce visible)"
  on public.property_features for select
  using (public.is_property_visible(property_id));

drop policy if exists "property_features : écriture (owner / admin)" on public.property_features;
create policy "property_features : écriture (owner / admin)"
  on public.property_features for insert
  with check (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_features : modification (owner / admin)" on public.property_features;
create policy "property_features : modification (owner / admin)"
  on public.property_features for update
  using (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_features : suppression (owner / admin)" on public.property_features;
create policy "property_features : suppression (owner / admin)"
  on public.property_features for delete
  using (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_documents : lecture (annonce visible)" on public.property_documents;
create policy "property_documents : lecture (annonce visible)"
  on public.property_documents for select
  using (public.is_property_visible(property_id));

drop policy if exists "property_documents : écriture (owner / admin)" on public.property_documents;
create policy "property_documents : écriture (owner / admin)"
  on public.property_documents for insert
  with check (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_documents : modification (owner / admin)" on public.property_documents;
create policy "property_documents : modification (owner / admin)"
  on public.property_documents for update
  using (public.is_property_owner_or_admin(property_id));

drop policy if exists "property_documents : suppression (owner / admin)" on public.property_documents;
create policy "property_documents : suppression (owner / admin)"
  on public.property_documents for delete
  using (public.is_property_owner_or_admin(property_id));

-- ============================================================
-- favorites / saved_searches (accès strict au propriétaire)
-- ============================================================

drop policy if exists "favorites : accès propriétaire" on public.favorites;
create policy "favorites : accès propriétaire"
  on public.favorites for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "saved_searches : accès propriétaire" on public.saved_searches;
create policy "saved_searches : accès propriétaire"
  on public.saved_searches for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ============================================================
-- viewings
-- ============================================================

drop policy if exists "viewings : lecture (acheteur / owner / admin)" on public.viewings;
create policy "viewings : lecture (acheteur / owner / admin)"
  on public.viewings for select
  using (buyer_id = auth.uid() or public.is_property_owner_or_admin(property_id));

drop policy if exists "viewings : demande (acheteur)" on public.viewings;
create policy "viewings : demande (acheteur)"
  on public.viewings for insert
  with check (buyer_id = auth.uid());

drop policy if exists "viewings : mise à jour (acheteur annule / owner confirme)" on public.viewings;
create policy "viewings : mise à jour (acheteur annule / owner confirme)"
  on public.viewings for update
  using (buyer_id = auth.uid() or public.is_property_owner_or_admin(property_id));
-- Pas de DELETE en self-service : annulation via status='CANCELLED'.
-- (Transitions fines acheteur→CANCELLED / owner→CONFIRMED|COMPLETED :
--  à durcir par trigger en phase ultérieure si besoin.)

-- ============================================================
-- offers
-- ============================================================

drop policy if exists "offers : lecture (acheteur / owner / admin)" on public.offers;
create policy "offers : lecture (acheteur / owner / admin)"
  on public.offers for select
  using (buyer_id = auth.uid() or public.is_property_owner_or_admin(property_id));

drop policy if exists "offers : création (acheteur)" on public.offers;
create policy "offers : création (acheteur)"
  on public.offers for insert
  with check (buyer_id = auth.uid());
-- Pas d'UPDATE/DELETE en self-service (retrait via
-- status='withdrawn' à prévoir via trigger/backend en phase
-- ultérieure).

-- ============================================================
-- transactions
-- ============================================================

drop policy if exists "transactions : lecture (parties liées / admin)" on public.transactions;
create policy "transactions : lecture (parties liées / admin)"
  on public.transactions for select
  using (
    public.is_admin()
    or public.is_property_owner_or_admin(property_id)
    or exists (
      select 1
      from public.offers o
      where o.id = transactions.offer_id
        and o.buyer_id = auth.uid()
    )
  );
-- Écriture des transactions réservée au backend (service_role)
-- en phase ultérieure : aucune policy INSERT/UPDATE/DELETE ici.

-- ============================================================
-- professionals
-- ============================================================

drop policy if exists "professionals : lecture (vérifié / soi / admin)" on public.professionals;
create policy "professionals : lecture (vérifié / soi / admin)"
  on public.professionals for select
  using (verified = true or user_id = auth.uid() or public.is_admin());

drop policy if exists "professionals : création (soi / admin)" on public.professionals;
create policy "professionals : création (soi / admin)"
  on public.professionals for insert
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "professionals : mise à jour (soi / admin)" on public.professionals;
create policy "professionals : mise à jour (soi / admin)"
  on public.professionals for update
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- ============================================================
-- agencies (lecture publique, écriture admin uniquement)
-- ============================================================

drop policy if exists "agencies : lecture publique" on public.agencies;
create policy "agencies : lecture publique"
  on public.agencies for select
  using (true);

drop policy if exists "agencies : création (admin)" on public.agencies;
create policy "agencies : création (admin)"
  on public.agencies for insert
  with check (public.is_admin());

drop policy if exists "agencies : mise à jour (admin)" on public.agencies;
create policy "agencies : mise à jour (admin)"
  on public.agencies for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- developments
-- ============================================================

drop policy if exists "developments : lecture (non-brouillon / dev / admin)" on public.developments;
create policy "developments : lecture (non-brouillon / dev / admin)"
  on public.developments for select
  using (status is distinct from 'draft'
         or developer_id = auth.uid()
         or public.is_admin());

drop policy if exists "developments : création (dev / admin)" on public.developments;
create policy "developments : création (dev / admin)"
  on public.developments for insert
  with check (developer_id = auth.uid() or public.is_admin());

drop policy if exists "developments : mise à jour (dev / admin)" on public.developments;
create policy "developments : mise à jour (dev / admin)"
  on public.developments for update
  using (developer_id = auth.uid() or public.is_admin());

drop policy if exists "developments : suppression (dev / admin)" on public.developments;
create policy "developments : suppression (dev / admin)"
  on public.developments for delete
  using (developer_id = auth.uid() or public.is_admin());

-- ============================================================
-- development_units (suivent le développement parent)
-- ============================================================

drop policy if exists "development_units : lecture (développement visible)" on public.development_units;
create policy "development_units : lecture (développement visible)"
  on public.development_units for select
  using (public.is_development_visible(development_id));

drop policy if exists "development_units : création (dev / admin)" on public.development_units;
create policy "development_units : création (dev / admin)"
  on public.development_units for insert
  with check (public.is_development_owner_or_admin(development_id));

drop policy if exists "development_units : mise à jour (dev / admin)" on public.development_units;
create policy "development_units : mise à jour (dev / admin)"
  on public.development_units for update
  using (public.is_development_owner_or_admin(development_id));

drop policy if exists "development_units : suppression (dev / admin)" on public.development_units;
create policy "development_units : suppression (dev / admin)"
  on public.development_units for delete
  using (public.is_development_owner_or_admin(development_id));

-- ============================================================
-- subscriptions
-- ============================================================

drop policy if exists "subscriptions : lecture (soi / admin)" on public.subscriptions;
create policy "subscriptions : lecture (soi / admin)"
  on public.subscriptions for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "subscriptions : création (soi / admin)" on public.subscriptions;
create policy "subscriptions : création (soi / admin)"
  on public.subscriptions for insert
  with check (user_id = auth.uid() or public.is_admin());
-- Pas d'UPDATE/DELETE en self-service : les changements de plan
-- payants passeront par le backend (webhooks) en phase ultérieure.
