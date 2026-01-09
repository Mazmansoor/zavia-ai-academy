'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { diagnosticQuestions } from '@/lib/constants';

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = diagnosticQuestions[currentQ];
  const isAnswered = answers[question.id] !== undefined;

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [question.id]: answerIndex });
  };

  const handleNext = () => {
    if (currentQ < diagnosticQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      handleSubmitResults();
    }
  };

  const determineArchetype = (answers: Record<number, number>) => {
    const responses = diagnosticQuestions.map(q => ({
      correct: answers[q.id] === q.correct,
      domain: q.domain
    }));

    const correctCount = responses.filter(r => r.correct).length;
    const totalCount = responses.length;
    const accuracy = correctCount / totalCount;

    // Determine archetype based on judgment patterns
    if (accuracy >= 0.85) {
      return 'systems-thinker';
    } else if (accuracy >= 0.65) {
      return 'systematic-skeptic';
    } else if (accuracy >= 0.45) {
      return 'strategic-non-practitioner';
    } else if (accuracy >= 0.25) {
      return 'tool-fluent-novice';
    } else {
      return 'overconfident-delegator';
    }
  };

  const handleSubmitResults = async () => {
    setIsSubmitting(true);
    try {
      const archetype = determineArchetype(answers);

      const results = {
        archetype,
        answerPattern: answers,
        totalQuestions: diagnosticQuestions.length
      };

      // Save to database
      await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: '',
          overallScore: 0,
          level: archetype,
          domainScores: {},
          recommendations: []
        })
      });

      // Store in sessionStorage for results page
      sessionStorage.setItem('diagnosticResults', JSON.stringify(results));
      router.push('/diagnostic/results');
    } catch (error) {
      console.error('Error processing assessment:', error);
      alert('Error processing assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="mb-16">
          {/* Minimal progress indicator */}
          <div className="text-sm text-gray-400 mb-12">
            {currentQ + 1} / {diagnosticQuestions.length}
          </div>

          {/* Question */}
          <h2 className="text-2xl font-light text-gray-900 mb-12 leading-relaxed">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-12">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-6 border transition-all ${
                  !isAnswered
                    ? 'border-gray-200 hover:border-gray-400 cursor-pointer'
                    : answers[question.id] === index
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 opacity-40'
                } ${isAnswered ? 'cursor-not-allowed' : ''}`}
              >
                <span className="text-base text-gray-700">{option}</span>
              </button>
            ))}
          </div>

          {/* Continue button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="border border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : currentQ < diagnosticQuestions.length - 1 ? 'Continue' : 'Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
