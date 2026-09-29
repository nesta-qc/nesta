-- NESTA — CRM de prospection (admin uniquement).
-- Extension de la table prospects (assignation, relances, confiance email,
-- étape d'envoi) + journal d'activités, modèles d'emails, lots d'envoi
-- (approbation manuelle, jamais d'envoi automatique) et instantanés
-- quotidiens du pipeline pour le graphique.

-- 1. Nouvelles colonnes sur prospects ------------------------------------
alter table public.prospects
  add column if not exists assigned_to text,
  add column if not exists next_follow_up_at timestamptz,
  add column if not exists estimated_projects integer not null default 1,
  add column if not exists email_confidence text not null default 'a_confirmer',
  add column if not exists email_step integer not null default 0,
  add column if not exists do_not_contact boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'prospects_email_confidence_check'
  ) then
    alter table public.prospects
      add constraint prospects_email_confidence_check
      check (email_confidence in ('verifie', 'a_confirmer', 'manquant'));
  end if;
end $$;

create index if not exists prospects_followup_idx
  on public.prospects (next_follow_up_at);
create index if not exists prospects_assigned_idx
  on public.prospects (assigned_to);

-- 2. Journal d'activités --------------------------------------------------
create table if not exists public.prospect_activities (
  id uuid primary key default gen_random_uuid(),
  prospect_id uuid not null
    references public.prospects (id) on delete cascade,
  type text not null
    check (type in ('note', 'email_envoye', 'reponse', 'appel', 'rdv', 'changement_statut')),
  body text,
  created_by text,
  created_at timestamptz not null default now()
);

alter table public.prospect_activities enable row level security;

drop policy if exists "prospect_activities_admin_select" on public.prospect_activities;
create policy "prospect_activities_admin_select"
  on public.prospect_activities for select
  using (public.is_admin());

drop policy if exists "prospect_activities_admin_insert" on public.prospect_activities;
create policy "prospect_activities_admin_insert"
  on public.prospect_activities for insert
  with check (public.is_admin());

drop policy if exists "prospect_activities_admin_update" on public.prospect_activities;
create policy "prospect_activities_admin_update"
  on public.prospect_activities for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "prospect_activities_admin_delete" on public.prospect_activities;
create policy "prospect_activities_admin_delete"
  on public.prospect_activities for delete
  using (public.is_admin());

create index if not exists prospect_activities_prospect_idx
  on public.prospect_activities (prospect_id);
create index if not exists prospect_activities_created_idx
  on public.prospect_activities (created_at desc);
create index if not exists prospect_activities_type_idx
  on public.prospect_activities (type);

-- 3. Modèles d'emails ----------------------------------------------------
create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  body text not null,
  step integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.email_templates enable row level security;

drop policy if exists "email_templates_admin_select" on public.email_templates;
create policy "email_templates_admin_select"
  on public.email_templates for select
  using (public.is_admin());

drop policy if exists "email_templates_admin_insert" on public.email_templates;
create policy "email_templates_admin_insert"
  on public.email_templates for insert
  with check (public.is_admin());

drop policy if exists "email_templates_admin_update" on public.email_templates;
create policy "email_templates_admin_update"
  on public.email_templates for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "email_templates_admin_delete" on public.email_templates;
create policy "email_templates_admin_delete"
  on public.email_templates for delete
  using (public.is_admin());

-- 4. Lots d'envoi (brouillon → approuvé → envoyé, envoi manuel via Gmail) --
create table if not exists public.send_batches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  template_id uuid
    references public.email_templates (id) on delete set null,
  prospect_ids uuid[] not null default '{}',
  status text not null default 'brouillon'
    check (status in ('brouillon', 'approuve', 'envoye')),
  created_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.send_batches enable row level security;

drop policy if exists "send_batches_admin_select" on public.send_batches;
create policy "send_batches_admin_select"
  on public.send_batches for select
  using (public.is_admin());

drop policy if exists "send_batches_admin_insert" on public.send_batches;
create policy "send_batches_admin_insert"
  on public.send_batches for insert
  with check (public.is_admin());

drop policy if exists "send_batches_admin_update" on public.send_batches;
create policy "send_batches_admin_update"
  on public.send_batches for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "send_batches_admin_delete" on public.send_batches;
create policy "send_batches_admin_delete"
  on public.send_batches for delete
  using (public.is_admin());

-- 5. Instantanés quotidiens du pipeline (graphique) -----------------------
create table if not exists public.crm_snapshots (
  date date primary key,
  pipeline_cents bigint not null default 0,
  prospects_count integer not null default 0,
  emails_sent integer not null default 0
);

alter table public.crm_snapshots enable row level security;

drop policy if exists "crm_snapshots_admin_select" on public.crm_snapshots;
create policy "crm_snapshots_admin_select"
  on public.crm_snapshots for select
  using (public.is_admin());

drop policy if exists "crm_snapshots_admin_insert" on public.crm_snapshots;
create policy "crm_snapshots_admin_insert"
  on public.crm_snapshots for insert
  with check (public.is_admin());

drop policy if exists "crm_snapshots_admin_update" on public.crm_snapshots;
create policy "crm_snapshots_admin_update"
  on public.crm_snapshots for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "crm_snapshots_admin_delete" on public.crm_snapshots;
create policy "crm_snapshots_admin_delete"
  on public.crm_snapshots for delete
  using (public.is_admin());

-- 6. Modèles d'emails initiaux (FR) ---------------------------------------
-- Variables disponibles : {{prenom}} {{entreprise}} {{projet}}
insert into public.email_templates (name, subject, body, step)
select v.name, v.subject, v.body, v.step
from (values
  (
    'Premier contact promoteur',
    'Présenter {{projet}} sur Nesta — pilote gratuit de 3 mois',
    $$Bonjour {{prenom}},

Je me présente : Gabriel, cofondateur de Nesta, la plateforme québécoise qui aide les acheteurs à comprendre le potentiel réel d'une propriété avant d'acheter.

Nous ouvrons NESTA Projets aux promoteurs, et je vous propose un pilote gratuit de 3 mois pour {{entreprise}}, sans engagement :

- une page projet soignée pour {{projet}}, avec vos visuels et vos unités ;
- une estimation indicative et des comparables récents du secteur pour éclairer vos acheteurs ;
- un forfait fixe après le pilote : 4 800 $/an par projet — jamais de commission en pourcentage.

Auriez-vous 15 minutes cette semaine pour que je vous montre ce que donnerait {{projet}} sur Nesta ?

Cordialement,
Gabriel — Nesta$$,
    1
  ),
  (
    'Relance 1 — valeur',
    'Re : {{projet}} sur Nesta',
    $$Bonjour {{prenom}},

Je me permets de relancer mon message au sujet de {{projet}}.

Concrètement, ce que Nesta apporte à vos acheteurs :

- une estimation indicative transparente, avec la source et la date des comparables ;
- une fiche projet claire qui répond à leurs questions avant même la visite ;
- des alertes projets qui tiennent vos acheteurs potentiels informés des nouveautés du secteur.

Le pilote de 3 mois est gratuit et sans engagement. Après le pilote : 4 800 $/an par projet, forfait fixe, sans commission en pourcentage.

Un appel de 15 minutes cette semaine ?

Cordialement,
Gabriel — Nesta$$,
    2
  ),
  (
    'Relance 2 — preuve',
    'Pourquoi des promoteurs testent Nesta',
    $$Bonjour {{prenom}},

Un dernier point avant de vous laisser tranquille : la raison pour laquelle nous avons bâti NESTA Projets.

À titre d'exemple : une commission de 5 % sur une unité à 500 000 $ représente 25 000 $ (taux négociable — simple exemple, pas un taux imposé). Notre forfait est fixe : 4 800 $/an par projet, que vous vendiez 10 unités ou 100.

Le pilote de 3 mois vous permet de le constater sans risque. Si {{projet}} n'y gagne rien, vous partez sans frais et sans discussion.

Je reste disponible pour un appel de 15 minutes quand vous voulez.

Cordialement,
Gabriel — Nesta$$,
    3
  ),
  (
    'Relance 3 — dernier mot',
    'Je clôture — {{entreprise}}',
    $$Bonjour {{prenom}},

Je ne veux pas insister : je clôture votre dossier pour l'instant.

L'offre reste ouverte : pilote gratuit de 3 mois pour présenter {{projet}} sur Nesta, puis 4 800 $/an par projet, forfait fixe, sans commission en pourcentage.

Si le sujet redevient d'actualité, il vous suffira de me répondre à ce courriel.

Bonne continuation,
Gabriel — Nesta$$,
    4
  )
) as v (name, subject, body, step)
where not exists (select 1 from public.email_templates);
