/**
 * AdForm Component
 * Form for creating and editing advertisements
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Save,
  Loader2,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type {
  Advertisement,
  AdvertisementCreate,
  AdvertisementType,
  DisplayLocation,
  AdUIVariant,
  AdTargetPlatform,
} from '@/types/advertising';
import {
  AD_TYPE_LABELS,
  DISPLAY_LOCATION_LABELS,
  UI_VARIANT_LABELS,
  DEFAULT_AD_CONFIG,
} from '@/types/advertising';

interface AdFormProps {
  ad?: Advertisement | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AdvertisementCreate) => Promise<void>;
  isLoading?: boolean;
}

const initialFormData: AdvertisementCreate = {
  type: 'web_app',
  title: '',
  description: '',
  bulletPoints: [],
  imageUrl: '',
  localImagePath: '',
  ctaText: 'Learn More',
  ctaUrl: '',
  displayLocations: ['page_slider'],
  uiVariant: 'standard',
  priority: DEFAULT_AD_CONFIG.priority,
  isDismissible: false,
  dismissCooldownDays: DEFAULT_AD_CONFIG.dismissCooldownDays,
  isActive: true,
  startDate: null,
  endDate: null,
  targetPlatforms: ['web', 'android', 'ios'],
};

export const AdForm: React.FC<AdFormProps> = ({
  ad,
  isOpen,
  onClose,
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<AdvertisementCreate>(
    ad
      ? {
          type: ad.type,
          title: ad.title,
          description: ad.description,
          bulletPoints: ad.bulletPoints || [],
          imageUrl: ad.imageUrl,
          localImagePath: ad.localImagePath || '',
          ctaText: ad.ctaText,
          ctaUrl: ad.ctaUrl,
          displayLocations: ad.displayLocations,
          uiVariant: ad.uiVariant,
          priority: ad.priority,
          isDismissible: ad.isDismissible,
          dismissCooldownDays: ad.dismissCooldownDays,
          isActive: ad.isActive,
          startDate: ad.startDate || null,
          endDate: ad.endDate || null,
          targetPlatforms: ad.targetPlatforms,
        }
      : initialFormData
  );

  const [newBulletPoint, setNewBulletPoint] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (field: keyof AdvertisementCreate, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when field is modified
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleAddBulletPoint = useCallback(() => {
    if (newBulletPoint.trim()) {
      setFormData((prev) => ({
        ...prev,
        bulletPoints: [...(prev.bulletPoints || []), newBulletPoint.trim()],
      }));
      setNewBulletPoint('');
    }
  }, [newBulletPoint]);

  const handleRemoveBulletPoint = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: (prev.bulletPoints || []).filter((_, i) => i !== index),
    }));
  }, []);

  const handleToggleLocation = useCallback((location: DisplayLocation) => {
    setFormData((prev) => {
      const locations = prev.displayLocations.includes(location)
        ? prev.displayLocations.filter((l) => l !== location)
        : [...prev.displayLocations, location];
      return { ...prev, displayLocations: locations };
    });
  }, []);

  const handleTogglePlatform = useCallback((platform: AdTargetPlatform) => {
    setFormData((prev) => {
      const platforms = prev.targetPlatforms.includes(platform)
        ? prev.targetPlatforms.filter((p) => p !== platform)
        : [...prev.targetPlatforms, platform];
      return { ...prev, targetPlatforms: platforms };
    });
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.ctaUrl.trim()) {
      newErrors.ctaUrl = 'CTA URL is required';
    } else if (!formData.ctaUrl.startsWith('http')) {
      newErrors.ctaUrl = 'Please enter a valid URL';
    }
    if (!formData.ctaText.trim()) {
      newErrors.ctaText = 'CTA text is required';
    }
    if (formData.displayLocations.length === 0) {
      newErrors.displayLocations = 'Select at least one display location';
    }
    if (formData.targetPlatforms.length === 0) {
      newErrors.targetPlatforms = 'Select at least one platform';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      await onSave(formData);
    },
    [formData, validate, onSave]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl my-8"
      >
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {ad ? 'Edit Advertisement' : 'Create Advertisement'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  Basic Information
                </h3>

                {/* Type */}
                <div>
                  <Label className="text-gray-300">Type</Label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      handleChange('type', e.target.value as AdvertisementType)
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                  >
                    {Object.entries(AD_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <Label className="text-gray-300">Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter ad title"
                    className={cn(
                      'mt-1 bg-slate-700 border-slate-600 text-white',
                      errors.title && 'border-red-500'
                    )}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-400 mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label className="text-gray-300">Description *</Label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter ad description"
                    rows={3}
                    className={cn(
                      'w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white resize-none',
                      errors.description && 'border-red-500'
                    )}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400 mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Bullet Points */}
                <div>
                  <Label className="text-gray-300">Bullet Points</Label>
                  <div className="mt-1 space-y-2">
                    {formData.bulletPoints?.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2"
                      >
                        <span className="flex-1 text-white text-sm">{point}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBulletPoint(index)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        value={newBulletPoint}
                        onChange={(e) => setNewBulletPoint(e.target.value)}
                        placeholder="Add a bullet point"
                        className="bg-slate-700 border-slate-600 text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddBulletPoint();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddBulletPoint}
                        className="bg-slate-700 border-slate-600 text-white"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  Images
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Image URL</Label>
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) => handleChange('imageUrl', e.target.value)}
                      placeholder="https://..."
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Local Fallback Path</Label>
                    <Input
                      value={formData.localImagePath}
                      onChange={(e) => handleChange('localImagePath', e.target.value)}
                      placeholder="/src/assets/..."
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  Call to Action
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">CTA Text *</Label>
                    <Input
                      value={formData.ctaText}
                      onChange={(e) => handleChange('ctaText', e.target.value)}
                      placeholder="Learn More"
                      className={cn(
                        'mt-1 bg-slate-700 border-slate-600 text-white',
                        errors.ctaText && 'border-red-500'
                      )}
                    />
                    {errors.ctaText && (
                      <p className="text-xs text-red-400 mt-1">{errors.ctaText}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300">CTA URL *</Label>
                    <Input
                      value={formData.ctaUrl}
                      onChange={(e) => handleChange('ctaUrl', e.target.value)}
                      placeholder="https://..."
                      className={cn(
                        'mt-1 bg-slate-700 border-slate-600 text-white',
                        errors.ctaUrl && 'border-red-500'
                      )}
                    />
                    {errors.ctaUrl && (
                      <p className="text-xs text-red-400 mt-1">{errors.ctaUrl}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  Display Settings
                </h3>

                {/* UI Variant */}
                <div>
                  <Label className="text-gray-300">UI Variant</Label>
                  <select
                    value={formData.uiVariant}
                    onChange={(e) =>
                      handleChange('uiVariant', e.target.value as AdUIVariant)
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                  >
                    {Object.entries(UI_VARIANT_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display Locations */}
                <div>
                  <Label className="text-gray-300">Display Locations *</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(
                      Object.entries(DISPLAY_LOCATION_LABELS) as [
                        DisplayLocation,
                        string
                      ][]
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleToggleLocation(value)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm transition-colors',
                          formData.displayLocations.includes(value)
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {errors.displayLocations && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.displayLocations}
                    </p>
                  )}
                </div>

                {/* Target Platforms */}
                <div>
                  <Label className="text-gray-300">Target Platforms *</Label>
                  <div className="flex gap-2 mt-2">
                    {(['web', 'android', 'ios'] as AdTargetPlatform[]).map(
                      (platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => handleTogglePlatform(platform)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm capitalize transition-colors',
                            formData.targetPlatforms.includes(platform)
                              ? 'bg-purple-500 text-white'
                              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          )}
                        >
                          {platform}
                        </button>
                      )
                    )}
                  </div>
                  {errors.targetPlatforms && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.targetPlatforms}
                    </p>
                  )}
                </div>

                {/* Priority & Other Settings */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-300">Priority (1-100)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.priority}
                      onChange={(e) =>
                        handleChange('priority', parseInt(e.target.value) || 50)
                      }
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Cooldown (days)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={formData.dismissCooldownDays}
                      onChange={(e) =>
                        handleChange(
                          'dismissCooldownDays',
                          parseInt(e.target.value) || 20
                        )
                      }
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isDismissible}
                        onChange={(e) =>
                          handleChange('isDismissible', e.target.checked)
                        }
                        className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-purple-500"
                      />
                      <span className="text-gray-300 text-sm">Dismissible</span>
                    </label>
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-purple-500"
                  />
                  <span className="text-gray-300 text-sm">
                    Active (show immediately)
                  </span>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {ad ? 'Update' : 'Create'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdForm;
