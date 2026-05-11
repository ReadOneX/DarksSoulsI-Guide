import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

type Role = 'user' | 'admin' | 'moderator';
type SubscriptionTier = 'guest' | 'registered' | 'premium';

export interface PublicUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  isGuest?: boolean;
  subscriptionTier: SubscriptionTier;
}

interface StoredUser extends PublicUser {
  passwordHash: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface JwtPayload {
  sub: string;
  email: string;
  type: 'access' | 'refresh';
}

const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 60 * 60;
const users = new Map<string, StoredUser>();
const refreshTokens = new Map<string, string>();

function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'development-access-secret-change-me';
}

function getRefreshSecret(): string {
  return process.env.JWT_REFRESH_SECRET || 'development-refresh-secret-change-me';
}

function sanitizeUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role,
    isGuest: user.isGuest,
    subscriptionTier: user.subscriptionTier,
  };
}

function createAvatar(seed: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

function signTokens(user: PublicUser): TokenPair {
  const refreshOptions: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '30d') as SignOptions['expiresIn'],
  };
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, type: 'access' } satisfies JwtPayload,
    getJwtSecret(),
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS }
  );
  const refreshToken = jwt.sign(
    { sub: user.id, email: user.email, type: 'refresh' } satisfies JwtPayload,
    getRefreshSecret(),
    refreshOptions
  );

  refreshTokens.set(refreshToken, user.id);

  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  };
}

function findUserByIdentifier(identifier: string): StoredUser | undefined {
  const normalized = identifier.toLowerCase();
  return Array.from(users.values()).find(
    (user) => user.email.toLowerCase() === normalized || user.username.toLowerCase() === normalized
  );
}

export async function registerUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<{ user: PublicUser } & TokenPair> {
  if (findUserByIdentifier(input.email) || findUserByIdentifier(input.username)) {
    throw new Error('USER_EXISTS');
  }

  const now = new Date().toISOString();
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user: StoredUser = {
    id: uuidv4(),
    username: input.username,
    email: input.email,
    passwordHash,
    subscriptionTier: 'registered',
    role: 'user',
    avatar: createAvatar(input.username),
    createdAt: now,
    updatedAt: now,
  };

  users.set(user.id, user);
  const publicUser = sanitizeUser(user);
  return {
    user: publicUser,
    ...signTokens(publicUser),
  };
}

export async function loginUser(input: {
  identifier: string;
  password: string;
}): Promise<{ user: PublicUser } & TokenPair> {
  const user = findUserByIdentifier(input.identifier);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const publicUser = sanitizeUser(user);
  return {
    user: publicUser,
    ...signTokens(publicUser),
  };
}

export function createGuestSession(): { user: PublicUser } & Omit<TokenPair, 'refreshToken'> {
  const guestId = uuidv4();
  const now = new Date().toISOString();
  const user: PublicUser = {
    id: guestId,
    username: `Guest_${guestId.slice(0, 8)}`,
    email: `guest_${guestId}@localhost`,
    subscriptionTier: 'guest',
    role: 'user',
    isGuest: true,
    avatar: createAvatar('guest'),
    createdAt: now,
    updatedAt: now,
  };

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, type: 'access' } satisfies JwtPayload,
    getJwtSecret(),
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS }
  );

  return {
    user,
    accessToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  };
}

export function refreshAccessToken(token: string): Pick<TokenPair, 'accessToken' | 'expiresIn'> {
  if (!refreshTokens.has(token)) {
    throw new Error('INVALID_REFRESH_TOKEN');
  }

  const payload = jwt.verify(token, getRefreshSecret()) as JwtPayload;
  if (payload.type !== 'refresh') {
    throw new Error('INVALID_REFRESH_TOKEN');
  }

  const user = users.get(payload.sub);
  if (!user) {
    throw new Error('INVALID_REFRESH_TOKEN');
  }

  return {
    accessToken: jwt.sign(
      { sub: user.id, email: user.email, type: 'access' } satisfies JwtPayload,
      getJwtSecret(),
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS }
    ),
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  };
}

export function revokeRefreshToken(token: string | undefined): void {
  if (token) {
    refreshTokens.delete(token);
  }
}

export function getUserFromAccessToken(token: string | undefined): PublicUser | null {
  if (!token) return null;

  const payload = jwt.verify(token, getJwtSecret()) as JwtPayload;
  if (payload.type !== 'access') return null;

  const storedUser = users.get(payload.sub);
  if (storedUser) {
    return sanitizeUser(storedUser);
  }

  if (payload.email.startsWith('guest_')) {
    const now = new Date().toISOString();
    return {
      id: payload.sub,
      username: `Guest_${payload.sub.slice(0, 8)}`,
      email: payload.email,
      subscriptionTier: 'guest',
      role: 'user',
      isGuest: true,
      avatar: createAvatar('guest'),
      createdAt: now,
      updatedAt: now,
    };
  }

  return null;
}

export function updateUserProfile(
  token: string | undefined,
  updates: Partial<Pick<PublicUser, 'username' | 'email' | 'avatar' | 'subscriptionTier'>>
): PublicUser {
  const user = getUserFromAccessToken(token);
  if (!user || user.isGuest) {
    throw new Error('UNAUTHORIZED');
  }

  const storedUser = users.get(user.id);
  if (!storedUser) {
    throw new Error('UNAUTHORIZED');
  }

  const updatedUser: StoredUser = {
    ...storedUser,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  users.set(updatedUser.id, updatedUser);
  return sanitizeUser(updatedUser);
}
