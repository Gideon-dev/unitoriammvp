import { NextResponse } from 'next/server';
import { NewEnrolledCourseProps } from '@/app/utils/interface';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    
    if (!process.env.NEXT_API_BASE_URL) {
      throw new Error('NEXT_API_BASE_URL is not defined');
    }

    // console.log('Fetching enrolled courses for userId:', userId);
    // console.log('API URL:', `${process.env.NEXT_API_BASE_URL}/api/v2/student/course-list/${userId}/`);

    const response = await fetch(
      `${process.env.NEXT_API_BASE_URL}/api/v2/student/course-list/${(await params).userId}/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch enrolled courses: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Type check the response
    if (!Array.isArray(data)) {
      console.error('Invalid response format. Expected array:', data);
      throw new Error('Invalid response format');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in enrolled courses API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch enrolled courses' },
      { status: 500 }
    );
  }
} 