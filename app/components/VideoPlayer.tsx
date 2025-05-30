"use client";

import LazyVideo from "./LazyVideo";

interface VideoPlayerProps {
    videoUrl: string | undefined;
    courseId: string | undefined;
    userId: number | undefined;
    lectureVariantId: string | undefined;
}

export default function VideoPlayer({ videoUrl, courseId, userId, lectureVariantId }: VideoPlayerProps) {
    // Add a small delay to ensure the shimmer is visible
    if (typeof window !== 'undefined') {
        // This ensures the component is mounted
        return (
            <LazyVideo
                videoUrl={videoUrl}
                courseId={courseId}
                userId={userId}
                lectureVariantId={lectureVariantId}
            />
        );
    }
    
    return null; // Return null for SSR
} 