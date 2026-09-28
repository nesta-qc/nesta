-- NESTA — alimentation prospection vague 3 : Rive-Sud (2026-09-28).
-- 15 entreprises vérifiées sur sites officiels. Contacts PUBLICS uniquement.
-- Aucun promoteur contacté à ce stade.
-- CAS SPÉCIAUX (à traiter avec vérification préalable, pas d'INSERT aveugle) :
--   - Société de Développement Bertone : « Bertone » existe déjà en base (projet Le Moden).
--     -> Si la ligne existe : UPDATE en ajoutant le projet Georges Henri.
--     -> Sinon : INSERT de la ligne ci-dessous.
--   - Prével Alliance : « Groupe Prével » existe déjà en base (prospect secondaire).
--     -> Si la ligne existe : UPDATE en ajoutant le projet Capella.
--     -> Sinon : INSERT de la ligne ci-dessous.

-- 13 INSERT directs (aucun doublon avec les vagues 1 et 2) :
insert into public.prospects
  (company_name, contact_name, email, phone, website, project_name, project_location, project_type, status, source, notes)
values
  ('Vivesco', null, 'ventes@vivesco.ca', '514-585-3186', 'https://vivesco.ca', 'Le Saint-Louis', 'Longueuil', 'Maisons de ville + condos', 'a_contacter', 'Recherche web sept. 2026', '« Prêt à habiter » ; autres projets : Le 1349 Daniel, Le Stratton, Le MacKay.'),
  ('Groupe immobilier Cleary', null, null, '514-502-3358', 'https://faubourgcousineau.com', 'Faubourg Cousineau', 'Saint-Hubert', 'Maisons de ville, semi-détachés, condos, unifamiliales', 'a_contacter', 'Recherche web sept. 2026', 'En construction (sept. 2026) ; Edena Condos (Longueuil, 2027).'),
  ('PUR Immobilia', null, 'info@quartier-oakville.com', '450-500-0876', 'https://quartier-oakville.com', 'Quartier Oakville', 'Saint-Lambert', 'Maisons de ville superposées, triplex, condos', 'a_contacter', 'Recherche web sept. 2026', '« En construction. Venez nous visiter! » — bureau 707A av. St-Charles.'),
  ('Habitations Pilon', null, null, '450-638-4141', 'https://habitationspilon.com', 'Quartier Galia ; La Prairie sur le Lac', 'Saint-Philippe ; La Prairie', 'Maisons, maisons de ville, jumelées, unifamiliales', 'a_contacter', 'Recherche web sept. 2026', 'La Prairie sur le Lac en prévente (+400 unités) ; Arion Domaine Nature.'),
  ('Développements Montarville / DMI', null, 'info@novuscandiac.com', '514-756-5154', 'https://novuscandiac.com', 'Novus Candiac', 'Candiac', 'Maisons de ville', 'a_contacter', 'Recherche web sept. 2026', 'Autres projets DMI : Jardins Panoramiques (Mont-Saint-Hilaire), Le Riviera (Carignan/Saint-Bruno).'),
  ('Maisons Pépin', 'Eddy Guessous, dir. des ventes', 'ventes@beacite.com', '514-812-9633', 'https://beacite.com', 'BÉAcité / BÉAcité Duo', 'Sainte-Julie', 'Jumelées, cottages, bungalows', 'a_contacter', 'Recherche web sept. 2026', 'Terrains et maisons toujours proposés ; Duo en construction.'),
  ('Groupe Grilli Samuel', null, null, '514-914-2289', 'https://grillisamuel.com', 'Arborea', 'Sainte-Julie', 'Maisons plain-pied', 'a_contacter', 'Recherche web sept. 2026', 'Bureau des ventes ouvert (lun-mer 13h-19h, sam-dim 11h-17h).'),
  ('Groupe Xpansion', 'Jean Pessoa', null, '450-907-7871', 'https://pururbaincandiac.com', 'Pür Urbain Candiac', 'Candiac', '148 maisons de ville', 'a_reverifier', 'Recherche web sept. 2026', '« Prêt à habiter ». Raison sociale non retrouvée sur le site officiel — à valider avant tout envoi.'),
  ('Condos Uniti (Écoquartier Affiniti)', null, 'info@condosuniti.ca', '(450) 600-5565', 'https://ecoquartieraffiniti.ca', 'Condos Uniti', 'Saint-Bruno', 'Condos 3½-4½', 'a_contacter', 'Recherche web sept. 2026', 'Offre valide jusqu''au 30 sept. 2026 ; attribution Cogir non confirmée officiellement.'),
  ('Groupe Deschênes Pépin', 'Brigitte Brie, dir. de projets', 'brigitte@dpgroupe.ca', '514-346-5566', 'https://groupedeschenespepin.com', 'Projet de la Gare', 'Brossard', 'Condos 4½-5½', 'a_contacter', 'Recherche web sept. 2026', 'Aussi Carré des cépages (La Prairie), Carré Bloomsbury (Saint-Constant).'),
  ('Otium Immobilier', null, null, '514-961-7829', 'https://otiumimmobilier.com', 'Collection Bacoli Le Riviera', 'Carignan', 'Maisons 2 étages neuves', 'a_contacter', 'Recherche web sept. 2026', 'En construction, livraison 2027 ; aussi Vallem sur l''eau — Collection Montagnarde (Otterburn Park, condos à vendre).'),
  ('Groupe Innoconcept', null, null, '514-588-0235', 'https://innoconcept.ca', 'Quartier de l''École', 'Léry', 'Maisons neuves', 'a_contacter', 'Recherche web sept. 2026', 'À partir de 427 900 $ (site officiel).'),
  ('E2 Immobilier', 'Jean-François Pilon, courtier DA', 'info@E2immobilier.ca', '(450) 444-2828', 'https://e2immobilier.com', 'Domaine des Légendes', 'Saint-Jean-sur-Richelieu', 'Unifamiliales clé en main', 'a_contacter', 'Recherche web sept. 2026', 'Prévente ; 21 terrains aussi offerts.');

-- CAS SPÉCIAUX — requêtes de vérification (à exécuter AVANT de décider INSERT vs UPDATE) :
-- select id, company_name, project_name from public.prospects where company_name ilike '%bertone%';
-- select id, company_name, project_name from public.prospects where company_name ilike '%prevel%' or company_name ilike '%prével%';

-- Si aucune ligne Bertone : INSERT de secours ->
-- ('Société de Développement Bertone', null, 'info@georgeshenri.ca', '450-233-3570', 'https://georgeshenri.ca', 'Georges Henri', 'Brossard', '73 condos 1-3 ch.', 'a_contacter', 'Recherche web sept. 2026', 'Promo en cours ; autre projet : Le Danaus (Candiac).')
-- Si ligne Bertone existante : UPDATE ->
-- update public.prospects set project_name = project_name || ' ; Georges Henri (Brossard, 73 condos 1-3 ch.)', notes = notes || ' Second projet vérifié sept. 2026 : Georges Henri, Brossard (promo en cours, info@georgeshenri.ca, 450-233-3570) ; autre projet : Le Danaus (Candiac).' where id = '<id>';

-- Si aucune ligne Prével : INSERT de secours ->
-- ('Prével Alliance', null, null, '514-281-9696', 'https://prevel.ca', 'Capella', 'Sainte-Julie', 'Unifamiliales, urbaines, jumelées, maisons de ville', 'a_contacter', 'Recherche web sept. 2026', 'Statut « En vente » ; 144 unités, livraison en continu ; co-développé avec Habitations Pilon. Tél. général Prével à confirmer.')
-- Si ligne Prével existante : UPDATE ->
-- update public.prospects set project_name = coalesce(project_name,'') || ' ; Capella (Sainte-Julie, 144 unités)', notes = notes || ' Second projet vérifié sept. 2026 : Capella, Sainte-Julie (statut En vente, 144 unités, livraison en continu ; co-développé avec Habitations Pilon).' where id = '<id>';
