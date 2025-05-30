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
}

export function useRelatedCourses({ category, courseId }: UseRelatedCoursesProps) {
    // console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  const { data, error, isLoading } = useSWR<MainCourse[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/course/course-list/`,
    fetcher,
    {
      revalidateOnFocus: false, // Don't revalidate on window focus
      revalidateOnReconnect: true, // Revalidate when browser regains connection
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  const relatedCourses = data?.filter(
    (course) =>
      course.category.toLowerCase() === category.toLowerCase() &&
      course.id !== courseId
  ) || [];

  return {
    courses: relatedCourses,
    isLoading,
    isError: error,
  };
} 