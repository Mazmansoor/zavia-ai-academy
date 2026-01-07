'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { domains } from '@/lib/constants';

interface DiagnosticResults {
  domainScores: Record<string, number>;
  overallScore: number;
  level: string;
  recommendations: string[];
}

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  const radarData = domains.map(domain => ({
    domain: domain.split(' ')[0],
    score: results.domainScores[domain] || 0
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Your AI Competency Results</h1>
            <div className="inline-block bg-blue-100 px-8 py-4 rounded-xl">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {results.overallScore}%
              </div>
              <div className="text-xl text-gray-700">Overall Score</div>
              <div className="text-2xl font-semibold text-gray-900 mt-2">
                {results.level} Level
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Competency by Domain
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="domain" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">
                Recommended Learning Path
              </h3>
              <p className="text-gray-700 mb-4">
                Based on your results, start with these domains:
              </p>
              <div className="space-y-3">
                {results.recommendations.map((domain, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-gray-900">
                      {i + 1}. {domain}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Score: {results.domainScores[domain]}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="text-center space-y-4">
            <Link
              href="/courses"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
            >
              Start Learning Now
            </Link>
            <div>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
