import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Auth routes (placeholder)
app.post('/api/auth/login', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      accessToken: 'temp-token',
      refreshToken: 'temp-refresh',
      expiresIn: 3600
    },
    message: 'Login endpoint - implementation pending',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      accessToken: 'temp-token',
      refreshToken: 'temp-refresh',
      expiresIn: 3600
    },
    message: 'Register endpoint - implementation pending',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logout successful',
    timestamp: new Date().toISOString()
  });
});

// Guide routes (placeholder)
app.get('/api/guides/areas', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      data: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0
    },
    message: 'Areas endpoint - implementation pending',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/guides/bosses', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      data: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0
    },
    message: 'Bosses endpoint - implementation pending',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 Dark Souls Guide API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`API Base URL: ${process.env.API_BASE_URL}`);
});

export default app;
