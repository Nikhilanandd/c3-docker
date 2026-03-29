# CI/CD Architecture and Implementation Approach Document  

## Project: C3 Website Deployment (Frontend + Backend + MongoDB)

---

## 1. Problem Statement

We need to design and implement a production‑grade CI/CD pipeline for a microservices‑based web application consisting of:

- Next.js frontend
- Express + MongoDB backend
- MongoDB database
- Deployment on a private Linux server
- Public access via: https://c3.sreenidhi.edu.in

### Goals

- Fully automated CI/CD using GitHub Actions
- Zero‑downtime deployments
- Secure handling of secrets
- Scalable and maintainable architecture
- Production‑grade Docker usage

---

## 2. Repository Strategy (Critical Design Decision)

### Option 1: Monorepo (Recommended)

Single repository structure:

```
repo‑root/
├── snist‑website‑fn/
├── snist‑website‑bn/
├── docker‑compose.yml
├── .env.example
└── .github/workflows/
```

### Why Monorepo is Better for Your Case

- Tight coupling between frontend and backend
- Shared environment variables
- Single deployment unit
- Simpler CI/CD pipeline
- Easier version synchronization

### When to Use Multi‑Repo (Not Needed Now)

- Independent teams
- Independent release cycles
- Microservices at scale (10+ services)

### Decision

Use **Monorepo** for now.

---

## 3. High‑Level Architecture

```
Developer Push → GitHub → GitHub Actions Pipeline

Pipeline Stages:

1. Checkout Code
2. Build Docker Images (frontend + backend)
3. Tag Images with Commit SHA
4. Push Images to GHCR
5. SSH into Server
6. Pull New Images
7. Start New Containers (Green)
8. Health Check Validation
9. Switch Traffic via NGINX
10. Stop Old Containers (Blue)

User Traffic:
Internet → NGINX → Active Containers
```

---

## 4. System Components

### 4.1 Application Services

- Frontend: Next.js (port 3000)
- Backend: Express (port 5000)
- Database: MongoDB (port 27017)

### 4.2 Infrastructure

- Docker Engine
- Docker Compose
- NGINX Reverse Proxy
- GitHub Actions CI/CD
- GitHub Container Registry (GHCR)

---

## 5. CI/CD Pipeline Design

### 5.1 Pipeline Stages

#### Stage 1: Checkout
- Pull latest code from `main` branch

#### Stage 2: Build
- Build frontend and backend Docker images separately

#### Stage 3: Tagging
- Use immutable tags:
  - Commit SHA
  - Optional semantic version

#### Stage 4: Push
- Push images to GHCR

#### Stage 5: Deploy
- SSH into server
- Pull new images
- Deploy using `docker‑compose`

---

## 6. Docker Strategy

### 6.1 Image Naming Convention

```
ghcr.io/<org>/<repo>-frontend:<commit‑sha>
ghcr.io/<org>/<repo>-backend:<commit‑sha>
```

### 6.2 Important Principles

- Never build on production server
- Always pull pre‑built images
- Use immutable tags (commit SHA)
- Avoid using `latest` in production

---

## 7. Environment Variable Strategy

### 7.1 Frontend

- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_API_KEY`

### 7.2 Backend

- `MONGO_URI`
- `API_KEY`
- `EMAIL_USER`
- `CLIENT_ID`
- `CLIENT_SECRET`
- `REFRESH_TOKEN`

### 7.3 Storage Strategy

- `.env.example` → version controlled
- `.env` → only on server
- GitHub Secrets → for CI/CD

---

## 8. Deployment Strategy

### 8.1 Selected Strategy: Blue‑Green Deployment

#### Concept

- **Blue** = current running version
- **Green** = new version
- Switch traffic only after validation

#### Why Blue‑Green

- Zero downtime
- Easy rollback
- Predictable behavior

---

## 9. Zero‑Downtime Architecture

### 9.1 NGINX Reverse Proxy

Handles:

- Domain routing (c3.sreenidhi.edu.in)
- Traffic switching
- Load balancing

### 9.2 Flow

```
1. Deploy new containers (green)
2. Run health check
3. Update NGINX upstream
4. Reload NGINX
5. Stop old containers (blue)
```

---

## 10. Server Design

### 10.1 Directory Structure

```
/opt/c3‑app/
├── docker‑compose.yml
├── .env
├── nginx/
├── scripts/
```

### 10.2 Required Installations

- Docker
- Docker Compose
- NGINX
- Git

---

## 11. Security Design

### 11.1 Secrets in GitHub

- `GHCR_TOKEN`
- `SSH_PRIVATE_KEY`
- `SERVER_HOST`
- `SERVER_USER`

### 11.2 Best Practices

- Do not expose secrets in repo
- Use a deploy user instead of root
- Restrict SSH access
- Use read‑only tokens where possible

---

## 12. Implementation Plan (Step‑by‑Step)

---

### Step 1: Prepare Dockerfiles

Ensure:

- Multi‑stage builds for frontend
- Production mode enabled
- Minimal image size

---

### Step 2: Modify `docker‑compose.yml` for Production

Replace `build` with `image`:

```
frontend:
  image: ghcr.io/<repo>-frontend:${TAG}

backend:
  image: ghcr.io/<repo>-backend:${TAG}
```

---

### Step 3: Setup GitHub Container Registry

- Create Personal Access Token
- Enable `write:packages`

---

### Step 4: Configure GitHub Secrets

Add:

```
GHCR_TOKEN
SSH_PRIVATE_KEY
SERVER_HOST
SERVER_USER
```

---

### Step 5: Create GitHub Actions Workflow

Responsibilities:

- Build frontend image
- Build backend image
- Tag with commit SHA
- Push to GHCR
- SSH into server
- Deploy

---

### Step 6: Server Deployment Script

Example:

```
docker‑compose pull
docker‑compose up -d --no‑deps --build frontend backend
```

---

### Step 7: Zero‑Downtime Enhancement

Introduce:

- Versioned containers
- Health‑check endpoint (`/health`)

Deployment flow:

```
1. Start new container (green)
2. Check `/health`
3. Switch NGINX upstream
4. Stop old container (blue)
```

---

## 13. Rollback Strategy

### Approach

- Maintain previous image tag
- On failure:

```
docker‑compose down
docker‑compose up -d <previous‑tag>
```

### Recommendation

- Store last 3 stable tags

---

## 14. Monitoring Strategy

### Basic

- `docker logs`
- `docker stats`

### Advanced (Future)

- Prometheus + Grafana
- Centralized logging (ELK)

---

## 15. Versioning Strategy

### Use:

- Commit SHA → primary
- Optional: `v1.0.0` (manual release)

### Avoid:

- `latest` (unpredictable)

---

## 16. Future Improvements

- Self‑hosted GitHub runner on server
- Docker layer caching
- Canary deployments
- Horizontal scaling (Kubernetes later)
- Auto‑scaling infrastructure

---

## 17. Final Architecture Summary

- Monorepo for simplicity
- GHCR for image registry
- GitHub Actions for CI/CD
- Docker Compose for orchestration
- NGINX for routing and zero downtime
- Blue‑Green deployment for reliability

---

## 18. Key Takeaways

- Treat Docker image as the artifact
- Never build in production
- Always use immutable tags
- Separate CI (build) from CD (deploy)
- Design for rollback from day one
- Zero downtime requires traffic control (NGINX)

---

## 19. Next Steps

After this design:

1. Write final production `docker‑compose.yml`
2. Configure NGINX for domain routing
3. Implement GitHub Actions workflow
4. Add SSH deployment automation
5. Implement health checks and traffic switching

---