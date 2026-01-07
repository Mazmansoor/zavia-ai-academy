import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getUserEnrollments } from '@/lib/db';
import { BookOpen, Trophy, Target } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const enrollments = await getUserEnrollments(parseInt(session.user.id));

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
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {session.user.name || session.user.email}
            </span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session.user.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-xl text-gray-700">
            Continue your AI mastery journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Active Courses</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{enrollments.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-lg font-semibold">Modules Completed</h3>
            </div>
            <p className="text-4xl font-bold text-yellow-600">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Current Level</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">Foundation</p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
          {enrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment: any) => (
                <div key={enrollment.id} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2">{enrollment.domain}</h3>
                  <p className="text-gray-600 mb-4">{enrollment.track_level} Level</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <Link
                    href={`/courses/${enrollment.slug}/${enrollment.track_level.toLowerCase()}`}
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue Learning
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Link
                href="/courses"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Recommended Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Continue Your Progress</h2>
          <p className="mb-6 opacity-90">
            Take the diagnostic to identify your skill gaps and get personalized course recommendations
          </p>
          <Link
            href="/diagnostic"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Take Diagnostic Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
