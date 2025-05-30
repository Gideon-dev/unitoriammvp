import useSWR from 'swr';
import { MainCourse } from '../utils/interface';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
};

interface UseRelatedCoursesProps {
  category: string;
  courseId: number;
  limit?: number;
}

export function useRelatedCourses({ category, courseId, limit = 4 }: UseRelatedCoursesProps) {
  const { data, error, isLoading } = useSWR<MainCourse[]>(
    `/api/courses/list`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
    }
  );

  // Filter related courses
  const relatedCourses = data?.filter(course => 
    course.category.toLowerCase() === category.toLowerCase() && 
    course.id !== courseId
  )?.slice(0, limit) || [];

  return {
    courses: relatedCourses,
    isLoading,
    isError: error,
  };
} 