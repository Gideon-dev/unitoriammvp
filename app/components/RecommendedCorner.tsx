"use client";

import HeaderBoard from "./HeaderBoard";
import { useRelatedCourses } from "../hooks/useRelatedCourses";
import RecommendedSkeleton from './RecommendedSkeleton';
import RatedItems from './RatedItems';

interface RecommendedCornerProps {
  category: string;
  courseId: number;
}

export default function RecommendedCorner({ category, courseId }: RecommendedCornerProps) {
  const { courses, isLoading, isError } = useRelatedCourses({ category, courseId });

  if (isError) {
    return (
      <div className="mt-8 text-center text-red-500">
        Failed to load recommended courses
      </div>
    );
  }

  if (isLoading) {
    return <RecommendedSkeleton />;
  }

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <HeaderBoard mainHead="Recommended Courses" nextHead="" />
      <div className="mt-4">
        <RatedItems dataRated={courses} />
      </div>
    </div>
  );
}