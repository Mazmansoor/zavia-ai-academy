'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function PrimerSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyPurchase = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch(`/api/primer/verify?session_id=${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify purchase');
        }

        setIsVerifying(false);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'Failed to verify purchase');
        setIsVerifying(false);
      }
    };

    verifyPurchase();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">Verifying your purchase...</div>
          <div className="text-sm text-gray-400">This may take a few moments</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Verification Error</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/dashboard"
            className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
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
      <div className="max-w-2xl mx-auto px-8 py-24">
        <div className="mb-16">
          <h1 className="text-3xl font-light text-gray-900 mb-4">Purchase Complete</h1>
          <p className="text-gray-600">You now have access to the Strategic AI Judgment Primer.</p>
        </div>

        <div className="border-t border-gray-200 pt-12 mb-16">
          <h2 className="text-xl font-light text-gray-900 mb-6">What Happens Next</h2>
          <div className="space-y-6 text-base text-gray-600">
            <p className="leading-relaxed">
              You have lifetime access to the primer. There is no time limit. Work through the material at your own pace.
            </p>
            <p className="leading-relaxed">
              A confirmation email has been sent to your registered email address with your receipt and access details.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <Link
            href="/primer/content"
            className="inline-block border-2 border-gray-900 text-gray-900 px-12 py-4 text-base font-medium hover:bg-gray-900 hover:text-white transition-colors"
          >
            Access Primer Content
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            You can also access this from your <Link href="/dashboard" className="border-b border-gray-400 hover:border-gray-900 transition-colors">dashboard</Link> at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
