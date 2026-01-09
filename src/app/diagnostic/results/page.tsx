'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DiagnosticResults {
  archetype: string;
  answerPattern: Record<number, number>;
  totalQuestions: number;
}

const archetypes = {
  'systems-thinker': {
    title: 'The Systems Thinker',
    subtitle: 'Rare',
    description: 'You understand both capabilities and limitations. You recognize when AI output is plausible but wrong. You think in terms of failure modes, not just success cases.',
    misjudgment: 'Your risk: overengineering. You may delay decisions while seeking certainty that does not exist.',
    recommendation: 'Systems',
    note: 'You are equipped to design AI workflows that survive contact with reality. Your challenge is knowing when simplicity serves better than sophistication.'
  },
  'systematic-skeptic': {
    title: 'The Systematic Skeptic',
    subtitle: 'Methodical',
    description: 'You question AI output instinctively. You recognize that confidence is not accuracy. You have developed operational skepticism.',
    misjudgment: 'What you consistently miss: the boundary between healthy skepticism and analysis paralysis. You distrust AI but lack frameworks for when to trust it conditionally.',
    recommendation: 'Application',
    note: 'You need structured methods for evaluation—not more doubt, but better tools for calibrating doubt.'
  },
  'strategic-non-practitioner': {
    title: 'The Strategic Non-Practitioner',
    subtitle: 'Conceptually Sound',
    description: 'You understand AI strategy. You can articulate value propositions and identify use cases. But your judgments are theoretical.',
    misjudgment: 'What you consistently miss: the distance between plausible and correct. You approve AI decisions without the ground truth to verify them.',
    recommendation: 'Foundation',
    note: 'You need hands-on pattern recognition before your strategic thinking becomes operationally useful.'
  },
  'tool-fluent-novice': {
    title: 'The Tool-Fluent Novice',
    subtitle: 'Competent with Interfaces',
    description: 'You know how to use AI tools. You can generate output quickly. But you lack the judgment to evaluate that output independently.',
    misjudgment: 'What you consistently miss: when AI is confidently wrong. You mistake fluency for competence. You delegate evaluation to the tool itself.',
    recommendation: 'Foundation',
    note: 'Your fluency makes you dangerous. You move fast but cannot detect when you are moving in the wrong direction.'
  },
  'overconfident-delegator': {
    title: 'The Overconfident Delegator',
    subtitle: 'High Risk',
    description: 'You delegate judgment to AI without verification systems. You assume output is correct unless proven otherwise. You optimize for speed, not accuracy.',
    misjudgment: 'What you consistently miss: almost everything. You do not yet recognize what good judgment looks like when evaluating AI output.',
    recommendation: 'Foundation',
    note: 'You are operating with false confidence. The gap between what you approve and what you understand is significant and growing.'
  }
};

export default function DiagnosticResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<DiagnosticResults | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('diagnosticResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/diagnostic');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    );
  }

  const archetype = archetypes[results.archetype as keyof typeof archetypes];

  if (!archetype) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm text-gray-600">Unable to determine archetype</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-8 py-24">
        {/* Archetype Title */}
        <div className="mb-16">
          <div className="text-sm text-gray-400 mb-4">{archetype.subtitle}</div>
          <h1 className="text-4xl font-light text-gray-900 mb-8 leading-tight">
            {archetype.title}
          </h1>
        </div>

        {/* Description */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {archetype.description}
          </p>
        </div>

        {/* What You Miss */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-6">What You Consistently Miss</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {archetype.misjudgment}
          </p>
        </div>

        {/* Recommendation */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Where to Begin</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            {archetype.note}
          </p>
          <p className="text-sm text-gray-500">
            Recommended starting level: <span className="text-gray-900 font-medium">{archetype.recommendation}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <Link
            href="/courses"
            className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
          >
            View Capabilities
          </Link>
          <div>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 border-b border-gray-300 hover:border-gray-900 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
