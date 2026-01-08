import Stripe from 'stripe';

// Use a placeholder during build time if env var is not set
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Price IDs mapping (you'll set these in Stripe dashboard)
export const PRICE_IDS = {
  foundation: '', // Free tier
  application: process.env.STRIPE_PRICE_APPLICATION || '',
  systems: process.env.STRIPE_PRICE_SYSTEMS || '',
  mastery: process.env.STRIPE_PRICE_MASTERY || '',
};

export async function createCheckoutSession(params: {
  priceId: string;
  userId: string;
  courseId: number;
  trackLevel: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      courseId: params.courseId.toString(),
      trackLevel: params.trackLevel,
    },
  });

  return session;
}

export async function createSubscriptionCheckoutSession(params: {
  priceId: string;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.email,
    metadata: {
      userId: params.userId,
    },
  });

  return session;
}
