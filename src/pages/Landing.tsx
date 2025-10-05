import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Telescope, 
  Brain, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  Star,
  Globe,
  BarChart3,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Landing: React.FC = () => {
  const [detectionCount, setDetectionCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [accuracyRate, setAccuracyRate] = useState(0);

  useEffect(() => {
    // Animate counters
    const detectionInterval = setInterval(() => {
      setDetectionCount(prev => prev < 15420 ? prev + 321 : 15420);
    }, 50);
    
    const userInterval = setInterval(() => {
      setUserCount(prev => prev < 2847 ? prev + 59 : 2847);
    }, 50);
    
    const accuracyInterval = setInterval(() => {
      setAccuracyRate(prev => prev < 94 ? prev + 2 : 94);
    }, 50);

    return () => {
      clearInterval(detectionInterval);
      clearInterval(userInterval);
      clearInterval(accuracyInterval);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced neural networks analyze light curves to identify potential exoplanets with high accuracy.',
      color: 'text-purple-500',
    },
    {
      icon: Telescope,
      title: 'Real NASA Data',
      description: 'Access authentic telescope data from Kepler, TESS, and other space missions.',
      color: 'text-blue-500',
    },
    {
      icon: BarChart3,
      title: 'Interactive Visualization',
      description: 'Explore data with dynamic charts, 3D orbital views, and comparative analysis tools.',
      color: 'text-green-500',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join citizen scientists worldwide in the quest to discover new worlds.',
      color: 'text-orange-500',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Get instant results with our cloud-based processing engine.',
      color: 'text-yellow-500',
    },
    {
      icon: Shield,
      title: 'Verified Results',
      description: 'Expert validation system ensures high-quality discoveries.',
      color: 'text-red-500',
    },
  ];

  const stats = [
    { label: 'Exoplanets Detected', value: detectionCount.toLocaleString(), icon: Globe },
    { label: 'Active Users', value: userCount.toLocaleString(), icon: Users },
    { label: 'Accuracy Rate', value: `${accuracyRate}%`, icon: TrendingUp },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-space-900 via-purple-900/20 to-space-900" />
        <div className="stars-background" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">Discover New Worlds</span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                with AI-Powered Detection
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
              Join the hunt for exoplanets using cutting-edge artificial intelligence.
              Analyze real telescope data and contribute to humanity's greatest exploration.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/explorer">
                <Button size="lg" className="gradient-primary gap-2 px-8">
                  <Telescope className="h-5 w-5" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  Learn How It Works
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-lg p-6">
                <stat.icon className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Powerful Features for Space Exploration
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Everything you need to become a citizen scientist and contribute to exoplanet discovery.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-space-700 bg-space-800/50 backdrop-blur hover:border-purple-500/50 transition-colors">
                  <CardHeader>
                    <feature.icon className={`h-10 w-10 ${feature.color} mb-2`} />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Three simple steps to start discovering exoplanets
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload or Select Data',
                description: 'Choose from sample datasets or upload your own telescope data in CSV or FITS format.',
                icon: Telescope,
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI analyzes light curves, identifying transit events and calculating planet parameters.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Share Discovery',
                description: 'Save your findings, earn points, and share with the global community of planet hunters.',
                icon: Sparkles,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass rounded-lg p-8">
                  <div className="mb-4 text-5xl font-bold text-purple-500/30">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-purple-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur">
            <CardContent className="p-12 text-center">
              <Star className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Find Your First Exoplanet?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of citizen scientists in the quest to discover new worlds.
                No experience required - our AI guides you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="gradient-primary gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/explorer">
                  <Button size="lg" variant="outline" className="gap-2">
                    Try Demo First
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <style>{`
        .stars-background {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, #eee, transparent),
            radial-gradient(1px 1px at 50px 50px, #eee, transparent),
            radial-gradient(1px 1px at 80px 10px, #eee, transparent),
            radial-gradient(2px 2px at 90px 40px, #eee, transparent),
            radial-gradient(1px 1px at 130px 80px, #eee, transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.1;
          animation: move 60s linear infinite;
        }
        
        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-200px, -200px);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;