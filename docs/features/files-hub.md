# FilesHub Integration

FilesHub is the exclusive file storage service for ExoHunter AI, replacing Firebase Storage for all file upload operations.

## Overview

- **Service**: Centralized API service for file operations
- **Hook**: React hook with state management and toast notifications
- **Types**: Comprehensive TypeScript definitions
- **Documentation**: Complete integration guide

## Files Created

### 1. Types (`src/services/files-hub.types.ts`)

Complete TypeScript definitions for FilesHub API:

- `FileVisibility` - Public or private file access
- `UploadResponse` - Upload operation response
- `FileMetadata` - Complete file information
- `ListResponse` - File listing response
- `DeleteResponse` - Delete operation response
- `HealthResponse` - API health check response
- `FilesHubError` - Error response structure
- `UploadOptions` - Upload configuration
- `ListOptions` - Listing pagination
- `FileValidationRules` - File validation configuration
- `FileValidationResult` - Validation result
- `FilesHubConfig` - Service configuration
- `UploadProgressEvent` - Upload progress tracking
- `RateLimitError` - Rate limit error details
- `FileRecord` - Firestore tracking record

### 2. Service (`src/services/files-hub.ts`)

Centralized FilesHub service with the following features:

#### Core Methods

- `upload(options)` - Upload files with progress tracking
- `download(publicId)` - Download files as Blob
- `delete(publicId)` - Delete files
- `list(options)` - List files with pagination
- `replace(oldPublicId, options)` - Replace files (delete + upload)
- `deleteMultiple(publicIds)` - Batch delete files
- `getPublicUrl(publicId)` - Get file public URL
- `validateFile(file, rules)` - Validate files before upload
- `healthCheck()` - Check API health
- `isConfigured()` - Verify API key setup

#### Features

- **Automatic Retry**: Built-in retry logic for rate limit errors (429)
- **File Validation**: Size, type, and extension validation
- **Progress Tracking**: Upload progress callbacks
- **Error Handling**: Comprehensive error handling with detailed messages
- **Debug Mode**: Detailed logging in development
- **Type Safety**: Full TypeScript support

#### Configuration

Environment variables:
```bash
VITE_FILES_HUB_API_KEY=your_api_key        # Required
VITE_FILES_HUB_BASE_URL=https://fileshub... # Optional
VITE_FILES_HUB_APP_ID=your_app_id          # Optional
```

Default validation rules:
- Max size: 50MB
- Allowed types: Images, PDFs, text files, JSON, XML
- Allowed extensions: .jpg, .png, .pdf, .txt, .csv, .json, etc.

### 3. Hook (`src/hooks/useFilesHub.ts`)

React hook for file operations with state management:

#### Main Hook (`useFilesHub`)

Returns:
- `uploadFile(file, visibility, rules)` - Upload with validation
- `deleteFile(publicId)` - Delete single file
- `deleteMultipleFiles(publicIds)` - Delete multiple files
- `replaceFile(oldPublicId, newFile, visibility, rules)` - Replace file
- `downloadFile(publicId, fileName)` - Download file
- `listFiles(options)` - List files with pagination
- `getPublicUrl(publicId)` - Get public URL
- `validateFile(file, rules)` - Validate file
- `isUploading` - Upload state
- `uploadProgress` - Upload progress (0-100)
- `uploadError` - Upload error message
- `isDeleting` - Delete state
- `deleteError` - Delete error message
- `isLoading` - List loading state
- `listError` - List error message

#### Specialized Hooks

1. `useFileUpload` - Simple upload hook
2. `useFileDelete` - Delete operations hook
3. `useFileList` - List operations hook

#### Features

- **Toast Notifications**: Automatic success/error toasts
- **State Management**: Loading, progress, and error states
- **Type Safety**: Full TypeScript support
- **Error Handling**: Graceful error handling with user feedback

### 4. Example Component (`src/components/examples/FilesHubExample.tsx`)

Complete working example demonstrating:
- File upload with progress
- File listing
- File deletion
- File replacement
- File details display
- Public URL generation

### 5. Documentation (`docs/guides/files-hub-integration.md`)

Comprehensive guide covering:
- Setup and configuration
- Basic usage examples
- Advanced usage patterns
- Firestore integration
- Best practices
- Error handling
- Migration from Firebase Storage
- API reference

## Usage Examples

### Basic Upload

```tsx
import { useFilesHub } from '@hooks/useFilesHub';

function MyComponent() {
  const { uploadFile, isUploading, uploadProgress } = useFilesHub();

  const handleUpload = async (file: File) => {
    const response = await uploadFile(file, 'private');
    if (response) {
      console.log('File URL:', response.data.url);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
      {isUploading && <p>Uploading: {uploadProgress}%</p>}
    </div>
  );
}
```

