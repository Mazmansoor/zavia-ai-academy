import Link from 'next/link';
import { getAllCourses } from '@/lib/db';
import { Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Strategic AI Academy
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">
                Courses
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/diagnostic" className="text-blue-600 hover:text-blue-700 font-medium">
              Take Diagnostic
            </Link>
            <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-700">
            Systematic progression from Foundation to Mastery across 5 AI domains
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {courses.map((course: any) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{course.domain}</h2>
                <p className="text-gray-600">{course.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {course.tracks && course.tracks.map((track: any) => {
                  const priceDisplay = track.price_cents === 0
                    ? 'Free'
                    : `$${(track.price_cents / 100).toFixed(0)}`;

                  return (
                    <div
                      key={track.id}
                      className={`border-2 rounded-lg p-4 ${
                        track.locked
                          ? 'border-gray-200 bg-gray-50 opacity-60'
                          : 'border-blue-200 bg-blue-50 hover:border-blue-400 cursor-pointer'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{track.level}</h3>
                        {track.locked && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{track.duration}</p>
                      <p className="text-xs text-gray-500 mb-3">{track.modules} modules</p>
                      <p className="text-lg font-bold text-blue-600">{priceDisplay}</p>
                      {!track.locked && (
                        <Link
                          href={`/courses/${course.slug}/${track.level.toLowerCase()}`}
                          className="mt-3 block text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          {track.price_cents === 0 ? 'Start Free' : 'Enroll Now'}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Strategic AI Academy and build real AI capability from Foundation to Mastery
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/diagnostic" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Take Diagnostic
            </Link>
            <Link href="/signup" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 font-semibold">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
