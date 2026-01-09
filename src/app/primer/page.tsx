import Link from 'next/link';

export default function PrimerPage() {
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

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-24">
        <article className="space-y-16">
          {/* Title */}
          <header className="mb-24">
            <div className="text-sm text-gray-400 mb-4">90-Minute Deep Dive</div>
            <h1 className="text-4xl font-light text-gray-900 mb-8 leading-tight">
              Strategic AI Judgment Primer
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A systematic introduction to evaluating AI output in high-stakes decisions.
            </p>
          </header>

          {/* What This Is */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">What This Is</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              This is not a course on prompting techniques. It is not a survey of AI tools. It is not productivity optimization.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              This is 90 minutes of systematic training on the specific failure modes that occur when decision-makers delegate judgment to AI without verification systems.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              You will work through real scenarios where AI output was plausible, confident, and wrong—and learn the exact verification steps that would have caught each error before it reached executives.
            </p>
          </section>

          {/* What You'll Do */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">What You'll Do</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-gray-400 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Case 1: Financial Model Interpolation
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  An LLM generates a quarterly summary with plausible-sounding metrics that were never in the source document. You'll identify the exact verification step that catches this before it reaches the board.
                </p>
              </div>
              <div className="border-l-2 border-gray-400 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Case 2: Strategic Recommendation Drift
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  AI suggests a course of action that sounds strategically coherent but contradicts constraints specified three paragraphs earlier. You'll learn why human executives miss this and how to design prompts that prevent it.
                </p>
              </div>
              <div className="border-l-2 border-gray-400 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Case 3: Confidence Without Accuracy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A model produces a confident analysis with internally consistent logic that is fundamentally incorrect. You'll develop a systematic framework for distinguishing coherence from correctness.
                </p>
              </div>
            </div>
          </section>

          {/* Who This Is For */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Who This Is For</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Directors, VPs, and senior managers who sign off on AI-assisted decisions and need to verify output before it becomes organizational reality.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              This is for people who recognize that the gap between approving something and understanding it is growing—and want to close that gap before it becomes permanent.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              If you are optimizing for productivity, this is not for you. If you are preserving judgment, this is exactly what you need.
            </p>
          </section>

          {/* Format */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Format</h2>
            <div className="space-y-4 text-base text-gray-700">
              <p className="leading-relaxed">
                <span className="font-medium text-gray-900">90 minutes total.</span> Self-paced.
              </p>
              <p className="leading-relaxed">
                <span className="font-medium text-gray-900">3 case studies.</span> Each with real failure scenarios, systematic analysis, and decision frameworks you can apply immediately.
              </p>
              <p className="leading-relaxed">
                <span className="font-medium text-gray-900">Written format.</span> No videos. Designed for slow reading and deliberate thought.
              </p>
              <p className="leading-relaxed">
                <span className="font-medium text-gray-900">Lifetime access.</span> Return to the material as often as needed.
              </p>
            </div>
          </section>

          {/* What This Is Not */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">What This Is Not</h2>
            <ul className="space-y-3 text-base text-gray-600">
              <li className="leading-relaxed">• Not a comprehensive course (see full capabilities for that)</li>
              <li className="leading-relaxed">• Not tool training or prompt engineering</li>
              <li className="leading-relaxed">• Not productivity optimization</li>
              <li className="leading-relaxed">• Not beginner-friendly if you've never used AI in decision-making</li>
            </ul>
          </section>

          {/* Pricing */}
          <section className="pb-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-xl font-medium text-gray-900">Investment</h2>
              <div className="text-3xl font-light text-gray-900">$147</div>
            </div>
            <p className="text-base text-gray-600 mb-12 leading-relaxed">
              One-time payment. Lifetime access. No subscription.
            </p>
            <Link
              href="/primer/checkout"
              className="inline-block border-2 border-gray-900 text-gray-900 px-12 py-4 text-base font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Purchase Primer
            </Link>
            <p className="text-sm text-gray-500 mt-6">
              Requires account. <Link href="/signup" className="border-b border-gray-400 hover:border-gray-900 transition-colors">Create one here</Link> if you don't have one yet.
            </p>
          </section>

          {/* Alternative Path */}
          <div className="pt-16 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-6">
              Not ready to commit? <Link href="/diagnostic" className="text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors">Take the diagnostic</Link> first to understand your current judgment patterns.
            </p>
            <p className="text-sm text-gray-600">
              Looking for comprehensive training? View <Link href="/courses" className="text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors">full capabilities</Link>.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
