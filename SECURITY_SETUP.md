# Security setup

The application now uses Supabase Auth for administrators and backend-only API routes
for every database and storage write.

## Required deployment steps

1. Apply `supabase/migrations/202607160001_security_hardening.sql` in the Supabase SQL editor or with the Supabase CLI.
2. Add `SUPABASE_SERVICE_ROLE_KEY` and `ALLOWED_ORIGINS` to the deployment environment. Never expose the service-role key to the browser or commit it.
3. Create the administrator in Supabase Authentication using a unique password and MFA.
4. Assign the trusted role from the SQL editor, replacing the email exactly:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'admin@example.com';
   ```

5. Sign out any existing sessions after assigning or removing an administrator role so refreshed JWT claims take effect.
6. Configure Supabase Auth access-token expiry to 15–60 minutes and enable MFA for the administrator.

## Important migration scope

The migration removes existing policies from `public.posts`, `public.comments`, and
`storage.objects` before installing least-privilege policies. This Supabase project is
assumed to be dedicated to this application. If other applications share its Storage
instance, review that policy-reset section before applying it.

## Operations still requiring platform configuration

- Enable automated Supabase backups and test a restore.
- Configure error tracking, uptime alerts, and Supabase/Vercel billing alerts.
- Add the deployed site to an external OWASP ZAP scan after launch.
- Rotate the service-role key immediately if it is ever exposed.
