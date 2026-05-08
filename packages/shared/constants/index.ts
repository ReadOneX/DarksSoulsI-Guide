// Application constants

export const APP_NAME = 'Dark Souls I Guide';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Your complete Dark Souls I companion guide';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const API_TIMEOUT = 30000;

// Auth constants
export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user_data';
export const TOKEN_EXPIRY_KEY = 'token_expiry';

// Storage keys
export const THEME_STORAGE_KEY = 'theme_preference';
export const PROGRESS_STORAGE_KEY = 'game_progress';
export const BOOKMARKS_STORAGE_KEY = 'bookmarks';
export const SETTINGS_STORAGE_KEY = 'user_settings';

// Theme
export const THEMES = ['dark', 'light'] as const;
export const DEFAULT_THEME = 'dark' as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Cache
export const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
export const LONG_CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Role
export const ADMIN_ROLE = 'admin';
export const MODERATOR_ROLE = 'moderator';
export const USER_ROLE = 'user';

// Items
export const GUEST_ACCESS_PERCENTAGE = 70;

// Social links
export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/darkssouls',
  twitter: 'https://twitter.com/darksouls',
  github: 'https://github.com/darksouls-guide'
} as const;

// Environment
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
