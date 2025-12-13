import { Sun, Moon, Monitor } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/useThemeStore';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useThemeStore();

  const handleQuickToggle = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleQuickToggle}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          title="Toggle theme (right-click for options)"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 z-50"
          sideOffset={5}
        >
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 mb-1">
            Theme
          </div>
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.value;

            return (
              <DropdownMenu.Item
                key={option.value}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer outline-none
                  transition-colors
                  ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700'
                  }
                `}
                onSelect={() => setTheme(option.value)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{option.label}</span>
                {isActive && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
