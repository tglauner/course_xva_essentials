Project snapshot

- Purpose: a small React/Vite frontend (course website) plus a minimal FastAPI backend used for interactive Python examples (Python notebook runner). The site is deployed behind Apache on a DigitalOcean droplet.

Quick orientation for an AI coding agent

- Root areas to read first:
  - `frontend/` — React + Vite app, Tailwind-based UI, Clerk auth, paywall UI in `src/PaywallGate.jsx` and interactive notebook in `src/components/PythonNotebook.jsx`.
  - `backend/` — FastAPI example server; `main.py` exposes `/api/run` which execs Python code and returns stdout (simple, insecure demo used by the notebook).
  - `deploy/` — Apache vhost snippets (rewrite rules, proxy to backend). Useful for production routing and deep-link handling.
  - `README.md` — contains local dev and production build steps used by the author.

Big-picture architecture (how pieces connect)

- Frontend (SPA)
  - Built with Vite + React (entry `frontend/src/main.jsx`). Uses Clerk for auth; expects `VITE_CLERK_PUBLISHABLE_KEY` in `.env`.
  - Interactive Python notebook posts source to the backend at `/api/run` (see `src/components/PythonNotebook.jsx`). The backend executes `exec(code, {})` and returns captured stdout.
  - Paywall behavior: `src/PaywallGate.jsx` controls gating logic using `localStorage` (demo mode accepts any 6-char code). Production intends integration with Stripe/Clerk.

- Backend
  - `backend/main.py` — FastAPI app with permissive CORS and a POST `/api/run` endpoint. This is intentionally simple and insecure; treat as a development-only example.
  - `backend/requirements.txt` lists `fastapi` and `uvicorn`.

- Deployment
  - Apache config in `deploy/` serves the built `frontend/dist` and proxies `/api/` to a local backend (example: `ProxyPass /api/ http://127.0.0.1:9000/api/`). The vhost includes rewrite rules to serve `index.html` for SPA routes.

Essential developer workflows (commands and examples)

- Frontend development (macOS):
  - Enable pnpm once: `corepack enable`
  - Start dev server:
    - cd `frontend`
    - copy `.env.example` -> `.env` and set `VITE_CLERK_PUBLISHABLE_KEY`
    - `pnpm install`
    - `pnpm dev`

- Backend development (local):
  - cd `backend`
  - `pip install -r requirements.txt`
  - `uvicorn main:app --reload --port 9000`
  - Note: the frontend expects `/api/run` relative to the web root; in production Apache proxies `/api/` to the backend (port 9000 in the example vhost).

- Build & deploy (author's workflow):
  - `cd frontend && pnpm install && pnpm build` -> `dist/`
  - Copy `dist/` to server DocumentRoot and reload Apache. Apache must enable `mod_rewrite` and `mod_proxy` for SPA rewrites and backend proxying.

Project-specific conventions and gotchas (use exact files as examples)

- Environment variables
  - Frontend reads `VITE_CLERK_PUBLISHABLE_KEY` (see `frontend/.env.example` and `frontend/src/main.jsx`) and fails fast if missing.

- Demo vs production logic
  - Paywall is a demo: `src/PaywallGate.jsx` stores `xva_course_access` in `localStorage` and will accept any 6-character code. Do not assume server-side enforcement unless adding a backend endpoint.
  - Python execution endpoint (`/api/run`) intentionally does `exec()` with an empty globals dict — insecure. Any change to this should add sandboxing, timeouts, resource limits, and strict input validation.

- Routing & deep links
  - Apache vhost uses rewrite rules to send unknown routes to `index.html`. When modifying routing or base paths, update `deploy/course-xva-essentials.conf` accordingly.

- Key UI patterns
  - Components are organized under `frontend/src/components` and `ui/` contains primitives (button, dialog, card). Import aliases use `@/` (Vite alias) — check `vite.config.js` if modifying path resolution.

Integration points and external services

- Clerk: front-end authentication provider. Add allowed origins and publishable keys in Clerk dashboard for local/dev/production domains.
- Stripe (payments): referenced in README/Paywall but not implemented; production payment flow should integrate with a backend webhook and server-side verification.
- Apache (production): `deploy/course-xva-essentials.conf` demonstrates required rewrite/proxy rules and TLS cert locations.

Concrete examples AI agents should use when editing code

- To wire a secure backend check for access codes: add a new `/api/access` POST in `backend/main.py` that validates codes against a persistent store instead of `localStorage`. Reference `src/PaywallGate.jsx` for client behavior.
- To change notebook behavior: `src/components/PythonNotebook.jsx` calls `POST /api/run` with `{ code }`. If you add auth, ensure the frontend attaches Clerk tokens (see `frontend/src/main.jsx` for ClerkProvider usage).
- When adjusting build scripts or package versions, update `frontend/package.json` and keep `packageManager` entry intact for pnpm reproducibility.

Safety and priorities for edits

- Preserve demo behavior unless explicitly asked to secure it. The README documents that the backend is a demo and that `/api/run` is insecure.
- When adding server-side features, ensure CORS, Clerk auth, and Apache proxy paths remain consistent with `deploy/course-xva-essentials.conf`.

If anything above is unclear or you want the instructions to cover additional workflows (tests, CI, or a hardened notebook runner), tell me which area to expand and I will iterate.
