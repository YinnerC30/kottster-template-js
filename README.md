# Kottster App

This template ships with a production-ready `Dockerfile` and `docker-compose.yml` so you can deploy it easily on **Dokploy**, **Coolify**, or any other Docker-based PaaS — or run it locally with a single command.

---

## 🚀 Deploy on Dokploy (recommended)

### 1. Add your repository to Dokploy

Connect your Git repository in the Dokploy dashboard and choose **Docker Compose** as the deploy method.

### 2. Set Environment Variables

In the Dokploy service → **Environment Variables** tab, add:

| Variable | Description | Required |
|---|---|---|
| `SECRET_KEY` | Random secret for the app (32+ chars) | ✅ |
| `JWT_SECRET_SALT` | Random salt for JWT tokens (32+ chars) | ✅ |
| `ROOT_PASSWORD` | Password for the admin account | ✅ |
| `ROOT_USERNAME` | Username for the admin account | optional (default: `admin`) |
| `HOST_PORT` | Host port to expose | optional (default: `5480`) |

**Generate secrets quickly:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Deploy

Click **Deploy** in Dokploy. The build pipeline will:
1. Install all dependencies
2. Build the Vite client bundle
3. Bundle the server with `kottster build:server`
4. Start the production server automatically on port 5480

---

## 💻 Run Locally with Docker Compose

### 1. Clone and configure

```bash
git clone https://github.com/kottster/kottster-template-js my-kottster-app
cd my-kottster-app

# Create your local env file from the template
cp .env.example .env
# Edit .env and fill in real values
```

### 2. Start

```bash
docker compose up -d
```

The app will be available at **http://localhost:5480**.

### 3. Manage

```bash
# View logs
docker compose logs -f

# Stop
docker compose down

# Stop and remove persistent data
docker compose down -v
```

---

## 🔐 Security Notes

- **Never commit** the `.env` file — it is listed in `.gitignore`.
- Change `SECRET_KEY`, `JWT_SECRET_SALT`, and `ROOT_PASSWORD` before your first deploy.
- The SQLite database is stored in a named Docker volume (`kottster_data`) so it survives container restarts and re-deployments.

---

## ⚙️ Configuration

### Changing the exposed port

Edit `HOST_PORT` in your `.env` file (local) or in the Dokploy environment variables (production):

```env
HOST_PORT=8080
```

### Development mode (local, without Docker)

```bash
npm install
npm run dev
```