# SS Furniture - Deployment Guide

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites

- Node.js 20+
- npm 9+ or yarn
- Git
- Vercel CLI (for production deployment)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/ss-furniture.git
cd ss-furniture

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Environment Setup

### Required Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

### Environment-Specific Files

| Environment | File | Purpose |
|-------------|------|---------|
| All | `.env.local` | Local overrides |
| Development | `.env.development` | Dev-specific vars |
| Production | `.env.production` | Prod-specific vars |

## Local Development

```bash
# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linter
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Build for production (local)
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

## CI/CD Pipeline

### Workflow Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Push/PR   │────▶│  CI Checks  │────▶│   Deploy    │
│             │     │  - Lint     │     │  Preview/   │
│             │     │  - Type     │     │  Production │
│             │     │  - Test     │     │             │
│             │     │  - Build    │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### GitHub Actions Workflows

#### 1. CI Pipeline (`.github/workflows/ci.yml`)

Runs on every push and PR:
- Lint & Type Check
- Unit Tests with coverage
- Build verification
- Lighthouse audit (main branch only)

#### 2. Deploy Preview (`github/workflows/preview.yml`)

Runs on PR:
- Deploys preview environment
- Comments PR with preview URL
- Cleans up on merge

#### 3. Deploy Production (`.github/workflows/deploy.yml`)

Runs after CI passes on main:
- Deploys to Vercel production
- Sends Slack notifications

### Required Secrets

Add these in GitHub Settings > Secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `SLACK_WEBHOOK_URL` | Slack notification webhook |
| `CODECOV_TOKEN` | Codecov upload token (optional) |
| `TURBO_TOKEN` | Turborepo cloud token (optional) |

### Required Variables

Set these in GitHub Settings > Variables:

| Variable | Description |
|----------|-------------|
| `TURBO_TEAM` | Turborepo team slug (optional) |

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically via CI/CD

#### Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Other Platforms

For other deployment targets:

```bash
# Build
npm run build

# Output is in .next/
# Start with: npm start
```

## Monitoring

### Performance Metrics

The app tracks these Core Web Vitals:

| Metric | Target | Poor Threshold |
|--------|--------|---------------|
| LCP | < 2.5s | > 4s |
| FID | < 100ms | > 300ms |
| CLS | < 0.1 | > 0.25 |
| TTFB | < 800ms | > 1.8s |

### Lighthouse Budget

Performance budgets are defined in `lighthouse-budget.json`.

### Error Tracking

Enable error tracking by setting:

```bash
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## Troubleshooting

### Common Issues

#### Build fails on CI but works locally

```bash
# Clear caches
npm cache clean --force
rm -rf node_modules
npm install
```

#### TypeScript errors after pull

```bash
npm run typecheck
# Fix any reported errors
```

#### Environment variables not loading

- Ensure `.env.local` exists
- Restart dev server after changes
- Check variable names match exactly

### Getting Help

1. Check [GitHub Issues](https://github.com/your-org/ss-furniture/issues)
2. Review CI/CD logs for errors
3. Contact the development team

## License

Private - All rights reserved
