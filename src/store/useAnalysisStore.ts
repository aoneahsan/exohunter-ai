import { create } from 'zustand';
import type { Detection, AnalysisResult, StarData } from '@/types';

interface AnalysisState {
  currentAnalysis: Detection | null;
  analysisHistory: Detection[];
  isProcessing: boolean;
  progress: number;
  
  // Actions
  startAnalysis: (starData: StarData) => Promise<AnalysisResult>;
  saveAnalysis: (detection: Detection) => void;
  clearCurrentAnalysis: () => void;
  setProgress: (progress: number) => void;
}

// Simulated AI analysis function
const performAIAnalysis = async (starData: StarData): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  const lightCurve = starData.lightCurveData || [];
  
  // Calculate variance and patterns
  const variance = lightCurve.length > 0 
    ? Math.sqrt(lightCurve.reduce((acc, val, i, arr) => {
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        return acc + Math.pow(val - avg, 2);
      }, 0) / lightCurve.length)
    : Math.random() * 0.5;
  
  // Simulate detection confidence
  const baseConfidence = 60 + variance * 20;
  const confidence = Math.min(95, baseConfidence + Math.random() * 15);
  
  // Simulate planet parameters
  const period = 5 + Math.random() * 360; // days
  const depth = 0.001 + Math.random() * 0.02; // transit depth
  const duration = 2 + Math.random() * 10; // hours
  const radius = Math.sqrt(depth) * 11; // Earth radii (simplified)
  
  return {
    confidence,
    method: 'transit',
    periodDays: parseFloat(period.toFixed(2)),
    depth: parseFloat(depth.toFixed(4)),
    duration: parseFloat(duration.toFixed(2)),
    planetRadius: parseFloat(radius.toFixed(2)),
    planetMass: parseFloat((radius * 1.5).toFixed(2)), // Simplified mass estimation
    habitableZone: period > 200 && period < 400 && radius < 2,
  };
};

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  currentAnalysis: null,
  analysisHistory: [],
  isProcessing: false,
  progress: 0,

  startAnalysis: async (starData: StarData) => {
    set({ isProcessing: true, progress: 0 });
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      const currentProgress = get().progress;
      if (currentProgress < 90) {
        set({ progress: currentProgress + 10 });
      }
    }, 400);
    
    try {
      const result = await performAIAnalysis(starData);
      clearInterval(progressInterval);
      set({ progress: 100 });
      
      // Small delay before resetting
      setTimeout(() => {
        set({ isProcessing: false, progress: 0 });
      }, 500);
      
      return result;
    } catch (error) {
      clearInterval(progressInterval);
      set({ isProcessing: false, progress: 0 });
      throw error;
    }
  },

  saveAnalysis: (detection: Detection) => {
    set(state => ({
      currentAnalysis: detection,
      analysisHistory: [detection, ...state.analysisHistory].slice(0, 50), // Keep last 50
    }));
  },

  clearCurrentAnalysis: () => {
    set({ currentAnalysis: null });
  },

  setProgress: (progress: number) => {
    set({ progress });
  },
}));