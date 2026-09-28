/* ============================================================
 * NESTA — registre des revenus (admin uniquement).
 *
 * Chaque encaissement réel (forfait vendeur, service facturé…)
 * est enregistré ici à la main par un admin, en attendant une
 * infrastructure de paiement automatisée (Phase 2).
 * AUCUN montant n'est inventé : sans ligne, le total est 0.
 * ============================================================ */

create table if not exists public.revenue_events (
  id uuid primary key default gen_random_uuid(),
  category text not null
    check (category in ('list', 'sell', 'signature', 'service', 'autre')),
  amount_cents integer not null check (amount_cents > 0),
  label text not null,
  occurred_on date not null default current_date,
  notes text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.revenue_events enable row level security;

drop policy if exists "revenue_events: admin all" on public.revenue_events;
create policy "revenue_events: admin all"
  on public.revenue_events
  for all
  using (public.is_admin())
  with check (public.is_admin());

create index if not exists revenue_events_occurred_on_idx
  on public.revenue_events (occurred_on desc);
create index if not exists revenue_events_category_idx
  on public.revenue_events (category);
