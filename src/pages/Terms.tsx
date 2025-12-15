import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service - ExoHunter AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for ExoHunter AI - Understand the terms and conditions for using our exoplanet discovery platform.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-slate-800/50"
            >
              <ArrowLeft className="mr-2" size={18} />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Scale className="text-purple-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using ExoHunter AI. By accessing or using our platform, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last Updated: December 13, 2025
          </p>
        </motion.div>

        {/* Agreement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="mr-2 text-purple-400" size={24} />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                By accessing and using ExoHunter AI ("the Platform", "we", "us", or "our"), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Platform.
              </p>
              <p>
                These terms apply to all users, including visitors, registered users, and contributors.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Description of Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 text-purple-400" size={24} />
                Description of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                ExoHunter AI is an AI-powered platform for exoplanet discovery and analysis. We provide:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI-based light curve analysis for exoplanet detection</li>
                <li>Access to NASA's exoplanet datasets (TESS, Kepler)</li>
                <li>Advanced analytics and visualization tools</li>
                <li>Community discovery platform for citizen scientists</li>
                <li>Educational resources about exoplanets and astronomy</li>
                <li>Personal dashboard for tracking discoveries and analysis</li>
              </ul>
              <p className="text-sm text-yellow-400 mt-4">
                The Platform is provided for educational and research purposes. Results should not be considered official scientific findings without proper peer review.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">User Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>To access certain features, you may need to create an account. You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share your account credentials with others</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activities.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="mr-2 text-green-400" size={24} />
                Acceptable Use
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>When using ExoHunter AI, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Platform only for lawful purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Not interfere with or disrupt the Platform's operation</li>
                <li>Not attempt to gain unauthorized access to any systems</li>
                <li>Not upload malicious code, viruses, or harmful content</li>
                <li>Not impersonate others or misrepresent your affiliation</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Be respectful and professional in community interactions</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Prohibited Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <XCircle className="mr-2 text-red-400" size={24} />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Automated scraping or data mining without permission</li>
                <li>Reverse engineering or decompiling the Platform</li>
                <li>Creating fake accounts or automated bots</li>
                <li>Spamming, phishing, or fraudulent activities</li>
                <li>Harassment, abuse, or threatening behavior</li>
                <li>Posting false or misleading information</li>
                <li>Commercial use without authorization</li>
                <li>Circumventing security measures or access controls</li>
              </ul>
              <p className="text-yellow-400">
                Violation of these prohibitions may result in immediate account termination and legal action.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Our Content</h3>
                <p>
                  ExoHunter AI and its original content, features, and functionality are owned by Ahsan Mahmood and are protected by international copyright, trademark, and other intellectual property laws. The Platform is open source under the MIT License.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">User-Generated Content</h3>
                <p>
                  When you submit discoveries, comments, or other content to the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content for scientific research and Platform operation.
                </p>
                <p className="text-sm mt-2">
                  You retain ownership of your contributions and can request their removal at any time.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">NASA Data</h3>
                <p>
                  Exoplanet data provided through this Platform is sourced from NASA and other public astronomical databases. This data is available for public use under their respective licenses and terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 text-yellow-400" size={24} />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Educational Purpose</h3>
                <p>
                  ExoHunter AI is designed for educational and citizen science purposes. While our AI models are trained on real astronomical data, results should be considered preliminary findings and not official scientific discoveries.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">No Warranty</h3>
                <p>
                  THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Uninterrupted or error-free operation</li>
                  <li>Accuracy or reliability of results</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Security of data transmission</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Accuracy of Information</h3>
                <p>
                  While we strive for accuracy, we cannot guarantee that all information on the Platform is complete, current, or error-free. AI predictions may contain false positives or false negatives.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liability Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ExoHunter AI, ITS DEVELOPERS, AND AFFILIATES SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or goodwill</li>
                <li>Service interruptions or data loss</li>
                <li>Errors or inaccuracies in Platform content</li>
                <li>Unauthorized access to your account or data</li>
                <li>Third-party actions or content</li>
              </ul>
              <p className="text-sm mt-4">
                Our total liability shall not exceed the amount you paid (if any) for using the Platform in the past 12 months.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Third-Party Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Links and Services</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                The Platform may contain links to third-party websites, services, or resources (including NASA databases, astronomical tools, and research papers).
              </p>
              <p>
                We are not responsible for the content, accuracy, or practices of third-party sites. Your use of third-party services is at your own risk and subject to their terms and privacy policies.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Termination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Termination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                We reserve the right to suspend or terminate your access to the Platform at any time, with or without notice, for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Prolonged inactivity (over 24 months)</li>
                <li>At our sole discretion</li>
              </ul>
              <p>
                Upon termination, your right to use the Platform will immediately cease. You may request data export before account deletion.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <RefreshCw className="mr-2 text-purple-400" size={24} />
                Modifications to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page.
              </p>
              <p>
                Material changes will be communicated via:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email notification to registered users</li>
                <li>Prominent notice on the Platform</li>
                <li>Updated "Last Updated" date</li>
              </ul>
              <p>
                Your continued use of the Platform after changes constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Platform shall be resolved through:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Good faith negotiation between parties</li>
                <li>Mediation, if negotiation fails</li>
                <li>Binding arbitration or legal proceedings in Pakistan</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardContent className="p-8 text-center">
              <FileText className="text-purple-400 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions or concerns about these Terms of Service, please contact us:
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
