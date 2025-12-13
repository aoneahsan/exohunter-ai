import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Info, Settings, Shield, ToggleLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiePolicy() {
  useEffect(() => {
    document.title = 'Cookie Policy - ExoHunter AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Cookie Policy for ExoHunter AI - Learn about how we use cookies and similar technologies on our exoplanet discovery platform.');
    }
  }, []);

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
            <Cookie className="text-purple-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">Cookie Policy</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn about how ExoHunter AI uses cookies and similar technologies to enhance your experience.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last Updated: December 13, 2025
          </p>
        </motion.div>

        {/* What Are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Info className="mr-2 text-purple-400" size={24} />
                What Are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember your actions and preferences over time.
              </p>
              <p>
                ExoHunter AI uses cookies and similar technologies (like local storage and session storage) to provide a better user experience, analyze usage patterns, and improve our platform.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Types of Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Cookie className="mr-2 text-purple-400" size={24} />
                Types of Cookies We Use
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs mr-2">ESSENTIAL</span>
                  1. Strictly Necessary Cookies
                </h3>
                <p className="mb-2">
                  These cookies are essential for the website to function properly. They enable core functionality such as security, authentication, and accessibility.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Authentication tokens (Firebase Auth)</li>
                  <li>Session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>
                <p className="text-sm text-yellow-400 mt-2">
                  These cookies cannot be disabled as the platform will not work without them.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs mr-2">FUNCTIONAL</span>
                  2. Functional Cookies
                </h3>
                <p className="mb-2">
                  These cookies allow the website to remember choices you make and provide enhanced features.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Language preferences</li>
                  <li>Display settings (dark mode, theme)</li>
                  <li>User preferences and settings</li>
                  <li>Recently viewed exoplanets</li>
                  <li>Saved filters and search criteria</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs mr-2">ANALYTICS</span>
                  3. Analytics Cookies
                </h3>
                <p className="mb-2">
                  These cookies help us understand how visitors interact with our platform by collecting and reporting information.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Firebase Analytics - user behavior and feature usage</li>
                  <li>Amplitude - product analytics and user journeys</li>
                  <li>Microsoft Clarity - session recordings and heatmaps</li>
                  <li>Page views and navigation patterns</li>
                  <li>Performance metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <span className="bg-orange-600/20 text-orange-400 px-2 py-1 rounded text-xs mr-2">MARKETING</span>
                  4. Marketing Cookies (Currently Not Used)
                </h3>
                <p>
                  We do not currently use marketing or advertising cookies. If this changes in the future, we will update this policy and obtain your consent.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We use third-party services that may set cookies on your device. These services help us provide, analyze, and improve ExoHunter AI.
              </p>

              <div>
                <h3 className="text-white font-semibold mb-2">Firebase (Google)</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Authentication and user management</li>
                  <li>Cloud storage and database</li>
                  <li>Analytics and crash reporting</li>
                  <li>Performance monitoring</li>
                </ul>
                <p className="text-sm text-gray-400 mt-1">
                  Learn more: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google Cookies Policy</a>
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Amplitude</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Product analytics</li>
                  <li>User behavior tracking</li>
                  <li>Feature usage analysis</li>
                </ul>
                <p className="text-sm text-gray-400 mt-1">
                  Learn more: <a href="https://amplitude.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Amplitude Privacy</a>
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Microsoft Clarity</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Session recordings (anonymized)</li>
                  <li>Heatmaps and click tracking</li>
                  <li>User experience insights</li>
                </ul>
                <p className="text-sm text-gray-400 mt-1">
                  Learn more: <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Microsoft Privacy</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How We Use Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="mr-2 text-purple-400" size={24} />
                How We Use Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Authentication:</strong> Keep you logged in and secure your session</li>
                <li><strong className="text-white">Preferences:</strong> Remember your settings and customization choices</li>
                <li><strong className="text-white">Analytics:</strong> Understand how you use the platform and identify areas for improvement</li>
                <li><strong className="text-white">Performance:</strong> Monitor system performance and optimize loading times</li>
                <li><strong className="text-white">Security:</strong> Detect and prevent fraudulent activity and security threats</li>
                <li><strong className="text-white">Features:</strong> Enable interactive features like saved discoveries and personalized content</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cookie Duration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Cookie Duration</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Session Cookies</h3>
                <p>
                  These cookies are temporary and are deleted when you close your browser. They help maintain your session and navigation state.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Persistent Cookies</h3>
                <p>
                  These cookies remain on your device for a set period or until you delete them. They help remember your preferences and improve your experience on return visits.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Authentication tokens: Up to 30 days</li>
                  <li>User preferences: Up to 1 year</li>
                  <li>Analytics cookies: Up to 26 months</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ToggleLeft className="mr-2 text-purple-400" size={24} />
                Managing Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Browser Settings</h3>
                <p className="mb-2">
                  You can control and delete cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>View what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific websites</li>
                  <li>Delete all cookies when you close your browser</li>
                  <li>Block all cookies (not recommended as it may break functionality)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Browser-Specific Instructions</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-md p-4">
                <h3 className="text-white font-semibold mb-2">Platform Settings</h3>
                <p className="mb-2">
                  You can manage some preferences directly in ExoHunter AI:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Visit your Settings page to control analytics preferences</li>
                  <li>Disable non-essential features that use cookies</li>
                  <li>Clear your local data and cache</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact of Disabling Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card className="bg-yellow-900/20 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Impact of Disabling Cookies</h3>
                  <p className="text-gray-300 mb-2">
                    If you disable cookies, certain features of ExoHunter AI may not function properly:
                  </p>
                  <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside ml-4">
                    <li>You may not be able to log in or stay logged in</li>
                    <li>Your preferences and settings will not be saved</li>
                    <li>Some interactive features may not work</li>
                    <li>Your experience may not be personalized</li>
                    <li>We won't be able to improve the platform based on usage data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Do Not Track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 text-purple-400" size={24} />
                Do Not Track (DNT)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activity tracked.
              </p>
              <p>
                Currently, there is no industry standard for how to respond to DNT signals. We continue to monitor developments in this area and may update our practices in the future.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Updates to Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Changes to This Cookie Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or legal requirements.
              </p>
              <p>
                We will notify you of any significant changes by:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Updating the "Last Updated" date at the top of this page</li>
                <li>Posting a notice on our platform</li>
                <li>Sending you an email notification (for material changes)</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardContent className="p-8 text-center">
              <Cookie className="text-purple-400 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-4">Questions About Cookies?</h2>
              <p className="text-gray-300 mb-6">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="text-gray-300 space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:aoneahsan@gmail.com" className="text-purple-400 hover:underline">aoneahsan@gmail.com</a></p>
                <p><strong className="text-white">Developer:</strong> Ahsan Mahmood</p>
                <p><strong className="text-white">Website:</strong> <a href="https://exohunter-ai.web.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://exohunter-ai.web.app/</a></p>
              </div>
              <p className="text-gray-400 text-sm mt-6">
                For more information about how we handle your data, please read our <a href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
