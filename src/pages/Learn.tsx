import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star,
  Activity,
  Eye,
  CheckCircle2,
  PlayCircle,
  FileText,
  Brain,
  Telescope,
  Globe,
  Zap,
  Award,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Tutorial } from '@/types';

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'What are Exoplanets?',
    description: 'Learn the basics of exoplanets, how they form, and why they\'re important for understanding the universe.',
    duration: '15 min',
    difficulty: 'beginner',
    topics: ['astronomy', 'planets', 'basics'],
    interactive: true,
    videoUrl: 'https://example.com/video1',
    markdownContent: '',
    order: 1
  },
  {
    id: '2',
    title: 'The Transit Method',
    description: 'Master the primary technique used to detect exoplanets by observing stellar brightness changes.',
    duration: '25 min',
    difficulty: 'beginner',
    topics: ['detection', 'photometry', 'light-curves'],
    interactive: true,
    videoUrl: 'https://example.com/video2',
    markdownContent: '',
    order: 2
  },
  {
    id: '3',
    title: 'Reading Light Curves',
    description: 'Understand how to interpret light curve data and identify potential exoplanet transits.',
    duration: '30 min',
    difficulty: 'intermediate',
    topics: ['data-analysis', 'charts', 'interpretation'],
    interactive: true,
    videoUrl: 'https://example.com/video3',
    markdownContent: '',
    order: 3
  },
  {
    id: '4',
    title: 'Radial Velocity Method',
    description: 'Explore how stellar wobble reveals the presence of orbiting planets.',
    duration: '20 min',
    difficulty: 'intermediate',
    topics: ['spectroscopy', 'doppler-shift', 'orbits'],
    interactive: false,
    videoUrl: 'https://example.com/video4',
    markdownContent: '',
    order: 4
  },
  {
    id: '5',
    title: 'Habitable Zones',
    description: 'Discover what makes a planet potentially habitable and how to identify these special worlds.',
    duration: '18 min',
    difficulty: 'beginner',
    topics: ['astrobiology', 'habitability', 'goldilocks-zone'],
    interactive: true,
    videoUrl: 'https://example.com/video5',
    markdownContent: '',
    order: 5
  },
  {
    id: '6',
    title: 'AI in Exoplanet Detection',
    description: 'Learn how machine learning is revolutionizing the search for new worlds.',
    duration: '35 min',
    difficulty: 'advanced',
    topics: ['machine-learning', 'ai', 'automation'],
    interactive: true,
    videoUrl: 'https://example.com/video6',
    markdownContent: '',
    order: 6
  },
  {
    id: '7',
    title: 'False Positives and Validation',
    description: 'Master the art of distinguishing real exoplanets from false signals.',
    duration: '28 min',
    difficulty: 'advanced',
    topics: ['validation', 'false-positives', 'confirmation'],
    interactive: false,
    videoUrl: 'https://example.com/video7',
    markdownContent: '',
    order: 7
  },
  {
    id: '8',
    title: 'Atmospheric Analysis',
    description: 'Advanced techniques for studying exoplanet atmospheres and compositions.',
    duration: '40 min',
    difficulty: 'advanced',
    topics: ['atmospheres', 'spectroscopy', 'composition'],
    interactive: true,
    videoUrl: 'https://example.com/video8',
    markdownContent: '',
    order: 8
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the most common method for detecting exoplanets?",
    options: ["Transit method", "Radial velocity", "Direct imaging", "Gravitational lensing"],
    correct: 0,
    explanation: "The transit method is the most successful technique, detecting over 70% of known exoplanets by observing periodic dimming of starlight."
  },
  {
    id: 2,
    question: "What does a typical exoplanet transit cause in terms of brightness decrease?",
    options: ["50%", "10%", "1%", "0.1%"],
    correct: 3,
    explanation: "Most exoplanet transits cause very small decreases in stellar brightness, typically around 0.01% to 1%, requiring sensitive instruments to detect."
  },
  {
    id: 3,
    question: "Which space telescope has discovered the most exoplanets?",
    options: ["Hubble", "Kepler", "Spitzer", "JWST"],
    correct: 1,
    explanation: "NASA's Kepler Space Telescope discovered over 2,600 confirmed exoplanets during its mission using the transit method."
  }
];

