SELECT (SELECT count(*) FROM public.email_templates) AS templates,
       (SELECT count(*) FROM public.prospects) AS total_prospects,
       (SELECT count(*) FROM public.prospects WHERE created_at > now() - interval '2 hours') AS importes_2h,
       (SELECT count(*) FROM public.prospects WHERE email_confidence = 'verifie') AS emails_verifies;
SELECT company_name, email, website, project_name, status, email_confidence FROM public.prospects WHERE company_name IN ('Aera Trois-Rivières', 'Groupe Calex', 'Lachance Immobilier');