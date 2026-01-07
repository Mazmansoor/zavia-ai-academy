'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { diagnosticQuestions, domains } from '@/lib/constants';

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = diagnosticQuestions[currentQ];
  const isAnswered = answers[question.id] !== undefined;
  const progress = ((currentQ + 1) / diagnosticQuestions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [question.id]: answerIndex });
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

  const calculateResults = () => {
    const domainScores: Record<string, number> = {};
    domains.forEach(domain => {
      const domainQuestions = diagnosticQuestions.filter(q => q.domain === domain);
      const correct = domainQuestions.filter(q => answers[q.id] === q.correct).length;
      domainScores[domain] = domainQuestions.length > 0
        ? Math.round((correct / domainQuestions.length) * 100)
        : 0;
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

  const handleSubmitResults = async (skipEmail: boolean = false) => {
    setIsSubmitting(true);
    try {
      const results = calculateResults();

      // Save to database
      await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: skipEmail ? '' : userEmail,
          ...results
        })
      });

      // Store in sessionStorage for results page
      sessionStorage.setItem('diagnosticResults', JSON.stringify(results));
      router.push('/diagnostic/results');
    } catch (error) {
      console.error('Error saving results:', error);
      alert('Error saving results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => handleSubmitResults(false)}
              disabled={isSubmitting || (!userEmail && !isSubmitting)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Get My Results'}
            </button>
            <button
              onClick={() => handleSubmitResults(true)}
              disabled={isSubmitting}
              className="w-full text-gray-600 text-sm hover:text-gray-800"
            >
              Skip, show results now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                Question {currentQ + 1} of {diagnosticQuestions.length}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{question.domain}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  !isAnswered
                    ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                    : answers[question.id] === index
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : index === question.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                } ${isAnswered ? 'cursor-not-allowed' : ''}`}
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

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              {currentQ < diagnosticQuestions.length - 1 ? 'Next Question' : 'Complete Diagnostic'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
