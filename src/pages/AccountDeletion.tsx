import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserX, AlertTriangle, CheckCircle, Shield, Info, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AccountDeletion() {
  const { user, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Delete Account - ExoHunter AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Permanently delete your ExoHunter AI account. Learn about the account deletion process and what data will be removed.');
    }
  }, []);

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE MY ACCOUNT') {
      setError('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      await deleteAccount();
      // Redirect to home page after successful deletion
      navigate('/');
    } catch (err: unknown) {
      console.error('Error deleting account:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete account. Please contact support.'
      );
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <UserX className="text-red-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">Delete Account</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Permanently delete your ExoHunter AI account and all associated data.
          </p>
        </motion.div>

        {/* Critical Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-red-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Warning: This Action is Permanent</h3>
                  <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                    <li>Your account will be permanently deleted and cannot be recovered</li>
                    <li>All your discoveries, analysis history, and saved data will be lost</li>
                    <li>You will immediately lose access to all ExoHunter AI features</li>
                    <li>Your email address will be available for new registrations after 30 days</li>
                    <li>This action cannot be undone</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What Will Be Deleted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <XCircle className="mr-2 text-red-400" size={24} />
                What Will Be Deleted
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Account Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address and authentication credentials</li>
                  <li>Profile information (name, display name, profile picture)</li>
                  <li>Account settings and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Your Discoveries & Data</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All exoplanet discoveries you've submitted</li>
                  <li>Analysis history and results</li>
                  <li>Saved searches and favorites</li>
                  <li>Comments and community contributions</li>
                  <li>Personal dashboard data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Activity & Analytics</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Usage logs and session history</li>
                  <li>Device information and preferences</li>
                  <li>Analytics events linked to your account</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What May Be Retained */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 text-purple-400" size={24} />
                What May Be Retained
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Certain data may be retained for legitimate purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Anonymized Research Data:</strong> Your discoveries may be retained in anonymized form for scientific research
                </li>
                <li>
                  <strong className="text-white">Legal Compliance:</strong> Data required by law for fraud prevention, security, or legal compliance (typically 90 days)
                </li>
                <li>
                  <strong className="text-white">Backup Systems:</strong> Data in backup systems will be purged within 90 days
                </li>
                <li>
                  <strong className="text-white">Aggregated Statistics:</strong> Anonymized, aggregated data that cannot identify you
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Before You Delete */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Info className="mr-2 text-blue-400" size={24} />
                Before You Delete Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Please consider the following before proceeding:</p>

              <div>
                <h3 className="text-white font-semibold mb-2">Alternative Options</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Deactivate your account temporarily instead of deleting permanently</li>
                  <li>Update your privacy settings to limit data collection</li>
                  <li>Unsubscribe from emails and notifications</li>
                  <li>Clear your discovery history without deleting your account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Export Your Data</h3>
                <p className="mb-2">Before deleting, you can download a copy of your data:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Visit your Profile page to export discoveries</li>
                  <li>Save any important analysis results</li>
                  <li>Download certificates or achievements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Re-registration Limitations</h3>
                <p>After account deletion:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your email will be blocked for new registrations for 30 days</li>
                  <li>You cannot recover your username or discoveries</li>
                  <li>New account will start from scratch with no history</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deletion Form */}
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-slate-800/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <UserX className="mr-2 text-red-400" size={24} />
                  Delete My Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-md p-4">
                  <p className="text-yellow-200 text-sm font-semibold mb-2">
                    You are about to delete: {user.email}
                  </p>
                  <p className="text-gray-300 text-sm">
                    To confirm deletion, type <strong className="text-white">"DELETE MY ACCOUNT"</strong> below (without quotes):
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE MY ACCOUNT"
                    className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    id="understand"
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="understand" className="text-gray-300 text-sm ml-2">
                    I understand that this action is permanent and cannot be undone
                  </label>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || confirmText !== 'DELETE MY ACCOUNT'}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting Account...' : 'Delete My Account Permanently'}
                  </Button>
                  <Button
                    onClick={() => navigate('/settings')}
                    variant="outline"
                    className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-8 text-center">
                <UserX className="text-purple-400 mx-auto mb-4" size={48} />
                <h3 className="text-white text-xl font-bold mb-2">Not Signed In</h3>
                <p className="text-gray-300 mb-6">
                  You need to be signed in to delete your account.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => navigate('/login')}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Go Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-white font-bold text-lg mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                If you're experiencing issues or have questions about account deletion, we're here to help:
              </p>
              <div className="text-gray-300 space-y-2 mb-6">
                <p><strong className="text-white">Email:</strong> <a href="mailto:aoneahsan@gmail.com" className="text-purple-400 hover:underline">aoneahsan@gmail.com</a></p>
                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/923046619706" className="text-purple-400 hover:underline">+92 304 661 9706</a></p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Contact Support
                </Button>
                <Button
                  onClick={() => navigate('/data-deletion')}
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Data Deletion Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
