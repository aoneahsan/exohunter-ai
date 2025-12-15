import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { NotificationSettings } from '@/components/NotificationSettings';
import { ThemeSettings } from '@/components/ThemeSettings';
import toast from 'react-hot-toast';

export default function Settings() {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [settings, setSettings] = useState({
    // Account Settings
    displayName: userProfile?.displayName || '',
    email: userProfile?.email || '',
    bio: userProfile?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: userProfile?.preferences?.notifications ?? true,
    pushNotifications: true,
    weeklyNewsletter: userProfile?.preferences?.newsletter ?? true,
    discoveryAlerts: true,
    achievementNotifications: true,
    communityUpdates: false,
    
    // Privacy Settings
    publicProfile: userProfile?.preferences?.publicProfile ?? true,
    showEmail: false,
    showActivity: true,
    allowMessages: true,
    showAchievements: true,
    
    // Theme & Display
    theme: 'dark', // Always dark for space theme
    language: 'en',
    timezone: 'UTC',
    compactMode: false,
    animationsEnabled: true
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <User size={48} className="mx-auto mb-4 opacity-50" />
          <p>Please log in to access settings</p>
        </div>
      </div>
    );
  }

  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    try {
      // Update user profile with new settings
      await updateUserProfile({
        displayName: settings.displayName,
        bio: settings.bio,
        preferences: {
          notifications: settings.emailNotifications,
          newsletter: settings.weeklyNewsletter,
          publicProfile: settings.publicProfile
        }
      });
      
      setSaveStatus('saved');
      toast.success('Settings saved successfully!');
      
      // Reset save status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      toast.error('Failed to save settings');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // In a real app, implement account deletion
      toast.success('Account deletion request submitted');
      setShowDeleteConfirm(false);
      // Redirect to logout or deletion confirmation page
    } catch {
      toast.error('Failed to delete account');
    }
  };

  const handlePasswordChange = async () => {
    if (settings.newPassword !== settings.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (settings.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      // In a real app, implement password change
      toast.success('Password changed successfully');
      setSettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch {
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-slate-800/50"
            >
              <ArrowLeft className="mr-2" size={18} />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            <SettingsIcon className="inline-block mr-2 text-purple-400" />
            Settings
          </h1>
          <p className="text-gray-300">
            Customize your ExoHunter AI experience
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="mr-2" size={20} />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Display Name</Label>
                    <Input
                      value={settings.displayName}
                      onChange={(e) => setSettings(prev => ({ ...prev, displayName: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Email Address</Label>
                    <Input
                      value={settings.email}
                      disabled
                      className="bg-slate-700 border-slate-600 text-gray-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Bio</Label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => setSettings(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white resize-none"
                    rows={3}
                    placeholder="Tell the community about yourself..."
                  />
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <h4 className="text-white font-medium mb-3">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Current Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={settings.currentPassword}
                          onChange={(e) => setSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300">New Password</Label>
                      <Input
                        type="password"
                        value={settings.newPassword}
                        onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Confirm Password</Label>
                      <Input
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) => setSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handlePasswordChange}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!settings.currentPassword || !settings.newPassword || !settings.confirmPassword}
                  >
                    <Lock className="mr-2" size={16} />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NotificationSettings />
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2" size={20} />
                  Privacy & Visibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {[
                        { key: 'publicProfile', label: 'Make profile public', description: 'Others can view your profile', value: settings.publicProfile },
                        { key: 'showEmail', label: 'Show email on profile', description: 'Display email address publicly', value: settings.showEmail },
                        { key: 'showActivity', label: 'Show recent activity', description: 'Display recent discoveries', value: settings.showActivity }
                      ].map((item) => (
                        <div key={item.key} className="border-b border-slate-600 pb-3 last:border-b-0">
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.value}
                              onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.checked }))}
                              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 mt-1"
                            />
                            <div>
                              <span className="text-gray-300 font-medium">{item.label}</span>
                              <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {[
                        { key: 'allowMessages', label: 'Allow direct messages', description: 'Others can send you messages', value: settings.allowMessages },
                        { key: 'showAchievements', label: 'Show achievements', description: 'Display badges on profile', value: settings.showAchievements }
                      ].map((item) => (
                        <div key={item.key} className="border-b border-slate-600 pb-3 last:border-b-0">
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.value}
                              onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.checked }))}
                              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 mt-1"
                            />
                            <div>
                              <span className="text-gray-300 font-medium">{item.label}</span>
                              <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Theme & Display */}
          <ThemeSettings />

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="mr-2 text-red-400" size={20} />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-red-400 font-medium mb-2">Delete Account</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end space-x-4"
          >
            <Button
              onClick={handleSaveSettings}
              disabled={saveStatus === 'saving'}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {saveStatus === 'saving' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : saveStatus === 'saved' ? (
                <>
                  <CheckCircle2 className="mr-2" size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="mr-2" size={16} />
                  Save Settings
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 border border-red-500/30 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="text-red-400" size={24} />
                <h3 className="text-white text-lg font-semibold">Confirm Account Deletion</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete your account? This will permanently remove all your data, 
                discoveries, and achievements. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white flex-1"
                >
                  Yes, Delete Account
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}