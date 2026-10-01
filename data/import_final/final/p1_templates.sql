INSERT INTO public.email_templates (name, subject, body)
SELECT * FROM (VALUES
('Premier contact promoteur', 'Votre projet {{project_name}} sur NESTA Projets ?', '<p>Bonjour {{company_name}},</p><p>Votre projet <strong>{{project_name}}</strong> ({{project_location}}) correspond au type de projets que nos acheteurs recherchent. Je vous propose de le publier <strong>gratuitement pendant 3 mois</strong> sur NESTA Projets, sans engagement.</p><p>On s’en parle 10 minutes cette semaine ?</p><p>Gabriel — NESTA</p>'),
('Relance J+7', 'Petit suivi — {{project_name}}', '<p>Bonjour {{company_name}},</p><p>Petit suivi sur mon message au sujet de <strong>{{project_name}}</strong>. L’offre de lancement (3 mois gratuits sur NESTA Projets) est toujours disponible.</p><p>Gabriel — NESTA</p>'),
('Relance J+14', 'Dernière chance — vitrine gratuite', '<p>Bonjour {{company_name}},</p><p>Dernier message : la vitrine gratuite de 3 mois pour <strong>{{project_name}}</strong> se termine bientôt. Répondez « oui » et je m’occupe du reste.</p><p>Gabriel — NESTA</p>'),
('Merci / prochaine étape', 'Merci {{company_name}} !', '<p>Bonjour {{company_name}},</p><p>Merci pour votre retour ! Je prépare votre fiche projet et je vous l’envoie pour validation avant publication.</p><p>Gabriel — NESTA</p>')
) AS v(name, subject, body)
WHERE NOT EXISTS (SELECT 1 FROM public.email_templates);