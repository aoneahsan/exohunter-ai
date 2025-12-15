import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Play,
  Download,
  Share2,
  Star,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Settings,
  RefreshCcw,
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
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import type { AnalysisResult } from '@/types';

interface LightCurveData {
  time: number;
  flux: number;
  normalized: number;
}

interface SampleData {
  id: string;
  name: string;
  description: string;
  data: LightCurveData[];
  expectedResult: AnalysisResult;
}

const sampleDatasets: SampleData[] = [
  {
    id: 'kepler-452b',
    name: 'Kepler-452b',
    description: 'Earth-like exoplanet in the habitable zone',
    data: generateMockLightCurve(0.998, 2.5, 385),
    expectedResult: {
      confidence: 0.94,
      method: 'transit',
      periodDays: 385,
      depth: 0.002,
      duration: 6.2,
      planetRadius: 1.6,
      habitableZone: true
    }
  },
  {
    id: 'trappist-1e',
    name: 'TRAPPIST-1e',
    description: 'Rocky planet in ultra-cool dwarf system',
    data: generateMockLightCurve(0.996, 1.8, 6.1),
    expectedResult: {
      confidence: 0.89,
      method: 'transit',
      periodDays: 6.1,
      depth: 0.004,
      duration: 1.1,
      planetRadius: 0.91,
      habitableZone: true
    }
  },
  {
    id: 'hd-209458b',
    name: 'HD 209458b',
    description: 'Hot Jupiter with atmospheric studies',
    data: generateMockLightCurve(0.985, 4.2, 3.5),
    expectedResult: {
      confidence: 0.97,
      method: 'transit',
      periodDays: 3.5,
      depth: 0.015,
      duration: 3.2,
      planetRadius: 1.38,
      habitableZone: false
    }
  }
];

function generateMockLightCurve(baseFlux: number, transitDepth: number, period: number): LightCurveData[] {
  const data: LightCurveData[] = [];
  const totalPoints = 1000;
  
  for (let i = 0; i < totalPoints; i++) {
    const time = i * 0.1;
    const phase = (time % period) / period;
    
    let flux = baseFlux + (Math.random() - 0.5) * 0.001; // Add noise
    
    // Create transit dip
    if (phase > 0.48 && phase < 0.52) {
      const transitPhase = (phase - 0.48) / 0.04;
      const transitShape = Math.sin(transitPhase * Math.PI);
      flux -= (transitDepth / 100) * transitShape;
    }
    
    data.push({
      time,
      flux,
      normalized: (flux / baseFlux)
    });
  }
  
  return data;
}

