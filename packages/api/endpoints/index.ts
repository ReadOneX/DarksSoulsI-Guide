import { ApiClient } from '../client';
import {
  AuthTokens,
  AuthSession,
  LoginRequest,
  RegisterRequest,
  AuthUser,
  Area,
  Boss,
  Guide,
  Build,
  UserProgress,
  Bookmark,
  Notification,
  NPCQuest,
  Covenant,
  PaginatedResponse
} from '@darks-souls/types';

const apiClient = new ApiClient();

// Auth Endpoints
export const authAPI = {
  login: (credentials: LoginRequest) =>
    apiClient.post<AuthSession>('/api/auth/login', credentials),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthSession>('/api/auth/register', data),

  logout: (token: string) =>
    apiClient.post<void>('/api/auth/logout', {}, { token }),

  refreshToken: (refreshToken: string) =>
    apiClient.post<AuthTokens>('/api/auth/refresh', { refreshToken }),

  getCurrentUser: (token: string) =>
    apiClient.get<AuthUser>('/api/auth/me', { token }),

  updateProfile: (token: string, data: Partial<AuthUser>) =>
    apiClient.put<AuthUser>('/api/auth/profile', data, { token })
};

// Guide Endpoints
export const guideAPI = {
  getAreas: (page: number = 1, pageSize: number = 20) =>
    apiClient.get<PaginatedResponse<Area>>(`/api/guides/areas?page=${page}&pageSize=${pageSize}`),

  getAreaById: (areaId: string) =>
    apiClient.get<Area>(`/api/guides/areas/${areaId}`),

  getBosses: (page: number = 1, pageSize: number = 20) =>
    apiClient.get<PaginatedResponse<Boss>>(`/api/guides/bosses?page=${page}&pageSize=${pageSize}`),

  getBossById: (bossId: string) =>
    apiClient.get<Boss>(`/api/guides/bosses/${bossId}`),

  getGuides: (type?: string, difficulty?: string) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (difficulty) params.append('difficulty', difficulty);
    return apiClient.get<PaginatedResponse<Guide>>(`/api/guides?${params}`);
  },

  getGuideById: (guideId: string) =>
    apiClient.get<Guide>(`/api/guides/${guideId}`),

  searchGuides: (query: string) =>
    apiClient.get<Guide[]>(`/api/guides/search?q=${query}`),

  getBuilds: () =>
    apiClient.get<Build[]>('/api/guides/builds'),

  getBuildById: (buildId: string) =>
    apiClient.get<Build>(`/api/guides/builds/${buildId}`)
};

// Progress Endpoints
export const progressAPI = {
  getProgress: (token: string) =>
    apiClient.get<UserProgress>('/api/progress', { token }),

  updateProgress: (token: string, progress: Partial<UserProgress>) =>
    apiClient.put<UserProgress>('/api/progress', progress, { token }),

  completeBoss: (token: string, bossId: string) =>
    apiClient.post<void>(`/api/progress/bosses/${bossId}/complete`, {}, { token }),

  discoverArea: (token: string, areaId: string) =>
    apiClient.post<void>(`/api/progress/areas/${areaId}/discover`, {}, { token }),

  completeQuest: (token: string, questId: string) =>
    apiClient.post<void>(`/api/progress/quests/${questId}/complete`, {}, { token }),

  collectItem: (token: string, itemId: string, quantity: number = 1) =>
    apiClient.post<void>(`/api/progress/items/${itemId}/collect`, { quantity }, { token })
};

// Bookmark Endpoints
export const bookmarkAPI = {
  getBookmarks: (token: string) =>
    apiClient.get<Bookmark[]>('/api/bookmarks', { token }),

  createBookmark: (token: string, bookmark: Omit<Bookmark, 'id' | 'createdAt'>) =>
    apiClient.post<Bookmark>('/api/bookmarks', bookmark, { token }),

  deleteBookmark: (token: string, bookmarkId: string) =>
    apiClient.delete<void>(`/api/bookmarks/${bookmarkId}`, { token })
};

// Notification Endpoints
export const notificationAPI = {
  getNotifications: (token: string) =>
    apiClient.get<Notification[]>('/api/notifications', { token }),

  markAsRead: (token: string, notificationId: string) =>
    apiClient.put<Notification>(`/api/notifications/${notificationId}/read`, {}, { token }),

  deleteNotification: (token: string, notificationId: string) =>
    apiClient.delete<void>(`/api/notifications/${notificationId}`, { token })
};

// Quests Endpoints
export const questAPI = {
  getQuests: () =>
    apiClient.get<NPCQuest[]>('/api/guides/quests'),

  getQuestById: (questId: string) =>
    apiClient.get<NPCQuest>(`/api/guides/quests/${questId}`)
};

// Covenant Endpoints
export const covenantAPI = {
  getCovenants: () =>
    apiClient.get<Covenant[]>('/api/guides/covenants'),

  getCovenantById: (covenantId: string) =>
    apiClient.get<Covenant>(`/api/guides/covenants/${covenantId}`)
};

// Sync Endpoints
export const syncAPI = {
  syncProgress: (token: string, data: unknown) =>
    apiClient.post('/api/sync/progress', data, { token }),

  getSyncStatus: (token: string) =>
    apiClient.get('/api/sync/status', { token })
};
