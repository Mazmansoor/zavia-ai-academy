import Link from 'next/link';
import { getAllCourses } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-lg font-medium text-gray-900 tracking-tight">
            Strategic AI Academy
          </Link>
          <div className="flex gap-8 items-center">
            <Link
              href="/courses"
              className="text-sm text-gray-900 font-medium"
            >
              Capabilities
            </Link>
            <Link
              href="/diagnostic"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Diagnostic
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/manifesto"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Manifesto
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-900 border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-24">
        <div className="mb-24">
          <h1 className="text-4xl font-light text-gray-900 mb-6">Capabilities</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Each capability moves through four levels of judgment. Foundation is free.
            Advanced levels require demonstrated competence.
          </p>
        </div>

        <div className="space-y-16">
          {courses.map((course: any) => (
            <div key={course.id} className="border-t border-gray-200 pt-12">
              <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-3">{course.domain}</h2>
                <p className="text-gray-600">{course.description}</p>
              </div>
              <div className="space-y-6">
                {course.tracks && course.tracks.map((track: any) => {
                  const priceDisplay = track.price_cents === 0
                    ? 'Foundation'
                    : `$${(track.price_cents / 100).toFixed(0)}`;

                  return (
                    <div
                      key={track.id}
                      className={`border-l-2 pl-6 ${
                        track.locked
                          ? 'border-gray-200'
                          : 'border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{track.level}</h3>
                        <span className="text-sm text-gray-500">{priceDisplay}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{track.duration} · {track.modules} modules</p>
                      {!track.locked && track.price_cents === 0 && (
                        <Link
                          href={`/courses/${course.slug}/${track.level.toLowerCase()}`}
                          className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors mt-2"
                        >
                          Begin
                        </Link>
                      )}
                      {!track.locked && track.price_cents > 0 && (
                        <Link
                          href={`/courses/${course.slug}/${track.level.toLowerCase()}`}
                          className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors mt-2"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
