import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Star, 
  Trophy, 
  Calendar,
  MapPin,
  Globe,
  Clock,
  Target,
  Award,
  Activity,
  TrendingUp,
  Eye,
  Settings,
  Share2,
  Download,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import type { Detection } from '@/types';

const progressData = [
  { month: 'Jan', detections: 5, accuracy: 85 },
  { month: 'Feb', detections: 8, accuracy: 88 },
  { month: 'Mar', detections: 12, accuracy: 91 },
  { month: 'Apr', detections: 15, accuracy: 89 },
  { month: 'May', detections: 18, accuracy: 93 },
  { month: 'Jun', detections: 22, accuracy: 95 }
];

const achievements = [
  {
    id: '1',
    name: 'First Discovery',
    description: 'Made your first exoplanet detection',
    icon: '🌟',
    unlocked: true,
    unlockedAt: '2024-01-15',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Transit Hunter',
    description: 'Detected 10 exoplanets using transit method',
    icon: '🎯',
    unlocked: true,
    unlockedAt: '2024-02-28',
    rarity: 'uncommon'
  },
  {
    id: '3',
    name: 'Accuracy Master',
    description: 'Maintained 90%+ accuracy for 30 days',
    icon: '🏆',
    unlocked: true,
    unlockedAt: '2024-03-20',
    rarity: 'rare'
  },
  {
    id: '4',
    name: 'Habitable Zone Hunter',
    description: 'Discovered 5 potentially habitable exoplanets',
    icon: '🌍',
    unlocked: true,
    unlockedAt: '2024-04-10',
    rarity: 'epic'
  },
  {
    id: '5',
    name: 'Community Star',
    description: 'Received 100 upvotes on discoveries',
    icon: '⭐',
    unlocked: true,
    unlockedAt: '2024-05-05',
    rarity: 'rare'
  },
  {
    id: '6',
    name: 'AI Collaborator',
    description: 'Successfully used AI analysis 50 times',
    icon: '🤖',
    unlocked: false,
    progress: 73,
    maxProgress: 100,
    rarity: 'uncommon'
  },
  {
    id: '7',
    name: 'Data Detective',
    description: 'Analyzed 1000 light curves',
    icon: '🔍',
    unlocked: false,
    progress: 650,
    maxProgress: 1000,
    rarity: 'common'
  },
  {
    id: '8',
    name: 'Legendary Explorer',
    description: 'Discovered 100 confirmed exoplanets',
    icon: '🚀',
    unlocked: false,
    progress: 23,
    maxProgress: 100,
    rarity: 'legendary'
  }
];

const recentDetections: Detection[] = [
  {
    id: '1',
    userId: 'current-user',
    timestamp: { seconds: Date.now() / 1000 - 3600 } as any,
    starData: {
      catalogId: 'TOI-715',
      name: 'TOI-715 b',
      constellation: 'Draco',
      magnitude: 12.3,
      distance: 137.4
    },
    analysis: {
      confidence: 0.94,
      method: 'transit',
      periodDays: 19.3,
      depth: 0.003,
      duration: 3.2,
      planetRadius: 1.55,
      habitableZone: true
    },
    status: 'confirmed',
    votes: 47,
    isPublic: true
  },
  {
    id: '2',
    userId: 'current-user',
    timestamp: { seconds: Date.now() / 1000 - 86400 } as any,
    starData: {
      catalogId: 'K2-315',
      name: 'K2-315b',
      constellation: 'Pisces',
      magnitude: 14.8,
      distance: 186.3
    },
    analysis: {
      confidence: 0.87,
      method: 'transit',
      periodDays: 3.14,
      depth: 0.008,
      duration: 2.1,
      planetRadius: 0.95,
      habitableZone: false
    },
    status: 'pending',
    votes: 23,
    isPublic: true
  }
];

export default function Profile() {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: userProfile?.displayName || '',
    bio: userProfile?.bio || '',
    location: '',
    website: ''
  });

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <User size={48} className="mx-auto mb-4 opacity-50" />
          <p>Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        displayName: editForm.displayName,
        bio: editForm.bio
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-400/10';
      case 'uncommon': return 'border-green-400 bg-green-400/10';
      case 'rare': return 'border-blue-400 bg-blue-400/10';
      case 'epic': return 'border-purple-400 bg-purple-400/10';
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getTimeSince = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.photoURL ? (
                      <img 
                        src={userProfile.photoURL} 
                        alt={userProfile.displayName}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      userProfile.displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-2">
                    <Star size={16} className="text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Display Name</Label>
                        <Input
                          value={editForm.displayName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Bio</Label>
                        <textarea
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white resize-none"
                          rows={3}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleSaveProfile}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-white">{userProfile.displayName}</h1>
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                          {userProfile.stats.rank}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">
                        {userProfile.bio || 'Space explorer searching for new worlds 🌟'}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          Joined {new Date(userProfile.joinedAt.seconds * 1000).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          {userProfile.email}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      <Edit3 className="mr-2" size={16} />
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      <Share2 className="mr-2" size={16} />
                      Share Profile
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{userProfile.stats.detectionsCount}</div>
                  <div className="text-gray-400 text-sm">Total Detections</div>
                  <div className="text-green-400 text-xs mt-1">+2 this week</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{userProfile.stats.accuracyScore}%</div>
                  <div className="text-gray-400 text-sm">Accuracy</div>
                  <div className="text-green-400 text-xs mt-1">+3% this month</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{userProfile.stats.contributionPoints.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Points</div>
                  <div className="text-blue-400 text-xs mt-1">+150 today</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">#247</div>
                  <div className="text-gray-400 text-sm">Global Rank</div>
                  <div className="text-orange-400 text-xs mt-1">↑ 12 positions</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  Progress Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="detections" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="Detections"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Accuracy %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Detections */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2" size={20} />
                  Recent Detections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDetections.map((detection, index) => (
                    <motion.div
                      key={detection.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Star className="text-purple-400" size={16} />
                          <div>
                            <div className="text-white font-medium">
                              {detection.starData.name || detection.starData.catalogId}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {detection.starData.constellation} • {getTimeSince(detection.timestamp.seconds)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">
                          {(detection.analysis.confidence * 100).toFixed(1)}%
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          detection.status === 'confirmed' ? 'bg-green-600/20 text-green-400' :
                          detection.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-red-600/20 text-red-400'
                        }`}>
                          {detection.status}
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
                    <Eye className="mr-2" size={16} />
                    View All Detections
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="mr-2" size={20} />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        achievement.unlocked 
                          ? getRarityColor(achievement.rarity)
                          : 'border-slate-600 bg-slate-700/30'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            achievement.unlocked ? 'text-white' : 'text-gray-400'
                          }`}>
                            {achievement.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {achievement.description}
                          </div>
                          {achievement.unlocked ? (
                            <div className="text-green-400 text-xs mt-1">
                              Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                            </div>
                          ) : achievement.progress !== undefined ? (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>{achievement.progress}/{achievement.maxProgress}</span>
                                <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                              </div>
                              <div className="w-full bg-slate-600 rounded-full h-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    View All Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2" size={20} />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <Download className="mr-2" size={16} />
                  Export Data
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <Settings className="mr-2" size={16} />
                  Account Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Connect ORCID
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}