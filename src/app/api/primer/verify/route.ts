import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Check if this purchase has already been recorded
    const existingPurchase = await sql`
      SELECT id FROM primer_purchases
      WHERE user_id = ${parseInt(session.user.id)}
      AND stripe_session_id = ${sessionId}
      LIMIT 1
    `;

    if (existingPurchase.rows.length === 0) {
      // Record the purchase in the database
      await sql`
        INSERT INTO primer_purchases (
          user_id,
          stripe_session_id,
          stripe_payment_intent,
          amount_cents,
          purchased_at
        ) VALUES (
          ${parseInt(session.user.id)},
          ${sessionId},
          ${checkoutSession.payment_intent as string || null},
          ${checkoutSession.amount_total || 14700},
          NOW()
        )
      `;
    }

    return NextResponse.json({
      success: true,
      hasAccess: true
    });
  } catch (error: any) {
    console.error('Purchase verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify purchase' },
      { status: 500 }
    );
  }
}
