import express from 'express';
import {
  createGuestSession,
  getUserFromAccessToken,
  loginUser,
  refreshAccessToken,
  registerUser,
  revokeRefreshToken,
  updateUserProfile,
} from '../services/auth-service';

const router = express.Router();

function bearerToken(header: string | undefined): string | undefined {
  if (!header?.startsWith('Bearer ')) return undefined;
  return header.slice('Bearer '.length);
}

function authError(res: express.Response, message = 'Unauthorized'): express.Response {
  return res.status(401).json({
    success: false,
    error: {
      message,
      code: 'UNAUTHORIZED',
    },
    timestamp: new Date().toISOString(),
  });
}

router.post('/login', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const identifier = email || username;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Email/username and password are required',
          code: 'VALIDATION_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }

    const session = await loginUser({ identifier, password });
    return res.json({
      success: true,
      data: session,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const isInvalidCredentials = error instanceof Error && error.message === 'INVALID_CREDENTIALS';
    return res.status(isInvalidCredentials ? 401 : 500).json({
      success: false,
      error: {
        message: isInvalidCredentials ? 'Invalid credentials' : 'Internal server error',
        code: isInvalidCredentials ? 'INVALID_CREDENTIALS' : 'INTERNAL_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Username, email, and password are required',
          code: 'VALIDATION_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Passwords do not match',
          code: 'VALIDATION_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }

    const session = await registerUser({ username, email, password });
    return res.status(201).json({
      success: true,
      data: session,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const userExists = error instanceof Error && error.message === 'USER_EXISTS';
    return res.status(userExists ? 409 : 500).json({
      success: false,
      error: {
        message: userExists ? 'Username or email already exists' : 'Internal server error',
        code: userExists ? 'USER_EXISTS' : 'INTERNAL_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Refresh token is required',
          code: 'VALIDATION_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }

    return res.json({
      success: true,
      data: refreshAccessToken(refreshToken),
      timestamp: new Date().toISOString(),
    });
  } catch {
    return authError(res, 'Invalid refresh token');
  }
});

router.post('/guest', (req, res) => {
  return res.json({
    success: true,
    data: createGuestSession(),
    timestamp: new Date().toISOString(),
  });
});

router.post('/logout', (req, res) => {
  revokeRefreshToken(req.body.refreshToken);
  return res.json({
    success: true,
    message: 'Logout successful',
    timestamp: new Date().toISOString(),
  });
});

router.get('/me', (req, res) => {
  try {
    const user = getUserFromAccessToken(bearerToken(req.headers.authorization));
    if (!user) return authError(res);

    return res.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return authError(res);
  }
});

router.put('/profile', (req, res) => {
  try {
    const user = updateUserProfile(bearerToken(req.headers.authorization), {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      subscriptionTier: req.body.subscriptionTier,
    });

    return res.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return authError(res);
  }
});

export default router;
