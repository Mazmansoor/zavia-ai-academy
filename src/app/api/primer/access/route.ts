import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { hasAccess: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has purchased the primer
    const purchase = await sql`
      SELECT id, purchased_at
      FROM primer_purchases
      WHERE user_id = ${parseInt(session.user.id)}
      ORDER BY purchased_at DESC
      LIMIT 1
    `;

    const hasAccess = purchase.rows.length > 0;

    return NextResponse.json({
      hasAccess,
      purchaseDate: hasAccess ? purchase.rows[0].purchased_at : null
    });
  } catch (error: any) {
    console.error('Access check error:', error);

    // If table doesn't exist yet, return no access (graceful degradation)
    if (error.message?.includes('relation "primer_purchases" does not exist')) {
      return NextResponse.json({
        hasAccess: false,
        error: 'Database not initialized'
      });
    }

    return NextResponse.json(
      { hasAccess: false, error: error.message || 'Failed to check access' },
      { status: 500 }
    );
  }
}
