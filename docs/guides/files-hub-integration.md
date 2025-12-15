# FilesHub Integration Guide

This guide explains how to use FilesHub for file storage in the ExoHunter AI application.

## Overview

FilesHub is the exclusive file storage service for ExoHunter AI. It replaces Firebase Storage and provides a robust API for uploading, downloading, and managing files.

**Important:** Always use FilesHub for file uploads. Never use Firebase Storage or any other storage provider unless explicitly requested.

## Configuration

### Environment Variables

Add the following to your `.env` file:

```bash
# Required
VITE_FILES_HUB_API_KEY=your_fileshub_api_key_here

# Optional (with defaults)
VITE_FILES_HUB_BASE_URL=https://fileshub.zaions.com
VITE_FILES_HUB_APP_ID=your_app_id_here
```

### Getting API Keys

1. Visit [FilesHub Dashboard](https://fileshub.zaions.com/)
2. Sign in or create an account
3. Navigate to Settings > API Keys
4. Copy your API key (starts with `fh_live_` for production or `fh_test_` for testing)

## Basic Usage

### Using the Hook (Recommended)

The easiest way to use FilesHub is through the `useFilesHub` hook:

```tsx
import { useFilesHub } from '@hooks/useFilesHub';

function MyComponent() {
  const {
    uploadFile,
    isUploading,
    uploadProgress,
    deleteFile,
    isDeleting,
  } = useFilesHub();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Upload file (private by default)
    const response = await uploadFile(file, 'private');

    if (response) {
      console.log('File uploaded:', response.data.public_id);
      console.log('File URL:', response.data.url);
    }
  };

  const handleDelete = async (publicId: string) => {
    const success = await deleteFile(publicId);
    if (success) {
      console.log('File deleted successfully');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} disabled={isUploading} />
      {isUploading && <p>Uploading: {uploadProgress}%</p>}
    </div>
  );
}
```

### Using the Service Directly

For more control, use the service directly:

```tsx
import { filesHubService } from '@services/files-hub';

// Upload a file
const uploadFile = async (file: File) => {
  const response = await filesHubService.upload({
    file,
    visibility: 'public',
    onProgress: (progress) => {
      console.log(`Upload progress: ${progress}%`);
    },
  });

  return response.data.public_id;
};

// Delete a file
await filesHubService.delete(publicId);

// List files
const response = await filesHubService.list({ page: 1, perPage: 50 });
console.log(response.data.objects);

// Get public URL
const url = filesHubService.getPublicUrl(publicId);
```

## Advanced Usage

### File Validation

Validate files before upload:

```tsx
const { uploadFile, validateFile } = useFilesHub();

const handleUpload = async (file: File) => {
  // Custom validation rules
  const validation = validateFile(file, {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png'],
    allowedExtensions: ['.jpg', '.jpeg', '.png'],
  });

  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  await uploadFile(file, 'public', {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png'],
  });
};
```

### Replace File

Delete old file and upload new one in a single operation:

```tsx
const { replaceFile } = useFilesHub();

const handleReplace = async (oldPublicId: string, newFile: File) => {
  const response = await replaceFile(oldPublicId, newFile, 'public');
  if (response) {
    console.log('New file ID:', response.data.public_id);
  }
};
```

### Delete Multiple Files

Delete multiple files at once:

```tsx
const { deleteMultipleFiles } = useFilesHub();

const handleDeleteAll = async (publicIds: string[]) => {
  const success = await deleteMultipleFiles(publicIds);
  if (success) {
    console.log('All files deleted');
  }
};
```

### Download Files

Download files to user's device:

```tsx
const { downloadFile } = useFilesHub();

const handleDownload = async (publicId: string, fileName: string) => {
  await downloadFile(publicId, fileName);
};
```

## Firestore Integration

Track uploaded files in Firestore for user records:

```tsx
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@config/firebase';
import type { FileRecord } from '@types/files-hub';

// After successful upload
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
    associatedWith: exoplanetAnalysisId, // optional
  };

  // Store in user's document
  await updateDoc(doc(db, `exohunter_users/${userId}`), {
    uploadedFiles: arrayUnion(fileRecord),
  });
}
```

## Best Practices

### 1. Delete Old Files Before Replacing

Always delete the old file before uploading a replacement:

```tsx
// Good - deletes old file first
await replaceFile(oldPublicId, newFile);

// Also good - manual control
await deleteFile(oldPublicId);
const response = await uploadFile(newFile);
```

### 2. Track Files in Firestore

Always track uploaded files in Firestore to prevent orphaned files:

```tsx
// Store file reference with user data
const fileRecord: FileRecord = {
  publicId: response.data.public_id,
  // ... other fields
};

await setDoc(doc(db, `exohunter_files/${response.data.public_id}`), fileRecord);
```

### 3. Delete All User Files on Account Deletion

When deleting a user account, delete all their files:

```tsx
const deleteUserAccount = async (userId: string) => {
  // Get all user files from Firestore
  const filesSnapshot = await getDocs(
    query(collection(db, 'exohunter_files'), where('uploadedBy', '==', userId))
  );

  // Extract public IDs
  const publicIds = filesSnapshot.docs.map(
    (doc) => doc.data().publicId as string
  );

  // Delete all files
  await deleteMultipleFiles(publicIds);

  // Then delete user account
  // ...
};
```

### 4. Use Public Visibility for Shared Content

Use `public` visibility for files that need to be shared:

```tsx
// Public - anyone can access without authentication
await uploadFile(file, 'public');

// Private - requires authentication (default)
await uploadFile(file, 'private');
```

### 5. Validate Files Before Upload

Always validate files to prevent errors:

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

## Error Handling

FilesHub automatically handles errors and shows toast notifications. For custom error handling:

```tsx
try {
  const response = await filesHubService.upload({ file, visibility: 'private' });
  console.log('Upload successful:', response);
} catch (error) {
  if (error.statusCode === 429) {
    // Rate limit error - service automatically retries
    console.log('Rate limited, retrying...');
  } else if (error.statusCode === 401) {
    console.error('Invalid API key');
  } else {
    console.error('Upload failed:', error.message);
  }
}
```

## Specialized Hooks

### useFileUpload

For simple upload scenarios:

```tsx
import { useFileUpload } from '@hooks/useFilesHub';

const { upload, isUploading, progress, error } = useFileUpload();

await upload(file, 'public');
```

### useFileDelete

For deletion operations:

```tsx
import { useFileDelete } from '@hooks/useFilesHub';

const { deleteFile, deleteMultiple, isDeleting } = useFileDelete();

await deleteFile(publicId);
await deleteMultiple([id1, id2, id3]);
```

### useFileList

For listing files:

```tsx
import { useFileList } from '@hooks/useFilesHub';

const { list, isLoading, error } = useFileList();

const response = await list({ page: 1, perPage: 50 });
```

## API Reference

### Service Methods

- `upload(options)` - Upload a file
- `download(publicId)` - Download a file
- `delete(publicId)` - Delete a file
- `list(options)` - List files
- `replace(oldPublicId, options)` - Replace a file
- `deleteMultiple(publicIds)` - Delete multiple files
- `getPublicUrl(publicId)` - Get public URL
- `validateFile(file, rules)` - Validate a file
- `healthCheck()` - Check API health
- `isConfigured()` - Check if API key is set

### Hook Methods

- `uploadFile(file, visibility, rules)` - Upload a file
- `deleteFile(publicId)` - Delete a file
- `deleteMultipleFiles(publicIds)` - Delete multiple files
- `replaceFile(oldPublicId, newFile, visibility, rules)` - Replace a file
- `downloadFile(publicId, fileName)` - Download a file
- `listFiles(options)` - List files
- `getPublicUrl(publicId)` - Get public URL
- `validateFile(file, rules)` - Validate a file

## Support

For issues or questions:
- Email: aoneahsan@gmail.com
- FilesHub Docs: https://fileshub.zaions.com/ai-integration
- Project Repository: https://github.com/aoneahsan/exohunter-ai

## Migration from Firebase Storage

If you're migrating from Firebase Storage:

1. Replace all `firebase/storage` imports with FilesHub
2. Update upload logic to use `filesHubService.upload()`
3. Update download logic to use `filesHubService.download()` or `getPublicUrl()`
4. Update delete logic to use `filesHubService.delete()`
5. Remove Firebase Storage rules and dependencies

Example migration:

```tsx
// Before (Firebase Storage)
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const storageRef = ref(storage, `files/${file.name}`);
await uploadBytes(storageRef, file);
const url = await getDownloadURL(storageRef);

// After (FilesHub)
import { filesHubService } from '@services/files-hub';
const response = await filesHubService.upload({ file, visibility: 'private' });
const url = response.data.url;
```
