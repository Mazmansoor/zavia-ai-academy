import { sql } from '@vercel/postgres';

export { sql };

// Database helper functions
export async function query(text: string, params?: any[]) {
  try {
    const result = await sql.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// User queries
export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `;
  return result.rows[0];
}

export async function createUser(email: string, name: string, passwordHash: string) {
  const result = await sql`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email}, ${name}, ${passwordHash})
    RETURNING *
  `;
  return result.rows[0];
}

// Diagnostic queries
export async function saveDiagnosticResult(data: {
  userId?: number;
  email: string;
  overallScore: number;
  level: string;
  domainScores: Record<string, number>;
  recommendations: string[];
}) {
  const result = await sql`
    INSERT INTO diagnostic_results (user_id, email, overall_score, level, domain_scores, recommendations)
    VALUES (
      ${data.userId || null},
      ${data.email},
      ${data.overallScore},
      ${data.level},
      ${JSON.stringify(data.domainScores)},
      ${JSON.stringify(data.recommendations)}
    )
    RETURNING *
  `;
  return result.rows[0];
}

// Course queries
export async function getAllCourses() {
  const result = await sql`
    SELECT c.*,
           json_agg(
             json_build_object(
               'id', ct.id,
               'level', ct.level,
               'duration', ct.duration,
               'modules', ct.modules,
               'price_cents', ct.price_cents,
               'locked', ct.locked
             ) ORDER BY
               CASE ct.level
                 WHEN 'Foundation' THEN 1
                 WHEN 'Application' THEN 2
                 WHEN 'Systems' THEN 3
                 WHEN 'Mastery' THEN 4
               END
           ) as tracks
    FROM courses c
    LEFT JOIN course_tracks ct ON c.id = ct.course_id
    GROUP BY c.id
    ORDER BY c.id
  `;
  return result.rows;
}

// Enrollment queries
export async function getUserEnrollments(userId: number) {
  const result = await sql`
    SELECT e.*, c.domain, c.slug, ct.duration, ct.modules
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    JOIN course_tracks ct ON c.id = ct.course_id AND e.track_level = ct.level
    WHERE e.user_id = ${userId}
    AND e.status = 'active'
    ORDER BY e.enrolled_at DESC
  `;
  return result.rows;
}

export async function createEnrollment(userId: number, courseId: number, trackLevel: string) {
  const result = await sql`
    INSERT INTO enrollments (user_id, course_id, track_level, status)
    VALUES (${userId}, ${courseId}, ${trackLevel}, 'active')
    ON CONFLICT (user_id, course_id, track_level)
    DO UPDATE SET status = 'active'
    RETURNING *
  `;
  return result.rows[0];
}

// Progress queries
export async function getUserProgress(userId: number, courseId: number, trackLevel: string) {
  const result = await sql`
    SELECT * FROM user_progress
    WHERE user_id = ${userId}
    AND course_id = ${courseId}
    AND track_level = ${trackLevel}
    ORDER BY module_number
  `;
  return result.rows;
}

export async function updateModuleProgress(
  userId: number,
  courseId: number,
  trackLevel: string,
  moduleNumber: number,
  completed: boolean
) {
  const completedAt = completed ? new Date().toISOString() : null;

  const result = await sql`
    INSERT INTO user_progress (user_id, course_id, track_level, module_number, completed, completed_at)
    VALUES (${userId}, ${courseId}, ${trackLevel}, ${moduleNumber}, ${completed}, ${completedAt})
    ON CONFLICT (user_id, course_id, track_level, module_number)
    DO UPDATE SET completed = ${completed}, completed_at = ${completedAt}
    RETURNING *
  `;
  return result.rows[0];
}
