/**
 * useFilesHub Hook
 *
 * React hook for file upload and management using FilesHub API.
 * Provides easy access to file operations with state management and toast notifications.
 *
 * @author Ahsan Mahmood <aoneahsan@gmail.com>
 * @see https://fileshub.zaions.com/ai-integration
 */

import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { filesHubService } from '@services/files-hub';
import type {
  UploadResponse,
  ListResponse,
  DeleteResponse,
  FileVisibility,
  FileValidationRules,
  ListOptions,
} from '@services/files-hub';

/**
 * Upload state
 */
interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
}

/**
 * Delete state
 */
interface DeleteState {
  deleting: boolean;
  error: string | null;
}

/**
 * List state
 */
interface ListState {
  loading: boolean;
  error: string | null;
}

/**
 * Main FilesHub hook
 */
export const useFilesHub = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  const [deleteState, setDeleteState] = useState<DeleteState>({
    deleting: false,
    error: null,
  });

  const [listState, setListState] = useState<ListState>({
    loading: false,
    error: null,
  });

  /**
   * Upload a file
   */
  const uploadFile = useCallback(
    async (
      file: File,
      visibility: FileVisibility = 'private',
      validationRules?: FileValidationRules
    ): Promise<UploadResponse | null> => {
      try {
        // Reset state
        setUploadState({
          uploading: true,
          progress: 0,
          error: null,
        });

        // Validate file first
        if (validationRules) {
          const validation = filesHubService.validateFile(file, validationRules);
          if (!validation.valid) {
            toast.error(validation.error || 'File validation failed');
            setUploadState({
              uploading: false,
              progress: 0,
              error: validation.error || 'File validation failed',
            });
            return null;
          }
        }

        // Show loading toast
        const uploadToast = toast.loading(`Uploading ${file.name}...`);

        // Upload file
        const response = await filesHubService.upload({
          file,
          visibility,
          onProgress: (progress) => {
            setUploadState((prev) => ({
              ...prev,
              progress,
            }));
          },
        });

        // Success
        toast.success(`File uploaded successfully!`, {
          id: uploadToast,
        });

        setUploadState({
          uploading: false,
          progress: 100,
          error: null,
        });

        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        toast.error(errorMessage);

        setUploadState({
          uploading: false,
          progress: 0,
          error: errorMessage,
        });

        return null;
      }
    },
    []
  );

  /**
   * Delete a file
   */
  const deleteFile = useCallback(async (publicId: string): Promise<boolean> => {
    try {
      setDeleteState({
        deleting: true,
        error: null,
      });

      const deleteToast = toast.loading('Deleting file...');

      await filesHubService.delete(publicId);

      toast.success('File deleted successfully!', {
        id: deleteToast,
      });

      setDeleteState({
        deleting: false,
        error: null,
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed';
      toast.error(errorMessage);

      setDeleteState({
        deleting: false,
        error: errorMessage,
      });

      return false;
    }
  }, []);

  /**
   * Delete multiple files
   */
  const deleteMultipleFiles = useCallback(async (publicIds: string[]): Promise<boolean> => {
    try {
      setDeleteState({
        deleting: true,
        error: null,
      });

      const deleteToast = toast.loading(`Deleting ${publicIds.length} files...`);

      const results = await filesHubService.deleteMultiple(publicIds);

      // Check if all deletes succeeded
      const allSuccess = results.every((result) => result.success);

      if (allSuccess) {
        toast.success(`All ${publicIds.length} files deleted successfully!`, {
          id: deleteToast,
        });
      } else {
        const failedCount = results.filter((result) => !result.success).length;
        toast.error(`Failed to delete ${failedCount} out of ${publicIds.length} files`, {
          id: deleteToast,
        });
      }

      setDeleteState({
        deleting: false,
        error: null,
      });

      return allSuccess;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed';
      toast.error(errorMessage);

      setDeleteState({
        deleting: false,
        error: errorMessage,
      });

      return false;
    }
  }, []);

  /**
   * List files
   */
  const listFiles = useCallback(async (options?: ListOptions): Promise<ListResponse | null> => {
    try {
      setListState({
        loading: true,
        error: null,
      });

      const response = await filesHubService.list(options);

      setListState({
        loading: false,
        error: null,
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to list files';
      toast.error(errorMessage);

      setListState({
        loading: false,
        error: errorMessage,
      });

      return null;
    }
  }, []);

  /**
   * Replace a file (delete old, upload new)
   */
  const replaceFile = useCallback(
    async (
      oldPublicId: string,
      newFile: File,
      visibility: FileVisibility = 'private',
      validationRules?: FileValidationRules
    ): Promise<UploadResponse | null> => {
      try {
        // Reset state
        setUploadState({
          uploading: true,
          progress: 0,
          error: null,
        });

        // Validate file first
        if (validationRules) {
          const validation = filesHubService.validateFile(newFile, validationRules);
          if (!validation.valid) {
            toast.error(validation.error || 'File validation failed');
            setUploadState({
              uploading: false,
              progress: 0,
              error: validation.error || 'File validation failed',
            });
            return null;
          }
        }

        // Show loading toast
        const replaceToast = toast.loading(`Replacing file...`);

        // Replace file
        const response = await filesHubService.replace(oldPublicId, {
          file: newFile,
          visibility,
          onProgress: (progress) => {
            setUploadState((prev) => ({
              ...prev,
              progress,
            }));
          },
        });

        // Success
        toast.success(`File replaced successfully!`, {
          id: replaceToast,
        });

        setUploadState({
          uploading: false,
          progress: 100,
          error: null,
        });

        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Replace failed';
        toast.error(errorMessage);

        setUploadState({
          uploading: false,
          progress: 0,
          error: errorMessage,
        });

        return null;
      }
    },
    []
  );

  /**
   * Download a file
   */
  const downloadFile = useCallback(async (publicId: string, fileName: string): Promise<void> => {
    try {
      const downloadToast = toast.loading('Downloading file...');

      const blob = await filesHubService.download(publicId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('File downloaded successfully!', {
        id: downloadToast,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      toast.error(errorMessage);
    }
  }, []);

  /**
   * Get public URL
   */
  const getPublicUrl = useCallback((publicId: string): string => {
    return filesHubService.getPublicUrl(publicId);
  }, []);

  /**
   * Validate file
   */
  const validateFile = useCallback((file: File, rules?: FileValidationRules) => {
    return filesHubService.validateFile(file, rules);
  }, []);

  return {
    // Upload state
    isUploading: uploadState.uploading,
    uploadProgress: uploadState.progress,
    uploadError: uploadState.error,

    // Delete state
    isDeleting: deleteState.deleting,
    deleteError: deleteState.error,

    // List state
    isLoading: listState.loading,
    listError: listState.error,

    // Methods
    uploadFile,
    deleteFile,
    deleteMultipleFiles,
    listFiles,
    replaceFile,
    downloadFile,
    getPublicUrl,
    validateFile,

    // Direct service access (for advanced use cases)
    service: filesHubService,
  };
};

/**
 * Hook for simple file upload (most common use case)
 */
export const useFileUpload = () => {
  const {
    uploadFile,
    isUploading,
    uploadProgress,
    uploadError,
    validateFile,
  } = useFilesHub();

  return {
    upload: uploadFile,
    isUploading,
    progress: uploadProgress,
    error: uploadError,
    validate: validateFile,
  };
};

/**
 * Hook for file deletion
 */
export const useFileDelete = () => {
  const { deleteFile, deleteMultipleFiles, isDeleting, deleteError } = useFilesHub();

  return {
    deleteFile,
    deleteMultiple: deleteMultipleFiles,
    isDeleting,
    error: deleteError,
  };
};

/**
 * Hook for file listing
 */
export const useFileList = () => {
  const { listFiles, isLoading, listError } = useFilesHub();

  return {
    list: listFiles,
    isLoading,
    error: listError,
  };
};

export default useFilesHub;
