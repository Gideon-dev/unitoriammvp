import useSWR from 'swr';
import { NewEnrolledCourseProps } from '../utils/interface';

const fetcher = async (url: string) => {
  console.log('Fetching from URL:', url);
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fetch error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Fetched data:', data);
  
  if (!Array.isArray(data)) {
    console.error('Invalid response format:', data);
    throw new Error('Invalid response format');
  }

  return data;
};

interface UseDashboardRecommendationsProps {
  userId: string | number;
  limit?: number;
}

export function useDashboardRecommendations({ userId, limit = 4 }: UseDashboardRecommendationsProps) {
  const { data, error, isLoading } = useSWR<NewEnrolledCourseProps[]>(
    userId ? `/api/courses/enrolled/${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
      suspense: true, // Enable Suspense mode
      loadingTimeout: 3000, // Wait 3 seconds before showing fallback
      onError: (err) => {
        console.error('SWR Error:', err);
      }
    }
  );

  if (error) {
    console.error('Hook error state:', error);
  }

  return {
    courses: data?.slice(0, limit) || [],
    isLoading,
    isError: error,
  };
} 