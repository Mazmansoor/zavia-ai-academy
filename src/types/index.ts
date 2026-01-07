export interface User {
  id: number;
  email: string;
  name: string | null;
  created_at: Date;
}

export interface Course {
  id: number;
  slug: string;
  domain: string;
  description: string;
  tracks: CourseTrack[];
}

export interface CourseTrack {
  id: number;
  level: 'Foundation' | 'Application' | 'Systems' | 'Mastery';
  duration: string;
  modules: number;
  price_cents: number;
  locked: boolean;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  track_level: string;
  enrolled_at: Date;
  status: string;
}

export interface UserProgress {
  id: number;
  user_id: number;
  course_id: number;
  track_level: string;
  module_number: number;
  completed: boolean;
  completed_at: Date | null;
}

export interface DiagnosticResult {
  id: number;
  user_id: number | null;
  email: string;
  overall_score: number;
  level: string;
  domain_scores: Record<string, number>;
  recommendations: string[];
  completed_at: Date;
}

export interface DiagnosticQuestion {
  id: number;
  domain: string;
  level: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  status: string;
  current_period_end: Date;
}
