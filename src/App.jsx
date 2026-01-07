import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const diagnosticQuestions = [
  {
    id: 1,
    domain: 'LLM Fundamentals',
    level: 'Foundation',
    question: 'An LLM generates text by:',
    options: [
      'Searching its training database for matching patterns',
      'Predicting the most statistically likely next token',
      'Following programmed rules about grammar and logic',
      'Connecting to the internet to find current information'
    ],
    correct: 1,
    explanation: 'LLMs use statistical prediction to generate the next most likely token based on training data.'
  },
  {
    id: 2,
    domain: 'LLM Fundamentals',
    level: 'Application',
    question: "You're building a contract analysis tool. Your LLM sometimes fabricates clause interpretations. The most effective immediate fix is:",
    options: [
      'Increase temperature for more creative responses',
      'Switch to a larger, more powerful model',
      'Implement retrieval-augmented generation with contract text',
      'Fine-tune the model on legal documents'
    ],
    correct: 2,
    explanation: 'RAG directly addresses hallucination by grounding responses in actual contract text.'
  },
  {
    id: 3,
    domain: 'Prompt Engineering',
    level: 'Foundation',
    question: 'Which prompt component typically has the greatest impact on output quality?',
    options: [
      'Polite phrasing ("please," "thank you")',
      'Clear task specification with examples',
      'Length of the prompt',
      'Model temperature setting'
    ],
    correct: 1,
    explanation: 'Clear task specification with examples (few-shot learning) has the most significant impact on quality.'
  },
  {
    id: 4,
    domain: 'Agentic Systems',
    level: 'Foundation',
    question: 'An "agentic" AI system differs from a standard LLM chatbot by:',
    options: [
      'Using a more powerful underlying model',
      'Having the ability to take actions and use tools autonomously',
      'Being more polite and conversational',
      'Having memory of previous conversations'
    ],
    correct: 1,
    explanation: 'Agency means the ability to take actions and use tools autonomously.'
  },
  {
    id: 5,
    domain: 'RAG & Knowledge',
    level: 'Foundation',
    question: 'Retrieval-Augmented Generation (RAG) improves LLM outputs by:',
    options: [
      'Training the model on more data',
      'Retrieving relevant information to include in the prompt context',
      'Generating multiple responses and choosing the best one',
      "Increasing the model's parameter count"
    ],
    correct: 1,
    explanation: 'RAG retrieves relevant information at inference time to include in context.'
  },
  {
    id: 6,
    domain: 'Strategic AI',
    level: 'Foundation',
    question: 'The primary reason most AI projects fail in enterprises:',
    options: [
      'Insufficient computing power',
      'Poor model accuracy',
      'Lack of clear business value or organizational alignment',
      'Wrong algorithm selection'
    ],
    correct: 2,
    explanation: 'AI failure is usually strategic/organizational rather than technical.'
  }
];

