import React from 'react';
import { Link } from 'react-router-dom';
import { Telescope, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useAppVersion } from '@hooks/useCapacitor';
import { isNativePlatform } from '@services/capacitor';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { version } = useAppVersion();
  const isNative = isNativePlatform();

  return (
    <footer className="border-t border-space-700 bg-space-900/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Telescope className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold">ExoHunter AI</span>
            </div>
            <p className="text-sm text-gray-400">
              Democratizing exoplanet detection with AI-powered analysis.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/aoneahsan/exohunter-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                title="View Source Code on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/aoneahsan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:aoneahsan@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explorer" className="text-sm text-gray-400 hover:text-purple-400">
                  AI Explorer
                </Link>
              </li>
              <li>
                <Link to="/discoveries" className="text-sm text-gray-400 hover:text-purple-400">
                  Discoveries
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-sm text-gray-400 hover:text-purple-400">
                  Advanced Analyzer
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-sm text-gray-400 hover:text-purple-400">
                  Learn
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-purple-400">
                  About
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/aoneahsan/exohunter-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-purple-400"
                >
                  Source Code
                </a>
              </li>
              <li>
                <Link to="/presentation" className="text-sm text-gray-400 hover:text-purple-400">
                  Presentation
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.nasa.gov/exoplanets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-purple-400"
                >
                  NASA Exoplanets
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-purple-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-sm text-gray-400 hover:text-purple-400">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-purple-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-purple-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm text-gray-400 hover:text-purple-400">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/data-deletion" className="text-sm text-gray-400 hover:text-purple-400">
                  Data Deletion
                </Link>
              </li>
              <li>
                <Link to="/account-deletion" className="text-sm text-gray-400 hover:text-purple-400">
                  Delete Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-space-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm text-gray-400">
                © {currentYear} ExoHunter AI. All rights reserved.
              </p>
              {isNative && (
                <p className="text-xs text-gray-500">
                  {version}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-purple-400">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-purple-400">
                Terms
              </Link>
              <Link to="/cookie-policy" className="text-sm text-gray-400 hover:text-purple-400">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};