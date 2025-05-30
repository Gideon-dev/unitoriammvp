import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_BASE_URL}/api/v2/course/course-list/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 