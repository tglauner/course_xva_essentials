# course_xva_essentials

## XVA Essentials Course

A repository of course materials and a React/Vite website for the XVA Essentials curriculum. Module 6 now introduces a dedicated Capital Valuation Adjustment unit, and Module 8 continues the "Roadmap: Interactive Jupyter XVA Sandbox" preview of the forthcoming embedded notebook experience.

## Features

- React-based front end styled with Tailwind CSS
- LaTeX and markdown sources for the course
- Production deployment served from https://www.course-xva-essentials.tglauner.com (DigitalOcean + Apache)
- User authentication handled by [Clerk](https://clerk.com)

## Logging

The project is primarily static and uses browser developer tools for debugging. When diagnosing production-only routing
issues (for example, deep links that fail to render the SPA shell), inspect the Apache error log at
`/var/log/apache2/error.log` on the Droplet.

## Local Development (macOS)
1. **Enable pnpm (once per machine)**
   ```bash
   corepack enable
   ```
2. **Install frontend dependencies and start the dev server**
   ```bash
   cd frontend
   cp .env.example .env  # add your Clerk publishable key
   pnpm install
   pnpm dev
   ```
3. **Run checks**
   ```bash
   pnpm lint        # requires an ESLint config
   pnpm test        # no tests defined yet
   ```

## Production Deployment (DigitalOcean + Apache)

1. **Build the site locally on MAC**
   ```bash
   cd frontend
   corepack enable   # ensure pnpm is available
   pnpm install
   pnpm build
   ```
   The compiled files appear in `dist/`.
2. **Upload to the server**
   Copy local `dist/` to droplet.
   ```bash
   scp -r dist root@45.55.196.120:/var/www/html/course_xva_essentials/frontend
   ```
   
3. **Configure Apache**
   Enable required modules (`a2enmod rewrite headers dir`) so that the SPA rewrite rules and security headers are applied.
   Deploy the `deploy/apache.conf` vhost so that it serves

   `https://www.course-xva-essentials.tglauner.com` directly from the built frontend with deep-link rewriting handled by
   `mod_rewrite`:
   ```
   a2ensite course-xva-essentials
   systemctl reload apache2
   ```
Update DNS and TLS certificates for `www.course-xva-essentials.tglauner.com` before switching traffic.

## Platform Configuration Checklist for the New Domain

### DigitalOcean / Apache
- Point the `www.course-xva-essentials.tglauner.com` DNS record to the Droplet (A record) and add an `ALIAS/ANAME` or redirect for the root `course-xva-essentials.tglauner.com` if desired.
- Install or renew Let's Encrypt certificates for the new hostname (e.g., using `certbot --apache -d course-xva-essentials.tglauner.com -d www.course-xva-essentials.tglauner.com`).
- Deploy the updated `deploy/apache.conf`, then reload Apache to serve the site from the new DocumentRoot (`/var/www/html/course_xva_essentials/frontend/dist`) and ensure the rewrite rules forward unknown routes to `index.html`.
- If deep links return server errors, inspect `/var/log/apache2/error.log` for rewrite-related failures (e.g., modules not enabled).
- Verify that any reverse proxies or firewalls allow HTTPS traffic for the new domain and that the static assets deploy correctly.

### Clerk (Authentication)
- In the Clerk dashboard, add `https://www.course-xva-essentials.tglauner.com` to the list of allowed origins and redirect URLs (sign-in, sign-up, and OAuth callbacks if used).
- Update production publishable and secret keys in the frontend `.env` files if the instance changes.
- Regenerate webhook endpoints or JWT templates bound to the previous domain so that post-authentication redirects resolve to the new site.

### Stripe (Payments)
- Update any success, cancel, and webhook endpoint URLs in the Stripe Dashboard to point at `https://www.course-xva-essentials.tglauner.com`.
- Review webhook signing secrets and environment variables; rotate them if you recreate the endpoint.
- If Stripe Checkout is embedded, ensure the `allowed_origin` or `domain` settings include the new hostname and re-test the paywall flow end-to-end.
