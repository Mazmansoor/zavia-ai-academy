'use client';

// Force dynamic rendering for Firebase pages
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useFirebaseUser } from '@/lib/firebase/hooks';

type EnrollmentView = {
  id: string;
  courseId: string;
  trackLevel: string;
  domain: string;
  slug: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useFirebaseUser();
  const [enrollments, setEnrollments] = useState<EnrollmentView[]>([]);
  const [hasPrimerAccess, setHasPrimerAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) {
        return;
      }

      try {
        const enrollmentsRef = collection(db, 'users', user.uid, 'enrollments');
        const enrollmentsSnap = await getDocs(query(enrollmentsRef, orderBy('enrolledAt', 'desc')));

        const enrollmentDocs = enrollmentsSnap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as { courseId: string; trackLevel: string }),
        }));

        const courseIds = Array.from(
          new Set(enrollmentDocs.map((enrollment) => enrollment.courseId))
        );

        const courseSnaps = await Promise.all(
          courseIds.map((courseId) => getDoc(doc(db, 'courses', courseId)))
        );

        const courseMap = new Map(
          courseSnaps
            .filter((snap) => snap.exists())
            .map((snap) => [snap.id, snap.data() as { domain?: string; slug?: string }])
        );

        const formattedEnrollments = enrollmentDocs.map((enrollment) => {
          const course = courseMap.get(enrollment.courseId);
          return {
            id: enrollment.id,
            courseId: enrollment.courseId,
            trackLevel: enrollment.trackLevel,
            domain: course?.domain || '',
            slug: course?.slug || enrollment.courseId,
          };
        });

        const primerRef = collection(db, 'users', user.uid, 'primer_purchases');
        const primerSnap = await getDocs(query(primerRef, orderBy('purchasedAt', 'desc'), limit(1)));

        setEnrollments(formattedEnrollments);
        setHasPrimerAccess(!primerSnap.empty);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null;
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
            {user.displayName?.split(' ')[0] || user.email}
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
                <p className="text-sm text-gray-500">90-minute deep dive Aú Lifetime access</p>
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
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="border-t border-gray-200 pt-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">{enrollment.domain}</h2>
                  <p className="text-sm text-gray-500">{enrollment.trackLevel}</p>
                </div>
                <Link
                  href={`/courses/${enrollment.slug}/${enrollment.trackLevel.toLowerCase()}`}
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
