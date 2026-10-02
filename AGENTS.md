# Development environment notes

- Despite the repository name and README, this checkout contains only a React frontend: no backend, mobile project, database, migrations, or external credentials are required.
- Base44 runs cloned source through Vite on port 3000. Compose installs from package-lock.json at startup into a named dependency volume; do not replace it with a production bundle.
- Verify startup with `docker compose -f docker-compose.base44.yml ps`, `curl -fsS http://localhost:3000/`, and `docker compose -f docker-compose.base44.yml exec -T web npm run lint`. The entry HTML should include `/@vite/client` and `/src/main.tsx`.
- Shoutouts and chart votes are browser-local (localStorage), not shared with a server. The contact form only displays a simulated confirmation; it does not deliver messages.
- Live audio uses the public Zeno stream configured in src/data/stationData.ts. Actual stream availability is external and separate from preview health. Listener counts are simulated.
- Vite already accepts preview hosts via `server.allowedHosts: true`; Compose enables polling for bind-mounted files.
