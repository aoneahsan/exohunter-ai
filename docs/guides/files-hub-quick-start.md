# FilesHub Quick Start

Quick reference for using FilesHub in ExoHunter AI.

## Setup

1. Add to `.env`:
```bash
VITE_FILES_HUB_API_KEY=your_api_key_here
```

2. Import and use:
```tsx
import { useFilesHub } from '@hooks/useFilesHub';
```

## Common Operations

### Upload File

```tsx
const { uploadFile, isUploading, uploadProgress } = useFilesHub();

const response = await uploadFile(file, 'private');
// response.data.public_id
// response.data.url
```

### Delete File

```tsx
const { deleteFile } = useFilesHub();

await deleteFile(publicId);
```

### Replace File

```tsx
const { replaceFile } = useFilesHub();

await replaceFile(oldPublicId, newFile, 'private');
```

### List Files

```tsx
const { listFiles } = useFilesHub();

const response = await listFiles({ page: 1, perPage: 50 });
// response.data.objects
// response.data.pagination
```

### Validate File

```tsx
const { validateFile } = useFilesHub();

const validation = validateFile(file, {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png'],
});

if (!validation.valid) {
  alert(validation.error);
}
```

### Get Public URL

```tsx
const { getPublicUrl } = useFilesHub();

const url = getPublicUrl(publicId);
```

## Track in Firestore

```tsx
import { doc, setDoc } from 'firebase/firestore';
import type { FileRecord } from '@services/files-hub';

const response = await uploadFile(file, 'private');

const fileRecord: FileRecord = {
  publicId: response.data.public_id,
  fileName: response.data.file_name,
  fileSize: response.data.file_size,
  mimeType: response.data.mime_type,
  visibility: response.data.visibility,
  url: response.data.url,
  uploadedAt: response.data.created_at,
  uploadedBy: userId,
};

await setDoc(doc(db, `exohunter_files/${response.data.public_id}`), fileRecord);
```

## State Management

```tsx
const {
  isUploading,      // boolean
  uploadProgress,   // 0-100
  uploadError,      // string | null
  isDeleting,       // boolean
  deleteError,      // string | null
  isLoading,        // boolean
  listError,        // string | null
} = useFilesHub();
```

## Specialized Hooks

### Simple Upload
```tsx
import { useFileUpload } from '@hooks/useFilesHub';

const { upload, isUploading, progress } = useFileUpload();
await upload(file, 'public');
```

### Delete Only
```tsx
import { useFileDelete } from '@hooks/useFilesHub';

const { deleteFile, deleteMultiple, isDeleting } = useFileDelete();
await deleteFile(publicId);
await deleteMultiple([id1, id2, id3]);
```

### List Only
```tsx
import { useFileList } from '@hooks/useFilesHub';

const { list, isLoading } = useFileList();
const response = await list({ page: 1, perPage: 50 });
```

## Default Validation Rules

- **Max Size**: 50MB
- **Allowed Types**: Images (JPEG, PNG, GIF, WebP, SVG), PDFs, Text, CSV, JSON, XML
- **Allowed Extensions**: .jpg, .jpeg, .png, .gif, .webp, .svg, .pdf, .txt, .csv, .json, .xml

## Error Handling

All operations automatically:
- Show toast notifications
- Retry on rate limits (429)
- Handle network errors
- Validate files before upload

## Best Practices

1. Always validate files before upload
2. Track files in Firestore
3. Delete old files before replacing
4. Delete all user files on account deletion
5. Use appropriate visibility (public/private)

## Full Documentation

- Complete Guide: `/docs/guides/files-hub-integration.md`
- Features Doc: `/docs/features/files-hub.md`
- Example Component: `/src/components/examples/FilesHubExample.tsx`

## Support

Email: aoneahsan@gmail.com