export default function Learn() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(new Set(['1', '2']));
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || tutorial.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuiz(prev => prev + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
  };

  if (selectedTutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button 
              onClick={() => setSelectedTutorial(null)}
              variant="outline" 
              className="mb-6 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              ← Back to Learning Hub
            </Button>
            
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{selectedTutorial.title}</CardTitle>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedTutorial.difficulty)}`}>
                    {selectedTutorial.difficulty}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <Clock size={14} className="mr-1" />
                    {selectedTutorial.duration}
                  </span>
                  {selectedTutorial.interactive && (
                    <span className="text-purple-400 text-sm flex items-center">
                      <Zap size={14} className="mr-1" />
                      Interactive
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">{selectedTutorial.description}</p>
                
                {/* Video Player Placeholder */}
                <div className="bg-slate-900 rounded-lg p-8 text-center">
                  <PlayCircle size={64} className="mx-auto text-purple-400 mb-4" />
                  <h3 className="text-white text-lg mb-2">Video Tutorial</h3>
                  <p className="text-gray-400 mb-4">
                    Watch this comprehensive tutorial to master {selectedTutorial.title.toLowerCase()}
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Play className="mr-2" size={16} />
                    Start Video
                  </Button>
                </div>

                {/* Interactive Elements */}
                {selectedTutorial.interactive && (
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-white text-lg mb-4 flex items-center">
                      <Brain className="mr-2" />
                      Interactive Practice
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500"
                      >
                        <Activity className="mr-2" size={16} />
                        Live Simulation
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500"
                      >
                        <FileText className="mr-2" size={16} />
                        Practice Exercises
                      </Button>
                    </div>
                  </div>
                )}

                {/* Topics Covered */}
                <div>
                  <h4 className="text-white text-lg mb-3">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTutorial.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                      >
                        {topic.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mark as Complete */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-600">
                  <div className="flex items-center space-x-4">
                    {completedTutorials.has(selectedTutorial.id) ? (
                      <span className="flex items-center text-green-400">
                        <CheckCircle2 className="mr-2" size={16} />
                        Completed
                      </span>
                    ) : (
                      <Button 
                        onClick={() => setCompletedTutorials(prev => new Set([...prev, selectedTutorial.id]))}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle2 className="mr-2" size={16} />
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                      <FileText className="mr-2" size={16} />
                      Download Notes
                    </Button>
                    <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                      Next Tutorial
                      <ChevronRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
            <BookOpen className="inline-block mr-2 text-purple-400" />
            Learning Hub
          </h1>
          <p className="text-gray-300">
            Master the art of exoplanet detection with our comprehensive tutorials and interactive content
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{completedTutorials.size}</div>
                  <div className="text-gray-400 text-sm">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{tutorials.length - completedTutorials.size}</div>
                  <div className="text-gray-400 text-sm">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">94%</div>
                  <div className="text-gray-400 text-sm">Avg. Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">12h</div>
                  <div className="text-gray-400 text-sm">Study Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    placeholder="Search tutorials by title, description, or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value as any)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tutorials Grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredTutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-slate-800/50 border-purple-500/20 hover:bg-slate-800/70 transition-all cursor-pointer h-full"
                    onClick={() => setSelectedTutorial(tutorial)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-white text-lg flex items-start">
                          {tutorial.interactive ? (
                            <Zap className="mr-2 text-purple-400 flex-shrink-0 mt-1" size={18} />
                          ) : (
                            <PlayCircle className="mr-2 text-blue-400 flex-shrink-0 mt-1" size={18} />
                          )}
                          {tutorial.title}
                        </CardTitle>
                        {completedTutorials.has(tutorial.id) && (
                          <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center">
                          <Clock size={12} className="mr-1" />
                          {tutorial.duration}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4">{tutorial.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {tutorial.topics.slice(0, 3).map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded"
                          >
                            {topic.replace('-', ' ')}
                          </span>
                        ))}
                        {tutorial.topics.length > 3 && (
                          <span className="px-2 py-1 bg-slate-600/20 text-gray-400 text-xs rounded">
                            +{tutorial.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quiz Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="mr-2" size={20} />
                    Quick Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentQuiz < quizQuestions.length ? (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-400">
                        Question {currentQuiz + 1} of {quizQuestions.length}
                      </div>
                      <h3 className="text-white font-medium">
                        {quizQuestions[currentQuiz].question}
                      </h3>
                      <div className="space-y-2">
                        {quizQuestions[currentQuiz].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                            className={`w-full p-3 text-left rounded transition-all ${
                              selectedAnswer === null
                                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                : selectedAnswer === index
                                  ? index === quizQuestions[currentQuiz].correct
                                    ? 'bg-green-600/20 border border-green-400 text-green-400'
                                    : 'bg-red-600/20 border border-red-400 text-red-400'
                                  : index === quizQuestions[currentQuiz].correct
                                    ? 'bg-green-600/20 border border-green-400 text-green-400'
                                    : 'bg-slate-700 text-gray-400'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-700/50 p-3 rounded"
                        >
                          <p className="text-gray-300 text-sm">
                            {quizQuestions[currentQuiz].explanation}
                          </p>
                          <Button
                            onClick={nextQuestion}
                            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            Next Question
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <Award className="mx-auto text-yellow-400" size={48} />
                      <h3 className="text-white text-lg">Quiz Complete!</h3>
                      <p className="text-gray-300">
                        You scored {quizScore} out of {quizQuestions.length}
                      </p>
                      <Button
                        onClick={resetQuiz}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Restart Quiz
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Path */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Telescope className="mr-2" size={20} />
                    Recommended Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tutorials.slice(0, 4).map((tutorial, index) => (
                    <div 
                      key={tutorial.id}
                      className={`flex items-center p-2 rounded cursor-pointer transition-all ${
                        completedTutorials.has(tutorial.id)
                          ? 'bg-green-600/20 border border-green-400/30'
                          : 'bg-slate-700/30 hover:bg-slate-600/30'
                      }`}
                      onClick={() => setSelectedTutorial(tutorial)}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                        completedTutorials.has(tutorial.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}>
                        {completedTutorials.has(tutorial.id) ? <CheckCircle2 size={12} /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{tutorial.title}</div>
                        <div className="text-gray-400 text-xs">{tutorial.duration}</div>
                      </div>
                      <ChevronRight className="text-gray-400" size={16} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}