import { ApiResponse, ApiError, HttpMethod } from '@darks-souls/types';
import { API_BASE_URL, API_TIMEOUT } from '@darks-souls/shared';

export interface FetchOptions extends RequestInit {
  timeout?: number;
  token?: string;
}

export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async fetchWithTimeout(
    url: string,
    options: FetchOptions
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private getHeaders(token?: string, customHeaders?: HeadersInit): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (customHeaders) {
      new Headers(customHeaders).forEach((value, key) => {
        headers[key] = value;
      });
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async request<T = unknown>(
    method: HttpMethod,
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const { token, ...fetchOptions } = options;

    try {
      const response = await this.fetchWithTimeout(url, {
        ...fetchOptions,
        method,
        headers: this.getHeaders(token, fetchOptions.headers),
        timeout: options.timeout || this.timeout
      });

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          code: data.code || String(response.status),
          message: data.message || response.statusText,
          details: data.details
        };
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw {
          code: 'NETWORK_ERROR',
          message: 'Network error occurred',
          details: error
        };
      }
      throw error;
    }
  }

  get<T = unknown>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, options);
  }

  post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined
    });
  }

  put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined
    });
  }

  delete<T = unknown>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, options);
  }

  patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined
    });
  }
}

export const apiClient = new ApiClient();
