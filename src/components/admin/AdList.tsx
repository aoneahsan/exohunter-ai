/**
 * AdList Component
 * List of advertisements with filters and actions for admin panel
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  BarChart3,
  ExternalLink,
  MoreVertical,
  Chrome,
  Smartphone,
  Globe,
  Youtube,
  Share2,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type {
  Advertisement,
  AdvertisementType,
  DisplayLocation,
} from '@/types/advertising';
import {
  AD_TYPE_LABELS,
  DISPLAY_LOCATION_LABELS,
  UI_VARIANT_LABELS,
} from '@/types/advertising';

interface AdListProps {
  ads: Advertisement[];
  isLoading: boolean;
  onEdit: (ad: Advertisement) => void;
  onDelete: (ad: Advertisement) => void;
  onToggleActive: (ad: Advertisement) => void;
  onPreview: (ad: Advertisement) => void;
  onViewAnalytics: (ad: Advertisement) => void;
  onCreate: () => void;
}

// Icon mapping for ad types
const typeIcons: Record<AdvertisementType, React.ElementType> = {
  browser_extension: Chrome,
  mobile_app: Smartphone,
  web_app: Globe,
  youtube_video: Youtube,
  social_media: Share2,
  event_offer: Calendar,
};

export const AdList: React.FC<AdListProps> = ({
  ads,
  isLoading,
  onEdit,
  onDelete,
  onToggleActive,
  onPreview,
  onViewAnalytics,
  onCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<AdvertisementType | 'all'>('all');
  const [filterActive, setFilterActive] = useState<boolean | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter ads
  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          ad.title.toLowerCase().includes(query) ||
          ad.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filterType !== 'all' && ad.type !== filterType) return false;

      // Active filter
      if (filterActive !== 'all' && ad.isActive !== filterActive) return false;

      return true;
    });
  }, [ads, searchQuery, filterType, filterActive]);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Advertisements</h2>
          <p className="text-sm text-gray-400">
            Manage your promotional content across all platforms
          </p>
        </div>
        <Button
          onClick={onCreate}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus size={18} className="mr-2" />
          Create Ad
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search ads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-800 border-slate-700 text-white"
          />
        </div>

        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as AdvertisementType | 'all')}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"
        >
          <option value="all">All Types</option>
          {Object.entries(AD_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Active filter */}
        <select
          value={filterActive === 'all' ? 'all' : filterActive ? 'active' : 'inactive'}
          onChange={(e) =>
            setFilterActive(
              e.target.value === 'all' ? 'all' : e.target.value === 'active'
            )
          }
          className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl font-bold text-white">{ads.length}</div>
          <div className="text-xs text-gray-400">Total Ads</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl font-bold text-green-400">
            {ads.filter((a) => a.isActive).length}
          </div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl font-bold text-purple-400">
            {ads.reduce((sum, a) => sum + a.analytics.impressions, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Total Impressions</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl font-bold text-blue-400">
            {ads.reduce((sum, a) => sum + a.analytics.clicks, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Total Clicks</div>
        </div>
      </div>

      {/* Ad list */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">Loading ads...</div>
        ) : filteredAds.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            {searchQuery || filterType !== 'all' || filterActive !== 'all'
              ? 'No ads match your filters'
              : 'No advertisements yet. Create one to get started!'}
          </div>
        ) : (
          <AnimatePresence>
            {filteredAds.map((ad) => {
              const TypeIcon = typeIcons[ad.type];
              const isExpanded = expandedId === ad.id;

              return (
                <motion.div
                  key={ad.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
                >
                  {/* Main row */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                    onClick={() => handleToggleExpand(ad.id)}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        ad.isActive ? 'bg-purple-500/20' : 'bg-slate-700/50'
                      )}
                    >
                      <TypeIcon
                        size={20}
                        className={ad.isActive ? 'text-purple-400' : 'text-gray-500'}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white truncate">{ad.title}</h3>
                        {!ad.isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-700 text-gray-400 text-xs">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 truncate">{ad.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-white font-medium">
                          {ad.analytics.impressions.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">
                          {ad.analytics.clicks.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">
                          {ad.analytics.impressions > 0
                            ? ((ad.analytics.clicks / ad.analytics.impressions) * 100).toFixed(
                                1
                              )
                            : 0}
                          %
                        </div>
                        <div className="text-xs text-gray-500">CTR</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleActive(ad);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        {ad.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(ad);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-700"
                      >
                        <div className="p-4 space-y-4">
                          {/* Details grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Type:</span>
                              <div className="text-white">{AD_TYPE_LABELS[ad.type]}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">UI Variant:</span>
                              <div className="text-white">
                                {UI_VARIANT_LABELS[ad.uiVariant]}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Priority:</span>
                              <div className="text-white">{ad.priority}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Dismissible:</span>
                              <div className="text-white">
                                {ad.isDismissible ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </div>

                          {/* Locations */}
                          <div>
                            <span className="text-gray-500 text-sm">Locations:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {ad.displayLocations.map((loc) => (
                                <span
                                  key={loc}
                                  className="px-2 py-1 rounded bg-slate-700 text-xs text-gray-300"
                                >
                                  {DISPLAY_LOCATION_LABELS[loc]}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Platforms */}
                          <div>
                            <span className="text-gray-500 text-sm">Platforms:</span>
                            <div className="flex gap-2 mt-1">
                              {ad.targetPlatforms.map((platform) => (
                                <span
                                  key={platform}
                                  className="px-2 py-1 rounded bg-slate-700 text-xs text-gray-300 capitalize"
                                >
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm">CTA:</span>
                            <a
                              href={ad.ctaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                            >
                              {ad.ctaText}
                              <ExternalLink size={12} />
                            </a>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onPreview(ad)}
                              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                            >
                              <Eye size={14} className="mr-1" />
                              Preview
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewAnalytics(ad)}
                              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                            >
                              <BarChart3 size={14} className="mr-1" />
                              Analytics
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDelete(ad)}
                              className="bg-red-900/30 border-red-800 text-red-400 hover:bg-red-900/50"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AdList;
