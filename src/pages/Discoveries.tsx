import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  Filter,
  Calendar,
  TrendingUp,
  User,
  MapPin,
  Clock,
  Award,
  Search,
  SortAsc,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import type { Detection } from '@/types';

interface FilterOptions {
  dateRange: 'all' | 'today' | 'week' | 'month';
  confidence: 'all' | 'high' | 'medium' | 'low';
  starType: 'all' | 'sun-like' | 'red-dwarf' | 'giant';
  method: 'all' | 'transit' | 'radial_velocity' | 'microlensing';
  sortBy: 'newest' | 'confidence' | 'votes' | 'name';
}

// Mock discovery data
const mockDiscoveries: Detection[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Dr. Sarah Chen',
    userPhoto: '',
    timestamp: { seconds: Date.now() / 1000 - 3600 } as any,
    starData: {
      catalogId: 'TOI-715',
      name: 'TOI-715 b',
      constellation: 'Draco',
      magnitude: 12.3,
      distance: 137.4,
      coordinates: { ra: 15.2, dec: 42.1 }
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
    isPublic: true,
    tags: ['habitable-zone', 'super-earth']
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Alex Rodriguez',
    userPhoto: '',
    timestamp: { seconds: Date.now() / 1000 - 7200 } as any,
    starData: {
      catalogId: 'EPIC-247267267',
      name: 'K2-315b',
      constellation: 'Pisces',
      magnitude: 14.8,
      distance: 186.3,
      coordinates: { ra: 23.5, dec: -12.8 }
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
    isPublic: true,
    tags: ['hot-jupiter', 'short-period']
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Emma Thompson',
    userPhoto: '',
    timestamp: { seconds: Date.now() / 1000 - 14400 } as any,
    starData: {
      catalogId: 'TIC-237913194',
      name: 'TOI-849b',
      constellation: 'Fornax',
      magnitude: 11.9,
      distance: 730.6,
      coordinates: { ra: 2.8, dec: -35.2 }
    },
    analysis: {
      confidence: 0.91,
      method: 'transit',
      periodDays: 0.765,
      depth: 0.012,
      duration: 1.4,
      planetRadius: 3.4,
      habitableZone: false
    },
    status: 'confirmed',
    votes: 89,
    isPublic: true,
    tags: ['ultra-short-period', 'neptune-like']
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Dr. Michael Park',
    userPhoto: '',
    timestamp: { seconds: Date.now() / 1000 - 21600 } as any,
    starData: {
      catalogId: 'LP 890-9',
      name: 'LP 890-9c',
      constellation: 'Eridanus',
      magnitude: 16.0,
      distance: 105.0,
      coordinates: { ra: 4.2, dec: -35.9 }
    },
    analysis: {
      confidence: 0.89,
      method: 'transit',
      periodDays: 8.46,
      depth: 0.002,
      duration: 2.8,
      planetRadius: 1.37,
      habitableZone: true
    },
    status: 'confirmed',
    votes: 156,
    isPublic: true,
    tags: ['habitable-zone', 'red-dwarf']
  }
];

export default function Discoveries() {
  const { currentUser } = useAuth();
  const [discoveries, setDiscoveries] = useState<Detection[]>(mockDiscoveries);
  const [filteredDiscoveries, setFilteredDiscoveries] = useState<Detection[]>(mockDiscoveries);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    confidence: 'all',
    starType: 'all',
    method: 'all',
    sortBy: 'newest'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  useEffect(() => {
    let filtered = [...discoveries];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.starData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.starData.catalogId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.starData.constellation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (filters.dateRange !== 'all') {
      const now = Date.now() / 1000;
      const ranges = {
        today: 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60
      };
      const range = ranges[filters.dateRange];
      filtered = filtered.filter(d => now - d.timestamp.seconds < range);
    }

    // Apply confidence filter
    if (filters.confidence !== 'all') {
      const confidenceRanges = {
        high: [0.9, 1.0],
        medium: [0.7, 0.9],
        low: [0.0, 0.7]
      };
      const [min, max] = confidenceRanges[filters.confidence];
      filtered = filtered.filter(d => d.analysis.confidence >= min && d.analysis.confidence < max);
    }

    // Apply method filter
    if (filters.method !== 'all') {
      filtered = filtered.filter(d => d.analysis.method === filters.method);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'confidence':
          return b.analysis.confidence - a.analysis.confidence;
        case 'votes':
          return b.votes - a.votes;
        case 'name':
          return (a.starData.name || a.starData.catalogId).localeCompare(b.starData.name || b.starData.catalogId);
        case 'newest':
        default:
          return b.timestamp.seconds - a.timestamp.seconds;
      }
    });

    setFilteredDiscoveries(filtered);
  }, [discoveries, filters, searchTerm]);

  const handleVote = (discoveryId: string, voteType: 'up' | 'down') => {
    if (!currentUser) return;

    setUserVotes(prev => ({
      ...prev,
      [discoveryId]: prev[discoveryId] === voteType ? null : voteType
    }));

    setDiscoveries(prev => prev.map(d => {
      if (d.id === discoveryId) {
        const currentVote = userVotes[discoveryId];
        let voteChange = 0;
        
        if (currentVote === null) {
          voteChange = voteType === 'up' ? 1 : -1;
        } else if (currentVote !== voteType) {
          voteChange = voteType === 'up' ? 2 : -2;
        } else {
          voteChange = voteType === 'up' ? -1 : 1;
        }

        return { ...d, votes: d.votes + voteChange };
      }
      return d;
    }));
  };

  const getTimeSince = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400 bg-green-400/20';
    if (confidence >= 0.7) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-orange-400 bg-orange-400/20';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            <Star className="inline-block mr-2 text-purple-400" />
            Community Discoveries
          </h1>
          <p className="text-gray-300">
            Explore exoplanets discovered by our amazing community of citizen scientists
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <Input
                    placeholder="Search by star name, catalog ID, discoverer, or constellation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Filter className="mr-2" size={16} />
                    Filters
                  </Button>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="confidence">Highest Confidence</option>
                    <option value="votes">Most Voted</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-600"
                >
                  <div>
                    <Label className="text-gray-300">Date Range</Label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as any }))}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Confidence</Label>
                    <select
                      value={filters.confidence}
                      onChange={(e) => setFilters(prev => ({ ...prev, confidence: e.target.value as any }))}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                    >
                      <option value="all">All Levels</option>
                      <option value="high">High (90%+)</option>
                      <option value="medium">Medium (70-90%)</option>
                      <option value="low">Low (&lt;70%)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Detection Method</Label>
                    <select
                      value={filters.method}
                      onChange={(e) => setFilters(prev => ({ ...prev, method: e.target.value as any }))}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                    >
                      <option value="all">All Methods</option>
                      <option value="transit">Transit</option>
                      <option value="radial_velocity">Radial Velocity</option>
                      <option value="microlensing">Microlensing</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Star Type</Label>
                    <select
                      value={filters.starType}
                      onChange={(e) => setFilters(prev => ({ ...prev, starType: e.target.value as any }))}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                    >
                      <option value="all">All Types</option>
                      <option value="sun-like">Sun-like</option>
                      <option value="red-dwarf">Red Dwarf</option>
                      <option value="giant">Giant</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-gray-300"
        >
          Showing {filteredDiscoveries.length} of {discoveries.length} discoveries
        </motion.div>

        {/* Discovery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredDiscoveries.map((discovery, index) => (
            <motion.div
              key={discovery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white flex items-center">
                        <Star className="mr-2 text-purple-400" size={20} />
                        {discovery.starData.name || discovery.starData.catalogId}
                      </CardTitle>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <User size={14} className="mr-1" />
                          {discovery.userName}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock size={14} className="mr-1" />
                          {getTimeSince(discovery.timestamp.seconds)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(discovery.status)}`}>
                        {discovery.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Star Information */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Constellation</div>
                      <div className="text-white flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {discovery.starData.constellation}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Distance</div>
                      <div className="text-white">{discovery.starData.distance.toFixed(1)} ly</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Magnitude</div>
                      <div className="text-white">{discovery.starData.magnitude}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Method</div>
                      <div className="text-white capitalize">
                        {discovery.analysis.method.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-400">Confidence</div>
                        <div className={`font-medium ${getConfidenceColor(discovery.analysis.confidence).split(' ')[0]}`}>
                          {(discovery.analysis.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Period</div>
                        <div className="text-white">{discovery.analysis.periodDays.toFixed(2)} days</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Planet Radius</div>
                        <div className="text-white">
                          {discovery.analysis.planetRadius?.toFixed(2)} R⊕
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Transit Depth</div>
                        <div className="text-white">{(discovery.analysis.depth * 100).toFixed(3)}%</div>
                      </div>
                    </div>
                    
                    {discovery.analysis.habitableZone && (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                          🌍 Potentially Habitable
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {discovery.tags && discovery.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {discovery.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-600">
                    <div className="flex items-center space-x-2">
                      {currentUser && (
                        <>
                          <Button
                            onClick={() => handleVote(discovery.id, 'up')}
                            variant="ghost"
                            size="sm"
                            className={`hover:bg-green-600/20 ${
                              userVotes[discovery.id] === 'up' ? 'text-green-400 bg-green-600/20' : 'text-gray-400'
                            }`}
                          >
                            <ThumbsUp size={14} className="mr-1" />
                            {discovery.votes}
                          </Button>
                          <Button
                            onClick={() => handleVote(discovery.id, 'down')}
                            variant="ghost"
                            size="sm"
                            className={`hover:bg-red-600/20 ${
                              userVotes[discovery.id] === 'down' ? 'text-red-400 bg-red-600/20' : 'text-gray-400'
                            }`}
                          >
                            <ThumbsDown size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MessageCircle size={14} className="mr-1" />
                        5
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Share2 size={14} className="mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye size={14} className="mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredDiscoveries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Star size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No discoveries found</h3>
            <p className="text-gray-400">
              Try adjusting your search criteria or filters to find more results.
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredDiscoveries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <Button 
              variant="outline" 
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Load More Discoveries
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}