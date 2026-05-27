Local development

Run PostgreSQL and the backend with docker-compose (recommended):


```markdown
# Petstore — Local development guide

This document explains how to run the full stack locally, what prerequisites you need, and a few troubleshooting tips.

## Tech stack summary
- Backend: Spring Boot 3 (Java 17), Spring Data JPA, PostgreSQL. Build with Maven (optional: Docker image provided).
- Frontend: Vite + React + TypeScript + Tailwind CSS + MUI. Dev server uses Vite on port 5173 and proxies `/api` to the backend.
- Infra: Docker Compose for local PostgreSQL and an easy way to run the backend container.

## Prerequisites
- Docker Desktop (with Docker Compose v2) — required for the recommended full-stack flow.
- Node.js (LTS) and npm or Yarn — to run the frontend dev server. Node 18+ is recommended; the project works with newer Node versions as well.
- Optional (only if you want to run the backend locally or run Maven tests):
    - JDK 17 installed and configured (JAVA_HOME)
    - Apache Maven (or use the Maven Docker image shown below)

## Ports used
- Backend: 8080
- Frontend (Vite dev server): 5173
- Postgres (dev/infra): 5432

## Run full stack (recommended - Docker Compose)
1. From the repository root:

```powershell
cd infra
docker compose up --build -d
```

This brings up Postgres and the backend container (the backend image is built from `backend/Dockerfile`).

2. Start the frontend dev server in a separate terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend in your browser at http://localhost:5173/. The frontend uses a dev proxy to forward `/api` calls to the backend at http://localhost:8080.

## Run backend locally (alternative)
If you have Java 17 and Maven installed you can run the backend locally (without Docker):

```powershell
cd backend
mvn spring-boot:run
```

If you don't have Maven installed, you can run tests or builds using the official Maven Docker image. From the repository root you can run (PowerShell):

```powershell
# Example: run Maven tests inside a Maven Docker container (adjust path if your repo path contains spaces)
docker run --rm -v "${PWD}:/workspace" -w /workspace/backend maven:3.9.4-eclipse-temurin-17 mvn -B test
```

Note: When using Docker run on Windows, ensure the path mapping (`${PWD}`) resolves correctly. If your path contains spaces, wrap it in quotes as shown.

## Frontend: build / production preview

```powershell
cd frontend
npm run build
npm run preview
```

## Environment variables
- The backend accepts these environment variables (defaults are provided in `application.properties`):
    - JDBC_DATABASE_URL (e.g. jdbc:postgresql://db:5432/petstore)
    - JDBC_DATABASE_USERNAME (default: postgres)
    - JDBC_DATABASE_PASSWORD (default: postgres)

## API & data model (quick reference)
- Base path: `/api/pets`
- Endpoints implemented in `PetController`:
    - GET /api/pets — list all pets
    - GET /api/pets/{id} — get pet by id
    - POST /api/pets — create pet (JSON body: name, species, price, imageUrl)
    - PUT /api/pets/{id} — update pet
    - DELETE /api/pets/{id} — delete pet

Pet model fields (JPA entity `Pet`):
- id: Long (generated)
- name: String
- species: String
- price: BigDecimal (frontend uses number)
- imageUrl: String (nullable)

## Database migrations
- There's a SQL migration in `infra/migrations/0001-add-image_url.sql` that adds the `image_url` column if missing. The Spring Boot app is configured with `spring.jpa.hibernate.ddl-auto=update` for local convenience.

## CORS / proxy notes
- Backend CORS is configured to allow `http://localhost:5173` for `/api/**` requests (see `WebConfig.java`).
- Vite dev server proxies `/api` to the backend (`frontend/vite.config.ts`). In development you should not have to configure extra proxies if you follow the steps above.

## Troubleshooting
- Vite reports "ready" but PowerShell `Invoke-WebRequest -Method Head` fails:
    - Try opening http://localhost:5173/ in your browser first — Vite often serves files successfully even if a programmatic shell request fails due to IPv4/IPv6 loopback differences or firewall rules.
    - Try `Invoke-WebRequest -Uri "http://127.0.0.1:5173/" -Method Head` and `Invoke-WebRequest -Uri "http://[::1]:5173/" -Method Head` to test IPv4 vs IPv6.
    - Alternatively use `curl.exe -I http://localhost:5173/` or test from WSL/Git Bash.
- Backend returns 500/DB errors: ensure Docker Compose started Postgres and the DB is reachable. Check logs:

```powershell
cd infra
docker compose logs -f backend
```

## Running tests
- If you have Maven locally: `cd backend && mvn test`.
- If not, use the Maven Docker image example above to run tests inside Docker.

## Useful commands summary

```powershell
# Start infra (db + backend container)
cd infra
docker compose up --build -d

# Start frontend (dev server)
cd frontend
npm install
npm run dev

# Tail backend logs
cd infra
docker compose logs -f backend

# Run backend tests (with local maven)
cd backend
mvn test
```

## Notes & next steps
- The repo includes a production-ready `Dockerfile` for the backend; infra docker-compose is minimal and intended for local dev.
- If you'd like, I can:
    - add a `dev` script to the repo root to start infra + frontend together, or
    - add a small PowerShell helper that runs both and opens the frontend in your browser, or
    - run the backend integration tests from Docker and report results.

If you want me to add any of those items (scripts or test runs), tell me which and I will implement them.
```
