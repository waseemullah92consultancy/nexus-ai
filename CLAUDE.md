# NexusAI - AI Model Marketplace

A production-grade AI Model Marketplace clone built with Next.js 14 and NestJS.

## Project Structure

```
nexusai/
├── apps/
│   ├── frontend (Next.js 14, port 3000)
│   └── backend (NestJS, port 4000)
├── package.json (workspace + concurrently)
└── CLAUDE.md
```

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- MUI v6
- Redux Toolkit + RTK Query
- Framer Motion

### Backend
- NestJS
- JWT Auth (access + refresh)
- HttpOnly cookies
- class-validator + class-transformer

### Data
- JSON files ONLY (no DB)

## Quick Start

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:backend
npm run dev:frontend
```

## Ports
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## API Endpoints

### Auth
- POST /api/auth/signup
- POST /api/auth/signin
- POST /api/auth/refresh
- POST /api/auth/signout
- GET /api/auth/me

### Models
- GET /api/models
- GET /api/models/stats
- GET /api/models/labs
- GET /api/models/:id

### Agents
- GET /api/agents
- GET /api/agents/:id

### Research
- GET /api/research
- GET /api/research/trending
- GET /api/research/:id