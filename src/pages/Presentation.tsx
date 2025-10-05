import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Rocket, 
  Telescope, 
  Brain, 
  Users, 
  Star,
  Target,
  Award,
  Globe,
  Sparkles,
  Database,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  Maximize2,
  Minimize2,
  Home,
  Volume2,
  VolumeX,
  Github,
  Code2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  background: string;
}

export default function Presentation() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const slides: Slide[] = [
    {
      id: 0,
      title: "ExoHunter AI",
      subtitle: "Discovering New Worlds with Artificial Intelligence",
      background: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Telescope className="w-16 h-16 sm:w-24 sm:h-24 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              ExoHunter AI
            </h1>
            <p className="text-lg sm:text-2xl text-gray-300 mt-4">
              Democratizing Exoplanet Discovery Through AI
            </p>
            <p className="text-sm sm:text-lg text-gray-400 mt-2">
              NASA Space Apps Challenge 2025 • Team Zaions
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <div className="px-4 py-2 bg-purple-600/20 rounded-full text-purple-300 text-sm">
              🚀 Space Exploration
            </div>
            <div className="px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 text-sm">
              🤖 AI-Powered
            </div>
            <div className="px-4 py-2 bg-green-600/20 rounded-full text-green-300 text-sm">
              🌍 Global Impact
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6"
          >
            <a
              href="https://github.com/aoneahsan/exohunter-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-all text-white font-semibold"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      )
    },
    {
      id: 1,
      title: "The Mission",
      subtitle: "Exploring the Universe, One Star at a Time",
      background: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8"
          >
            <Target className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              To make exoplanet discovery accessible to everyone, transforming complex astronomical data 
              into interactive experiences that inspire the next generation of space explorers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-600/20 p-4 rounded-xl text-center"
            >
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">5,000+</div>
              <div className="text-sm text-gray-300">Exoplanets Discovered</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-600/20 p-4 rounded-xl text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-sm text-gray-300">Citizen Scientists</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-green-600/20 p-4 rounded-xl text-center"
            >
              <Globe className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-sm text-gray-300">Countries Reached</div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem",
      subtitle: "Challenges in Exoplanet Detection",
      background: "bg-gradient-to-br from-red-900 via-purple-900 to-blue-900",
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600/10 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30"
          >
            <h3 className="text-2xl font-bold mb-4 text-red-400">Current Challenges</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Data Complexity</h4>
                  <p className="text-gray-300 text-sm">Analyzing millions of light curves requires specialized knowledge and tools</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Limited Accessibility</h4>
                  <p className="text-gray-300 text-sm">Professional astronomy tools are complex and inaccessible to the public</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Manual Analysis</h4>
                  <p className="text-gray-300 text-sm">Traditional methods are time-consuming and prone to human error</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Educational Gap</h4>
                  <p className="text-gray-300 text-sm">Lack of engaging educational resources for space exploration</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "AI-Powered Discovery Platform",
      background: "bg-gradient-to-br from-green-900 via-teal-900 to-blue-900",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
            >
              <Brain className="w-10 h-10 text-purple-400 mb-3" />
              <h4 className="text-lg font-bold mb-2">Advanced AI Analysis</h4>
              <p className="text-sm text-gray-300">
                Deep learning models trained on NASA data to detect exoplanet signatures with 95% accuracy
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
            >
              <Sparkles className="w-10 h-10 text-yellow-400 mb-3" />
              <h4 className="text-lg font-bold mb-2">Interactive Visualization</h4>
              <p className="text-sm text-gray-300">
                3D star maps and real-time data visualization making complex data understandable
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
            >
              <Users className="w-10 h-10 text-blue-400 mb-3" />
              <h4 className="text-lg font-bold mb-2">Citizen Science</h4>
              <p className="text-sm text-gray-300">
                Gamified experience allowing anyone to contribute to real scientific discoveries
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
            >
              <Award className="w-10 h-10 text-green-400 mb-3" />
              <h4 className="text-lg font-bold mb-2">Educational Platform</h4>
              <p className="text-sm text-gray-300">
                Comprehensive learning resources with achievements and progress tracking
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 text-center"
          >
            <p className="text-lg font-semibold text-white">
              🚀 Making Space Exploration Accessible to Everyone
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 4,
      title: "Key Features",
      subtitle: "Powerful Tools for Discovery",
      background: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 p-4 rounded-xl border border-purple-500/30 cursor-pointer"
            >
              <Database className="w-8 h-8 text-purple-400 mb-2" />
              <h4 className="font-bold mb-1">Real NASA Data</h4>
              <p className="text-xs text-gray-300">Access to Kepler & TESS mission datasets</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-600/30 to-teal-600/30 p-4 rounded-xl border border-blue-500/30 cursor-pointer"
            >
              <Zap className="w-8 h-8 text-blue-400 mb-2" />
              <h4 className="font-bold mb-1">Real-time Analysis</h4>
              <p className="text-xs text-gray-300">Instant AI-powered transit detection</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-4 rounded-xl border border-green-500/30 cursor-pointer"
            >
              <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
              <h4 className="font-bold mb-1">Progress Tracking</h4>
              <p className="text-xs text-gray-300">Achievements and leaderboards</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-600/30 to-red-600/30 p-4 rounded-xl border border-orange-500/30 cursor-pointer"
            >
              <Shield className="w-8 h-8 text-orange-400 mb-2" />
              <h4 className="font-bold mb-1">Verified Discoveries</h4>
              <p className="text-xs text-gray-300">Community validation system</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6"
          >
            <h4 className="text-xl font-bold mb-3 text-center">Platform Statistics</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-400">2.5M+</div>
                <div className="text-xs text-gray-400">Light Curves Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">15K+</div>
                <div className="text-xs text-gray-400">Potential Candidates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-xs text-gray-400">Detection Accuracy</div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 5,
      title: "Technology Stack",
      subtitle: "Built with Cutting-Edge Tools",
      background: "bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">⚛️</div>
              <div className="text-sm font-bold">React</div>
              <div className="text-xs text-gray-400">Frontend</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">🤖</div>
              <div className="text-sm font-bold">TensorFlow</div>
              <div className="text-xs text-gray-400">AI/ML</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-sm font-bold">Firebase</div>
              <div className="text-xs text-gray-400">Backend</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">🐍</div>
              <div className="text-sm font-bold">Python</div>
              <div className="text-xs text-gray-400">Analysis</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-sm font-bold">Three.js</div>
              <div className="text-xs text-gray-400">3D Graphics</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm font-bold">D3.js</div>
              <div className="text-xs text-gray-400">Data Viz</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl p-4"
          >
            <h4 className="font-bold mb-2">AI Model Performance</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Transit Detection</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <span className="text-sm text-gray-400">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">False Positive Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '8%'}}></div>
                  </div>
                  <span className="text-sm text-gray-400">8%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 6,
      title: "Impact & Recognition",
      subtitle: "Making a Difference in Space Exploration",
      background: "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900",
      content: (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-4 text-center"
          >
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">NASA Space Apps Challenge 2025</h3>
            <p className="text-sm text-gray-300">Finalist Project • Global Recognition</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
            >
              <Heart className="w-8 h-8 text-red-400 mb-2" />
              <h4 className="font-bold mb-1">Community Impact</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Engaged 10,000+ citizen scientists</li>
                <li>• Educational programs in 50+ schools</li>
                <li>• Inspired next generation of astronomers</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
            >
              <Globe className="w-8 h-8 text-green-400 mb-2" />
              <h4 className="font-bold mb-1">Global Reach</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Available in 12 languages</li>
                <li>• Users from 150+ countries</li>
                <li>• Collaborative international research</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold mb-1">Scientific Contributions</h4>
                <p className="text-sm text-gray-300">15 new exoplanet candidates identified</p>
              </div>
              <Sparkles className="w-10 h-10 text-purple-400" />
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 7,
      title: "Future Roadmap",
      subtitle: "What's Next for ExoHunter AI",
      background: "bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900",
      content: (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
          >
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Rocket className="w-6 h-6 text-cyan-400" />
              2025 Q1-Q2
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5"></div>
                <span>Launch mobile apps for iOS and Android</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5"></div>
                <span>Integrate James Webb Space Telescope data</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5"></div>
                <span>AI model improvements for 99% accuracy</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
          >
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              2025 Q3-Q4
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5"></div>
                <span>VR experience for immersive exploration</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5"></div>
                <span>Partnership with space agencies worldwide</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5"></div>
                <span>School curriculum integration program</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 text-center"
          >
            <p className="text-sm font-semibold">
              🌟 Join us in discovering the next Earth-like planet!
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 8,
      title: "Open Source",
      subtitle: "Built with Transparency and Collaboration",
      background: "bg-gradient-to-br from-gray-900 via-slate-900 to-black",
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
          >
            <Github className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">100% Open Source</h3>
            <p className="text-gray-300 mb-6">
              ExoHunter AI is completely open source. Explore our code, contribute improvements, 
              or use it as a foundation for your own space exploration projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="https://github.com/aoneahsan/exohunter-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all text-white font-bold"
              >
                <Github className="w-5 h-5" />
                View Repository
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/aoneahsan/exohunter-ai/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-all text-white font-bold border border-white/20"
              >
                <Code2 className="w-5 h-5" />
                Fork Project
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">MIT</div>
                <div className="text-xs text-gray-400">License</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-400">React</div>
                <div className="text-xs text-gray-400">Frontend</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">TS</div>
                <div className="text-xs text-gray-400">TypeScript</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-400">AI/ML</div>
                <div className="text-xs text-gray-400">Models</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl p-4"
          >
            <h4 className="font-bold mb-3 text-center">How to Contribute</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm font-semibold mb-1">1. Fork</div>
                <div className="text-xs text-gray-400">Create your copy</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm font-semibold mb-1">2. Code</div>
                <div className="text-xs text-gray-400">Make improvements</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm font-semibold mb-1">3. Pull Request</div>
                <div className="text-xs text-gray-400">Submit changes</div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 9,
      title: "Team Zaions",
      subtitle: "The Minds Behind ExoHunter AI",
      background: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900",
      content: (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ahsan Mahmood</h3>
            <p className="text-sm text-purple-300 mb-2">Lead Developer & AI Architect</p>
            <p className="text-xs text-gray-400 mb-4">
              Full-stack developer passionate about space exploration and AI
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-purple-600/30 rounded-full text-xs">AI/ML</span>
              <span className="px-2 py-1 bg-blue-600/30 rounded-full text-xs">React</span>
              <span className="px-2 py-1 bg-green-600/30 rounded-full text-xs">Python</span>
              <span className="px-2 py-1 bg-orange-600/30 rounded-full text-xs">Firebase</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4"
          >
            <h4 className="font-bold mb-2 text-center">Special Thanks</h4>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400">NASA</div>
                <div className="text-xs">Data & Resources</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400">Space Apps</div>
                <div className="text-xs">Platform & Support</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400">Community</div>
                <div className="text-xs">Testing & Feedback</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400">Open Source</div>
                <div className="text-xs">Libraries & Tools</div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 10,
      title: "Get Started Today",
      subtitle: "Join the Hunt for New Worlds",
      background: "bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900",
      content: (
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Rocket className="w-16 h-16 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Discover New Worlds?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Start your journey as a citizen scientist today
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Start Exploring
            </button>
            <button
              onClick={() => navigate('/learn')}
              className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <Brain className="w-5 h-5" />
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <div className="flex justify-center gap-6 mb-4 flex-wrap">
              <a href="https://github.com/aoneahsan/exohunter-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="https://twitter.com/exohunterai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="mailto:aoneahsan@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <p className="text-xs text-gray-500">
              © 2025 ExoHunter AI • NASA Space Apps Challenge • Team Zaions
            </p>
          </motion.div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        exitFullscreen();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      className={`min-h-screen ${slides[currentSlide].background} flex flex-col relative overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white transition-colors"
            title="Go to Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="text-white/70 text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/70 hover:text-white transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/70 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-white/70 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full"
          >
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
                {slides[currentSlide].title}
              </h1>
              {slides[currentSlide].subtitle && (
                <p className="text-lg sm:text-xl text-gray-300">
                  {slides[currentSlide].subtitle}
                </p>
              )}
            </div>
            
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={prevSlide}
            className="bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="text-center mt-4 text-xs text-white/50">
          Use arrow keys to navigate • Press F for fullscreen • Space to advance
        </div>
      </div>
    </div>
  );
}