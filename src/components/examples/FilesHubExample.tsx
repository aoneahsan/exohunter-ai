/**
 * FilesHub Example Component
 *
 * Demonstrates how to use FilesHub for file uploads in the ExoHunter AI application.
 * This is an example component - use as reference for implementing file uploads.
 *
 * @author Ahsan Mahmood <aoneahsan@gmail.com>
 */

import { useState } from 'react';
import { useFilesHub } from '@hooks/useFilesHub';
import type { FileMetadata } from '@services/files-hub';

/**
 * Example: File Upload Component
 */
export function FilesHubExample() {
  const {
    uploadFile,
    deleteFile,
    replaceFile,
    listFiles,
    getPublicUrl,
    isUploading,
    uploadProgress,
    isDeleting,
  } = useFilesHub();

  const [uploadedFiles, setUploadedFiles] = useState<FileMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);

  /**
   * Handle file upload
   */
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Upload file (private by default)
    const response = await uploadFile(file, 'private');

    if (response) {
      // Add to list (convert to FileMetadata format)
      const fileMetadata: FileMetadata = {
        ...response.data,
        updated_at: response.data.created_at, // Use created_at as updated_at for new uploads
      };
      setUploadedFiles((prev) => [...prev, fileMetadata]);

      // Clear input
      event.target.value = '';
    }
  };

  /**
   * Handle file delete
   */
  const handleDelete = async (publicId: string) => {
    const success = await deleteFile(publicId);

    if (success) {
      // Remove from list
      setUploadedFiles((prev) => prev.filter((f) => f.public_id !== publicId));

      if (selectedFile?.public_id === publicId) {
        setSelectedFile(null);
      }
    }
  };

  /**
   * Handle file replace
   */
  const handleReplace = async (
    event: React.ChangeEvent<HTMLInputElement>,
    oldPublicId: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const response = await replaceFile(oldPublicId, file, 'private');

    if (response) {
      // Update list (convert to FileMetadata format)
      const fileMetadata: FileMetadata = {
        ...response.data,
        updated_at: response.data.created_at,
      };
      setUploadedFiles((prev) =>
        prev.map((f) => (f.public_id === oldPublicId ? fileMetadata : f))
      );

      // Clear input
      event.target.value = '';
    }
  };

  /**
   * Handle list refresh
   */
  const handleRefresh = async () => {
    const response = await listFiles({ page: 1, perPage: 50 });

    if (response) {
      setUploadedFiles(response.data.objects);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">FilesHub Example</h1>

      {/* Upload Section */}
      <div className="border rounded-lg shadow-sm">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Upload File</h2>

          <input
            type="file"
            onChange={handleUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Files List Section */}
      <div className="border rounded-lg shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Uploaded Files</h2>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
            >
              Refresh
            </button>
          </div>

          {uploadedFiles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No files uploaded yet</p>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.public_id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{file.file_name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.file_size / 1024).toFixed(2)} KB • {file.mime_type}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                    >
                      View
                    </button>

                    <label className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm cursor-pointer">
                      Replace
                      <input
                        type="file"
                        onChange={(e) => handleReplace(e, file.public_id)}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={() => handleDelete(file.public_id)}
                      disabled={isDeleting}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* File Details Section */}
      {selectedFile && (
        <div className="border rounded-lg shadow-sm">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">File Details</h2>

            <div className="space-y-2">
              <div>
                <span className="font-medium">File Name:</span>{' '}
                {selectedFile.file_name}
              </div>
              <div>
                <span className="font-medium">Public ID:</span>{' '}
                {selectedFile.public_id}
              </div>
              <div>
                <span className="font-medium">Size:</span>{' '}
                {(selectedFile.file_size / 1024).toFixed(2)} KB
              </div>
              <div>
                <span className="font-medium">Type:</span>{' '}
                {selectedFile.mime_type}
              </div>
              <div>
                <span className="font-medium">Visibility:</span>{' '}
                {selectedFile.visibility}
              </div>
              <div>
                <span className="font-medium">Created:</span>{' '}
                {new Date(selectedFile.created_at).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">URL:</span>{' '}
                <a
                  href={getPublicUrl(selectedFile.public_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {getPublicUrl(selectedFile.public_id)}
                </a>
              </div>
            </div>

            <button
              onClick={() => setSelectedFile(null)}
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilesHubExample;
