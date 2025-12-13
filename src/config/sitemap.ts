import type { LucideIcon } from 'lucide-react';
import {
  Home,
  LayoutDashboard,
  Telescope,
  Database,
  BookOpen,
  User,
  Settings,
  LogIn,
  UserPlus,
  Info,
  Presentation,
  Shield,
  Map,
} from 'lucide-react';

export interface SitemapPage {
  path: string;
  title: string;
  description: string;
  icon: string;
  keywords: string[];
  isProtected?: boolean;
}

export interface SitemapCategory {
  category: string;
  pages: SitemapPage[];
}

// Icon mapping for dynamic import
export const iconMap: Record<string, LucideIcon> = {
  Home,
  LayoutDashboard,
  Telescope,
  Database,
  BookOpen,
  User,
  Settings,
  LogIn,
  UserPlus,
  Info,
  Presentation,
  Shield,
  Map,
};

export const sitemapData: SitemapCategory[] = [
  {
    category: 'Main',
    pages: [
      {
        path: '/',
        title: 'Home',
        description: 'Discover exoplanets with AI-powered analysis and exploration tools',
        icon: 'Home',
        keywords: ['home', 'landing', 'main', 'start', 'welcome'],
      },
      {
        path: '/dashboard',
        title: 'Dashboard',
        description: 'Your personal discovery hub with analytics and insights',
        icon: 'LayoutDashboard',
        keywords: ['dashboard', 'overview', 'hub', 'analytics', 'insights'],
        isProtected: true,
      },
      {
        path: '/about',
        title: 'About',
        description: 'Learn about ExoHunter AI and our mission',
        icon: 'Info',
        keywords: ['about', 'mission', 'team', 'info', 'vision'],
      },
      {
        path: '/presentation',
        title: 'Presentation',
        description: 'NASA Space Apps Challenge 2025 project presentation',
        icon: 'Presentation',
        keywords: ['presentation', 'nasa', 'space apps', 'challenge', 'slides'],
      },
    ],
  },
  {
    category: 'Features',
    pages: [
      {
        path: '/explorer',
        title: 'AI Explorer',
        description: 'Explore exoplanets with advanced AI-powered visualization',
        icon: 'Telescope',
        keywords: ['explorer', 'ai', 'telescope', 'planets', 'visualization', '3d'],
      },
      {
        path: '/analyzer',
        title: 'Advanced Analyzer',
        description: 'Analyze light curves and detect exoplanets using machine learning',
        icon: 'Database',
        keywords: ['analyzer', 'analysis', 'ml', 'machine learning', 'detection', 'light curves'],
        isProtected: true,
      },
      {
        path: '/discoveries',
        title: 'Discoveries',
        description: 'Browse confirmed exoplanet discoveries and data',
        icon: 'Database',
        keywords: ['discoveries', 'exoplanets', 'data', 'catalog', 'confirmed'],
      },
      {
        path: '/learn',
        title: 'Learn',
        description: 'Educational resources about exoplanets and detection methods',
        icon: 'BookOpen',
        keywords: ['learn', 'education', 'tutorial', 'resources', 'knowledge'],
      },
    ],
  },
  {
    category: 'Account',
    pages: [
      {
        path: '/profile',
        title: 'Profile',
        description: 'Manage your profile and view your activity',
        icon: 'User',
        keywords: ['profile', 'account', 'user', 'activity', 'history'],
        isProtected: true,
      },
      {
        path: '/settings',
        title: 'Settings',
        description: 'Customize your experience and preferences',
        icon: 'Settings',
        keywords: ['settings', 'preferences', 'configuration', 'options'],
        isProtected: true,
      },
      {
        path: '/login',
        title: 'Login',
        description: 'Sign in to your ExoHunter AI account',
        icon: 'LogIn',
        keywords: ['login', 'signin', 'sign in', 'authenticate', 'access'],
      },
      {
        path: '/signup',
        title: 'Sign Up',
        description: 'Create a new ExoHunter AI account',
        icon: 'UserPlus',
        keywords: ['signup', 'sign up', 'register', 'create account', 'join'],
      },
    ],
  },
  {
    category: 'Legal & Support',
    pages: [
      {
        path: '/privacy',
        title: 'Privacy Policy',
        description: 'How we collect, use, and protect your data',
        icon: 'Shield',
        keywords: ['privacy', 'policy', 'data protection', 'gdpr', 'security'],
      },
      {
        path: '/sitemap',
        title: 'Sitemap',
        description: 'Navigate all pages and features of ExoHunter AI',
        icon: 'Map',
        keywords: ['sitemap', 'navigation', 'pages', 'all pages', 'site structure'],
      },
    ],
  },
];
