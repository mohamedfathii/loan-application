# loan-application

Loan application tracker. Monorepo managed with Yarn 4 workspaces.

| Folder | What |
|---|---|
| `apps/api` | NestJS API + PostgreSQL (see [apps/api/README.md](apps/api/README.md)) |
| `apps/web` | Next.js frontend |

## Quick start

```sh
yarn install                       # installs all apps
cp apps/api/.env.example apps/api/.env
yarn db:up                         # start Postgres (Docker)
yarn api migration:run             # create tables
yarn api start:dev                 # API on http://localhost:3000
yarn web dev                       # web on http://localhost:3001
```

Run any app's script from the root with `yarn api <script>` / `yarn web <script>`,
or `cd` into the app folder and use `yarn <script>`.
