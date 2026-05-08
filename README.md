# Dark Souls I Guide - Hybrid Application

A comprehensive, production-ready guide application for Dark Souls I with Web and Desktop platforms.

## 🎮 Features

- **Complete Guide System**: Boss guides, walkthroughs, items, builds, and lore
- **Progress Tracking**: Track your completion and achievements
- **Multi-Platform**: Web app and native desktop wrapper using Tauri
- **Cloud Sync**: Sync your progress across devices (registered users)
- **Guest Mode**: Access 70% of guides without account
- **Dark Fantasy UI**: Premium, immersive interface with smooth animations
- **Offline Support**: Cache guides for offline access
- **Responsive Design**: Optimized for all device sizes

## 📁 Project Structure

```
darks-souls-guide/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/        # App Router pages and layouts
│   │   │   ├── components/ # Reusable React components
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── lib/        # Utilities and helpers
│   │   │   ├── store/      # Zustand state management
│   │   │   └── types/      # TypeScript definitions
│   │   └── tailwind.config.ts
│   └── desktop/             # Tauri desktop wrapper
│       ├── src/
│       ├── tauri.conf.json
│       └── src-tauri/
├── packages/
│   ├── types/              # Shared TypeScript types
│   ├── shared/             # Shared utilities and constants
│   ├── api/                # REST API client
│   └── ui/                 # Shared UI components
├── backend/                # Express.js REST API
│   └── src/
└── package.json
```

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 with App Router
- React 18
- TypeScript (strict mode)
- Tailwind CSS with custom Dark Souls theme
- Framer Motion for animations
- Zustand for state management
- TanStack Query for data fetching
- Next-themes for theme switching

**Backend:**
- Express.js
- PostgreSQL
- JWT Authentication
- TypeScript

**Desktop:**
- Tauri (native wrapper)
- Vite
- React 18

**Monorepo:**
- npm workspaces
- Shared packages

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL (for backend)
- Tauri CLI (for desktop builds)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/darks-souls-guide.git
cd darks-souls-guide
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Copy `.env.example` files and update values:

Backend:
```bash
cp backend/.env.example backend/.env
# Update DATABASE_URL, JWT_SECRET, etc.
```

Web:
```bash
cp apps/web/.env.example apps/web/.env
```

4. **Start development**

Terminal 1 - Backend API:
```bash
npm run dev -w backend
```

Terminal 2 - Web App:
```bash
npm run dev -w apps/web
```

Terminal 3 - Desktop (optional):
```bash
npm run dev -w apps/desktop
```

## 🏗️ Build

**Web (for Vercel):**
```bash
npm run build -w apps/web
```

**Backend:**
```bash
npm run build -w backend
```

**Desktop:**
```bash
npm run build -w apps/desktop
```

**All projects:**
```bash
npm run build
```

## ✅ Validation

**Type checking:**
```bash
npm run type-check
```

**Linting:**
```bash
npm run lint
```

**Full validation:**
```bash
npm run type-check && npm run lint && npm run build
```

## 📚 Key Files

- **Root setup**: `package.json` - Workspaces configuration
- **Web config**: `apps/web/next.config.js`, `tailwind.config.ts`
- **Backend config**: `backend/src/index.ts`
- **Types**: `packages/types/` - Shared type definitions
- **API client**: `packages/api/endpoints/` - API integration

## 🔐 Authentication

- Username/Email + Password
- JWT tokens (access + refresh)
- Internal authentication (no OAuth)
- Guest mode support

## 📊 Database Schema

The backend includes:
- Users (authentication)
- Guides (boss guides, walkthroughs)
- Progress (user achievement tracking)
- Bookmarks (user guides)
- Notifications (user notifications)

## 🚢 Deployment

### Vercel (Web)
```bash
npm run build -w apps/web
# Push to GitHub, connect to Vercel
```

### Heroku/Railway (Backend)
```bash
npm run build -w backend
# Deploy using platform CLI
```

### Desktop Distribution
```bash
npm run build -w apps/desktop
# Generates installers for Windows, macOS, Linux
```

## 🎨 Theme Customization

Edit `apps/web/tailwind.config.ts` to customize colors:
- Ember colors for glowing effects
- Gold accents for premium feel
- Dark Souls aesthetic throughout

## 📝 Environment Variables

See `.env.example` files for required variables:
- API URLs
- JWT secrets
- Database connection
- Feature flags

## 🐛 Troubleshooting

**Build errors:**
1. Clear cache: `npm run clean`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check TypeScript: `npm run type-check`

**Port conflicts:**
- Web: Default 3000
- Backend: Default 3001
- Change in respective config files

**Database issues:**
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Ready to guide adventurers through Lordran!** 🎮✨
