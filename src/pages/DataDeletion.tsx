import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle, CheckCircle, Mail, Shield, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DataDeletion() {
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    dataTypes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Data Deletion Request - ExoHunter AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Request deletion of your personal data from ExoHunter AI. Learn about our data deletion process and GDPR rights.');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link for data deletion request
    const mailtoLink = `mailto:aoneahsan@gmail.com?subject=${encodeURIComponent('Data Deletion Request - ExoHunter AI')}&body=${encodeURIComponent(
      `Email: ${formData.email}\n\nReason for deletion:\n${formData.reason}\n\nData types to delete:\n${formData.dataTypes}\n\nI request the deletion of my personal data from ExoHunter AI as per GDPR Article 17 (Right to Erasure).`
    )}`;

    window.location.href = mailtoLink;
    setSubmitted(true);

    setTimeout(() => {
      setFormData({ email: '', reason: '', dataTypes: '' });
      setSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <Trash2 className="text-purple-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">Data Deletion Request</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Request the deletion of your personal data from ExoHunter AI. We respect your privacy rights.
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-yellow-900/20 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Important Information</h3>
                  <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                    <li>Data deletion is permanent and cannot be undone</li>
                    <li>You will lose access to all your discoveries and analysis history</li>
                    <li>Some anonymized data may be retained for scientific research</li>
                    <li>Legal requirements may require us to retain certain data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What Gets Deleted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Info className="mr-2 text-purple-400" size={24} />
                What Data Will Be Deleted
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Account credentials (email, password)</li>
                  <li>Profile information (name, display name, profile picture)</li>
                  <li>Contact information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">User-Generated Content</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Exoplanet discoveries and submissions</li>
                  <li>Saved searches and favorites</li>
                  <li>Analysis history and results</li>
                  <li>Comments and community contributions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Activity Data</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Usage logs and session data</li>
                  <li>Analytics events linked to your account</li>
                  <li>Device information and IP addresses</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What Gets Retained */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 text-purple-400" size={24} />
                What May Be Retained
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>The following data may be retained even after deletion:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Anonymized Research Data:</strong> Exoplanet discoveries may be retained in anonymized form for scientific research purposes
                </li>
                <li>
                  <strong className="text-white">Legal Compliance:</strong> Data required for legal compliance, fraud prevention, or security purposes (typically 90 days)
                </li>
                <li>
                  <strong className="text-white">Backup Systems:</strong> Data in backup systems will be deleted within 90 days of your request
                </li>
                <li>
                  <strong className="text-white">Aggregated Analytics:</strong> Anonymized, aggregated statistical data that cannot identify you
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deletion Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="mr-2 text-purple-400" size={24} />
                Deletion Process Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Submit Request</h3>
                    <p className="text-gray-300 text-sm">Fill out the form below to submit your data deletion request</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Verification (1-2 business days)</h3>
                    <p className="text-gray-300 text-sm">We'll verify your identity to ensure account security</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Processing (3-5 business days)</h3>
                    <p className="text-gray-300 text-sm">Your data will be permanently deleted from our active systems</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Confirmation</h3>
                    <p className="text-gray-300 text-sm">You'll receive an email confirmation once deletion is complete</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Backup Cleanup (up to 90 days)</h3>
                    <p className="text-gray-300 text-sm">Data in backup systems will be removed during the next backup cycle</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="mr-2 text-purple-400" size={24} />
                Submit Deletion Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="text-green-400 mx-auto mb-4" size={64} />
                  <h3 className="text-white text-xl font-bold mb-2">Request Submitted!</h3>
                  <p className="text-gray-300 mb-4">
                    Your email client should open with the deletion request. Please send the email to complete your request.
                  </p>
                  <p className="text-gray-400 text-sm">
                    We'll verify your identity and process your request within 3-5 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address (associated with your account)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason" className="text-gray-300">
                      Reason for Deletion (optional)
                    </Label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Help us improve by sharing why you're leaving..."
                      className="mt-1 w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataTypes" className="text-gray-300">
                      Specific Data to Delete (optional)
                    </Label>
                    <textarea
                      id="dataTypes"
                      name="dataTypes"
                      value={formData.dataTypes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Leave blank to delete all data, or specify particular data types..."
                      className="mt-1 w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                    />
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-md p-4">
                    <p className="text-gray-300 text-sm">
                      By submitting this request, you confirm that you are the owner of this account and understand that data deletion is permanent and irreversible.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Submit Deletion Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Alternative Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-lg mb-4">Alternative Options</h3>
              <p className="text-gray-300 mb-4">
                Before requesting complete deletion, consider these alternatives:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Deactivate Account</h4>
                    <p className="text-gray-400 text-sm">Temporarily disable your account without deleting data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Download Your Data</h4>
                    <p className="text-gray-400 text-sm">Export your discoveries and analysis before deletion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Update Privacy Settings</h4>
                    <p className="text-gray-400 text-sm">Control what data is collected and how it's used</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-white font-bold text-lg mb-4">Questions About Data Deletion?</h3>
              <p className="text-gray-300 mb-4">
                If you have questions or concerns about the data deletion process, contact us:
              </p>
              <div className="text-gray-300 space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:aoneahsan@gmail.com" className="text-purple-400 hover:underline">aoneahsan@gmail.com</a></p>
                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/923046619706" className="text-purple-400 hover:underline">+92 304 661 9706</a></p>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Review our <a href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</a> for more information about data handling.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
