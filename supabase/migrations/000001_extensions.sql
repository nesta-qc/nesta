-- ============================================================
-- NESTA — Migration 000001 : extensions PostgreSQL
-- Ordre d'exécution : 1 / 7 — À EXÉCUTER EN PREMIER.
-- Rôle : active PostGIS (type geography + fonctions spatiales
--        pour la localisation des propriétés) et pgcrypto
--        (gen_random_uuid() pour les clés primaires uuid).
-- Idempotent : CREATE EXTENSION IF NOT EXISTS.
-- Prérequis : aucun.
-- ============================================================

create extension if not exists postgis;
create extension if not exists pgcrypto;
