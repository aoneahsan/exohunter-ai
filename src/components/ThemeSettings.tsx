import { motion } from 'framer-motion';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  Type,
  Check,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useThemeStore, type ThemeMode, type AccentColor, type FontSize } from '@/store/useThemeStore';
import { Label } from '@/components/ui/label';

const themeOptions: Array<{ value: ThemeMode; icon: typeof Sun; label: string; description: string }> = [
  {
    value: 'light',
    icon: Sun,
    label: 'Light',
    description: 'Bright and clear interface',
  },
  {
    value: 'dark',
    icon: Moon,
    label: 'Dark',
    description: 'Perfect for stargazing',
  },
  {
    value: 'system',
    icon: Monitor,
    label: 'System',
    description: 'Match your device settings',
  },
];

const accentColorOptions: Array<{ value: AccentColor; label: string; color: string; bgClass: string }> = [
  { value: 'blue', label: 'Blue', color: '#3b82f6', bgClass: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', color: '#a855f7', bgClass: 'bg-purple-500' },
  { value: 'green', label: 'Green', color: '#22c55e', bgClass: 'bg-green-500' },
  { value: 'orange', label: 'Orange', color: '#f97316', bgClass: 'bg-orange-500' },
  { value: 'pink', label: 'Pink', color: '#ec4899', bgClass: 'bg-pink-500' },
  { value: 'red', label: 'Red', color: '#ef4444', bgClass: 'bg-red-500' },
  { value: 'cyan', label: 'Cyan', color: '#06b6d4', bgClass: 'bg-cyan-500' },
  { value: 'amber', label: 'Amber', color: '#f59e0b', bgClass: 'bg-amber-500' },
];

const fontSizeOptions: Array<{ value: FontSize; icon: typeof Type; label: string; description: string; example: string }> = [
  {
    value: 'small',
    icon: Type,
    label: 'Small',
    description: 'Compact text size',
    example: '14px',
  },
  {
    value: 'medium',
    icon: Type,
    label: 'Medium',
    description: 'Standard reading size',
    example: '16px',
  },
  {
    value: 'large',
    icon: Type,
    label: 'Large',
    description: 'Easier to read',
    example: '18px',
  },
];

export function ThemeSettings() {
  const { theme, accentColor, fontSize, setTheme, setAccentColor, setFontSize } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Theme Mode Selection */}
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Palette className="mr-2" size={20} />
            Theme Mode
          </CardTitle>
          <CardDescription className="text-gray-400">
            Choose your preferred color scheme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup.Root
            value={theme}
            onValueChange={(value) => setTheme(value as ThemeMode)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.value;

              return (
                <RadioGroup.Item
                  key={option.value}
                  value={option.value}
                  className="group relative focus:outline-none"
                >
                  <div
                    className={`
                      relative p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-600 bg-slate-700/50 hover:border-purple-400'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon
                        className={`
                          w-6 h-6 mt-1 transition-colors
                          ${isSelected ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-300'}
                        `}
                      />
                      <div className="flex-1">
                        <Label className="text-white font-medium cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-sm text-gray-400 mt-1">
                          {option.description}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-purple-400 absolute top-3 right-3" />
                      )}
                    </div>
                  </div>
                </RadioGroup.Item>
              );
            })}
          </RadioGroup.Root>
        </CardContent>
      </Card>

      {/* Accent Color Selection */}
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Palette className="mr-2" size={20} />
            Accent Color
          </CardTitle>
          <CardDescription className="text-gray-400">
            Customize the app's primary color
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup.Root
            value={accentColor}
            onValueChange={(value) => setAccentColor(value as AccentColor)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {accentColorOptions.map((option) => {
              const isSelected = accentColor === option.value;

              return (
                <RadioGroup.Item
                  key={option.value}
                  value={option.value}
                  className="group relative focus:outline-none"
                >
                  <div
                    className={`
                      relative p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        isSelected
                          ? 'border-purple-500 bg-slate-700/80'
                          : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-12 h-12 rounded-full ${option.bgClass} flex items-center justify-center transition-transform ${
                          isSelected ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                      >
                        {isSelected && <Check className="w-6 h-6 text-white" />}
                      </div>
                      <Label className="text-white text-sm font-medium cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  </div>
                </RadioGroup.Item>
              );
            })}
          </RadioGroup.Root>
        </CardContent>
      </Card>

      {/* Font Size Selection */}
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Type className="mr-2" size={20} />
            Font Size
          </CardTitle>
          <CardDescription className="text-gray-400">
            Adjust text size for better readability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup.Root
            value={fontSize}
            onValueChange={(value) => setFontSize(value as FontSize)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {fontSizeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = fontSize === option.value;

              return (
                <RadioGroup.Item
                  key={option.value}
                  value={option.value}
                  className="group relative focus:outline-none"
                >
                  <div
                    className={`
                      relative p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-600 bg-slate-700/50 hover:border-purple-400'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon
                        className={`
                          mt-1 transition-colors
                          ${isSelected ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-300'}
                          ${
                            option.value === 'small'
                              ? 'w-4 h-4'
                              : option.value === 'medium'
                              ? 'w-5 h-5'
                              : 'w-6 h-6'
                          }
                        `}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-white font-medium cursor-pointer">
                            {option.label}
                          </Label>
                          <span className="text-xs text-gray-500">{option.example}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {option.description}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-purple-400 absolute top-3 right-3" />
                      )}
                    </div>
                  </div>
                </RadioGroup.Item>
              );
            })}
          </RadioGroup.Root>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Preview</CardTitle>
          <CardDescription className="text-gray-400">
            See how your theme looks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg bg-slate-700/50 border border-slate-600">
            <h3 className="text-white font-semibold mb-2" style={{ fontSize: 'var(--font-size-base)' }}>
              Sample Heading
            </h3>
            <p className="text-gray-300 mb-4" style={{ fontSize: `calc(var(--font-size-base) * 0.875)` }}>
              This is how your text will appear with the selected theme settings. The accent color is used for
              interactive elements and highlights throughout the app.
            </p>
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: 'var(--color-accent-primary)',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
              }}
            >
              Sample Button
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
