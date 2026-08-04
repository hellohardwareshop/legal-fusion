UPDATE public.legal_alerts SET detected_at = now() - (row_number_calc.rn * interval '7 hours') FROM (SELECT id, row_number() OVER (ORDER BY created_at) AS rn FROM public.legal_alerts) AS row_number_calc WHERE public.legal_alerts.id = row_number_calc.id;

UPDATE public.legal_misuse_alerts SET detected_at = now() - (rc.rn * interval '11 hours') FROM (SELECT id, row_number() OVER (ORDER BY created_at) AS rn FROM public.legal_misuse_alerts) AS rc WHERE public.legal_misuse_alerts.id = rc.id;

UPDATE public.legal_violations SET detected_at = now() - (rc.rn * interval '19 hours') FROM (SELECT id, row_number() OVER (ORDER BY created_at) AS rn FROM public.legal_violations) AS rc WHERE public.legal_violations.id = rc.id;

UPDATE public.legal_logs SET logged_at = now() - (rc.rn * interval '3 hours') FROM (SELECT id, row_number() OVER (ORDER BY created_at) AS rn FROM public.legal_logs) AS rc WHERE public.legal_logs.id = rc.id;