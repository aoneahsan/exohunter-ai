import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Eye, UserCheck, FileText, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy - ExoHunter AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for ExoHunter AI - Learn how we collect, use, and protect your data in our exoplanet discovery platform.');
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
            <Shield className="text-purple-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy outlines how ExoHunter AI collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last Updated: December 13, 2025
          </p>
        </motion.div>

        {/* Quick Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <Lock className="text-green-400 mx-auto mb-2" size={32} />
                  <h3 className="text-white font-semibold mb-1">Secure</h3>
                  <p className="text-gray-400 text-sm">Your data is encrypted and protected</p>
                </div>
                <div className="text-center p-4">
                  <Eye className="text-blue-400 mx-auto mb-2" size={32} />
                  <h3 className="text-white font-semibold mb-1">Transparent</h3>
                  <p className="text-gray-400 text-sm">We clearly explain our practices</p>
                </div>
                <div className="text-center p-4">
                  <UserCheck className="text-purple-400 mx-auto mb-2" size={32} />
                  <h3 className="text-white font-semibold mb-1">Your Rights</h3>
                  <p className="text-gray-400 text-sm">You control your personal data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="mr-2 text-purple-400" size={24} />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Account Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address (for authentication)</li>
                  <li>Display name (optional)</li>
                  <li>Profile picture (optional)</li>
                  <li>Account creation date</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Usage Data</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Pages visited and features used</li>
                  <li>Time spent on the platform</li>
                  <li>Device information (type, OS, browser)</li>
                  <li>IP address and location (approximate)</li>
                  <li>Click events and user interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Exoplanet Analysis Data</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Light curve data you analyze</li>
                  <li>Your exoplanet discovery submissions</li>
                  <li>Analysis results and predictions</li>
                  <li>Saved searches and favorites</li>
                  <li>Community contributions and comments</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Analytics Data</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Session recordings (anonymized)</li>
                  <li>Heatmaps and user behavior patterns</li>
                  <li>Performance metrics</li>
                  <li>Error logs and crash reports</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How We Use Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 text-purple-400" size={24} />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Provide Services:</strong> To operate, maintain, and improve ExoHunter AI features</li>
                <li><strong className="text-white">Personalization:</strong> To customize your experience and provide relevant content</li>
                <li><strong className="text-white">Analytics:</strong> To understand how users interact with our platform and improve usability</li>
                <li><strong className="text-white">Communication:</strong> To send important updates, notifications, and newsletters (opt-in)</li>
                <li><strong className="text-white">Security:</strong> To detect, prevent, and address fraud, security issues, and abuse</li>
                <li><strong className="text-white">Research:</strong> To advance exoplanet detection algorithms (anonymized data only)</li>
                <li><strong className="text-white">Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Third-Party Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="mr-2 text-purple-400" size={24} />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We use the following third-party services that may collect information:</p>

              <div>
                <h3 className="text-white font-semibold mb-2">Firebase (Google)</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Authentication services</li>
                  <li>Cloud database (Firestore)</li>
                  <li>File storage</li>
                  <li>Analytics and crash reporting</li>
                </ul>
                <p className="text-sm text-gray-400 mt-1">
                  Privacy Policy: <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://firebase.google.com/support/privacy</a>
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Amplitude Analytics</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>User behavior analytics</li>
                  <li>Feature usage tracking</li>
                  <li>Conversion funnel analysis</li>
                </ul>
                <p className="text-sm text-gray-400 mt-1">
                  Privacy Policy: <a href="https://amplitude.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://amplitude.com/privacy</a>
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
                  Privacy Policy: <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://privacy.microsoft.com/privacystatement</a>
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">OneSignal</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Push notifications</li>
                  <li>In-app messaging</li>
                </ul>
                <p className="text-sm text-gray-400 mt-1">
                  Privacy Policy: <a href="https://onesignal.com/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://onesignal.com/privacy_policy</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Retention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="mr-2 text-purple-400" size={24} />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>We retain your information for as long as necessary to provide our services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Account Data:</strong> Retained until you delete your account</li>
                <li><strong className="text-white">Usage Analytics:</strong> Retained for up to 26 months</li>
                <li><strong className="text-white">Discovery Data:</strong> Retained indefinitely for scientific research (anonymized)</li>
                <li><strong className="text-white">Logs and Diagnostics:</strong> Retained for up to 90 days</li>
              </ul>
              <p className="text-sm text-purple-400 mt-4">
                You can request deletion of your data at any time through our <a href="/data-deletion" className="underline">Data Deletion</a> page.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Your Rights (GDPR) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <UserCheck className="mr-2 text-purple-400" size={24} />
                Your Rights (GDPR Compliant)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Under GDPR and other privacy laws, you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-white">Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong className="text-white">Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong className="text-white">Portability:</strong> Receive your data in a portable format</li>
                <li><strong className="text-white">Restriction:</strong> Limit how we use your data</li>
                <li><strong className="text-white">Object:</strong> Object to certain types of data processing</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Revoke consent for data collection at any time</li>
              </ul>
              <p className="text-sm mt-4">
                To exercise these rights, please contact us at <a href="mailto:aoneahsan@gmail.com" className="text-purple-400 hover:underline">aoneahsan@gmail.com</a>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="mr-2 text-purple-400" size={24} />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for data in transit (TLS/SSL)</li>
                <li>Encryption at rest for stored data</li>
                <li>Secure authentication (Firebase Auth)</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Automated backups and disaster recovery</li>
              </ul>
              <p className="text-sm text-yellow-400 mt-4">
                While we strive to protect your data, no method of transmission over the internet is 100% secure. Please use strong passwords and enable two-factor authentication.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Children's Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                ExoHunter AI is designed for educational purposes and is suitable for users of all ages. However, we do not knowingly collect personal information from children under 13 without parental consent.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information promptly.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Changes to Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
              </ul>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardContent className="p-8 text-center">
              <Mail className="text-purple-400 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-gray-300 space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:aoneahsan@gmail.com" className="text-purple-400 hover:underline">aoneahsan@gmail.com</a></p>
                <p><strong className="text-white">Developer:</strong> Ahsan Mahmood</p>
                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/923046619706" className="text-purple-400 hover:underline">+92 304 661 9706</a></p>
                <p><strong className="text-white">Website:</strong> <a href="https://exohunter-ai.web.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://exohunter-ai.web.app/</a></p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
