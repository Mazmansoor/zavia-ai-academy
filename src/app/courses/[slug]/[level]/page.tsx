import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCourseBySlug } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface CourseDetailPageProps {
  params: {
    slug: string;
    level: string;
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug, level } = params;

  // Fetch course data
  const courses = await getCourseBySlug(slug);

  if (!courses || courses.length === 0) {
    notFound();
  }

  const course = courses[0];
  const track = course.tracks?.find(
    (t: any) => t.level.toLowerCase() === level.toLowerCase()
  );

  if (!track) {
    notFound();
  }

  const isFree = track.price_cents === 0;
  const priceDisplay = isFree
    ? 'Foundation (Free)'
    : `$${(track.price_cents / 100).toFixed(0)}`;

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
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Capabilities
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
      <div className="max-w-3xl mx-auto px-8 py-24">
        <article className="space-y-16">
          {/* Header */}
          <header className="mb-24">
            <div className="text-sm text-gray-400 mb-4">{course.domain}</div>
            <h1 className="text-4xl font-light text-gray-900 mb-6 leading-tight">
              {track.level}
            </h1>
            <div className="flex gap-8 text-base text-gray-600 mb-8">
              <span>{track.duration}</span>
              <span>·</span>
              <span>{track.modules} modules</span>
              <span>·</span>
              <span>{priceDisplay}</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </header>

          {/* Coming Soon Notice */}
          <section className="pb-16 border-b border-gray-200">
            <div className="bg-gray-50 border border-gray-200 p-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Content In Development</h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                This capability track is currently being developed. The platform infrastructure is complete,
                but the learning content for this specific track has not yet been created.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                In the meantime, explore the <Link href="/primer" className="border-b border-gray-900 hover:border-gray-400 transition-colors">Strategic AI Judgment Primer</Link> —
                a 90-minute deep dive available now.
              </p>
            </div>
          </section>

          {/* What This Will Cover (Placeholder) */}
          <section className="pb-16 border-b border-gray-200">
            <h2 className="text-2xl font-light text-gray-900 mb-8">What This Will Cover</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              When complete, this {track.level} track will provide systematic training in {course.domain.toLowerCase()},
              structured for high-stakes decision-making environments.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              The focus will be on building judgment and verification capabilities—not tool fluency or productivity optimization.
            </p>
          </section>

          {/* Alternative Path */}
          <section className="pb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8">Available Now</h2>
            <div className="space-y-8">
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-light text-gray-900 mb-4">Strategic AI Judgment Primer</h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  90-minute deep dive into evaluating AI output in high-stakes decisions. Three case studies with systematic frameworks.
                </p>
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="text-2xl font-light text-gray-900">$147</span>
                  <span className="text-sm text-gray-500">One-time · Lifetime access</span>
                </div>
                <Link
                  href="/primer"
                  className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
                >
                  View Primer
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-light text-gray-900 mb-4">Diagnostic Assessment</h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  Understand your current judgment patterns when evaluating AI output. Takes 10 minutes.
                </p>
                <Link
                  href="/diagnostic"
                  className="inline-block text-sm text-gray-900 border-b border-gray-900 hover:border-gray-400 transition-colors"
                >
                  Take Assessment
                </Link>
              </div>
            </div>
          </section>

          {/* Return */}
          <div className="pt-8 border-t border-gray-200">
            <Link
              href="/courses"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to All Capabilities
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
