# Base44 development notes

- Run the preview with `docker compose -f docker-compose.base44.yml up -d`; it serves the bind-mounted source on port 3000 with live reload.
- The imported checkout is frontend-only, despite the README's fullstack description. The player consumes a configured external Zeno stream; there is no broadcaster ingest, payment backend, gift ledger, or payout implementation.
- No external secrets are needed to boot. Payment or broadcaster integrations require separate implementation and user-owned credentials.
- `MonthlySupport` is instructions only: UGX 5,000 per month, manually sent by the listener. Receiving numbers and recipient names are deliberately unconfigured until the user provides verified payment details. Do not reuse station contact numbers as payment destinations. No recurring billing or payment verification exists.
- The first compose startup creates package-lock.json when absent; subsequent starts install using npm ci. Dependencies live in a dedicated volume.
- Verify source serving with GET `/src/App.tsx` (development module) and GET `/` (HTML). Run type checks with `docker compose -f docker-compose.base44.yml exec -T web npm run lint`.
