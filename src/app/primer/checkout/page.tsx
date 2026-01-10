'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/aFaaEZ9gx4nEg5B8ww';

export default function PrimerCheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/primer/checkout');
    } else if (status === 'authenticated') {
      // Redirect directly to Stripe Payment Link
      window.location.href = STRIPE_PAYMENT_LINK;
    }
  }, [status, router]);

  // Show loading state while checking authentication or redirecting
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-600 mb-4">
          {status === 'loading' && 'Loading...'}
          {status === 'unauthenticated' && 'Redirecting to login...'}
          {status === 'authenticated' && 'Redirecting to checkout...'}
        </div>
        <p className="text-sm text-gray-400">You will be redirected in a moment</p>
      </div>
    </div>
  );
}