export default function Explorer() {
  const { currentUser, userProfile } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSample, setSelectedSample] = useState<string>('');
  const [lightCurveData, setLightCurveData] = useState<LightCurveData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setSelectedSample('');
      // In a real app, parse CSV data here
      setLightCurveData(generateMockLightCurve(0.999, 3.0, 15));
    }
  }, []);

  const handleSampleSelect = useCallback((sampleId: string) => {
    const sample = sampleDatasets.find(s => s.id === sampleId);
    if (sample) {
      setSelectedSample(sampleId);
      setSelectedFile(null);
      setLightCurveData(sample.data);
      setAnalysisResult(null);
    }
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!lightCurveData.length) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);

    // Simulate AI analysis progress
    const stages = [
      'Preprocessing light curve data...',
      'Applying noise reduction filters...',
      'Detecting periodic signals...',
      'Analyzing transit candidates...',
      'Validating planetary parameters...',
      'Generating confidence metrics...'
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress((i + 1) * (100 / stages.length));
    }

    // Generate or use expected result
    const sample = sampleDatasets.find(s => s.id === selectedSample);
    const result: AnalysisResult = sample?.expectedResult || {
      confidence: 0.75 + Math.random() * 0.2,
      method: 'transit',
      periodDays: 10 + Math.random() * 100,
      depth: 0.001 + Math.random() * 0.01,
      duration: 1 + Math.random() * 5,
      planetRadius: 0.5 + Math.random() * 2,
      habitableZone: Math.random() > 0.7
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);
  }, [lightCurveData, selectedSample]);

  const shareDiscovery = useCallback(() => {
    if (analysisResult && currentUser) {
      // In a real app, save to database and share
      navigator.clipboard.writeText(window.location.href);
      alert('Discovery link copied to clipboard!');
    }
  }, [analysisResult, currentUser]);

  const exportResults = useCallback(() => {
    if (!analysisResult) return;

    const exportData = {
      timestamp: new Date().toISOString(),
      user: userProfile?.displayName,
      analysis: analysisResult,
      sample: selectedSample || 'custom-upload'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exoplanet-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [analysisResult, userProfile, selectedSample]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to={currentUser ? '/dashboard' : '/'}>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-slate-800/50"
            >
              <ArrowLeft className="mr-2" size={18} />
              <span className="hidden sm:inline">Back to {currentUser ? 'Dashboard' : 'Home'}</span>
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
            <Star className="inline-block mr-2 text-purple-400" />
            Exoplanet Explorer
          </h1>
          <p className="text-gray-300">
            Upload light curve data or select a sample to detect exoplanets using AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Data Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* File Upload */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Upload className="mr-2" size={20} />
                  Upload Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file-upload" className="text-gray-300">
                    CSV Light Curve Data
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="bg-slate-700 border-slate-600 text-white file:bg-purple-600 file:text-white"
                  />
                  {selectedFile && (
                    <p className="text-sm text-green-400 mt-2">
                      ✓ {selectedFile.name} loaded
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sample Data */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="mr-2" size={20} />
                  Sample Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleDatasets.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSampleSelect(sample.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedSample === sample.id
                        ? 'bg-purple-600/30 border-2 border-purple-400'
                        : 'bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50'
                    }`}
                  >
                    <div className="text-white font-medium">{sample.name}</div>
                    <div className="text-gray-400 text-sm">{sample.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Analysis Controls */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Settings className="mr-2" size={20} />
                  Analysis Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  variant="outline"
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
                </Button>
                
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <div>
                      <Label className="text-gray-300">Detection Method</Label>
                      <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white">
                        <option value="auto">Auto-detect</option>
                        <option value="transit">Transit photometry</option>
                        <option value="radial">Radial velocity</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Sensitivity</Label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={runAnalysis}
                  disabled={!lightCurveData.length || isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCcw className="mr-2 animate-spin" size={16} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2" size={16} />
                      Run AI Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Light Curve Chart */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="mr-2" size={20} />
                  Light Curve Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  {lightCurveData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lightCurveData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="time" 
                          stroke="#9CA3AF"
                          label={{ value: 'Time (days)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          dataKey="normalized"
                          stroke="#9CA3AF"
                          label={{ value: 'Normalized Flux', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="normalized" 
                          stroke="#8B5CF6" 
                          strokeWidth={1}
                          dot={false}
                        />
                        {analysisResult && (
                          <ReferenceLine 
                            y={1 - analysisResult.depth} 
                            stroke="#EF4444" 
                            strokeDasharray="5 5"
                            label={{ value: "Transit Depth", position: "top" }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No data loaded. Upload a file or select a sample.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-white font-medium">AI Analysis in Progress</div>
                      <div className="text-gray-400 text-sm">Processing light curve data...</div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-center mt-2 text-purple-400 font-medium">
                      {Math.round(analysisProgress)}%
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      {analysisResult.confidence > 0.8 ? (
                        <CheckCircle2 className="mr-2 text-green-400" size={20} />
                      ) : (
                        <AlertCircle className="mr-2 text-yellow-400" size={20} />
                      )}
                      Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-gray-400 text-sm">Confidence Score</div>
                        <div className="text-white text-xl font-bold">
                          {(analysisResult.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-gray-400 text-sm">Detection Method</div>
                        <div className="text-white capitalize">
                          {analysisResult.method.replace('_', ' ')}
                        </div>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-gray-400 text-sm">Orbital Period</div>
                        <div className="text-white">
                          {analysisResult.periodDays.toFixed(2)} days
                        </div>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-gray-400 text-sm">Transit Depth</div>
                        <div className="text-white">
                          {(analysisResult.depth * 100).toFixed(3)}%
                        </div>
                      </div>
                    </div>

                    {analysisResult.planetRadius && (
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-gray-400 text-sm mb-2">Planet Properties</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-white">
                            Radius: {analysisResult.planetRadius.toFixed(2)} R⊕
                          </div>
                          <div className="text-white">
                            Duration: {analysisResult.duration.toFixed(1)} hours
                          </div>
                        </div>
                        {analysisResult.habitableZone && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                              <CheckCircle2 size={12} className="mr-1" />
                              Habitable Zone
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {currentUser && (
                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={shareDiscovery}
                          variant="outline"
                          className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        >
                          <Share2 className="mr-2" size={16} />
                          Share Discovery
                        </Button>
                        <Button
                          onClick={exportResults}
                          variant="outline"
                          className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        >
                          <Download className="mr-2" size={16} />
                          Export Results
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}