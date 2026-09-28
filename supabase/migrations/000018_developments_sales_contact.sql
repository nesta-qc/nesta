-- ============================================================
-- NESTA — Migration 000018 : contact ventes sur developments
-- Ajoute les coordonnées du contact ventes d'un projet
-- (nom, courriel, téléphone), fournies par le promoteur,
-- affichées sur la fiche publique du projet.
-- Idempotent : ADD COLUMN IF NOT EXISTS.
-- ============================================================

alter table public.developments
  add column if not exists sales_contact_name text,
  add column if not exists sales_contact_email text,
  add column if not exists sales_contact_phone text;

comment on column public.developments.sales_contact_name is
  'Nom du contact ventes du projet (fourni par le promoteur).';
comment on column public.developments.sales_contact_email is
  'Courriel du contact ventes du projet (fourni par le promoteur).';
comment on column public.developments.sales_contact_phone is
  'Téléphone du contact ventes du projet (fourni par le promoteur).';
