/**
 * Admin Page
 * Administrative panel for managing advertisements
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, RefreshCw, Database, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { advertisingService } from '@/services/advertising';
import { analytics } from '@/services/analytics';
import { AdList } from '@/components/admin/AdList';
import { AdForm } from '@/components/admin/AdForm';
import { AdCard, AdModal } from '@/components/advertising';
import type { Advertisement, AdvertisementCreate } from '@/types/advertising';
import { PREDEFINED_PRODUCTS } from '@/types/advertising';

export default function Admin() {
  const { currentUser, userProfile } = useAuth();

  // State
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);

  // Preview state
  const [previewAd, setPreviewAd] = useState<Advertisement | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Check if user is admin (for now, check if email matches)
  const isAdmin =
    currentUser?.email === 'aoneahsan@gmail.com' ||
    (userProfile as { isAdmin?: boolean })?.isAdmin === true;

  // Fetch ads
  const fetchAds = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await advertisingService.getAdvertisements();
      if (result.success && result.data) {
        setAds(result.data);
      } else {
        setError(result.error || 'Failed to fetch advertisements');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch advertisements');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load ads on mount
  useEffect(() => {
    if (isAdmin) {
      fetchAds();
    }
  }, [isAdmin, fetchAds]);

  // Handle create
  const handleCreate = useCallback(() => {
    setEditingAd(null);
    setIsFormOpen(true);
  }, []);

  // Handle edit
  const handleEdit = useCallback((ad: Advertisement) => {
    setEditingAd(ad);
    setIsFormOpen(true);
  }, []);

  // Handle save
  const handleSave = useCallback(
    async (data: AdvertisementCreate) => {
      setIsSaving(true);

      try {
        if (editingAd) {
          // Update existing
          const result = await advertisingService.updateAdvertisement(editingAd.id, data);
          if (result.success) {
            analytics.track('admin_ad_updated', {
              ad_id: editingAd.id,
              ad_title: data.title,
            });
          } else {
            throw new Error(result.error);
          }
        } else {
          // Create new
          const result = await advertisingService.createAdvertisement(data);
          if (result.success) {
            analytics.track('admin_ad_created', {
              ad_title: data.title,
              ad_type: data.type,
            });
          } else {
            throw new Error(result.error);
          }
        }

        setIsFormOpen(false);
        setEditingAd(null);
        await fetchAds();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save advertisement');
      } finally {
        setIsSaving(false);
      }
    },
    [editingAd, fetchAds]
  );

  // Handle delete
  const handleDelete = useCallback(
    async (ad: Advertisement) => {
      if (!confirm(`Are you sure you want to delete "${ad.title}"?`)) {
        return;
      }

      try {
        const result = await advertisingService.deleteAdvertisement(ad.id);
        if (result.success) {
          analytics.track('admin_ad_deleted', {
            ad_id: ad.id,
            ad_title: ad.title,
          });
          await fetchAds();
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete advertisement');
      }
    },
    [fetchAds]
  );

  // Handle toggle active
  const handleToggleActive = useCallback(
    async (ad: Advertisement) => {
      try {
        const result = await advertisingService.updateAdvertisement(ad.id, {
          isActive: !ad.isActive,
        });
        if (result.success) {
          analytics.track('admin_ad_toggled', {
            ad_id: ad.id,
            ad_title: ad.title,
            is_active: !ad.isActive,
          });
          await fetchAds();
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update advertisement');
      }
    },
    [fetchAds]
  );

  // Handle preview
  const handlePreview = useCallback((ad: Advertisement) => {
    setPreviewAd(ad);
    setIsPreviewOpen(true);
  }, []);

  // Handle view analytics (simplified - just shows in console for now)
  const handleViewAnalytics = useCallback((ad: Advertisement) => {
    console.log('[Admin] Ad Analytics:', {
      id: ad.id,
      title: ad.title,
      impressions: ad.analytics.impressions,
      clicks: ad.analytics.clicks,
      dismissals: ad.analytics.dismissals,
      ctr:
        ad.analytics.impressions > 0
          ? ((ad.analytics.clicks / ad.analytics.impressions) * 100).toFixed(2) + '%'
          : '0%',
    });
    alert(
      `Analytics for "${ad.title}":\n\n` +
        `Impressions: ${ad.analytics.impressions.toLocaleString()}\n` +
        `Clicks: ${ad.analytics.clicks.toLocaleString()}\n` +
        `Dismissals: ${ad.analytics.dismissals.toLocaleString()}\n` +
        `CTR: ${
          ad.analytics.impressions > 0
            ? ((ad.analytics.clicks / ad.analytics.impressions) * 100).toFixed(2)
            : 0
        }%`
    );
  }, []);

  // Handle seed data
  const handleSeedData = useCallback(async () => {
    if (
      !confirm(
        'This will add 6 predefined advertisements for your products. Continue?'
      )
    ) {
      return;
    }

    setIsSeeding(true);

    try {
      const result = await advertisingService.seedAdvertisements(PREDEFINED_PRODUCTS);
      if (result.success) {
        await fetchAds();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seed advertisements');
    } finally {
      setIsSeeding(false);
    }
  }, [fetchAds]);

  // Not authorized
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-6">
              Please log in to access the admin panel.
            </p>
            <Link to="/login">
              <Button className="bg-purple-600 hover:bg-purple-700">Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
            <p className="text-gray-400 mb-6">
              You don't have permission to access this page.
            </p>
            <Link to="/dashboard">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
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
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Shield className="text-purple-400" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-400">Manage advertisements and promotions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAds}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <RefreshCw
                  size={14}
                  className={isLoading ? 'animate-spin mr-2' : 'mr-2'}
                />
                Refresh
              </Button>
              {ads.length === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSeedData}
                  disabled={isSeeding}
                  className="bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600/30"
                >
                  {isSeeding ? (
                    <Loader2 size={14} className="animate-spin mr-2" />
                  ) : (
                    <Database size={14} className="mr-2" />
                  )}
                  Seed Data
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-red-300"
          >
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-400 hover:text-red-300"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Ad List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AdList
            ads={ads}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
            onPreview={handlePreview}
            onViewAnalytics={handleViewAnalytics}
            onCreate={handleCreate}
          />
        </motion.div>
      </div>

      {/* Form Modal */}
      <AdForm
        ad={editingAd}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAd(null);
        }}
        onSave={handleSave}
        isLoading={isSaving}
      />

      {/* Preview Modal */}
      <AdModal
        ad={previewAd}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewAd(null);
        }}
      />
    </div>
  );
}
