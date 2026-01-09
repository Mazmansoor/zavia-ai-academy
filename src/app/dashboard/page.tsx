import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getUserEnrollments } from '@/lib/db';
import { sql } from '@vercel/postgres';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const enrollments = await getUserEnrollments(parseInt(session.user.id));

  // Check if user has purchased the primer
  let hasPrimerAccess = false;
  try {
    const primerCheck = await sql`
      SELECT id FROM primer_purchases
      WHERE user_id = ${parseInt(session.user.id)}
      LIMIT 1
    `;
    hasPrimerAccess = primerCheck.rows.length > 0;
  } catch (error) {
    // Gracefully handle if table doesn't exist yet
    console.error('Primer access check failed:', error);
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
            <Link href="/courses" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Capabilities
            </Link>
            <Link href="/diagnostic" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Diagnostic
            </Link>
            <Link href="/how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="/manifesto" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Manifesto
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-900 font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-24">
        {/* Welcome Section */}
        <div className="mb-24">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            {session.user.name?.split(' ')[0] || session.user.email}
          </h1>
          <p className="text-gray-600">
            Your enrolled capabilities
          </p>
        </div>

        {/* Primer Access */}
        {hasPrimerAccess && (
          <div className="mb-24 pb-16 border-b border-gray-200">
            <h2 className="text-xl font-light text-gray-900 mb-8">Your Purchased Content</h2>
            <div className="border-t border-gray-200 pt-8">
              <div className="mb-6">
                <h3 className="text-2xl font-light text-gray-900 mb-2">Strategic AI Judgment Primer</h3>
                <p className="text-sm text-gray-500">90-minute deep dive · Lifetime access</p>
              </div>
              <Link
                href="/primer/content"
                className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors"
              >
                Access Content
              </Link>
            </div>
          </div>
        )}

        {/* Enrolled Capabilities */}
        <div className="space-y-12">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment: any) => (
              <div key={enrollment.id} className="border-t border-gray-200 pt-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">{enrollment.domain}</h2>
                  <p className="text-sm text-gray-500">{enrollment.track_level}</p>
                </div>
                <Link
                  href={`/courses/${enrollment.slug}/${enrollment.track_level.toLowerCase()}`}
                  className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors"
                >
                  Continue
                </Link>
              </div>
            ))
          ) : (
            <div className="border-t border-gray-200 pt-12">
              <p className="text-gray-600 mb-8">
                You have not enrolled in any capabilities yet.
              </p>
              <Link
                href="/courses"
                className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
              >
                View Capabilities
              </Link>
            </div>
          )}
        </div>

        {/* Assessment Prompt */}
        {enrollments.length === 0 && (
          <div className="mt-24 border-t border-gray-200 pt-16">
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Not sure where to begin? The diagnostic reveals your judgment patterns when evaluating AI output.
            </p>
            <Link
              href="/diagnostic"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Take Assessment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
