'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function PrimerCheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/primer/checkout');
    }
  }, [status, router]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/primer/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to process checkout');
      setIsProcessing(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Redirecting to login...</div>
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
            <Link href="/primer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Primer
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-8 py-24">
        <div className="mb-16">
          <h1 className="text-3xl font-light text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600">Strategic AI Judgment Primer</p>
        </div>

        {error && (
          <div className="border border-gray-900 bg-gray-50 text-gray-900 px-4 py-3 text-sm mb-8">
            {error}
          </div>
        )}

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-8 mb-16">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-light text-gray-900 mb-2">
                Strategic AI Judgment Primer
              </h2>
              <p className="text-sm text-gray-600">90-minute deep dive · Lifetime access</p>
            </div>
            <div className="text-2xl font-light text-gray-900">$147</div>
          </div>

          <div className="space-y-4 text-sm text-gray-600 mb-8">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>$147.00</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 font-medium text-gray-900">
              <span>Total</span>
              <span>$147.00</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-gray-900 text-white py-4 text-base font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Secure payment processing via Stripe. You will be redirected to complete your purchase.
          </p>
        </div>

        {/* What You're Getting */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-base font-medium text-gray-900 mb-6">What's Included</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>• 3 real-world case studies with failure analysis</li>
            <li>• Systematic verification frameworks</li>
            <li>• Decision templates you can apply immediately</li>
            <li>• Written format designed for deliberate thought</li>
            <li>• Lifetime access with no expiration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
