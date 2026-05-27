# Deploy the Petstore backend to Railway (free tier)

This guide shows how to deploy the Spring Boot backend (the `backend/` folder) to Railway's free developer tier.

Why Railway?
- Railway provides a free dev tier that supports Java/Maven builds or Dockerfile deployments and has a managed Postgres plugin you can add quickly.

Summary (quick):
1. Create a Railway project and connect your GitHub repo.
2. Set the project's root to `backend` (or use Dockerfile deploy).
3. Add the Postgres plugin in Railway and copy the connection details.
4. Set environment variables Railway provides (JDBC URL, username, password).
5. Deploy and test.

Detailed steps

1) Create a Railway project and link GitHub
- Sign in to https://railway.app/ and create a new project.
- Choose "Deploy from GitHub" and select the `AndreDizon/petstore` repository.

2) Configure the service (two options)

Option A — Build with Maven (recommended):
- Set the project/service root to `backend` (Railway shows a field for rootDir).
- Set the Build Command to:

  mvn -B -DskipTests package

- Set the Start Command to (Railway will use this after build):

  java -jar target/petstore-backend-0.0.1-SNAPSHOT.jar

Option B — Build with Dockerfile (alternative):
- When Railway asks, choose Dockerfile-based deploy and use the `backend/Dockerfile` already in the repo. No custom build/start commands are required.

3) Add a PostgreSQL plugin
- In your Railway project, click "Plugins" and add the Postgres plugin (free plan available for dev projects).
- After the plugin is created, open it and copy the connection details (host, port, database, user, password). Railway also provides a full connection string.

4) Map Railway Postgres credentials to app env vars
- The backend expects the following environment variables (match these names):
  - `JDBC_DATABASE_URL` — full JDBC URL (example: `jdbc:postgresql://db-host:5432/railway_db`)
  - `JDBC_DATABASE_USERNAME` — database user
  - `JDBC_DATABASE_PASSWORD` — database password

Railway often provides a connection string like `postgresql://user:pass@host:port/dbname`. Convert it to a JDBC URL like:

  jdbc:postgresql://host:port/dbname

Then set `JDBC_DATABASE_USERNAME` and `JDBC_DATABASE_PASSWORD` accordingly in the Railway environment variables UI for the service.

5) Deploy
- Trigger a deploy from Railway (it will run the Maven build or Docker build depending on your choice).
- Watch the build logs in Railway. The Maven build will produce `target/petstore-backend-0.0.1-SNAPSHOT.jar` and then the start command will run the jar.

6) Verify the service
- Railway exposes a public URL once the web service starts. You can curl the health endpoint or the API endpoints:

  curl https://<your-service>.up.railway.app/api/pets

- Check the application logs in Railway if the app fails to start (common problems: wrong JDBC URL format, database unreachable for a few seconds while Railway provisions the database).

Notes and hints
- If you prefer not to set `JDBC_DATABASE_URL`, you can instead set the Spring Boot specific env vars `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` — but the app currently reads `JDBC_DATABASE_*` in `application.properties`, so set those names for simplicity.
- If your first deploy fails with DB connection errors, wait a minute for the Postgres plugin to be fully provisioned, then redeploy or restart the service.
- After the backend is running, copy its public URL and set the frontend `VITE_API_BASE_URL` to that URL (update `render.frontend.yaml` or set a Render environment variable if you already deployed the frontend).

Local testing tip
- Before deploying, you can test production jar locally:

  cd backend
  mvn -DskipTests package
  JDBC_DATABASE_URL=jdbc:postgresql://localhost:5432/petstore_dev \
  JDBC_DATABASE_USERNAME=postgres \
  JDBC_DATABASE_PASSWORD=postgres \
  java -jar target/petstore-backend-0.0.1-SNAPSHOT.jar

Questions / I can do this for you
- I can walk you through these Railway steps interactively and watch the logs.
- If you want, I can prepare a Railway deployment manifest or attempt the deploy for you — I would need access to your Railway account or an API key.
