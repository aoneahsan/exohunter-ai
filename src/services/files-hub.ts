/**
 * FilesHub Service
 * Centralized service for file storage and management using FilesHub API
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 * @see https://fileshub.zaions.com/ai-integration
 *
 * IMPORTANT: This replaces Firebase Storage - use ONLY FilesHub for file uploads
 */

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  UploadResponse,
  ListResponse,
  DeleteResponse,
  HealthResponse,
  FilesHubError,
  UploadOptions,
  ListOptions,
  FileValidationRules,
  FileValidationResult,
  FilesHubConfig,
  FileVisibility,
} from './files-hub.types';

// Re-export types from a separate file to avoid circular imports
export type * from './files-hub.types';

/**
 * FilesHub configuration
 */
const FILESHUB_CONFIG: FilesHubConfig = {
  apiKey: import.meta.env.VITE_FILES_HUB_API_KEY || '',
  baseUrl: import.meta.env.VITE_FILES_HUB_BASE_URL || 'https://fileshub.zaions.com',
  appId: import.meta.env.VITE_FILES_HUB_APP_ID,
};

/**
 * Default file validation rules
 */
const DEFAULT_VALIDATION_RULES: FileValidationRules = {
  maxSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    // Documents
    'application/pdf',
    'text/plain',
    'text/csv',
    // Data files
    'application/json',
    'application/xml',
    'text/xml',
  ],
  allowedExtensions: [
    // Images
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    // Documents
    '.pdf',
    '.txt',
    '.csv',
    // Data files
    '.json',
    '.xml',
  ],
};

/**
 * Debug mode (enabled in development)
 */
const DEBUG = import.meta.env.DEV;

/**
 * Create axios instance for FilesHub API
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: FILESHUB_CONFIG.baseUrl,
    timeout: 60000, // 60 seconds for uploads
    headers: {
      'X-API-Key': FILESHUB_CONFIG.apiKey,
    },
  });

  // Add request interceptor for debugging
  if (DEBUG) {
    instance.interceptors.request.use(
      (config) => {
        console.log('[FilesHub] Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          headers: config.headers,
        });
        return config;
      },
      (error) => {
        console.error('[FilesHub] Request error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Add response interceptor for debugging and error handling
  instance.interceptors.response.use(
    (response) => {
      if (DEBUG) {
        console.log('[FilesHub] Response:', {
          status: response.status,
          data: response.data,
        });
      }
      return response;
    },
    (error: AxiosError) => {
      if (DEBUG) {
        console.error('[FilesHub] Response error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Axios instance for FilesHub API
 */
const axiosInstance = createAxiosInstance();

/**
 * Handle API errors and convert to FilesHubError
 */
function handleError(error: unknown): FilesHubError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<FilesHubError>;

    // Extract error details from response
    const responseData = axiosError.response?.data;
    const statusCode = axiosError.response?.status;

    return {
      success: false,
      error: responseData?.error || axiosError.code || 'UNKNOWN_ERROR',
      message: responseData?.message || axiosError.message || 'An unknown error occurred',
      statusCode,
    };
  }

  // Handle non-Axios errors
  return {
    success: false,
    error: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  };
}

/**
 * Validate file before upload
 */
function validateFile(
  file: File,
  rules: FileValidationRules = DEFAULT_VALIDATION_RULES
): FileValidationResult {
  // Check file size
  if (rules.maxSize && file.size > rules.maxSize) {
    const maxSizeMB = (rules.maxSize / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${maxSizeMB}MB`,
    };
  }

  // Check MIME type
  if (rules.allowedTypes && !rules.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed`,
    };
  }

  // Check file extension
  if (rules.allowedExtensions) {
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!rules.allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: `File extension "${extension}" is not allowed`,
      };
    }
  }

  return { valid: true };
}

/**
 * Retry logic for rate limit errors
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if it's a rate limit error (429)
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          const delay = baseDelay * Math.pow(2, attempt);
          if (DEBUG) {
            console.log(`[FilesHub] Rate limited, retrying in ${delay}ms...`);
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      // For other errors, throw immediately
      throw error;
    }
  }

  throw lastError;
}

/**
 * FilesHub Service Class
 */
