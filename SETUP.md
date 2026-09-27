# NESTA — Configuration Supabase

L'authentification (et toute la base de données) exige un projet Supabase
branché. Sans configuration, l'application affiche un état dégradé propre
(« Configuration Supabase manquante ») et le build passe sans `.env.local`.

## 1. Créer le projet

1. Crée un projet gratuit sur <https://supabase.com> (région : Canada si disponible).
2. Dans **Project Settings → API**, copie :
   - `Project URL`
   - `anon` `public` key
   - `service_role` key (serveur uniquement — à garder secrète, usage admin)

## 2. Variables d'environnement

Copie `.env.example` vers `.env.local` et renseigne :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
# Optionnel (réservé aux scripts admin, jamais exposé au navigateur) :
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

## 3. Migrations

Applique les migrations dans l'ordre (SQL Editor du dashboard, ou CLI
Supabase) :

```
supabase/migrations/000001_extensions.sql
supabase/migrations/000002_auth_core.sql      # profiles + user_roles + trigger
supabase/migrations/000003_properties.sql
supabase/migrations/000004_marketplace.sql
supabase/migrations/000005_pro.sql
supabase/migrations/000006_storage.sql
supabase/migrations/000007_rls.sql            # politiques RLS (dont auto-attribution BUYER/SELLER)
supabase/migrations/000008_profile_display_name.sql
```

## 4. Authentification — réglages recommandés

Dans **Authentication → Providers → Email** :

- **Confirm email** : activé (l'inscription envoie un lien vers `/auth/callback`).
- **Secure email change** : activé.

Dans **Authentication → URL Configuration** :

- **Site URL** : l'URL de production (ex. `https://nesta.example.com`).
- **Redirect URLs** : ajouter l'URL locale et la production, avec le chemin
  `/auth/callback` autorisé (ex. `http://localhost:3000/auth/callback`).

## 5. Attribuer un rôle professionnel (admin)

Les rôles `BROKER`, `AGENCY`, `DEVELOPER` et `ADMIN` ne sont pas
auto-attribuables (la RLS l'interdit). Un administrateur les attribue via le
dashboard Supabase (**Table Editor → user_roles**) ou avec la clé
`service_role` :

```sql
insert into public.user_roles (user_id, role)
values ('<uuid-utilisateur>', 'ADMIN');  -- premier admin, puis BROKER, etc.
```

Trouve l'`uuid` dans **Authentication → Users** après la première inscription.

## 6. Données de démonstration (optionnel, dev uniquement)

`supabase/seed.demo.sql` contient 2 annonces fictives aux adresses évidemment
fausses, pour tester l'UI. **Ne jamais l'exécuter en production.**
Remplace `v_owner_id` par un vrai `profiles.id` avant de l'exécuter.

## 7. Vérification

```bash
npm run dev
```

Parcours : `/inscription` → lien courriel → `/onboarding` → `/` →
`/profil` → déconnexion depuis l'en-tête.
