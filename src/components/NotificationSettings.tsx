import { useState, useEffect } from 'react';
import { Bell, BellOff, Check } from 'lucide-react';
import { 
  isNotificationEnabled, 
  requestNotificationPermission,
  sendTags,
  deleteTags
} from '@/services/oneSignal';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  tag: string;
}

export const NotificationSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: '1',
      label: 'New Discoveries',
      description: 'Get notified about newly discovered exoplanets',
      enabled: true,
      tag: 'new_discoveries'
    },
    {
      id: '2',
      label: 'Mission Updates',
      description: 'Updates from space missions and telescopes',
      enabled: true,
      tag: 'mission_updates'
    },
    {
      id: '3',
      label: 'Educational Content',
      description: 'New articles and learning materials',
      enabled: false,
      tag: 'educational_content'
    },
    {
      id: '4',
      label: 'Community Activity',
      description: 'Popular discussions and community events',
      enabled: false,
      tag: 'community_activity'
    },
    {
      id: '5',
      label: 'System Alerts',
      description: 'Important system updates and maintenance',
      enabled: true,
      tag: 'system_alerts'
    }
  ]);

  useEffect(() => {
    checkNotificationStatus();
    loadPreferences();
  }, []);

  const checkNotificationStatus = async () => {
    const enabled = await isNotificationEnabled();
    setIsEnabled(enabled);
  };

  const loadPreferences = () => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('notificationPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Failed to load notification preferences:', error);
      }
    }
  };

  const savePreferences = (newPreferences: NotificationPreference[]) => {
    localStorage.setItem('notificationPreferences', JSON.stringify(newPreferences));
    
    // Update OneSignal tags
    const enabledTags: Record<string, string> = {};
    const disabledTags: string[] = [];
    
    newPreferences.forEach(pref => {
      if (pref.enabled) {
        enabledTags[pref.tag] = 'true';
      } else {
        disabledTags.push(pref.tag);
      }
    });
    
    if (Object.keys(enabledTags).length > 0) {
      sendTags(enabledTags);
    }
    
    if (disabledTags.length > 0) {
      deleteTags(disabledTags);
    }
  };

  const handleToggleNotifications = async () => {
    if (isEnabled) {
      // Can't programmatically disable notifications, just update our state
      setIsEnabled(false);
      localStorage.setItem('notificationsDisabledByUser', 'true');
    } else {
      setIsLoading(true);
      try {
        const granted = await requestNotificationPermission();
        if (granted) {
          setIsEnabled(true);
          localStorage.removeItem('notificationsDisabledByUser');
          // Apply current preferences
          savePreferences(preferences);
        }
      } catch (error) {
        console.error('Failed to enable notifications:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTogglePreference = (id: string) => {
    const newPreferences = preferences.map(pref => 
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    );
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  };

  return (
    <div className="bg-space-800 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          <h2 className="text-lg sm:text-xl font-bold">Notification Settings</h2>
        </div>
        
        <button
          onClick={handleToggleNotifications}
          disabled={isLoading}
          className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
            isEnabled ? 'bg-purple-600' : 'bg-gray-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isEnabled ? (
        <>
          <p className="text-xs sm:text-sm text-gray-400 mb-6">
            Customize which types of notifications you want to receive.
          </p>
          
          <div className="space-y-3 sm:space-y-4">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="flex items-start justify-between p-3 sm:p-4 bg-space-700 rounded-lg hover:bg-space-600 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{pref.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{pref.description}</p>
                </div>
                
                <button
                  onClick={() => handleTogglePreference(pref.id)}
                  className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center transition-colors ${
                    pref.enabled
                      ? 'bg-purple-600 text-white'
                      : 'bg-space-800 border border-gray-600 text-gray-600'
                  }`}
                >
                  {pref.enabled && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <BellOff className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-semibold mb-2">Notifications Disabled</h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-4 max-w-md mx-auto">
            Enable notifications to stay updated with the latest exoplanet discoveries and space exploration news.
          </p>
          <button
            onClick={handleToggleNotifications}
            disabled={isLoading}
            className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enabling...' : 'Enable Notifications'}
          </button>
        </div>
      )}
    </div>
  );
};