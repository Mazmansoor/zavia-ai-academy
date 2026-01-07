import { NextResponse } from 'next/server';
import { getAllCourses } from '@/lib/db';

export async function GET() {
  try {
    const courses = await getAllCourses();
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
