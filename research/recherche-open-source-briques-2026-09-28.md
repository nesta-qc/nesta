# Recherche open-source — briques pour Nesta (2026-09-28)

Méthode : chaque candidat vérifié via `https://api.github.com/repos/<owner>/<repo>` (licence `spdx_id`, `pushed_at`, `stargazers_count`, `archived`) + lecture du fichier LICENSE quand l'API retournait "Other". Critères : licence MIT/Apache-2.0/BSD/ISC, dernier push < 18 mois (seuil : mars 2025).

## ✅ Retenus (4)

### 1. FullCalendar — planification des visites
- URL : https://github.com/fullcalendar/fullcalendar
- Licence vérifiée : **MIT** (`spdx_id: MIT`)
- Maintenance : dernier push **2026-09-05**, 20 655 ★, non archivé
- Stack : TypeScript ; packages npm (`@fullcalendar/react`, `daygrid`, `timegrid`, `interaction`) — drag & drop, vues semaine/jour
- Effort d'intégration (Next.js 14 / Vercel) : **faible** — `npm i`, composant React, créneaux lus/écrits depuis Supabase
- Valeur pour Nesta : calendrier de disponibilités des visites par propriété (côté acheteur : choisir un créneau ; côté vendeur : gérer ses visites) en une phrase.

### 2. chatscope/chat-ui-kit-react — messagerie acheteur↔vendeur
- URL : https://github.com/chatscope/chat-ui-kit-react
- Licence vérifiée : **MIT**
- Maintenance : dernier push **2025-05-15** (dans les 18 mois, mais rythme ralenti — à surveiller), 1 779 ★, non archivé
- Stack : React, composants UI uniquement (aucun backend imposé)
- Effort d'intégration : **moyen** — UI kit à brancher sur Supabase Realtime (table `messages` + RLS) pour le temps réel
- Valeur pour Nesta : messagerie temps réel intégrée aux fiches propriétés sans aucune infra supplémentaire.

### 3. szimek/signature_pad — signature électronique simple
- URL : https://github.com/szimek/signature_pad
- Licence vérifiée : **MIT**
- Maintenance : dernier push **2026-09-13**, 12 049 ★, non archivé
- Stack : TypeScript, canvas HTML5, zéro dépendance, tactile (mobile-first)
- Effort d'intégration : **faible** — pad de dessin, export PNG/SVG de la signature
- Valeur pour Nesta : capture de signature manuscrite sur mobile (cohérent avec Nesta Capture) pour signer promesses d'achat et mandats, image à incruster dans les PDF générés par pdfme.

### 4. pdfme/pdfme — génération de documents PDF
- URL : https://github.com/pdfme/pdfme
- Licence vérifiée : **MIT**
- Maintenance : dernier push **2026-09-27**, 4 849 ★, non archivé
- Stack : TypeScript/React ; designer WYSIWYG de templates + générateur (navigateur ET Node.js) ; utilise pdf-lib en interne
- Effort d'intégration : **faible à moyen** — templates JSON (promesse d'achat, mandat vendeur, fiche Passeport), génération via route Next.js ou côté client
- Valeur pour Nesta : produire les documents transactionnels et rapports PDF à partir de templates, avec la signature capturée (projet 3) incrustée.

## ➕ Piste bonus vérifiée
- **naptha/tesseract.js** — https://github.com/naptha/tesseract.js — OCR 100+ langues en WebAssembly ; **Apache-2.0** ; push **2026-05-17** ; 38 741 ★ ; effort faible ; valeur : extraire le texte des documents uploadés (comptes de taxes, certificats de localisation) pour pré-remplir les fiches.

## ❌ Écartés (une ligne chacun)
- **docusealco/docuseal** — AGPL-3.0 vérifié → copyleft, incompatible avec un produit commercial fermé.
- **OpenSignLabs/OpenSign** — AGPL-3.0 vérifié (lecture du LICENSE) → écarté, même raison.
- **LibreSign/libresign** — AGPL-3.0 vérifié → écarté, même raison (actif : push 2026-09-28, mais licence bloquante).
- **Hopding/pdf-lib** — MIT mais dernier push **2024-07-17** (> 18 mois, maintenance à l'arrêt) → remplacé par pdfme qui l'encapsule.
- **chatwoot/chatwoot** — MIT vérifié (édition communauté ; dossier `enterprise/` sous licence séparée), actif (push 2026-09-27, 37 256 ★), mais monolithe Rails+Vue à auto-héberger séparément → effort d'intégration élevé, surdimensionné pour une messagerie acheteur-vendeur.
- **calcom/cal.diy** (ex cal.com) — **relicencié MIT** (LICENSE vérifié ; l'AGPL historique ne s'applique plus), actif (push 2026-09-26, 48 699 ★), mais monorepo lourd (tRPC/Prisma/turborepo) → utilisable uniquement en embed du service hébergé, pas intégrable au codebase Nesta.
- **agilgur5/react-signature-canvas** — licence non détectée (NOASSERTION) → préférer szimek/signature_pad (MIT) directement.
- **novuhq/novu** — licence non standard (NOASSERTION, à valider juridiquement) et infra lourde → écarté pour les notifications.
- **bigcalendar/react-big-calendar** — MIT vérifié, actif (push 2026-06-01, 8 756 ★) → alternative viable, mais FullCalendar préféré (drag & drop, timegrid, adaptateur React officiel).

## Notes
- Aucune solution de signature électronique complète (type DocuSign) n'existe en licence commerciale-compatible : toutes les alternatives open-source sérieuses (DocuSeal, OpenSign, LibreSign) sont AGPL-3.0. La voie recommandée : signature simple = `signature_pad` + `pdfme` (valeur probante limitée, à faire valider juridiquement pour les promesses d'achat au Québec).
- Dates de vérification : 2026-09-28, via API GitHub + fichiers LICENSE bruts.
