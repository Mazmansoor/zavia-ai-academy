import Link from 'next/link';

export default function HowItWorksPage() {
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
              className="text-sm text-gray-900 font-medium"
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
            <h1 className="text-4xl font-light text-gray-900 mb-8 leading-tight">
              How This Actually Works
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Most AI training is a black box. You pay. You get content. You trust it works.
              We show you exactly what we do and why.
            </p>
          </header>

          {/* Section 1: Real Lab Prompt */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Example: A Real Lab Prompt</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              In the Foundation level of LLM Fundamentals, users encounter this scenario:
            </p>
            <div className="bg-gray-50 border border-gray-200 p-6 mb-6 font-mono text-sm">
              <p className="text-gray-700 mb-4">
                <strong>Context:</strong> You are evaluating output from an LLM summarizing a financial report.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Prompt:</strong> "Summarize Q3 revenue trends and identify key growth drivers."
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Output:</strong> "Q3 revenue increased 18% year-over-year, driven primarily by enterprise adoption in healthcare and sustained growth in manufacturing verticals. Customer acquisition costs declined 12%, improving unit economics."
              </p>
              <p className="text-gray-700">
                <strong>Question:</strong> What verification step is most critical before presenting this to executives?
              </p>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              The correct answer is not "check the math." It is: <strong>Verify that the report contained data on customer acquisition costs.</strong>
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              LLMs frequently interpolate plausible-sounding metrics that were never in the source material. The model inferred what <em>should</em> be included based on the prompt structure—not what <em>was</em> included in the document.
            </p>
          </section>

          {/* Section 2: Decision Framework */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Example: A Decision Framework</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              At the Systems level, users apply this framework before deploying AI in production:
            </p>
            <div className="space-y-6 mb-6">
              <div className="border-l-2 border-gray-300 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">1. Failure Mode Analysis</h3>
                <p className="text-sm text-gray-600">What happens when this AI component produces incorrect output? Can the system detect it? What is the recovery path?</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">2. Verification Boundaries</h3>
                <p className="text-sm text-gray-600">Where can output be verified programmatically? Where does it require human judgment? What is the cost of false positives vs. false negatives?</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">3. Degradation Gracefully</h3>
                <p className="text-sm text-gray-600">If this AI component fails, does the system fail catastrophically or degrade to a manual fallback?</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">4. Operational Visibility</h3>
                <p className="text-sm text-gray-600">Can you measure when the model is operating outside its training distribution? Do you have dashboards that surface drift?</p>
              </div>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              This is not taught as theory. It is applied to real deployment scenarios where students must identify failure modes that were not immediately obvious.
            </p>
          </section>

          {/* Section 3: Failure Case */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Example: When Plausible Is Not Correct</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              At the Application level, users analyze this case study:
            </p>
            <div className="bg-gray-50 border border-gray-200 p-6 mb-6">
              <p className="text-sm text-gray-700 mb-4">
                <strong>Scenario:</strong> A consulting firm used an LLM to draft competitive analysis reports. Output quality was high. Clients were satisfied. The firm scaled the process across 40+ engagements.
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>What went wrong:</strong> In 6 cases, the LLM cited competitor product features that did not exist. The features were plausible extrapolations based on industry trends—but they were not real.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Why it was not caught:</strong> Senior consultants reviewed the reports. The invented features were adjacent to real ones. The writing was coherent. The recommendations were sound <em>if the features had existed.</em> No one verified the factual claims because the output "felt right."
              </p>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              <strong>What this teaches:</strong>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="text-base text-gray-700 leading-relaxed">• Plausibility is not accuracy. LLMs optimize for coherence, not truth.</li>
              <li className="text-base text-gray-700 leading-relaxed">• Expert review is insufficient if the expert cannot verify every factual claim.</li>
              <li className="text-base text-gray-700 leading-relaxed">• Confidence correlates with training data coverage—not correctness.</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed">
              Users work through similar scenarios and develop heuristics for when to trust AI output conditionally vs. when to require hard verification.
            </p>
          </section>

          {/* Section 4: What This Is Not */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">What This Is Not</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              This is not prompt engineering tips. It is not tool tutorials. It is not certification prep.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              It is systematic training in evaluating AI output under conditions where mistakes are costly and detection is non-trivial.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              The goal is not to make you faster. The goal is to make you correct.
            </p>
          </section>

          {/* Section 5: Why Transparency Matters */}
          <section className="pb-16">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Why We Show This</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Most advanced users distrust training programs that do not show methodology upfront.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              If you are making high-stakes decisions, you need to know what you are buying. Not marketing promises. Not vague outcomes. The actual structure of what we teach and why.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              This page exists to let you evaluate whether the approach is rigorous before you commit time to it.
            </p>
          </section>

          {/* CTA */}
          <div className="pt-16">
            <Link
              href="/courses"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              View Capabilities
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
