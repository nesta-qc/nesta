-- NESTA — flag « exemple » sur les comparables du marché.
-- Un comparable marqué is_example = true est illustratif (adresse ou
-- chiffres d'exemple) : /investir l'affiche avec un badge « Exemple »
-- bien visible au lieu de le présenter comme une donnée vérifiée.

alter table public.market_comparables
  add column if not exists is_example boolean not null default false;

comment on column public.market_comparables.is_example is
  'true = comparable illustratif (exemple) : affiché avec un badge « Exemple » sur /investir.';
