import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to continue.' },
        { status: 401 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Get or create primer price ID from env
    const primerPriceId = process.env.STRIPE_PRICE_PRIMER;

    if (!primerPriceId) {
      // If no Stripe price ID is configured, return a friendly error
      console.warn('STRIPE_PRICE_PRIMER environment variable not configured');
      return NextResponse.json(
        { error: 'Payment processing is not configured yet. Please contact support.' },
        { status: 503 }
      );
    }

    // Create Stripe checkout session for the primer
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: primerPriceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/primer/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/primer/checkout?canceled=true`,
      customer_email: session.user.email || undefined,
      metadata: {
        userId: session.user.id,
        productType: 'primer',
        productName: 'Strategic AI Judgment Primer',
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url
    });
  } catch (error: any) {
    console.error('Primer checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
