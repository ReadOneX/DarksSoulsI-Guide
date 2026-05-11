# Dark Souls I Guide - Hybrid Game Companion App

A premium, production-ready Dark Souls I companion application with web and desktop platforms.

## Features

- **Boss Database**: Comprehensive guides for every boss
- **Item Database**: Complete weapon and armor database
- **Build Planner**: Optimize character builds
- **Progress Tracker**: Track bosses, bonfires, achievements
- **Lore Archive**: In-depth game lore
- **Interactive Maps**: Navigate areas with all resources
- **Bookmarks & Collections**: Save and organize guides
- **Cross-platform**: Web and Desktop (Tauri)
- **Dark Mode/Light Mode**: Theme switching
- **Cloud Sync**: Sync progress across devices (Premium)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Desktop**: Tauri
- **State**: Zustand
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Monorepo**: Turborepo

## Project Structure

```
├── apps/
│   ├── web/          # Next.js web application
│   └── desktop/      # Tauri desktop wrapper
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── shared/       # Shared utilities and constants
│   ├── api/          # API client
│   └── ui/           # Reusable UI components
├── backend/          # Express API server
└── docs/             # Documentation
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Rust (for Tauri)

### Installation

```bash
npm install
```

### Development

```bash
# Start web development server
npm run dev

# Start all development servers
npm run dev:all

# Type checking
npm run type-check

# Linting
npm run lint
```

### Build

```bash
# Build all packages
npm run build

# Build web app only
npm run build -w apps/web

# Build desktop app
npm run build -w apps/desktop
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Dark Souls I Guide
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Architecture

### Clean Architecture

- **Separation of Concerns**: Clear boundaries between UI, business logic, and data
- **Type Safety**: Full TypeScript with strict mode
- **Modular Design**: Reusable components and services
- **Scalable Structure**: Ready for growth and maintenance

### Authentication

- Internal authentication system
- JWT tokens with refresh mechanism
- Guest mode with limited access (70%)
- Role-based access control

### State Management

- Zustand for client state
- Persistence layer with localStorage
- TanStack Query for server state
- Optimistic updates

## Deployment

### Vercel

The web app is optimized for Vercel:

```bash
npm run build
npm start
```

### Desktop

Build with Tauri:

```bash
npm run build -w apps/desktop
```

## Performance

- Code splitting and lazy loading
- Image optimization
- CSS-in-JS optimization
- Dynamic imports for heavy components
- Caching strategies

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Contributing

See CONTRIBUTING.md for guidelines.

## License

Proprietary - All rights reserved

## Support

For support, contact: support@darksoulsguide.com

---

Made with ⚔️ for the Undead
