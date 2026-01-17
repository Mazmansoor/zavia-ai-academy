'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function HomePage() {
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
                className="px-4 py-2 text-sm text-notion-text-light hover:text-notion-text hover:bg-notion-hover rounded-md transition-all"
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

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full mb-8 border border-primary-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New: 90-minute Strategic AI Judgment Primer
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-notion-text mb-6 leading-tight tracking-tight">
            Learn to think strategically
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              with AI—before AI thinks for you
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-notion-text-light mb-8 leading-relaxed max-w-3xl mx-auto">
            A discipline for leaders making irreversible decisions in the age of machine intelligence.
          </p>
          <p className="text-base md:text-lg text-notion-text-light mb-12 leading-relaxed max-w-3xl mx-auto">
            AI is reshaping who holds power in organizations—not through formal authority, but through the quiet delegation of judgment.
            When decisions accelerate and intelligence becomes externalized, the question is no longer whether you use AI.
            <span className="font-semibold text-notion-text"> It is whether you still understand what you are approving.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/diagnostic"
              className={cn(
                "inline-flex items-center justify-center px-8 py-4 text-base font-semibold",
                "bg-notion-accent text-white rounded-lg",
                "hover:bg-primary-700 transition-all duration-200",
                "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              )}
            >
              Start Free Assessment
            </Link>
            <Link
              href="/primer"
              className={cn(
                "inline-flex items-center justify-center px-8 py-4 text-base font-semibold",
                "bg-white text-notion-text rounded-lg border border-notion-border",
                "hover:bg-notion-hover hover:border-gray-300 transition-all duration-200",
                "shadow-sm hover:shadow"
              )}
            >
              View 90-min Primer →
            </Link>
          </div>
        </motion.div>

        {/* Primer Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-200 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                Premium Content
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-notion-text">$147</span>
                <span className="text-sm text-notion-text-light">one-time</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-notion-text mb-4">
              Strategic AI Judgment Primer
            </h2>
            <p className="text-lg text-notion-text-light mb-8 leading-relaxed">
              A 90-minute deep dive into the three failure modes that occur when decision-makers delegate judgment to AI without verification systems. Real case studies. Systematic frameworks. Immediately applicable.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-notion-text">90 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-notion-text">Lifetime access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-notion-text">Instant delivery</span>
              </div>
            </div>
            <Link
              href="/primer"
              className="inline-flex items-center justify-center px-8 py-4 bg-notion-accent text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              Get Instant Access
            </Link>
          </div>
        </motion.div>

        {/* Capability Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-notion-text mb-4">
              Four Levels of Judgment
            </h2>
            <p className="text-lg text-notion-text-light max-w-2xl mx-auto">
              Progress from awareness to mastery through systematic capability building
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                level: 'Foundation',
                color: 'from-blue-500 to-blue-600',
                description: 'Remove false confidence. Understand what AI can and cannot infer. Stop making claims you cannot defend.',
              },
              {
                level: 'Application',
                color: 'from-purple-500 to-purple-600',
                description: 'Enable independent evaluation. Know when output is plausible but wrong. Develop operational skepticism.',
              },
              {
                level: 'Systems',
                color: 'from-indigo-500 to-indigo-600',
                description: 'Design AI workflows that survive scale. Understand where automation introduces fragility. Build for consequences.',
              },
              {
                level: 'Mastery',
                color: 'from-violet-500 to-violet-600',
                description: 'Know where AI must not be used. Recognize when delegation erodes strategic capacity. Preserve decision authority.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-notion-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0",
                    item.color
                  )}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-notion-text mb-2 group-hover:text-primary-600 transition-colors">
                      {item.level}
                    </h3>
                    <p className="text-notion-text-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-notion-text mb-4">
              Five Critical Capabilities
            </h2>
            <p className="text-lg text-notion-text-light max-w-2xl mx-auto">
              Master the essential skills for strategic AI implementation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'LLM Fundamentals',
                description: 'How language models work—not just surface prompting',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Prompt Engineering',
                description: 'Systematic prompt design—not tips and tricks',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: 'Agentic Systems',
                description: 'Building AI that takes autonomous action',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'RAG & Knowledge',
                description: 'Connecting AI to your data intelligently',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                )
              },
              {
                title: 'Strategic AI',
                description: 'Making AI decisions that create value',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
            ].map((domain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white border border-notion-border rounded-lg p-6 hover:shadow-md transition-all hover:border-primary-300 group"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-100 transition-colors">
                  {domain.icon}
                </div>
                <h3 className="text-lg font-semibold text-notion-text mb-2 group-hover:text-primary-600 transition-colors">
                  {domain.title}
                </h3>
                <p className="text-sm text-notion-text-light leading-relaxed">
                  {domain.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white border border-notion-border rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-notion-text mb-6">
              The diagnostic is not a test. It is a mirror.
            </h2>
            <p className="text-lg text-notion-text-light mb-8 leading-relaxed max-w-2xl mx-auto">
              It shows you what you consistently misjudge when evaluating AI output. Most users discover they are more confident than competent.
            </p>
            <p className="text-base text-notion-text mb-10 font-semibold">
              That realization is the starting point.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-8 py-4 bg-notion-accent text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Begin Free Assessment
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <p className="text-sm text-notion-text-light uppercase tracking-wide font-semibold">
              Trusted by leaders at
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-40">
            {['Enterprise', 'Startup', 'Agency', 'Scale-up'].map((type, i) => (
              <div key={i} className="text-notion-text-light font-semibold text-sm">
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-notion-border bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
                <span className="text-lg font-semibold text-notion-text">Strategic AI Academy</span>
              </div>
              <p className="text-sm text-notion-text-light max-w-sm">
                A discipline for leaders making irreversible decisions in the age of machine intelligence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-notion-text mb-3">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/courses" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">Courses</Link></li>
                <li><Link href="/diagnostic" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">Diagnostic</Link></li>
                <li><Link href="/primer" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">Primer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-notion-text mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/manifesto" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">Manifesto</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">How It Works</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-notion-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-notion-text-light">
              &copy; 2026 Strategic AI Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">Privacy</a>
              <a href="#" className="text-sm text-notion-text-light hover:text-notion-accent transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
