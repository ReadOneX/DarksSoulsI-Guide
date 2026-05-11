# Dark Souls I Guide - Architecture Documentation

## Project Overview

Dark Souls I Guide adalah aplikasi hybrid yang menyediakan panduan komprehensif untuk game Dark Souls I dengan mendukung platform web dan desktop.

## Architecture

### Monorepo Structure (Turborepo)

```
darks-souls-guide/
├── apps/
│   ├── web/              # Next.js 16 web application
│   └── desktop/          # Tauri desktop wrapper
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── shared/           # Utilities, constants, helpers
│   ├── api/              # API client library
│   └── ui/               # Reusable UI components
├── backend/              # Express.js REST API
├── docs/                 # Documentation
└── README.md
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Data Fetching**: TanStack Query
- **Animations**: Framer Motion
- **UI Framework**: Custom component library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (prepared for scalability)
- **Authentication**: JWT with refresh tokens
- **API**: RESTful

### Desktop
- **Framework**: Tauri
- **UI**: React + Vite
- **Package**: Native Windows/macOS/Linux binaries

### DevOps
- **Package Manager**: npm with workspaces
- **Build Tools**: Turbopack (Next.js 16)
- **Build Orchestration**: Turborepo
- **CI/CD Ready**: GitHub Actions compatible
- **Deployment**: Vercel (web), custom (backend), native (desktop)

## Key Design Patterns

### 1. Clean Architecture
- **Separation of Concerns**: UI, Business Logic, Data layers
- **Dependency Injection**: Via function parameters
- **Type Safety**: Full TypeScript strict mode

### 2. State Management
- **Client State**: Zustand with persistence
- **Server State**: TanStack Query
- **Auth State**: Zustand store with localStorage

### 3. API Communication
- **API Client**: Centralized in packages/api
- **Error Handling**: Consistent error responses
- **Interceptors**: Request/response middleware
- **Cancellation**: Request cancellation support

### 4. Component Architecture
- **Reusable Components**: In packages/ui
- **Props-based Configuration**: Flexible and composable
- **Accessibility**: WCAG 2.1 AA compliant

## Authentication Flow

```
1. User Login
   ↓
2. POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Returns: user, accessToken, refreshToken
   ↓
5. Frontend stores in Zustand + localStorage
   ↓
6. API client adds Authorization header
   ↓
7. Requests authenticated
```

## Data Flow

```
User Interaction
   ↓
React Component (UI)
   ↓
Zustand Store / TanStack Query
   ↓
API Client (packages/api)
   ↓
Backend Express Routes
   ↓
Database / External Services
```

## Type System

### Type Organization
- `packages/types/auth.ts` - Authentication types
- `packages/types/guide.ts` - Guide & content types
- `packages/types/progress.ts` - Progress tracking types
- `packages/types/api.ts` - API response types

### Type Safety Features
- Strict null checking
- No implicit any
- Exhaustive switch cases
- Type guards for runtime safety

## API Endpoints

### Authentication
```
POST   /api/auth/login           - User login
POST   /api/auth/register        - User registration
POST   /api/auth/refresh         - Refresh token
POST   /api/auth/logout          - User logout
POST   /api/auth/guest           - Guest login
```

### Guides
```
GET    /api/guides/bosses        - Get all bosses
GET    /api/guides/bosses/:id    - Get specific boss
GET    /api/guides/areas         - Get all areas
GET    /api/guides/areas/:id     - Get specific area
```

### Progress
```
GET    /api/progress/:userId     - Get user progress
PUT    /api/progress/:userId     - Update progress
POST   /api/progress/:userId/boss-defeat - Log boss defeat
```

### Bookmarks
```
GET    /api/bookmarks/:userId    - Get bookmarks
POST   /api/bookmarks/:userId    - Create bookmark
DELETE /api/bookmarks/:userId/:bookmarkId - Delete bookmark
```

## Performance Optimization

### Frontend
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: next/image component
- **CSS-in-JS**: Tailwind with PostCSS
- **Lazy Loading**: Dynamic imports
- **Caching**: Cache-Control headers, SWR

### Backend
- **Database Indexing**: On frequently queried fields
- **Connection Pooling**: For database
- **Rate Limiting**: To prevent abuse
- **Compression**: gzip compression
- **Pagination**: Limit response sizes

## Security Measures

1. **Authentication**
   - JWT tokens with expiry
   - Refresh token rotation
   - Secure password hashing

2. **Authorization**
   - Role-based access control (RBAC)
   - Endpoint guards
   - Data ownership checks

3. **API Security**
   - CORS configuration
   - CSRF protection ready
   - SQL injection prevention
   - XSS protection

4. **Data Protection**
   - HTTPS in production
   - Sensitive data not in logs
   - Environment variables for secrets

## Scalability Considerations

1. **Monorepo Benefits**
   - Shared code reuse
   - Consistent versioning
   - Easier refactoring

2. **Database Scalability**
   - PostgreSQL supports high concurrency
   - Connection pooling
   - Read replicas ready

3. **API Scalability**
   - Stateless design
   - Load balancer ready
   - Horizontal scaling possible

4. **Frontend Scalability**
   - Vercel CDN
   - Edge caching
   - ISR (Incremental Static Regeneration)

## Testing Strategy

### Unit Testing
- Component unit tests with Jest
- Utility function tests

### Integration Testing
- API endpoint tests
- Component integration tests

### E2E Testing
- Full user flows
- Lighthouse performance

## Deployment Considerations

### Web (Vercel)
- Automatic deployments from main
- Preview deployments for PRs
- Built-in monitoring

### Backend (Heroku/Railway)
- Docker containerization ready
- Environment-based configuration
- Database migrations

### Desktop (Tauri)
- Auto-update capability
- Cross-platform support
- System tray integration ready

## Error Handling

### Frontend
```typescript
try {
  const response = await apiClient.get(endpoint);
  if (!response.success) {
    // Handle API error
  }
} catch (error) {
  // Handle network error
}
```

### Backend
```typescript
catch (error) {
  res.status(500).json({
    success: false,
    error: {
      message: 'User-friendly message',
      code: 'ERROR_CODE',
    }
  });
}
```

## Monitoring & Analytics

### What to Monitor
- API response times
- Error rates
- User engagement
- Performance metrics
- Database performance

### Tools
- Vercel Analytics
- Sentry for errors
- Application Performance Monitoring (APM)

## Future Enhancements

1. **Features**
   - Real-time multiplayer sync
   - Video guides integration
   - Community comments
   - User-generated content

2. **Performance**
   - GraphQL API
   - Real-time subscriptions
   - WebSocket support

3. **Infrastructure**
   - Kubernetes deployment
   - Microservices architecture
   - Message queues (RabbitMQ/Redis)

---

Last Updated: May 8, 2026