const courseCatalog = {
  'llm-fundamentals': {
    id: 'llm-fundamentals',
    domain: 'LLM Fundamentals',
    description: 'How language models work—not just surface prompting',
    tracks: {
      foundation: { level: 'Foundation', duration: '8 hours', modules: 12, locked: false },
      application: { level: 'Application', duration: '12 hours', modules: 16, locked: true },
      systems: { level: 'Systems', duration: '16 hours', modules: 20, locked: true },
      mastery: { level: 'Mastery', duration: '20 hours', modules: 24, locked: true }
    }
  },
  'prompt-engineering': {
    id: 'prompt-engineering',
    domain: 'Prompt Engineering',
    description: 'Systematic prompt design—not tips and tricks',
    tracks: {
      foundation: { level: 'Foundation', duration: '6 hours', modules: 10, locked: false },
      application: { level: 'Application', duration: '10 hours', modules: 14, locked: true },
      systems: { level: 'Systems', duration: '14 hours', modules: 18, locked: true },
      mastery: { level: 'Mastery', duration: '18 hours', modules: 22, locked: true }
    }
  },
  'agentic-systems': {
    id: 'agentic-systems',
    domain: 'Agentic Systems',
    description: 'Building AI that takes autonomous action',
    tracks: {
      foundation: { level: 'Foundation', duration: '10 hours', modules: 12, locked: false },
      application: { level: 'Application', duration: '14 hours', modules: 16, locked: true },
      systems: { level: 'Systems', duration: '18 hours', modules: 20, locked: true },
      mastery: { level: 'Mastery', duration: '24 hours', modules: 26, locked: true }
    }
  },
  'rag-knowledge': {
    id: 'rag-knowledge',
    domain: 'RAG & Knowledge',
    description: 'Connecting AI to your data intelligently',
    tracks: {
      foundation: { level: 'Foundation', duration: '8 hours', modules: 11, locked: false },
      application: { level: 'Application', duration: '12 hours', modules: 15, locked: true },
      systems: { level: 'Systems', duration: '16 hours', modules: 19, locked: true },
      mastery: { level: 'Mastery', duration: '20 hours', modules: 23, locked: true }
    }
  },
  'strategic-ai': {
    id: 'strategic-ai',
    domain: 'Strategic AI',
    description: 'Making AI decisions that create value',
    tracks: {
      foundation: { level: 'Foundation', duration: '8 hours', modules: 11, locked: false },
      application: { level: 'Application', duration: '12 hours', modules: 15, locked: true },
      systems: { level: 'Systems', duration: '16 hours', modules: 19, locked: true },
      mastery: { level: 'Mastery', duration: '24 hours', modules: 25, locked: true }
    }
  }
};

