
import { useMemo } from 'react';
import { Lecture } from '../interface';

function parseContentDuration(durationStr: string) {
  const minMatch = durationStr.match(/(\d+)m/);
  const secMatch = durationStr.match(/(\d+)s/);

  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  const seconds = secMatch ? parseInt(secMatch[1], 10) : 0;

  return minutes + seconds / 60;
}

function formatDuration(totalMinutes: number) {
  const hrs = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);

  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

export default function useCourseDuration(lectures : Lecture[]) {
  const { totalMinutes, formatted } = useMemo(() => {
    const total = lectures.reduce((sum, lecture) => {
      return sum + parseContentDuration(lecture.content_duration);
    }, 0);

    return {
      totalMinutes: Math.round(total),
      formatted: formatDuration(total)
    };
  }, [lectures]);

  return { totalMinutes, formatted };
}
