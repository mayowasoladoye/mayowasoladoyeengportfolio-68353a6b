UPDATE public.projects SET area = 'engineering' WHERE area IS NULL;
ALTER TABLE public.projects ALTER COLUMN area SET DEFAULT 'engineering';