
# Intro — NestJS Example Project

This repository is a small NestJS example application demonstrating typical features of a REST API: authentication, users, profiles, tweets, hashtags, and pagination.

## Key Features
- Authentication (login) flow
- User management (create, update, fetch)
- Profile management
- Tweet CRUD with query parameters and pagination
- Hashtag management
- Centralized configuration and environment validation

## Project Structure (src)
- `auth/` — auth controller, service, providers, DTOs
- `users/` — user entity, controller, service, DTOs
- `profile/` — profile entity, controller, service
- `tweet/` — tweet entity, controller, service, DTOs
- `hashtag/` — hashtag entity and controller
- `common/pagination/` — pagination DTO, provider, and module
- `config/` — app and database configuration, env validation
- `CustomExceptions/` — application-specific exceptions

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- A running database (configured via environment variables)

## Quick Start
1. Install dependencies

```bash
npm install
# or
yarn
```

2. Provide environment variables (see `src/config` for expected keys).

Common environment variables to set (example names — check `src/config`):

- `APP_PORT` — port the app listens on
- `DATABASE_URL` or DB connection details
- `JWT_SECRET` — JWT secret for auth
- Any other variables validated in `src/config/env.validation.ts`

3. Run the app in development

```bash
npm run start:dev
# or
yarn start:dev
```

4. Build and run for production

```bash
npm run build
npm run start:prod
```

## Scripts
This project uses standard NestJS scripts. Common scripts you can expect in `package.json`:

- `start` — run production build
- `start:dev` — run in watch/development mode
- `build` — TypeScript build
- `test` — run unit tests
- `test:e2e` — run end-to-end tests

## API Endpoints (overview)
- `POST /auth/login` — authenticate and get token
- `POST /users` — create a user
- `GET /users/:id` — get user by id
- `PUT /users/:id` — update user
- `GET /tweets` — list tweets (supports pagination/query)
- `POST /tweets` — create a tweet
- `GET /hashtags` — list hashtags
- `GET /profiles/:id` — profile operations

Refer to the controller files in `src/` for exact routes and request/response shapes.

## Testing
- Run unit tests:

```bash
npm run test
```

- Run e2e tests:

```bash
npm run test:e2e
```

## Contributing
- Open an issue or a PR with clear description and tests for changes.

## Troubleshooting
- If the app fails to start, check environment variables and database connectivity.
- Use logs printed to console for debugging and consult controller/service files for request handling.

---

If you'd like, I can:
- add example `.env` (template) with the required variables,
- generate API docs (Swagger) setup, or
- add README examples for common API requests (curl/Postman).

