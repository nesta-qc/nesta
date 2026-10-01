# Sources — série mensuelle de l'indice NESTA (prix médian unifamilial, province de Québec)

Médianes lues dans les PDF mensuels de l'APCIQ (système Centris), section « Province de Québec » → bloc « Unifamiliale » → ligne « Prix médian », **colonne du mois** (jamais le cumul annuel). Chaque valeur a été recoupée avec la variation sur un an affichée dans le PDF (ex. : 520 000 / 499 900 = +4,0 % ≈ +4 % annoncé pour mars 2026).

| Mois | Médiane | URL | Anomalie |
|------|---------|-----|----------|
| 2024-12 | 460 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2024/stats-202412-fr.pdf | — |
| 2025-01 | 465 500 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202501-fr.pdf | — |
| 2025-02 | 485 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202502-fr.pdf | — |
| 2025-03 | 499 900 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202503-fr.pdf | — (confirmé par le PDF de mars 2026 : mars 2025 = 499 900 $) |
| 2025-04 | 500 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202504-fr.pdf | — |
| 2025-05 | — | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202505-fr.pdf | DONNÉE MANQUANTE — page de vérification anti-robot Cloudflare au lieu du PDF (2 tentatives le 2026-10-01) |
| 2025-06 | 499 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202506-fr.pdf | — (confirmé par le PDF de juin 2026 : juin 2025 = 499 000 $) |
| 2025-07 | 490 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202507-fr.pdf | Nouveau format de PDF depuis juil. 2025 (ordre de lecture brouillé) : valeur mensuelle lue sous la forme « Prix 490 000 $ médian » ; recoupée : 490 000 / 450 000 = +8,9 % ≈ +9 % annoncé |
| 2025-08 | 490 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202508-fr.pdf | Idem : 490 000 / 443 750 = +10,4 % ≈ +10 % annoncé |
| 2025-09 | 485 900 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202509-fr.pdf | Idem : 485 900 / 450 000 = +8,0 % ≈ +8 % annoncé |
| 2025-10 | 491 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202510-fr.pdf | Idem : 491 000 / 453 000 = +8,4 % ≈ +8 % annoncé |
| 2025-11 | 495 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202511-fr.pdf | Idem : 495 000 / 461 000 = +7,4 % ≈ +7 % annoncé |
| 2025-12 | 495 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2025/stats-202512-fr.pdf | Idem : 495 000 / 460 000 = +7,6 % ≈ +8 % annoncé ; cumul annuel 2025 = 491 500 $ (non utilisé) |
| 2026-01 | 489 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202601-fr.pdf | 489 000 / 465 000 = +5,2 % ≈ +5 % annoncé |
| 2026-02 | — | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202602-fr.pdf | DONNÉE MANQUANTE — page de vérification anti-robot Cloudflare au lieu du PDF (2 tentatives le 2026-10-01) |
| 2026-03 | 520 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202603-fr.pdf | Nouveau format : 520 000 / 499 900 = +4,0 % ≈ +4 % annoncé ; cumul 2026 = 511 850 $ (non utilisé) |
| 2026-04 | — | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202604-fr.pdf | DONNÉE MANQUANTE — page de vérification anti-robot Cloudflare au lieu du PDF (2 tentatives le 2026-10-01) |
| 2026-05 | 524 900 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202605-fr.pdf | 524 900 / 500 000 = +5,0 % ≈ +5 % annoncé |
| 2026-06 | 515 000 $ | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202606-fr.pdf | 515 000 / 499 000 = +3,2 % ≈ +3 % annoncé |
| 2026-07 | — | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202607-fr.pdf | DONNÉE MANQUANTE — page de vérification anti-robot Cloudflare au lieu du PDF (2 tentatives le 2026-10-01) |
| 2026-08 | — | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202608-fr.pdf | DONNÉE MANQUANTE — page de vérification anti-robot Cloudflare au lieu du PDF (2 tentatives le 2026-10-01) |
| 2026-09 | — | https://com.apciq.ca/fsmi-stats/mensuelles/2026/stats-202609-fr.pdf | DONNÉE MANQUANTE — PDF non publié au 2026-10-01 (HTTP 404) |

## Notes de méthode

- Aucune médiane n'a été inventée : les mois inaccessibles sont à `null` avec la raison en `note`.
- Chaînage : ancre déc. 2024 = 229.21 (base 100 = déc. 2009). Le produit des variations annuelles vérifiées 2010–2024 depuis 100 redonne exactement 229.21 (vérification arithmétique).
- Après un mois manquant, la chaîne reprend au prochain mois publié par chaînage télescopé depuis le dernier mois chaîné (ex. : juin 2025 = indice avr. 2025 × 499 000 / 500 000). C'est mathématiquement identique au chaînage mois à mois : aucun trou n'est comblé, les mois manquants restent à `null`.
- Le consommateur (`lib/marche/indice.ts`) ignore les mois à `null` et interpole linéairement entre les points définis ; le dernier point défini (2026-06, indice 256.62) sert de référence « marché courant ».
