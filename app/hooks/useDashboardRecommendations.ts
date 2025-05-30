import useSWR from 'swr';
import { NewEnrolledCourseProps } from '../utils/interface';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch recommended courses');
  }
  return response.json();
};

interface UseDashboardRecommendationsProps {
  userId: string | number;
  limit?: number;
}

export function useDashboardRecommendations({ userId, limit = 4 }: UseDashboardRecommendationsProps) {
  const { data, error, isLoading } = useSWR<NewEnrolledCourseProps[]>(
    userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/student/course-list/${userId}/` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
      suspense: true, // Enable Suspense mode
      loadingTimeout: 3000, // Wait 3 seconds before showing fallback
    }
  );

  return {
    courses: data?.slice(0, limit) || [],
    isLoading,
    isError: error,
  };
} 