### With Validation

```tsx
const { uploadFile, validateFile } = useFilesHub();

const handleUpload = async (file: File) => {
  const validation = validateFile(file, {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png'],
  });

  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  await uploadFile(file, 'public');
};
```

### Replace File

```tsx
const { replaceFile } = useFilesHub();

const handleReplace = async (oldPublicId: string, newFile: File) => {
  const response = await replaceFile(oldPublicId, newFile, 'public');
  if (response) {
    console.log('New file ID:', response.data.public_id);
  }
};
```

### List Files

```tsx
const { listFiles } = useFilesHub();

const loadFiles = async () => {
  const response = await listFiles({ page: 1, perPage: 50 });
  if (response) {
    console.log('Files:', response.data.objects);
    console.log('Total:', response.data.pagination.total);
  }
};
```

## Best Practices

### 1. Track Files in Firestore

Always track uploaded files in Firestore to prevent orphaned files:

```tsx
import { doc, setDoc } from 'firebase/firestore';
import type { FileRecord } from '@services/files-hub';

const response = await uploadFile(file, 'private');

if (response) {
  const fileRecord: FileRecord = {
    publicId: response.data.public_id,
    fileName: response.data.file_name,
    fileSize: response.data.file_size,
    mimeType: response.data.mime_type,
    visibility: response.data.visibility,
    url: response.data.url,
    uploadedAt: response.data.created_at,
    uploadedBy: userId,
    associatedWith: resourceId,
  };

  await setDoc(
    doc(db, `exohunter_files/${response.data.public_id}`),
    fileRecord
  );
}
```

### 2. Delete Old Files Before Replacing

Always delete the old file when uploading a replacement:

```tsx
// Good - uses replaceFile
await replaceFile(oldPublicId, newFile);

// Also good - manual control
await deleteFile(oldPublicId);
const response = await uploadFile(newFile);
```

### 3. Delete All User Files on Account Deletion

When deleting a user account, delete all their files:

```tsx
import { getDocs, query, collection, where } from 'firebase/firestore';

const deleteUserFiles = async (userId: string) => {
  const filesSnapshot = await getDocs(
    query(
      collection(db, 'exohunter_files'),
      where('uploadedBy', '==', userId)
    )
  );

  const publicIds = filesSnapshot.docs.map((doc) => doc.data().publicId);
  await deleteMultipleFiles(publicIds);
};
```

### 4. Validate Files Before Upload

Always validate files to prevent errors and improve UX:

```tsx
const validation = validateFile(file, {
  maxSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
});

if (!validation.valid) {
  toast.error(validation.error);
  return;
}
```

### 5. Use Appropriate Visibility

- `public` - Anyone can access without authentication (shared content)
- `private` - Requires authentication (user-specific files)

```tsx
// Public for shared content
await uploadFile(file, 'public');

// Private for user-specific content (default)
await uploadFile(file, 'private');
```

## Error Handling

The service automatically handles errors and retries rate-limited requests:

- **Rate Limit (429)**: Automatically retries with exponential backoff (3 retries)
- **Invalid API Key (401)**: Throws error with message
- **Validation Errors**: Returns validation result with error message
- **Network Errors**: Throws error with axios error details

All errors are shown as toast notifications when using the hook.

## Testing

To test FilesHub integration:

1. Add API key to `.env`:
   ```bash
   VITE_FILES_HUB_API_KEY=fh_test_your_key_here
   ```

2. Import the example component:
   ```tsx
   import FilesHubExample from '@components/examples/FilesHubExample';
   ```

3. Test operations:
   - Upload files
   - View file details
   - Replace files
   - Delete files
   - List files

## API Reference

See the complete API documentation at:
- FilesHub Docs: https://fileshub.zaions.com/ai-integration
- JSON Spec: https://fileshub.zaions.com/files-hub-ai-integration.json
- Markdown Docs: https://fileshub.zaions.com/files-hub-ai-integration.md

## Support

For issues or questions:
- Email: aoneahsan@gmail.com
- Project Guide: `/docs/guides/files-hub-integration.md`
- Example Component: `/src/components/examples/FilesHubExample.tsx`

## Migration Checklist

If migrating from Firebase Storage:

- [ ] Add FilesHub API key to `.env`
- [ ] Replace all Firebase Storage imports with FilesHub
- [ ] Update upload logic to use `filesHubService.upload()`
- [ ] Update download logic to use `filesHubService.download()` or `getPublicUrl()`
- [ ] Update delete logic to use `filesHubService.delete()`
- [ ] Remove Firebase Storage rules and dependencies
- [ ] Update Firestore collections to track FilesHub file records
- [ ] Test all file operations thoroughly
- [ ] Update user account deletion to clean up FilesHub files
