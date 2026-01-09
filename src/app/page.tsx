import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-lg font-medium text-gray-900 tracking-tight">
            Strategic AI Academy
          </Link>
          <div className="flex gap-8 items-center">
            <Link
              href="/courses"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Capabilities
            </Link>
            <Link
              href="/diagnostic"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Diagnostic
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/manifesto"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Manifesto
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-900 border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-8 py-24">
        <div className="mb-24">
          <h1 className="text-5xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
            Learn to think strategically with AI—<br />before AI thinks for you.
          </h1>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl font-light">
            This is not a bootcamp. It is a discipline for leaders making irreversible decisions in the age of machine intelligence.
          </p>
          <p className="text-base text-gray-600 mb-16 leading-relaxed max-w-2xl">
            AI is reshaping who holds power in organizations—not through formal authority, but through the quiet delegation of judgment.
            When decisions accelerate and intelligence becomes externalized, the question is no longer whether you use AI.
            It is whether you still understand what you are approving.
          </p>
          <Link
            href="/diagnostic"
            className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
          >
            Start Assessment
          </Link>
        </div>

        {/* Capability Levels */}
        <div className="mb-32 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-light text-gray-900 mb-12">Four Levels of Judgment</h2>
          <div className="space-y-12">
            <div className="border-l-2 border-gray-300 pl-8">
              <h3 className="text-lg font-medium mb-3">Foundation</h3>
              <p className="text-gray-600 leading-relaxed">
                Remove false confidence. Understand what AI can and cannot infer. Stop making claims you cannot defend.
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-8">
              <h3 className="text-lg font-medium mb-3">Application</h3>
              <p className="text-gray-600 leading-relaxed">
                Enable independent evaluation. Know when output is plausible but wrong. Develop operational skepticism.
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-8">
              <h3 className="text-lg font-medium mb-3">Systems</h3>
              <p className="text-gray-600 leading-relaxed">
                Design AI workflows that survive scale. Understand where automation introduces fragility. Build for consequences.
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-8">
              <h3 className="text-lg font-medium mb-3">Mastery</h3>
              <p className="text-gray-600 leading-relaxed">
                Know where AI must not be used. Recognize when delegation erodes strategic capacity. Preserve decision authority.
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities Map */}
        <div className="mb-32 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-light text-gray-900 mb-12">Five Critical Capabilities</h2>
          <div className="space-y-8">
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
              <div key={i} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium mb-2">{domain.title}</h3>
                <p className="text-gray-600">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Section */}
        <div className="border-t border-gray-200 pt-16">
          <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-2xl">
            The diagnostic is not a test. It is a mirror. It shows you what you consistently misjudge when evaluating AI output.
          </p>
          <p className="text-base text-gray-600 mb-12 leading-relaxed max-w-2xl">
            Most users discover they are more confident than competent. That realization is the starting point.
          </p>
          <Link
            href="/diagnostic"
            className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
          >
            Begin Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