class FilesHubService {
  /**
   * Check if FilesHub is configured
   */
  isConfigured(): boolean {
    return !!FILESHUB_CONFIG.apiKey;
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<HealthResponse> {
    try {
      const response = await axios.get<HealthResponse>(`${FILESHUB_CONFIG.baseUrl}/api/health`);
      return response.data;
    } catch (error) {
      console.error('[FilesHub] Health check failed:', error);
      throw handleError(error);
    }
  }

  /**
   * Upload a file
   * @param options - Upload options
   * @returns Upload response with file metadata
   */
  async upload(options: UploadOptions): Promise<UploadResponse> {
    const { file, visibility = 'private', onProgress } = options;

    // Check configuration
    if (!this.isConfigured()) {
      throw new Error('FilesHub API key is not configured');
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('visibility', visibility);

      if (FILESHUB_CONFIG.appId) {
        formData.append('app_id', FILESHUB_CONFIG.appId);
      }

      // Upload with progress tracking
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentage);
          }
        },
      };

      // Upload with retry logic for rate limits
      const response = await retryWithBackoff(
        () => axiosInstance.post<UploadResponse>('/api/v1/objects', formData, config)
      );

      if (DEBUG) {
        console.log('[FilesHub] Upload successful:', response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[FilesHub] Upload failed:', error);
      throw handleError(error);
    }
  }

  /**
   * Download a file
   * @param publicId - File public ID
   * @returns File blob
   */
  async download(publicId: string): Promise<Blob> {
    if (!this.isConfigured()) {
      throw new Error('FilesHub API key is not configured');
    }

    try {
      const response = await retryWithBackoff(() =>
        axiosInstance.get(`/api/v1/objects/${publicId}`, {
          responseType: 'blob',
        })
      );

      return response.data;
    } catch (error) {
      console.error('[FilesHub] Download failed:', error);
      throw handleError(error);
    }
  }

  /**
   * Delete a file
   * @param publicId - File public ID
   */
  async delete(publicId: string): Promise<DeleteResponse> {
    if (!this.isConfigured()) {
      throw new Error('FilesHub API key is not configured');
    }

    try {
      const response = await retryWithBackoff(() =>
        axiosInstance.delete<DeleteResponse>(`/api/v1/objects/${publicId}`)
      );

      if (DEBUG) {
        console.log('[FilesHub] Delete successful:', response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[FilesHub] Delete failed:', error);
      throw handleError(error);
    }
  }

  /**
   * List files
   * @param options - List options
   * @returns List of files
   */
  async list(options: ListOptions = {}): Promise<ListResponse> {
    if (!this.isConfigured()) {
      throw new Error('FilesHub API key is not configured');
    }

    const { page = 1, perPage = 100 } = options;

    try {
      const response = await retryWithBackoff(() =>
        axiosInstance.get<ListResponse>('/api/v1/objects', {
          params: {
            page,
            per_page: perPage,
          },
        })
      );

      if (DEBUG) {
        console.log('[FilesHub] List successful:', response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[FilesHub] List failed:', error);
      throw handleError(error);
    }
  }

  /**
   * Get public URL for a file
   * @param publicId - File public ID
   * @returns Public URL
   */
  getPublicUrl(publicId: string): string {
    return `${FILESHUB_CONFIG.baseUrl}/api/v1/objects/${publicId}`;
  }

  /**
   * Delete multiple files
   * @param publicIds - Array of file public IDs
   * @returns Array of delete results
   */
  async deleteMultiple(publicIds: string[]): Promise<DeleteResponse[]> {
    const results = await Promise.allSettled(publicIds.map((id) => this.delete(id)));

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`[FilesHub] Failed to delete file ${publicIds[index]}:`, result.reason);
        return {
          success: false,
          message: result.reason?.message || 'Delete failed',
        };
      }
    });
  }

  /**
   * Replace a file (delete old, upload new)
   * @param oldPublicId - Old file public ID to delete
   * @param options - Upload options for new file
   * @returns Upload response for new file
   */
  async replace(oldPublicId: string, options: UploadOptions): Promise<UploadResponse> {
    // Delete old file first
    try {
      await this.delete(oldPublicId);
      if (DEBUG) {
        console.log('[FilesHub] Old file deleted successfully');
      }
    } catch (error) {
      console.error('[FilesHub] Failed to delete old file:', error);
      // Continue with upload even if delete fails
    }

    // Upload new file
    return this.upload(options);
  }

  /**
   * Validate file without uploading
   * @param file - File to validate
   * @param rules - Custom validation rules (optional)
   * @returns Validation result
   */
  validateFile(file: File, rules?: FileValidationRules): FileValidationResult {
    return validateFile(file, rules);
  }
}

/**
 * Export singleton instance
 */
export const filesHubService = new FilesHubService();

/**
 * Export types for convenience
 */
export type { UploadOptions, ListOptions, FileValidationRules, FileVisibility };
export default filesHubService;
