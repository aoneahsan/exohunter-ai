import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  joinedAt: Timestamp;
  stats: UserStats;
  preferences: UserPreferences;
  achievements: Achievement[];
}

export interface UserStats {
  detectionsCount: number;
  accuracyScore: number;
  contributionPoints: number;
  rank: string;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  publicProfile: boolean;
  theme?: 'dark' | 'light';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Timestamp;
  progress: number;
  maxProgress: number;
}

export interface Detection {
  id: string;
  userId: string;
  userName?: string;
  userPhoto?: string;
  timestamp: Timestamp;
  starData: StarData;
  analysis: AnalysisResult;
  status: 'pending' | 'confirmed' | 'rejected';
  votes: number;
  isPublic: boolean;
  tags?: string[];
}

export interface StarData {
  catalogId: string;
  name?: string;
  constellation: string;
  magnitude: number;
  distance: number;
  coordinates?: {
    ra: number;
    dec: number;
  };
  lightCurveData?: number[];
}

export interface AnalysisResult {
  confidence: number;
  method: 'transit' | 'radial_velocity' | 'microlensing' | 'direct_imaging';
  periodDays: number;
  depth: number;
  duration: number;
  planetRadius?: number;
  planetMass?: number;
  habitableZone?: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  interactive: boolean;
  videoUrl?: string;
  markdownContent: string;
  order: number;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'detection' | 'achievement' | 'comment' | 'vote';
  description: string;
  timestamp: Timestamp;
  relatedId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;
  timestamp: Timestamp;
  actionUrl?: string;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  score: number;
  rank: number;
  detectionsCount: number;
  accuracyScore: number;
  updatedAt: Timestamp;
}

// Re-export FilesHub types
export type {
  FileVisibility,
  UploadResponse,
  FileMetadata,
  ListResponse,
  DeleteResponse,
  HealthResponse,
  FilesHubError,
  UploadOptions,
  ListOptions,
  FileValidationRules,
  FileValidationResult,
  FilesHubConfig,
  UploadProgressEvent,
  RateLimitError,
  FileRecord,
} from '@services/files-hub';

// Re-export Error Handler types
export {
  ErrorSeverity,
  ErrorCategory,
} from './error-handler';
export type {
  ErrorContext,
  ErrorMetadata,
  IErrorHandlerService,
  ErrorTrackingPlatform,
  ErrorBoundaryState,
  ErrorBoundaryProps,
  ErrorBoundaryFallbackProps,
} from './error-handler';