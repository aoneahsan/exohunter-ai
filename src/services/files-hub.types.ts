/**
 * FilesHub Types
 * TypeScript definitions for FilesHub API integration
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 * @see https://fileshub.zaions.com/ai-integration
 */

/**
 * File visibility options
 */
export type FileVisibility = 'public' | 'private';

/**
 * File upload response
 */
export interface UploadResponse {
  success: boolean;
  data: {
    public_id: string;
    file_name: string;
    file_size: number;
    mime_type: string;
    visibility: FileVisibility;
    url: string;
    created_at: string;
  };
  message?: string;
}

/**
 * File metadata
 */
export interface FileMetadata {
  public_id: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  visibility: FileVisibility;
  url: string;
  created_at: string;
  updated_at: string;
}

/**
 * File list response
 */
export interface ListResponse {
  success: boolean;
  data: {
    objects: FileMetadata[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message?: string;
}

/**
 * File delete response
 */
export interface DeleteResponse {
  success: boolean;
  message: string;
}

/**
 * Health check response
 */
export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  service: string;
  version?: string;
}

/**
 * FilesHub error
 */
export interface FilesHubError {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

/**
 * Upload options
 */
export interface UploadOptions {
  file: File;
  visibility?: FileVisibility;
  onProgress?: (progress: number) => void;
}

/**
 * List options
 */
export interface ListOptions {
  page?: number;
  perPage?: number;
}

/**
 * File validation rules
 */
export interface FileValidationRules {
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // MIME types
  allowedExtensions?: string[]; // File extensions
}

/**
 * File validation result
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * FilesHub service configuration
 */
export interface FilesHubConfig {
  apiKey: string;
  baseUrl: string;
  appId?: string;
}

/**
 * Upload progress event
 */
export interface UploadProgressEvent {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Rate limit error details
 */
export interface RateLimitError extends FilesHubError {
  retryAfter?: number; // seconds
}

/**
 * File record for Firestore tracking
 */
export interface FileRecord {
  publicId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  visibility: FileVisibility;
  url: string;
  uploadedAt: string;
  uploadedBy: string; // user ID
  associatedWith?: string; // resource ID (e.g., exoplanet analysis ID)
  metadata?: Record<string, unknown>;
}
