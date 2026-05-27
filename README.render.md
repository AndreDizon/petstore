# Deploying Petstore to Render

1) Push all changes to your GitHub repository (already done): master/main branch with full project.

2) Import the Render blueprint:
   - Open Render (https://dashboard.render.com).
   - Select "New" -> "Import a blueprint".
   - Paste or upload the `render.yaml` file from this repository and follow prompts.

3) What the blueprint creates:
   - A managed Postgres database named `petstore-db`.
   - A web service `petstore-backend` built from `backend/Dockerfile`. It receives DB credentials
     from the `petstore-db` via environment variables.
   - A static site `petstore-frontend` that runs `npm ci && npm run build` in the `frontend/` folder
     and publishes the build output at `frontend/dist`.

4) After import:
   - Wait for the build logs to complete and service URLs to appear.
   - Open the frontend URL (Render will provide it) and verify the app loads and fetches `/api/pets`.

5) Deliverables to submit:
   - PETSTORE URL: the public Render frontend URL (e.g. https://petstore-web-xxxx.onrender.com)
   - GITHUB REPO URL: https://github.com/<your-user>/petstore

If the backend cannot reach the DB, check service logs and ensure the environment variables are set
as described in `render.yaml`. You can also open the database dashboard in Render to see connection info.
