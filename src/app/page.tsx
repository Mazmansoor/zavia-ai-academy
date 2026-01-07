import Link from 'next/link';
import { ArrowRight, Target, BarChart3, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Strategic AI Academy
          </Link>
          <div className="flex gap-4">
            <Link
              href="/courses"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Browse Courses
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
            <Link
              href="/diagnostic"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
            >
              Take Free Diagnostic
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Discover your AI skill gaps in 15 minutes • Get personalized learning path
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Strategic Focus</h3>
            <p className="text-gray-700">
              Learn judgment and decision-making, not just tools. Understand when and why to apply AI capabilities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Systematic Progression</h3>
            <p className="text-gray-700">
              Foundation → Application → Systems → Mastery. Clear competency levels with demonstrable outcomes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Zap className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Compressed Learning</h3>
            <p className="text-gray-700">
              15-20 minute modules with no fluff. Hands-on labs with real AI tools. Build capability, not credentials.
            </p>
          </div>
        </div>

        {/* Domains Overview */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The 5 Core AI Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'LLM Fundamentals',
                description: 'How language models work—not just surface prompting'
              },
              {
                title: 'Prompt Engineering',
                description: 'Systematic prompt design—not tips and tricks'
              },
              {
                title: 'Agentic Systems',
                description: 'Building AI that takes autonomous action'
              },
              {
                title: 'RAG & Knowledge',
                description: 'Connecting AI to your data intelligently'
              },
              {
                title: 'Strategic AI',
                description: 'Making AI decisions that create value'
              }
            ].map((domain, i) => (
              <div key={i} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <h3 className="text-xl font-bold mb-2">{domain.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{domain.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">4 levels</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">6-24 hours</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">Hands-on labs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the diagnostic to discover your skill gaps and get a personalized learning path.
          </p>
          <Link
            href="/diagnostic"
            className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Take Free Diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
