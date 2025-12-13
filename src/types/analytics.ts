/**
 * Analytics Types
 * TypeScript definitions for analytics events and tracking
 */

export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

export interface AnalyticsUserProperties {
  [key: string]: string | number | boolean | null | undefined;
}

export interface AnalyticsIdentifyTraits {
  email?: string;
  displayName?: string;
  plan?: string;
  joinedAt?: string;
  totalDetections?: number;
  accuracyScore?: number;
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Analytics Event Names
 * Centralized event naming for consistency across the app
 */
export const AnalyticsEvents = {
  // Page Views
  PAGE_VIEW: 'page_view',

  // Authentication Events
  AUTH_SIGNUP_STARTED: 'auth_signup_started',
  AUTH_SIGNUP_COMPLETED: 'auth_signup_completed',
  AUTH_SIGNUP_FAILED: 'auth_signup_failed',
  AUTH_LOGIN_STARTED: 'auth_login_started',
  AUTH_LOGIN_COMPLETED: 'auth_login_completed',
  AUTH_LOGIN_FAILED: 'auth_login_failed',
  AUTH_LOGOUT: 'auth_logout',
  AUTH_PASSWORD_RESET_REQUESTED: 'auth_password_reset_requested',
  AUTH_PASSWORD_RESET_COMPLETED: 'auth_password_reset_completed',

  // Exoplanet Analyzer Events
  ANALYZER_OPENED: 'analyzer_opened',
  ANALYZER_DATA_UPLOADED: 'analyzer_data_uploaded',
  ANALYZER_ANALYSIS_STARTED: 'analyzer_analysis_started',
  ANALYZER_ANALYSIS_COMPLETED: 'analyzer_analysis_completed',
  ANALYZER_ANALYSIS_FAILED: 'analyzer_analysis_failed',
  ANALYZER_RESULT_SAVED: 'analyzer_result_saved',
  ANALYZER_RESULT_SHARED: 'analyzer_result_shared',
  ANALYZER_EXPORT_CSV: 'analyzer_export_csv',
  ANALYZER_EXPORT_JSON: 'analyzer_export_json',

  // Exoplanet Explorer Events
  EXPLORER_OPENED: 'explorer_opened',
  EXPLORER_SEARCH_PERFORMED: 'explorer_search_performed',
  EXPLORER_FILTER_APPLIED: 'explorer_filter_applied',
  EXPLORER_PLANET_VIEWED: 'explorer_planet_viewed',
  EXPLORER_PLANET_FAVORITED: 'explorer_planet_favorited',
  EXPLORER_COMPARISON_STARTED: 'explorer_comparison_started',
  EXPLORER_3D_VIEW_ENABLED: 'explorer_3d_view_enabled',

  // Discoveries/Community Events
  DISCOVERIES_OPENED: 'discoveries_opened',
  DISCOVERY_CREATED: 'discovery_created',
  DISCOVERY_VIEWED: 'discovery_viewed',
  DISCOVERY_VOTED: 'discovery_voted',
  DISCOVERY_COMMENTED: 'discovery_commented',
  DISCOVERY_SHARED: 'discovery_shared',
  DISCOVERY_REPORTED: 'discovery_reported',

  // Profile Events
  PROFILE_VIEWED: 'profile_viewed',
  PROFILE_EDITED: 'profile_edited',
  PROFILE_AVATAR_UPDATED: 'profile_avatar_updated',
  PROFILE_PREFERENCES_UPDATED: 'profile_preferences_updated',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',

  // Tutorial Events
  TUTORIAL_STARTED: 'tutorial_started',
  TUTORIAL_COMPLETED: 'tutorial_completed',
  TUTORIAL_SKIPPED: 'tutorial_skipped',
  TUTORIAL_STEP_COMPLETED: 'tutorial_step_completed',

  // Leaderboard Events
  LEADERBOARD_VIEWED: 'leaderboard_viewed',
  LEADERBOARD_FILTER_CHANGED: 'leaderboard_filter_changed',

  // Settings Events
  SETTINGS_OPENED: 'settings_opened',
  SETTINGS_NOTIFICATION_TOGGLED: 'settings_notification_toggled',
  SETTINGS_THEME_CHANGED: 'settings_theme_changed',
  SETTINGS_PRIVACY_UPDATED: 'settings_privacy_updated',

  // Error Events
  ERROR_OCCURRED: 'error_occurred',
  ERROR_API_FAILED: 'error_api_failed',
  ERROR_NETWORK_FAILED: 'error_network_failed',
  ERROR_AUTH_FAILED: 'error_auth_failed',

  // Feature Usage
  FEATURE_CLICKED: 'feature_clicked',
  BUTTON_CLICKED: 'button_clicked',
  LINK_CLICKED: 'link_clicked',
  MODAL_OPENED: 'modal_opened',
  MODAL_CLOSED: 'modal_closed',
  FORM_SUBMITTED: 'form_submitted',
  FORM_VALIDATION_FAILED: 'form_validation_failed',

  // App Events
  APP_INSTALLED: 'app_installed',
  APP_UPDATED: 'app_updated',
  APP_SHARE_CLICKED: 'app_share_clicked',
  FEEDBACK_SUBMITTED: 'feedback_submitted',
  HELP_VIEWED: 'help_viewed',
} as const;

export type AnalyticsEventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

/**
 * Analytics Platform Type
 */
export type AnalyticsPlatform = 'firebase' | 'amplitude' | 'clarity';

/**
 * Analytics Service Interface
 */
export interface IAnalyticsService {
  /**
   * Track an event
   * @param event - Event name
   * @param properties - Event properties
   */
  track(event: AnalyticsEventName | string, properties?: AnalyticsEventProperties): void;

  /**
   * Track a page view
   * @param pageName - Page name/path
   * @param properties - Additional properties
   */
  page(pageName: string, properties?: AnalyticsEventProperties): void;

  /**
   * Identify a user
   * @param userId - User ID
   * @param traits - User traits/properties
   */
  identify(userId: string, traits?: AnalyticsIdentifyTraits): void;

  /**
   * Set user properties
   * @param properties - User properties
   */
  setUserProperties(properties: AnalyticsUserProperties): void;

  /**
   * Reset user identification (on logout)
   */
  reset(): void;
}
