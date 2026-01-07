import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { saveDiagnosticResult } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { email, domainScores, overallScore, level, recommendations } = await request.json();

    // Save diagnostic result
    const result = await saveDiagnosticResult({
      userId: session?.user?.id ? parseInt(session.user.id) : undefined,
      email: email || session?.user?.email || '',
      overallScore,
      level,
      domainScores,
      recommendations
    });

    return NextResponse.json(
      { message: 'Results saved successfully', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Diagnostic save error:', error);
    return NextResponse.json(
      { error: 'Failed to save results' },
      { status: 500 }
    );
  }
}
