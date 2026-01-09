import Link from 'next/link';

export default function ManifestoPage() {
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
              href="/manifesto"
              className="text-sm text-gray-900 font-medium"
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
              AI Is Reshaping Power.<br />Here's Who Loses It First.
            </h1>
          </header>

          {/* Section 1 */}
          <section className="pb-16 border-b border-gray-200">
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              The people who lose power first in organizations adopting AI are not the ones who refuse to use it.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              They are the ones who delegate judgment to it without building verification systems.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              They optimize for speed. They approve output they do not fully understand. And they do not realize, until it is too late, that their authority was contingent on their judgment—not their title.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Delegation Is Not Understanding</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              When you ask AI to summarize a report, draft a strategy, or evaluate a decision, you are not augmenting your judgment.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              You are outsourcing it.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              The question is whether you retain the capacity to evaluate what comes back. Most people do not. They assume that because the output is coherent, it is correct. They mistake confidence for accuracy. They approve decisions they can no longer independently verify.
            </p>
          </section>

          {/* Section 3 */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Power Shifts Without Formal Authority Changing</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              In most organizations, the formal structure remains intact. Titles do not change. Reporting lines stay the same.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              But power migrates to those who can evaluate AI output independently.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              The VP who delegates a financial model to AI and approves it without verification loses authority to the analyst who can spot when the model is plausible but wrong. The difference is invisible at first. But it compounds. Authority flows toward judgment, not seniority.
            </p>
          </section>

          {/* Section 4 */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Judgment Erosion Is Silent</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              There is no single moment when someone realizes they have lost the capacity to evaluate decisions independently.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              It happens gradually. You delegate a task. The output is good enough. You delegate more. The feedback loop weakens. Your ability to detect errors atrophies.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              By the time you realize you are approving things you do not understand, the gap is significant. And closing it requires more than tools. It requires rebuilding judgment from first principles.
            </p>
          </section>

          {/* Section 5 */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">This Is Not a Tool Problem</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Most AI training focuses on tool fluency. How to write better prompts. How to use the latest model. How to automate workflows.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              That is not the bottleneck.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              The bottleneck is judgment. Can you tell when AI is confidently wrong? Do you know what questions to ask before approving a decision? Can you distinguish between plausible and correct?
            </p>
          </section>

          {/* Section 6 */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-8">Who This Is For</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              This is not for people optimizing productivity. It is not for people seeking shortcuts.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              It is for people making irreversible decisions in environments where AI is increasingly involved.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Directors. VPs. Strategic decision-makers. People who sign off on things that cannot be easily unwound. People who recognize that the gap between what they approve and what they understand is growing—and want to close it before it becomes permanent.
            </p>
          </section>

          {/* Section 7 */}
          <section className="pb-16">
            <h2 className="text-xl font-medium text-gray-900 mb-8">What We Do Differently</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              We do not teach tools. We do not optimize for speed. We do not offer certifications that signal competence without substance.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              We rebuild judgment.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Through systematic evaluation of AI output. Through frameworks that reveal when models are extrapolating beyond their training. Through case studies of failures that looked like successes until they did not.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              This is not fast. It is not easy. But it is the only defensible approach for people operating in high-stakes environments where delegation without verification is a liability.
            </p>
          </section>

          {/* CTA */}
          <div className="pt-16">
            <Link
              href="/diagnostic"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Take the Assessment
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
