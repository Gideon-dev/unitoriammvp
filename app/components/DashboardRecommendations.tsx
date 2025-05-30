"use client";

import { useDashboardRecommendations } from "../hooks/useDashboardRecommendations";
import HeaderBoard from "./HeaderBoard";
import RatedItems from "./RatedItems";
import RecommendedSkeleton from "./RecommendedSkeleton";
import { Suspense } from "react";

interface DashboardRecommendationsProps {
  userId: string | number;
}

// Separate component for the content to better handle loading states
function RecommendationsContent({ userId }: DashboardRecommendationsProps) {
  const { courses, isLoading, isError } = useDashboardRecommendations({ userId });

  if (isError) {
    return (
      <div className="mt-8 text-center text-red-500">
        Failed to load your courses
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No courses found
      </div>
    );
  }

  return (
    <div className="mt-4">
      <RatedItems dataRated={courses} isEnrolled={true} />
    </div>
  );
}

export default function DashboardRecommendations({ userId }: DashboardRecommendationsProps) {
  return (
    <section className="w-full">
      <HeaderBoard mainHead="Your Enrolled Courses" nextHead="See all" />
      <Suspense fallback={<RecommendedSkeleton />}>
        <RecommendationsContent userId={userId} />
      </Suspense>
    </section>
  );
} 