'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function PrimerContentPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (status === 'unauthenticated') {
        router.push('/login?redirect=/primer/content');
        return;
      }

      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/primer/access');
          const data = await response.json();

          if (data.hasAccess) {
            setHasAccess(true);
          } else {
            router.push('/primer');
          }
        } catch (error) {
          console.error('Access check failed:', error);
          router.push('/primer');
        } finally {
          setIsChecking(false);
        }
      }
    };

    checkAccess();
  }, [status, router]);

  if (isChecking || status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Verifying access...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-lg font-medium text-gray-900 tracking-tight">
            Strategic AI Academy
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-24">
        <article className="space-y-16">
          {/* Header */}
          <header className="mb-24">
            <div className="text-sm text-gray-400 mb-4">Strategic AI Judgment Primer</div>
            <h1 className="text-4xl font-light text-gray-900 mb-8 leading-tight">
              Evaluating AI Output in High-Stakes Decisions
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              This primer focuses on three specific failure modes that occur when decision-makers delegate judgment to AI without verification systems. Each case study is drawn from real scenarios where plausible-sounding output led to organizational errors.
            </p>
          </header>

          {/* Introduction */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-2xl font-light text-gray-900 mb-8">How to Use This Material</h2>
            <div className="space-y-6 text-base text-gray-700 leading-relaxed">
              <p>
                Read slowly. Each case is designed to reveal a specific pattern of misjudgment that occurs when evaluating AI output under time pressure.
              </p>
              <p>
                Do not skip to the solutions. The value is in recognizing where your own judgment would have failed—and building the systematic verification habits that prevent those failures.
              </p>
              <p>
                After completing all three cases, you will have a decision framework you can apply immediately to any AI-assisted decision in your organization.
              </p>
            </div>
          </section>

          {/* Case Study 1 */}
          <section className="pb-16 border-b border-gray-200">
            <div className="mb-12">
              <div className="text-sm text-gray-400 mb-4">Case Study 1</div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Financial Model Interpolation
              </h2>
              <p className="text-base text-gray-600 italic">
                When AI generates metrics that were never in the source material
              </p>
            </div>

            {/* Scenario */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">The Scenario</h3>
              <div className="bg-gray-50 border border-gray-200 p-8 mb-6">
                <p className="text-base text-gray-700 mb-4">
                  <strong>Context:</strong> You are a VP preparing for a board meeting. You ask an LLM to summarize your Q3 financial report (47 pages) into key talking points.
                </p>
                <p className="text-base text-gray-700 mb-4">
                  <strong>Prompt:</strong> "Summarize Q3 revenue trends and identify key growth drivers."
                </p>
                <p className="text-base text-gray-700 mb-4">
                  <strong>Output:</strong> "Q3 revenue increased 18% year-over-year, driven primarily by enterprise adoption in healthcare and sustained growth in manufacturing verticals. Customer acquisition costs declined 12%, improving unit economics. The shift toward annual contracts contributed to improved cash flow predictability."
                </p>
                <p className="text-base text-gray-700">
                  <strong>Question:</strong> What verification step is most critical before presenting this to the board?
                </p>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Most executives would check:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
                <li>Is the 18% growth rate accurate?</li>
                <li>Are healthcare and manufacturing the correct verticals?</li>
                <li>Does the cash flow claim make sense?</li>
              </ul>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong>All of these miss the actual problem.</strong>
              </p>
            </div>

            {/* Analysis */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">What Actually Happened</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                The Q3 report contained no data on customer acquisition costs. The model inferred that this metric <em>should</em> be included based on the prompt structure—not because it was in the document.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                The 18% growth rate was accurate. The verticals were accurate. The cash flow statement was accurate. But the CAC claim was entirely fabricated—and plausible enough that it would have passed executive review.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                <strong>The failure mode:</strong> LLMs interpolate what belongs in a financial summary based on training data, not what's actually in your specific document. The output is coherent, professionally formatted, and confidently wrong.
              </p>
            </div>

            {/* Framework */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Verification Framework</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 1: Source Verification</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Before checking if a metric is <em>accurate</em>, verify that it exists in the source document at all. Search for the specific term ("customer acquisition cost") in the original material.
                  </p>
                </div>
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 2: Interpolation Detection</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ask: "Does this claim require information that would typically appear in this type of document but may not be in this specific document?" CAC is a standard financial metric—but that doesn't mean your report included it.
                  </p>
                </div>
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 3: Cross-Reference Audit</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For any quantitative claim, locate the corresponding section in the source document and confirm the number appears exactly as stated. If you cannot find it in 30 seconds, assume it was interpolated.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Case Study 2 */}
          <section className="pb-16 border-b border-gray-200">
            <div className="mb-12">
              <div className="text-sm text-gray-400 mb-4">Case Study 2</div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Strategic Recommendation Drift
              </h2>
              <p className="text-base text-gray-600 italic">
                When AI suggests actions that contradict earlier constraints
              </p>
            </div>

            {/* Scenario */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">The Scenario</h3>
              <div className="bg-gray-50 border border-gray-200 p-8 mb-6">
                <p className="text-base text-gray-700 mb-4">
                  <strong>Context:</strong> You are evaluating a strategic recommendation generated by an LLM based on a 12-page internal memo about market expansion.
                </p>
                <p className="text-base text-gray-700 mb-4">
                  <strong>Constraint (Page 3):</strong> "Any expansion strategy must avoid regulatory exposure in European markets until Q2 2026 at earliest."
                </p>
                <p className="text-base text-gray-700 mb-4">
                  <strong>AI Output (Page 9 equivalent):</strong> "Recommended approach: Prioritize UK and German markets in Q1 2026 to establish early presence ahead of competitors. Regulatory frameworks in both regions are favorable for rapid deployment."
                </p>
                <p className="text-base text-gray-700">
                  <strong>Question:</strong> What went wrong?
                </p>
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                The recommendation directly contradicts the constraint specified three sections earlier—but the output <em>sounds strategically coherent</em> in isolation.
              </p>
            </div>

            {/* Analysis */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">What Actually Happened</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                LLMs process information sequentially but do not maintain perfect coherence across long documents. A constraint mentioned early in a prompt may not fully propagate to conclusions generated later—especially if the constraint is stated once and not reinforced.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                The model generated a plausible market expansion strategy based on competitive positioning, regulatory favorability, and timing—all valid strategic considerations. But it failed to maintain the hard constraint about European regulatory exposure.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                <strong>The failure mode:</strong> Strategic drift occurs when AI recommendations are locally coherent but globally inconsistent with earlier constraints. Human executives miss this because they evaluate each section for plausibility, not cross-document coherence.
              </p>
            </div>

            {/* Framework */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Verification Framework</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 1: Constraint Mapping</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Before evaluating recommendations, explicitly list all hard constraints mentioned in the source material. Treat these as invariants that must hold across all output.
                  </p>
                </div>
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 2: Contradiction Testing</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For each recommended action, systematically check it against your constraint list. Ask: "Does this action violate any stated constraints?" Do not rely on the model to self-check.
                  </p>
                </div>
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 3: Prompt Reinforcement</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    When generating strategic recommendations, restate critical constraints at the end of your prompt: "Reminder: All recommendations must avoid European regulatory exposure until Q2 2026." This reduces drift but does not eliminate it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Case Study 3 */}
          <section className="pb-16 border-b border-gray-200">
            <div className="mb-12">
              <div className="text-sm text-gray-400 mb-4">Case Study 3</div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Confidence Without Accuracy
              </h2>
              <p className="text-base text-gray-600 italic">
                When internally consistent logic produces fundamentally incorrect conclusions
              </p>
            </div>

            {/* Scenario */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">The Scenario</h3>
              <div className="bg-gray-50 border border-gray-200 p-8 mb-6">
                <p className="text-base text-gray-700 mb-4">
                  <strong>Context:</strong> You ask an LLM to evaluate whether your company should invest in expanding warehouse capacity based on projected demand growth.
                </p>
                <p className="text-base text-gray-700 mb-4">
                  <strong>Prompt:</strong> "Based on our Q3 sales data showing 22% quarter-over-quarter growth, should we invest in additional warehouse capacity in Q1?"
                </p>
                <p className="text-base text-gray-700 mb-4">
                  <strong>Output:</strong> "Yes. A 22% QoQ growth rate sustained over two quarters suggests strong demand trajectory. Warehouse capacity constraints will become a bottleneck by Q2 if current trends continue. Early investment reduces risk of fulfillment delays during peak season. Recommended investment: $2.4M for 40,000 sq ft expansion, ROI positive within 18 months based on current growth velocity."
                </p>
                <p className="text-base text-gray-700">
                  <strong>Question:</strong> What critical information is missing from this analysis?
                </p>
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                The logic is internally consistent. The reasoning is coherent. The recommendation sounds confident. But it is based on incomplete information.
              </p>
            </div>

            {/* Analysis */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">What Actually Happened</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                The model did not ask whether 22% QoQ growth is sustainable. It did not ask about seasonality. It did not ask about current warehouse utilization. It did not ask about capital constraints. It simply took the growth rate as a given and extrapolated linearly.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                In the real scenario this is based on, the 22% growth was driven by a one-time promotion. Baseline growth was 6%. Current warehouse utilization was 73%. The $2.4M investment would have been a mistake.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                <strong>The failure mode:</strong> LLMs optimize for coherent, confident answers based on the information provided. They do not systematically identify what information is <em>missing</em>. Human executives approve the recommendation because it sounds strategically sound—without recognizing that the question itself was incomplete.
              </p>
            </div>

            {/* Framework */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Verification Framework</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 1: Information Completeness Audit</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Before evaluating any recommendation, list the critical variables that would inform the decision. Then check: Did the AI have access to all of them? For warehouse expansion: growth sustainability, seasonality, current utilization, capital availability, lead times.
                  </p>
                </div>
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 2: Assumption Surfacing</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ask the model: "What assumptions are you making in this recommendation?" Then verify each assumption independently. In this case, the model assumed sustained growth—but did not state it explicitly.
                  </p>
                </div>
                <div className="border-l-2 border-gray-400 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-2">Step 3: Disconfirming Evidence Check</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For any high-stakes recommendation, deliberately search for evidence that would disprove it. Ask: "What data would make this recommendation wrong?" If you cannot think of any, you are anchored to the AI's confidence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Synthesis */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-2xl font-light text-gray-900 mb-8">Synthesis: A Decision Framework</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-12">
              These three cases represent the most common judgment failures when evaluating AI output. Together, they form a systematic verification framework you can apply to any AI-assisted decision:
            </p>

            <div className="space-y-8">
              <div className="border border-gray-200 p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Before Approving Any AI Output:</h3>
                <ol className="space-y-4 text-base text-gray-700">
                  <li className="leading-relaxed">
                    <strong>1. Source Verification:</strong> Confirm that all quantitative claims exist in the source material—not just that they sound plausible.
                  </li>
                  <li className="leading-relaxed">
                    <strong>2. Constraint Checking:</strong> Verify that recommendations do not contradict constraints stated earlier in the document or decision context.
                  </li>
                  <li className="leading-relaxed">
                    <strong>3. Information Completeness:</strong> Identify what critical information is <em>missing</em> from the analysis, not just whether the provided information is correct.
                  </li>
                  <li className="leading-relaxed">
                    <strong>4. Assumption Surfacing:</strong> Explicitly list the assumptions the AI is making, then verify each one independently.
                  </li>
                  <li className="leading-relaxed">
                    <strong>5. Disconfirming Evidence:</strong> Actively search for data that would disprove the recommendation—do not rely on the AI to self-critique.
                  </li>
                </ol>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed mt-12">
              This is not fast. It is not automated. But it is the only defensible approach for high-stakes decisions where delegation without verification creates organizational risk.
            </p>
          </section>

          {/* Application */}
          <section className="pb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8">Applying This Framework</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-8">
              The next time you receive AI-generated output for a decision that matters, use this checklist:
            </p>

            <div className="bg-gray-50 border border-gray-200 p-8 mb-12">
              <ul className="space-y-3 text-base text-gray-700">
                <li>□ Have I verified that all quantitative claims exist in the source material?</li>
                <li>□ Have I checked for constraint violations?</li>
                <li>□ Have I identified what critical information is missing?</li>
                <li>□ Have I surfaced and verified the AI's assumptions?</li>
                <li>□ Have I searched for disconfirming evidence?</li>
              </ul>
            </div>

            <p className="text-base text-gray-700 leading-relaxed">
              If you cannot answer yes to all five, you are approving something you do not fully understand. That is the definition of judgment erosion.
            </p>
          </section>

          {/* Next Steps */}
          <div className="pt-16 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Continue Building Judgment</h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              This primer covers the foundational verification framework. For systematic training across all decision domains, explore the full capabilities.
            </p>
            <div className="flex gap-6">
              <Link
                href="/courses"
                className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
              >
                View Full Capabilities
              </Link>
              <Link
                href="/dashboard"
                className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors py-3"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
