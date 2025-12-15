import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, MessageSquare, CheckCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - ExoHunter AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact ExoHunter AI - Get in touch with our team for support, inquiries, or collaboration opportunities.');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const mailtoLink = `mailto:aoneahsan@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
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
            <MessageSquare className="text-purple-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">Contact Us</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions, feedback, or want to collaborate? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Send className="mr-2 text-purple-400" size={24} />
                  Send us a Message
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
                    <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-300">Your email client should open. We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
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
                      <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What is this regarding?"
                        className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us what's on your mind..."
                        className="mt-1 w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Send className="mr-2" size={16} />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Developer Info */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Developer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <a
                      href="mailto:aoneahsan@gmail.com"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      aoneahsan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Phone / WhatsApp</h3>
                    <a
                      href="https://wa.me/923046619706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      +92 304 661 9706
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <a
                      href="https://zaions.com/address"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      View Address
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Website</h3>
                    <a
                      href="https://aoneahsan.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      aoneahsan.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://github.com/aoneahsan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Github className="text-purple-400" size={24} />
                    <div>
                      <h3 className="text-white font-semibold text-sm">GitHub</h3>
                      <p className="text-gray-400 text-xs">@aoneahsan</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/aoneahsan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Linkedin className="text-purple-400" size={24} />
                    <div>
                      <h3 className="text-white font-semibold text-sm">LinkedIn</h3>
                      <p className="text-gray-400 text-xs">@aoneahsan</p>
                    </div>
                  </a>

                  <a
                    href="https://npmjs.com/~aoneahsan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Globe className="text-purple-400" size={24} />
                    <div>
                      <h3 className="text-white font-semibold text-sm">NPM</h3>
                      <p className="text-gray-400 text-xs">~aoneahsan</p>
                    </div>
                  </a>

                  <a
                    href="https://aoneahsan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Globe className="text-purple-400" size={24} />
                    <div>
                      <h3 className="text-white font-semibold text-sm">Portfolio</h3>
                      <p className="text-gray-400 text-xs">aoneahsan.com</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-3">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  For technical support, bug reports, or feature requests, please check out:
                </p>
                <div className="space-y-2">
                  <a
                    href="https://github.com/aoneahsan/exohunter-ai/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-purple-400 hover:underline text-sm"
                  >
                    GitHub Issues - Report bugs or request features
                  </a>
                  <a
                    href="/about"
                    className="block text-purple-400 hover:underline text-sm"
                  >
                    About Page - Learn more about the project
                  </a>
                  <a
                    href="/privacy"
                    className="block text-purple-400 hover:underline text-sm"
                  >
                    Privacy Policy - Understand how we handle data
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-white font-bold text-xl mb-4">Response Time</h3>
                <p className="text-gray-300 mb-2">
                  We typically respond to inquiries within <strong className="text-purple-400">24-48 hours</strong> during business days.
                </p>
                <p className="text-gray-400 text-sm">
                  For urgent matters, please use WhatsApp for faster response.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
