# course_xva_essentials

## XVA Essentials Course

A repository of course materials and a React/Vite website for the XVA Essentials curriculum.

## Features

- React-based front end styled with Tailwind CSS
- LaTeX and markdown sources for the course
- Build artifacts can be hosted under an Apache sub-path

## Logging

The project is static and uses browser developer tools for debugging; no server-side logging is included.

## Local Development (macOS)

1. **Enable pnpm (once per machine)**
   ```bash
   corepack enable
   ```
2. **Install dependencies and start the dev server**
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```
3. **Run checks**
   ```bash
   pnpm lint
   pnpm test             # no tests defined yet
   ```

## Production Deployment (DigitalOcean + Apache)

1. **Build the site**
   ```bash
   cd frontend
   corepack enable   # ensure pnpm is available
   pnpm install
   pnpm build
   ```
   The compiled files appear in `dist/`.
2. **Upload to the server**
   Copy the `dist/` directory to the server, e.g. `/var/www/html/xva-course`.
3. **Configure Apache**
   Enable required modules (`a2enmod rewrite headers`). Example configuration:
   ```
   Alias /xva-course /var/www/html/xva-course
   <Directory /var/www/html/xva-course>
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted
   </Directory>
   ```
   Reload Apache to apply changes.

This setup keeps existing Apache endpoints intact while hosting the course site under `/xva-course`.
