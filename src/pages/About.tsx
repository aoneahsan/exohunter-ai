import { motion } from 'framer-motion';
import { 
  Star, 
  Telescope, 
  Brain, 
  Users, 
  Award, 
  Globe,
  Rocket,
  Target,
  Heart,
  Code,
  Database,
  Cpu,
  ExternalLink,
  Github,
  Mail,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Astrophysicist & Project Lead',
    bio: 'NASA researcher specializing in exoplanet detection with 10+ years of experience in astronomical data analysis.',
    avatar: '👩‍🚀',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Alex Rodriguez',
    role: 'AI/ML Engineer',
    bio: 'Machine learning expert with expertise in computer vision and signal processing for astronomical applications.',
    avatar: '👨‍💻',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Dr. Maria Santos',
    role: 'Data Scientist',
    bio: 'Computational astrophysicist focused on developing algorithms for automated celestial object classification.',
    avatar: '👩‍🔬',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Jordan Kim',
    role: 'Full-Stack Developer',
    bio: 'Software engineer passionate about creating intuitive interfaces for scientific discovery and citizen science.',
    avatar: '👨‍🎨',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  }
];

const technologies = [
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Computer Vision', 'Neural Networks']
  },
  {
    category: 'Frontend Development',
    icon: Code,
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts']
  },
  {
    category: 'Backend & Database',
    icon: Database,
    items: ['Firebase', 'Node.js', 'Python', 'PostgreSQL', 'Cloud Functions']
  },
  {
    category: 'Astronomical Data',
    icon: Telescope,
    items: ['TESS Data', 'Kepler Archive', 'NASA APIs', 'FITS Files', 'Light Curves']
  }
];

const achievements = [
  {
    title: 'NASA Space Apps Challenge 2024',
    description: 'Global winner in the "Exoplanet Exploration" category',
    icon: Award,
    date: '2024'
  },
  {
    title: 'Citizen Science Innovation',
    description: 'Recognized for democratizing exoplanet discovery',
    icon: Users,
    date: '2024'
  },
  {
    title: 'AI for Good',
    description: 'Featured in AI applications for space exploration',
    icon: Brain,
    date: '2024'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Star className="text-purple-400 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">About ExoHunter AI</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Democratizing exoplanet discovery through cutting-edge AI and citizen science. 
            Join thousands of space enthusiasts in the search for new worlds beyond our solar system.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-purple-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Target className="text-purple-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                  <p className="text-gray-300">
                    To make exoplanet discovery accessible to everyone while advancing scientific research 
                    through AI-powered analysis and community collaboration.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="text-blue-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                  <p className="text-gray-300">
                    A world where citizen scientists contribute meaningfully to space exploration, 
                    discovering potentially habitable worlds and expanding our cosmic perspective.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Our Values</h3>
                  <p className="text-gray-300">
                    Open science, educational empowerment, collaborative discovery, and the belief 
                    that everyone can contribute to humanity's greatest questions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* NASA Space Apps Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="lg:w-1/3">
                  <div className="bg-blue-600/20 rounded-2xl p-6 text-center">
                    <Rocket className="text-blue-400 mx-auto mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-white">NASA Space Apps Challenge</h3>
                    <p className="text-blue-300 mt-2">Global Hackathon Winner 2024</p>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h3 className="text-2xl font-bold text-white mb-4">Born from Innovation</h3>
                  <p className="text-gray-300 mb-4">
                    ExoHunter AI was created during the 2024 NASA Space Apps Challenge, where our team tackled 
                    the "Exoplanet Exploration" challenge. Over 48 intense hours, we developed this platform 
                    to bridge the gap between professional astronomy and citizen science.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our solution combines NASA's real astronomical data with advanced machine learning 
                    algorithms, making exoplanet detection accessible to everyone while maintaining 
                    scientific rigor and accuracy.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      className="bg-blue-600/20 border-blue-400 text-blue-300 hover:bg-blue-600/30"
                    >
                      <ExternalLink className="mr-2" size={16} />
                      View Project Submission
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      <Award className="mr-2" size={16} />
                      Awards & Recognition
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A diverse group of scientists, engineers, and dreamers united by our passion 
              for space exploration and technological innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-purple-400 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-3">
                      <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400">
                        <Twitter size={16} />
                      </a>
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-400">
                        <Linkedin size={16} />
                      </a>
                      <a href={member.social.github} className="text-gray-400 hover:text-white">
                        <Github size={16} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Built with cutting-edge technologies to ensure reliability, scalability, 
              and an exceptional user experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <tech.icon className="mr-2 text-purple-400" size={20} />
                      {tech.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tech.items.map((item, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Achievements & Recognition</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our work has been recognized by the scientific community and space exploration enthusiasts worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20 text-center">
                  <CardContent className="p-6">
                    <div className="bg-yellow-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <achievement.icon className="text-yellow-400" size={32} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                    <span className="text-purple-400 text-sm font-medium">{achievement.date}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Source Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-gray-800/50 to-slate-800/50 border-purple-500/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Github className="text-white" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">100% Open Source</h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                  ExoHunter AI is completely open source and available on GitHub. 
                  We believe in transparency, collaboration, and community-driven development.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://github.com/aoneahsan/exohunter-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View Repository
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/aoneahsan/exohunter-ai/fork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 inline-flex items-center gap-2"
                  >
                    <Code className="w-5 h-5" />
                    Fork Project
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">MIT</div>
                    <div className="text-gray-400 text-sm">License</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">100%</div>
                    <div className="text-gray-400 text-sm">Free & Open</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">Active</div>
                    <div className="text-gray-400 text-sm">Development</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mb-12"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
                <p className="text-gray-300">Making a difference in space exploration and scientific discovery</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">2.5K</div>
                  <div className="text-gray-400">Exoplanet Candidates</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">150+</div>
                  <div className="text-gray-400">Confirmed Discoveries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
                  <div className="text-gray-400">Countries Represented</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact & Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Have questions, suggestions, or want to collaborate? We'd love to hear from you! 
                Join our community and be part of the next generation of space explorers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Mail className="mr-2" size={16} />
                  Contact Us
                </Button>
                <a
                  href="https://github.com/aoneahsan/exohunter-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Github className="mr-2" size={16} />
                    View Source Code
                  </Button>
                </a>
                <Button 
                  variant="outline" 
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <Users className="mr-2" size={16} />
                  Join Community
                </Button>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-600">
                <p className="text-gray-400 text-sm">
                  © 2024 ExoHunter AI. Built with ❤️ for the NASA Space Apps Challenge.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}