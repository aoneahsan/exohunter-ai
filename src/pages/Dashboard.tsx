import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Target, 
  TrendingUp, 
  Star, 
  Activity, 
  Calendar,
  Play,
  Search,
  BookOpen,
  Users,
  Award,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const weeklyData = [
  { day: 'Mon', detections: 3, accuracy: 92 },
  { day: 'Tue', detections: 5, accuracy: 88 },
  { day: 'Wed', detections: 2, accuracy: 95 },
  { day: 'Thu', detections: 7, accuracy: 91 },
  { day: 'Fri', detections: 4, accuracy: 94 },
  { day: 'Sat', detections: 8, accuracy: 89 },
  { day: 'Sun', detections: 6, accuracy: 93 }
];

const recentActivities = [
  {
    id: 1,
    type: 'detection',
    description: 'Discovered potential exoplanet in Kepler-442 system',
    confidence: 0.94,
    timestamp: '2 hours ago',
    icon: Star
  },
  {
    id: 2,
    type: 'achievement',
    description: 'Earned "Transit Hunter" badge',
    timestamp: '1 day ago',
    icon: Award
  },
  {
    id: 3,
    type: 'vote',
    description: 'Your discovery in TRAPPIST-1 system was confirmed',
    timestamp: '2 days ago',
    icon: Trophy
  },
  {
    id: 4,
    type: 'comment',
    description: 'Dr. Sarah Chen commented on your HD 209458b analysis',
    timestamp: '3 days ago',
    icon: Users
  },
  {
    id: 5,
    type: 'detection',
    description: 'Analyzed light curve data for TOI-715',
    confidence: 0.76,
    timestamp: '4 days ago',
    icon: Search
  }
];

const quickActions = [
  {
    title: 'Start Analysis',
    description: 'Analyze new light curve data',
    icon: Play,
    color: 'bg-purple-600',
    link: '/explorer'
  },
  {
    title: 'Browse Discoveries',
    description: 'Explore recent findings',
    icon: Search,
    color: 'bg-blue-600',
    link: '/discoveries'
  },
  {
    title: 'Learn & Practice',
    description: 'Improve your skills',
    icon: BookOpen,
    color: 'bg-green-600',
    link: '/learn'
  },
  {
    title: 'Community',
    description: 'Connect with astronomers',
    icon: Users,
    color: 'bg-orange-600',
    link: '/community'
  }
];

export default function Dashboard() {
  const { userProfile, currentUser } = useAuth();

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <User size={48} className="mx-auto mb-4 opacity-50" />
          <p>Please log in to view your dashboard</p>
        </div>
      </div>
    );
  }

  const stats = userProfile.stats;
  const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Good {timeOfDay}, {userProfile.displayName}! 🌟
              </h1>
              <p className="text-gray-300">
                Ready to explore the cosmos and discover new worlds today?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-purple-400 text-sm">Current Rank</div>
                <div className="text-white font-bold text-lg">{stats.rank}</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Detections</p>
                  <p className="text-3xl font-bold text-white">{stats.detectionsCount}</p>
                  <p className="text-green-400 text-xs mt-1">+2 this week</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded-full">
                  <Star className="text-purple-400" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Accuracy Score</p>
                  <p className="text-3xl font-bold text-white">{stats.accuracyScore}%</p>
                  <p className="text-green-400 text-xs mt-1">+3% this month</p>
                </div>
                <div className="bg-green-600/20 p-3 rounded-full">
                  <Target className="text-green-400" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Points</p>
                  <p className="text-3xl font-bold text-white">{stats.contributionPoints.toLocaleString()}</p>
                  <p className="text-blue-400 text-xs mt-1">+150 today</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded-full">
                  <Zap className="text-blue-400" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Global Rank</p>
                  <p className="text-3xl font-bold text-white">#247</p>
                  <p className="text-orange-400 text-xs mt-1">↑ 12 positions</p>
                </div>
                <div className="bg-orange-600/20 p-3 rounded-full">
                  <Trophy className="text-orange-400" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2" size={20} />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                        <action.icon size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{action.title}</div>
                        <div className="text-gray-400 text-xs">{action.description}</div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  Weekly Detection Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="detections" 
                        fill="#8B5CF6" 
                        radius={[4, 4, 0, 0]}
                        name="Detections"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="mr-2" size={20} />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all"
                  >
                    <div className="bg-purple-600/20 p-2 rounded-full">
                      <activity.icon size={16} className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.description}</p>
                      {activity.confidence && (
                        <p className="text-green-400 text-xs">
                          Confidence: {(activity.confidence * 100).toFixed(1)}%
                        </p>
                      )}
                      <div className="flex items-center mt-1 text-gray-400 text-xs">
                        <Clock size={12} className="mr-1" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="mr-2" size={20} />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'First Discovery', icon: '🌟', unlocked: true },
                  { name: 'Transit Hunter', icon: '🎯', unlocked: true },
                  { name: 'Accuracy Master', icon: '🏆', unlocked: true },
                  { name: 'Habitable Zone', icon: '🌍', unlocked: false, progress: 60 }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                        : 'bg-slate-700/30 border border-slate-600/30'
                    }`}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className={`text-sm font-medium ${
                      achievement.unlocked ? 'text-white' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </div>
                    {!achievement.unlocked && achievement.progress && (
                      <div className="mt-2">
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{achievement.progress}%</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/profile">
                  <Button 
                    variant="outline" 
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    View All Achievements
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}