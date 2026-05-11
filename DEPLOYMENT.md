# Dark Souls I Guide - Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account (vercel.com)
- GitHub repository connected
- Node.js 18+

### Steps

1. **Connect GitHub Repository**
   - Go to vercel.com/dashboard
   - Click "New Project"
   - Import from GitHub
   - Select `DarksSoulsI-Guide` repository

2. **Configure Project**
   - Framework: Next.js
   - Root Directory: `apps/web`
   - Build Command: `npm run build -w apps/web`
   - Output Directory: `.next`

3. **Environment Variables**
   Set these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://api.darkssouls-guide.com
   NEXT_PUBLIC_APP_NAME=Dark Souls I Guide
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Test deployment at `*.vercel.app`

## Local Development

### Requirements
- Node.js 18+
- npm 9+
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/DarksSoulsI-Guide.git
cd DarksSoulsI-Guide

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Start development
npm run dev

# Access at http://localhost:3000
```

### Available Commands

```bash
# Development
npm run dev              # Start all dev servers
npm run dev -w apps/web # Start web dev only

# Building
npm run build            # Build all packages
npm run build -w apps/web
npm run build -w backend

# Type Checking
npm run type-check      # Check all TypeScript
npm run type-check -w apps/web

# Linting
npm run lint -w apps/web

# Format Code
npm run format

# Validation
npm run build           # Full build validation
./validate.sh          # Run comprehensive validation (Linux/macOS)
validate.bat           # Run comprehensive validation (Windows)
```

## Desktop Build (Tauri)

### Requirements
- Rust 1.70+
- Visual Studio C++ Build Tools (Windows)
- Xcode Command Line Tools (macOS)

### Build Commands

```bash
# Development
npm run dev -w apps/desktop

# Build for distribution
npm run tauri build -w apps/desktop

# Outputs will be in target/release
```

## Backend Deployment

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create darks-souls-guide-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set DATABASE_URL=your-database-url

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Railway / Render

Use `npm run build` and `npm start` commands in their deployment configs.

## Database Setup

### PostgreSQL

```sql
-- Create database
CREATE DATABASE darks_souls_db;

-- Connect to database
\c darks_souls_db;

-- Create tables (update schema as needed)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- More schema will be added based on requirements
```

## Monitoring

### Health Checks

```bash
# Check backend
curl http://localhost:3001/health

# Check web (next app)
curl http://localhost:3000
```

### Logs

- Backend: Check terminal where `npm run dev` is running
- Frontend: Browser DevTools Console
- Deployment: Check Vercel/Heroku dashboards

## Security Checklist

- [ ] Environment variables set correctly
- [ ] Database credentials secured
- [ ] JWT secrets strong and unique
- [ ] CORS properly configured
- [ ] HTTPS enabled in production
- [ ] Rate limiting configured
- [ ] API authentication implemented
- [ ] Error messages don't expose sensitive info

## Performance

Monitor:
- Bundle size
- API response times
- Database query performance
- Lighthouse scores

Use:
- Vercel Analytics
- Sentry for error tracking
- New Relic / Datadog for monitoring

## Troubleshooting

### Build Fails

1. Check Node version: `node --version` (should be 18+)
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`
4. Check logs for specific errors

### Deployment Issues

1. Verify environment variables are set
2. Check build logs in Vercel/deployment platform
3. Test locally first
4. Check database connectivity
5. Review error logs

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running
- Check network in browser DevTools

---

For more help, check:
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tauri Docs](https://tauri.app/en/docs)
