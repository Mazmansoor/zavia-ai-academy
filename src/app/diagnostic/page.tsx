'use client';

// Force dynamic rendering for Firebase pages
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { diagnosticQuestions } from '@/lib/constants';
import { useFirebaseUser } from '@/lib/firebase/hooks';
import { cn } from '@/lib/utils';

export default function DiagnosticPage() {
  const router = useRouter();
  const { user } = useFirebaseUser();
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
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (user) {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      }

      await fetch('/api/diagnostic', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: user?.email || '',
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-notion-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <span className="text-lg font-semibold text-notion-text">Strategic AI Academy</span>
            </Link>
            <div className="hidden md:flex gap-1 items-center">
              <Link
                href="/courses"
                className="px-4 py-2 text-sm text-notion-text-light hover:text-notion-text hover:bg-notion-hover rounded-md transition-all"
              >
                Capabilities
              </Link>
              <Link
                href="/diagnostic"
                className="px-4 py-2 text-sm text-primary-600 bg-primary-50 rounded-md font-medium"
              >
                Diagnostic
              </Link>
              <Link
                href="/how-it-works"
                className="px-4 py-2 text-sm text-notion-text-light hover:text-notion-text hover:bg-notion-hover rounded-md transition-all"
              >
                How It Works
              </Link>
              <Link
                href="/manifesto"
                className="px-4 py-2 text-sm text-notion-text-light hover:text-notion-text hover:bg-notion-hover rounded-md transition-all"
              >
                Manifesto
              </Link>
              <div className="w-px h-6 bg-notion-border mx-2"></div>
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-white bg-notion-accent hover:bg-primary-700 rounded-md transition-all font-medium shadow-sm hover:shadow"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-notion-text">
              Question {currentQ + 1} of {diagnosticQuestions.length}
            </span>
            <span className="text-sm text-notion-text-light">
              {Math.round(((currentQ + 1) / diagnosticQuestions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / diagnosticQuestions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-notion-border p-8 md:p-12"
          >
            {/* Domain Badge */}
            <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full mb-6">
              {question.domain}
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-notion-text mb-8 leading-relaxed">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => !isAnswered && handleAnswer(index)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  className={cn(
                    "w-full text-left p-5 rounded-xl border-2 transition-all",
                    !isAnswered
                      ? "border-notion-border hover:border-primary-300 hover:bg-primary-50/30 cursor-pointer"
                      : answers[question.id] === index
                      ? "border-primary-500 bg-primary-50 shadow-sm"
                      : "border-notion-border opacity-40 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center",
                      answers[question.id] === index
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300"
                    )}>
                      {answers[question.id] === index && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-base text-notion-text leading-relaxed flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Continue button */}
            {isAnswered && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNext}
                disabled={isSubmitting}
                className={cn(
                  "w-full md:w-auto px-8 py-4 bg-notion-accent text-white rounded-lg font-semibold",
                  "hover:bg-primary-700 transition-all shadow-md hover:shadow-lg",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : currentQ < diagnosticQuestions.length - 1 ? (
                  'Continue to Next Question →'
                ) : (
                  'Complete Assessment'
                )}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