const domains = ['LLM Fundamentals', 'Prompt Engineering', 'Agentic Systems', 'RAG & Knowledge', 'Strategic AI'];

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [diagnosticStarted, setDiagnosticStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [diagnosticComplete, setDiagnosticComplete] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const handleStartDiagnostic = () => {
    setDiagnosticStarted(true);
    setCurrentView('diagnostic');
  };

  const handleAnswer = (answerIndex) => {
    setAnswers({...answers, [diagnosticQuestions[currentQ].id]: answerIndex});
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQ < diagnosticQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowEmailCapture(true);
    }
  };

  const handleEmailSubmit = () => {
    if (userEmail && userEmail.includes('@')) {
      const results = calculateResults();
      setDiagnosticResults(results);
      setDiagnosticComplete(true);
      setShowEmailCapture(false);
    }
  };

  const skipEmail = () => {
    const results = calculateResults();
    setDiagnosticResults(results);
    setDiagnosticComplete(true);
    setShowEmailCapture(false);
  };

  const calculateResults = () => {
    const domainScores = {};
    domains.forEach(domain => {
      const domainQuestions = diagnosticQuestions.filter(q => q.domain === domain);
      const correct = domainQuestions.filter(q => answers[q.id] === q.correct).length;
      domainScores[domain] = domainQuestions.length > 0 ? Math.round((correct / domainQuestions.length) * 100) : 0;
    });

    const totalCorrect = diagnosticQuestions.filter(q => answers[q.id] === q.correct).length;
    const overallScore = Math.round((totalCorrect / diagnosticQuestions.length) * 100);

    let level = 'Foundation';
    if (overallScore >= 86) level = 'Mastery';
    else if (overallScore >= 66) level = 'Systems';
    else if (overallScore >= 41) level = 'Application';

    const recommendations = Object.entries(domainScores)
      .filter(([_, score]) => score < 60)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3)
      .map(([domain]) => domain);

    return { domainScores, overallScore, level, recommendations };
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Strategic AI Academy</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentView('platform')}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Browse Courses
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            From Foundation to Mastery<br />in Strategic AI
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            The Anti-Bootcamp: Compressed, rigorous training that builds judgment—not just tool knowledge.
            Go from knowing nothing to making AI decisions that create enterprise value.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleStartDiagnostic}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Take Free Diagnostic
            </button>
            <button
              onClick={() => setCurrentView('platform')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Courses
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Discover your AI skill gaps in 15 minutes • Get personalized learning path
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Strategic Focus</h3>
            <p className="text-gray-700">
              Learn judgment and decision-making, not just tools. Understand when and why to apply AI capabilities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Systematic Progression</h3>
            <p className="text-gray-700">
              Foundation → Application → Systems → Mastery. Clear competency levels with demonstrable outcomes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Compressed Learning</h3>
            <p className="text-gray-700">
              15-20 minute modules with no fluff. Hands-on labs with real AI tools. Build capability, not credentials.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The 5 Core AI Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(courseCatalog).map(course => (
              <div key={course.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <h3 className="text-xl font-bold mb-2">{course.domain}</h3>
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">4 levels</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">6-24 hours</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">Hands-on labs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the diagnostic to discover your skill gaps and get a personalized learning path.
          </p>
          <button
            onClick={handleStartDiagnostic}
            className="bg-white text-blue-600 px-12 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Take Free Diagnostic
          </button>
        </div>
      </div>
    </div>
  );

  const renderDiagnostic = () => {
    if (showEmailCapture) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Diagnostic Complete!</h2>
              <p className="text-gray-700">Get your results and personalized learning path.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Get My Results
              </button>
              <button
                onClick={skipEmail}
                className="w-full text-gray-600 text-sm hover:text-gray-800"
              >
                Skip, show results now
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (diagnosticComplete) {
      const radarData = domains.map(domain => ({
        domain: domain.split(' ')[0],
        score: diagnosticResults.domainScores[domain] || 0
      }));

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Your AI Competency Results</h1>
                <div className="inline-block bg-blue-100 px-8 py-4 rounded-xl">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{diagnosticResults.overallScore}%</div>
                  <div className="text-xl text-gray-700">Overall Score</div>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">{diagnosticResults.level} Level</div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Competency by Domain</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="domain" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name="Your Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {diagnosticResults.recommendations.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Recommended Learning Path</h3>
                  <p className="text-gray-700 mb-4">Based on your results, start with these domains:</p>
                  <div className="space-y-3">
                    {diagnosticResults.recommendations.map((domain, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-900">{i + 1}. {domain}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center space-y-4">
                <button
                  onClick={() => setCurrentView('platform')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg"
                >
                  Start Learning Now
                </button>
                <div>
                  <button
                    onClick={() => setCurrentView('landing')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const question = diagnosticQuestions[currentQ];
    const isAnswered = answers[question.id] !== undefined;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">Question {currentQ + 1} of {diagnosticQuestions.length}</div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{question.domain}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQ + 1) / diagnosticQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-8">{question.question}</h2>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isAnswered && handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    !isAnswered
                      ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                      : answers[question.id] === index
                      ? index === question.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="font-semibold mr-3 text-gray-600">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {isAnswered && index === question.correct && (
                      <span className="text-green-600 font-bold ml-2">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            )}

            {showExplanation && (
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                {currentQ < diagnosticQuestions.length - 1 ? 'Next Question' : 'Complete Diagnostic'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPlatform = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => setCurrentView('landing')}
            >
              Strategic AI Academy
            </h1>
            <div className="hidden md:flex space-x-6">
              <button className="text-gray-700 hover:text-blue-600 font-medium">Courses</button>
              <button className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</button>
              <button className="text-gray-700 hover:text-blue-600 font-medium">Community</button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!diagnosticComplete && (
              <button
                onClick={handleStartDiagnostic}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Take Diagnostic
              </button>
            )}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-700">
            Systematic progression from Foundation to Mastery across 5 AI domains
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {Object.values(courseCatalog).map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{course.domain}</h2>
                <p className="text-gray-600">{course.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.values(course.tracks).map(track => (
                  <div
                    key={track.level}
                    className={`border-2 rounded-lg p-4 ${
                      track.locked
                        ? 'border-gray-200 bg-gray-50 opacity-60'
                        : 'border-blue-200 bg-blue-50 hover:border-blue-400 cursor-pointer'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{track.level}</h3>
                      {track.locked && <span className="text-gray-400 text-sm">🔒</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{track.duration}</p>
                    <p className="text-xs text-gray-500">{track.modules} modules</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Strategic AI Academy and build real AI capability from Foundation to Mastery
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 font-semibold">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentView === 'landing' && renderLanding()}
      {currentView === 'diagnostic' && renderDiagnostic()}
      {currentView === 'platform' && renderPlatform()}
    </>
  );
}
