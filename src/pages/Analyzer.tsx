import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Upload,
  Database,
  Download,
  GitCompare,
  BarChart3,
  FileText,
  Layers,
  Cpu,
  Zap,
  RefreshCcw,
  TrendingUp,
  Save,
  Share2,
  Eye,
  Play,
  Pause,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvents } from '@/services/analytics';

interface DataSource {
  id: string;
  name: string;
  type: 'file' | 'api' | 'database';
  status: 'ready' | 'loading' | 'error';
  description: string;
  size?: string;
  format?: string;
}

interface BatchJob {
  id: string;
  name: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  filesProcessed: number;
  totalFiles: number;
  startTime: Date;
  estimatedCompletion?: Date;
}

interface ComparisonResult {
  id: string;
  name: string;
  confidence: number;
  method: string;
  period: number;
  depth: number;
  selected: boolean;
}

export default function Analyzer() {
  const { currentUser, userProfile } = useAuth();
  const { track, trackButtonClick } = useAnalytics();

  // Track page open
  useEffect(() => {
    track(AnalyticsEvents.ANALYZER_OPENED);
  }, [track]);

  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'TESS Sector 45',
      type: 'api',
      status: 'ready',
      description: 'Recent TESS observations from Sector 45',
      size: '2.3 GB',
      format: 'FITS'
    },
    {
      id: '2',
      name: 'Kepler Q1-Q16',
      type: 'database',
      status: 'ready',
      description: 'Kepler mission quarters 1-16 archive',
      size: '15.7 GB',
      format: 'CSV/FITS'
    }
  ]);

  const [analysisSettings, setAnalysisSettings] = useState({
    method: 'auto',
    sensitivity: 0.7,
    noiseReduction: true,
    detrending: 'polynomial',
    periodRange: { min: 0.5, max: 365 },
    confidenceThreshold: 0.6,
    parallelProcessing: true,
    gpuAcceleration: true,
    customFilters: false
  });

  const [batchJobs, setBatchJobs] = useState<BatchJob[]>(() => {
    const now = Date.now();
    return [
      {
        id: '1',
        name: 'TOI Candidates Analysis',
        status: 'running',
        progress: 67,
        filesProcessed: 134,
        totalFiles: 200,
        startTime: new Date(now - 3600000),
        estimatedCompletion: new Date(now + 1800000)
      },
      {
        id: '2',
        name: 'K2 Campaign 19',
        status: 'completed',
        progress: 100,
        filesProcessed: 500,
        totalFiles: 500,
        startTime: new Date(now - 7200000)
      }
    ];
  });

  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([
    {
      id: '1',
      name: 'TOI-715 b',
      confidence: 0.94,
      method: 'Transit',
      period: 19.3,
      depth: 0.003,
      selected: true
    },
    {
      id: '2',
      name: 'K2-315 b',
      confidence: 0.87,
      method: 'Transit',
      period: 3.14,
      depth: 0.008,
      selected: true
    },
    {
      id: '3',
      name: 'EPIC-247267267',
      confidence: 0.76,
      method: 'Transit',
      period: 12.8,
      depth: 0.005,
      selected: false
    }
  ]);

  type TabId = 'sources' | 'settings' | 'batch' | 'compare' | 'results';
  const [activeTab, setActiveTab] = useState<TabId>('sources');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data for visualizations
  const performanceData = useMemo(() => [
    { metric: 'Throughput', value: 450, unit: 'files/hour' },
    { metric: 'Accuracy', value: 94.2, unit: '%' },
    { metric: 'GPU Usage', value: 78, unit: '%' },
    { metric: 'Memory', value: 12.4, unit: 'GB' }
  ], []);

  const detectionTrends = useMemo(() => [
    { hour: '00:00', detections: 12, false_positives: 2 },
    { hour: '04:00', detections: 18, false_positives: 1 },
    { hour: '08:00', detections: 24, false_positives: 3 },
    { hour: '12:00', detections: 31, false_positives: 2 },
    { hour: '16:00', detections: 28, false_positives: 1 },
    { hour: '20:00', detections: 22, false_positives: 2 }
  ], []);

  const handleDataSourceUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const newSource: DataSource = {
          id: `upload-${Date.now()}-${index}`,
          name: file.name,
          type: 'file',
          status: 'loading',
          description: `Uploaded ${file.type || 'file'}`,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          format: file.name.split('.').pop()?.toUpperCase() || 'Unknown'
        };
        
        setDataSources(prev => [...prev, newSource]);
        
        // Simulate upload progress
        setTimeout(() => {
          setDataSources(prev => prev.map(ds => 
            ds.id === newSource.id ? { ...ds, status: 'ready' } : ds
          ));
        }, 2000);
      });
    }
  }, []);

  const startBatchAnalysis = useCallback(() => {
    const newJob: BatchJob = {
      id: `job-${Date.now()}`,
      name: 'Custom Analysis Batch',
      status: 'running',
      progress: 0,
      filesProcessed: 0,
      totalFiles: Math.floor(Math.random() * 100) + 50,
      startTime: new Date()
    };
    
    setBatchJobs(prev => [newJob, ...prev]);
    
    // Simulate progress
    const interval = setInterval(() => {
      setBatchJobs(prev => prev.map(job => {
        if (job.id === newJob.id && job.status === 'running') {
          const newProgress = Math.min(job.progress + Math.random() * 10, 100);
          const newFilesProcessed = Math.floor((newProgress / 100) * job.totalFiles);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...job,
              status: 'completed',
              progress: 100,
              filesProcessed: job.totalFiles
            };
          }
          
          return {
            ...job,
            progress: newProgress,
            filesProcessed: newFilesProcessed,
            estimatedCompletion: new Date(Date.now() + ((100 - newProgress) / 10) * 60000)
          };
        }
        return job;
      }));
    }, 1000);
  }, []);

  const exportResults = useCallback(() => {
    const selectedResults = comparisonResults.filter(r => r.selected);
    const exportData = {
      timestamp: new Date().toISOString(),
      user: userProfile?.displayName,
      settings: analysisSettings,
      results: selectedResults,
      performance: performanceData
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exoplanet-analysis-report.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [comparisonResults, analysisSettings, performanceData, userProfile]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Settings size={48} className="mx-auto mb-4 opacity-50" />
          <p>Please log in to access the Advanced Analyzer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-slate-800/50"
            >
              <ArrowLeft className="mr-2" size={18} />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            <Cpu className="inline-block mr-2 text-purple-400" />
            Advanced Analyzer
          </h1>
          <p className="text-gray-300">
            Professional-grade exoplanet detection with advanced settings and batch processing
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 border border-purple-500/20">
            {[
              { id: 'sources', label: 'Data Sources', icon: Database },
              { id: 'settings', label: 'Advanced Settings', icon: Settings },
              { id: 'batch', label: 'Batch Processing', icon: Layers },
              { id: 'compare', label: 'Comparison Tool', icon: GitCompare },
              { id: 'results', label: 'Results & Export', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="mr-2" size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Data Sources Tab */}
            {activeTab === 'sources' && (
              <motion.div
                key="sources"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Upload className="mr-2" size={20} />
                      Upload Data Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Upload Files</Label>
                      <Input
                        type="file"
                        multiple
                        accept=".csv,.fits,.txt,.json"
                        onChange={handleDataSourceUpload}
                        className="bg-slate-700 border-slate-600 text-white file:bg-purple-600 file:text-white"
                      />
                      <p className="text-gray-400 text-sm mt-1">
                        Supported formats: CSV, FITS, TXT, JSON (Max 100MB per file)
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <Database className="mr-2" size={16} />
                        Connect TESS Archive
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <Database className="mr-2" size={16} />
                        Connect Kepler Archive
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Available Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dataSources.map((source) => (
                        <div
                          key={source.id}
                          className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded ${
                              source.type === 'file' ? 'bg-blue-600/20' :
                              source.type === 'api' ? 'bg-green-600/20' :
                              'bg-purple-600/20'
                            }`}>
                              {source.type === 'file' ? <FileText size={16} className="text-blue-400" /> :
                               source.type === 'api' ? <Database size={16} className="text-green-400" /> :
                               <Layers size={16} className="text-purple-400" />}
                            </div>
                            <div>
                              <div className="text-white font-medium">{source.name}</div>
                              <div className="text-gray-400 text-sm">{source.description}</div>
                              <div className="text-gray-500 text-xs">
                                {source.size} • {source.format}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded text-xs ${
                              source.status === 'ready' ? 'bg-green-600/20 text-green-400' :
                              source.status === 'loading' ? 'bg-yellow-600/20 text-yellow-400' :
                              'bg-red-600/20 text-red-400'
                            }`}>
                              {source.status}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500"
                            >
                              <Eye size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Advanced Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Detection Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Detection Method</Label>
                        <select
                          value={analysisSettings.method}
                          onChange={(e) => setAnalysisSettings(prev => ({ ...prev, method: e.target.value }))}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                        >
                          <option value="auto">Auto-detect</option>
                          <option value="transit">Transit Photometry</option>
                          <option value="radial_velocity">Radial Velocity</option>
                          <option value="microlensing">Microlensing</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-gray-300">Detrending Method</Label>
                        <select
                          value={analysisSettings.detrending}
                          onChange={(e) => setAnalysisSettings(prev => ({ ...prev, detrending: e.target.value }))}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                        >
                          <option value="polynomial">Polynomial</option>
                          <option value="spline">Spline</option>
                          <option value="gaussian">Gaussian Process</option>
                          <option value="median">Median Filter</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300">Sensitivity: {analysisSettings.sensitivity}</Label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={analysisSettings.sensitivity}
                        onChange={(e) => setAnalysisSettings(prev => ({ ...prev, sensitivity: parseFloat(e.target.value) }))}
                        className="w-full mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Confidence Threshold: {analysisSettings.confidenceThreshold}</Label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={analysisSettings.confidenceThreshold}
                        onChange={(e) => setAnalysisSettings(prev => ({ ...prev, confidenceThreshold: parseFloat(e.target.value) }))}
                        className="w-full mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Min Period (days)</Label>
                        <Input
                          type="number"
                          value={analysisSettings.periodRange.min}
                          onChange={(e) => setAnalysisSettings(prev => ({
                            ...prev,
                            periodRange: { ...prev.periodRange, min: parseFloat(e.target.value) }
                          }))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Max Period (days)</Label>
                        <Input
                          type="number"
                          value={analysisSettings.periodRange.max}
                          onChange={(e) => setAnalysisSettings(prev => ({
                            ...prev,
                            periodRange: { ...prev.periodRange, max: parseFloat(e.target.value) }
                          }))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Processing Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        { key: 'noiseReduction', label: 'Noise Reduction', description: 'Apply advanced noise filtering' },
                        { key: 'parallelProcessing', label: 'Parallel Processing', description: 'Use multiple CPU cores' },
                        { key: 'gpuAcceleration', label: 'GPU Acceleration', description: 'Utilize GPU for faster processing' },
                        { key: 'customFilters', label: 'Custom Filters', description: 'Apply user-defined filters' }
                      ].map((option) => (
                        <label key={option.key} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={analysisSettings[option.key as keyof typeof analysisSettings] as boolean}
                            onChange={(e) => setAnalysisSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                            className="mt-1 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                          />
                          <div>
                            <span className="text-white font-medium">{option.label}</span>
                            <p className="text-gray-400 text-sm">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Batch Processing Tab */}
            {activeTab === 'batch' && (
              <motion.div
                key="batch"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      Batch Processing
                      <Button
                        onClick={startBatchAnalysis}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Play className="mr-2" size={16} />
                        Start New Batch
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {batchJobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-4 bg-slate-700/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-white font-medium">{job.name}</h4>
                              <p className="text-gray-400 text-sm">
                                Started {job.startTime.toLocaleTimeString()}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded text-sm ${
                              job.status === 'running' ? 'bg-blue-600/20 text-blue-400' :
                              job.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                              job.status === 'failed' ? 'bg-red-600/20 text-red-400' :
                              'bg-yellow-600/20 text-yellow-400'
                            }`}>
                              {job.status}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>{job.filesProcessed}/{job.totalFiles} files</span>
                              <span>{Math.round(job.progress)}%</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  job.status === 'completed' ? 'bg-green-600' :
                                  job.status === 'failed' ? 'bg-red-600' :
                                  'bg-purple-600'
                                }`}
                                style={{ width: `${job.progress}%` }}
                              />
                            </div>
                          </div>

                          {job.estimatedCompletion && job.status === 'running' && (
                            <p className="text-gray-400 text-xs">
                              ETA: {job.estimatedCompletion.toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Comparison Tool Tab */}
            {activeTab === 'compare' && (
              <motion.div
                key="compare"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Detection Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {comparisonResults.map((result) => (
                        <div
                          key={result.id}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            result.selected
                              ? 'bg-purple-600/20 border-purple-400'
                              : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setComparisonResults(prev => 
                            prev.map(r => r.id === result.id ? { ...r, selected: !r.selected } : r)
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={result.selected}
                                onChange={() => {}}
                                className="rounded border-slate-600 bg-slate-700 text-purple-600"
                              />
                              <div>
                                <h4 className="text-white font-medium">{result.name}</h4>
                                <p className="text-gray-400 text-sm">
                                  {result.method} • Period: {result.period} days
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-bold">
                                {(result.confidence * 100).toFixed(1)}%
                              </div>
                              <div className="text-gray-400 text-sm">
                                Depth: {(result.depth * 100).toFixed(3)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results & Export Tab */}
            {activeTab === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      Analysis Results
                      <div className="flex space-x-2">
                        <Button
                          onClick={exportResults}
                          variant="outline"
                          className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        >
                          <Download className="mr-2" size={16} />
                          Export
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        >
                          <Share2 className="mr-2" size={16} />
                          Share
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {performanceData.map((metric, index) => (
                        <div key={index} className="bg-slate-700/30 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {metric.value}
                            <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
                          </div>
                          <div className="text-gray-300 text-sm">{metric.metric}</div>
                        </div>
                      ))}
                    </div>

                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={detectionTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="hour" stroke="#9CA3AF" />
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
                            name="Valid Detections"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="false_positives" 
                            stroke="#EF4444" 
                            strokeWidth={2}
                            name="False Positives"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Jobs</span>
                  <span className="text-white font-medium">
                    {batchJobs.filter(j => j.status === 'running').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Sources</span>
                  <span className="text-white font-medium">{dataSources.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Results</span>
                  <span className="text-white font-medium">
                    {comparisonResults.filter(r => r.selected).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Confidence</span>
                  <span className="text-green-400 font-medium">
                    {(comparisonResults.reduce((acc, r) => acc + r.confidence, 0) / comparisonResults.length * 100).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Cpu className="mr-2" size={20} />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">GPU</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-white text-sm">12.4/32 GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Processing</span>
                  <span className="text-blue-400 text-sm">450 files/hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Queue</span>
                  <span className="text-white text-sm">23 pending</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2" size={20} />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => setIsAnalyzing(!isAnalyzing)}
                >
                  {isAnalyzing ? (
                    <>
                      <Pause className="mr-2" size={16} />
                      Pause Analysis
                    </>
                  ) : (
                    <>
                      <Play className="mr-2" size={16} />
                      Start Analysis
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <Save className="mr-2" size={16} />
                  Save Session
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <RefreshCcw className="mr-2" size={16} />
                  Reset Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}