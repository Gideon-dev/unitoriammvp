"use client";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Lecture, MainCourse } from "../utils/interface";
import BackBtn from "./BackBtn";
import ShowTab from "./VideoReviews";
import BookIcon from "../../public/book-icon.svg";
import { Suspense, lazy, useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import TempBuyBtn from "./TempBuyBtn";
import { useSession } from "next-auth/react";
import UserIcon from "../../public/user-heart.svg";
import { useLessonProgressStore } from "../stores/lessonProgressStore";
import useCourseDuration from "../utils/hooks/contentDuration";
import VideoShimmer from "./VideoShimmer";
import RecommendedSkeleton from "./RecommendedSkeleton";
import { useInView } from 'react-intersection-observer';
import CustomErrorBoundary from "./CustomErrorBoundary";


const VideoPlayer = lazy(() => import("./VideoPlayer"));

// Dynamically import RecommendedCorner
const RecommendedCorner = dynamic(() => import('./RecommendedDetailCorner'), {
    loading: () => <RecommendedSkeleton/>,
    ssr: true // Enable SSR as this component handles its own loading state
});

// Update the UserBadge type and import
interface UserBadgeProps {
    userName: string | undefined;  // Make it optional since course?.tutor might be undefined
}
interface UtilityBarProps {
    formatted: string | number;
    totalLecture: number;
}


type detailProps = {
    courseId:  string | undefined,
    course: MainCourse | null,
    isEnrolled: boolean,
    userId: number | undefined
}

// Type the props
interface VideoSectionProps {
    selectedLecture: Lecture | null;
    courseId: string | undefined;
    userId: number | undefined;
}

// Memoize the VideoSection component
const VideoSection = memo(({ selectedLecture, courseId, userId }: VideoSectionProps) => {
    return (
        <Suspense fallback={<VideoShimmer />}>
            <VideoPlayer
                key={selectedLecture?.cloudflare_uid}
                videoUrl={selectedLecture?.cloudflare_uid}
                courseId={courseId}
                userId={userId}
                lectureVariantId={selectedLecture?.variant_item_id}
            />
        </Suspense>
    );
});

VideoSection.displayName = 'VideoSection';

const UserBadge = dynamic<UserBadgeProps>(() => import('./UserBadge'), {
    loading: () => <div className="animate-pulse h-12 bg-gray-200 rounded"></div>,
    ssr: true
});

const UtilityBar = dynamic<UtilityBarProps>(() => import('./UtilityBar'), {
    loading: () => <div className="animate-pulse h-8 bg-gray-200 rounded"></div>,
    ssr: true
});
const MemoizedUserBadge = memo(UserBadge);

const CourseDetailClientBase = ({courseId,course,isEnrolled,userId}: detailProps) => {
    const { data: session } = useSession();
    const [selectedLecture, setSelectedLecture] = useState<Lecture | null>( null);
    const videoRef = useRef<HTMLDivElement>(null);
    const completedLessons = useLessonProgressStore((state) => state.completedLessons);
    const updateLessonProgress = useLessonProgressStore((state) => state.updateLessonProgress);
    const {formatted } = useCourseDuration(course? course.lectures : []);
    const totalLecture = useMemo(() => course ? course.lectures.length : 1, [course]);
    const { ref: recommendedRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
      
    // Memoize scroll handler
    const scrollToVideo = useCallback(() => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const fetchCompletedLessons = async () => {
            if(!courseId || !userId) return;
            setIsLoading(true);
            try {
                await updateLessonProgress(userId, courseId, "");
                setError(null);
            } catch (err) {
                setError('Failed to fetch lesson progress');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchCompletedLessons();
    }, [userId, courseId, updateLessonProgress]);
      
    // Memoize the initial lecture
    useEffect(() => {
        if (course?.lectures.length) {
            setSelectedLecture(course.lectures[0]);
        }
    }, [course?.lectures]); // More specific dependency

    useEffect(() => {
        if (course) {
            setIsLoading(false);
        }
    }, [course]);

    // Add error display
    if (error) {
        return (
            <div className="p-4 text-red-500 text-center">
                <p>{error}</p>
                <button 
                    onClick={() => setError(null)}
                    className="text-blue-500 underline mt-2"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Add these memoized values if you're using them frequently
    const courseData = useMemo(() => ({
        title: course?.title,
        description: course?.description,
        totalEnrolled: course?.total_enrolled,
        category: course?.category,
        id: course?.id
    }), [course]);



  return (
        <div>
            <section className="">
                <nav id="details-header" className="flex items-center mb-[25px] sticky top-0 bg-black bg-opacity-5 py-2">
                    <BackBtn/>
                    <div className="text-center w-full">
                        <p className="text-[14px]/[17.64px] font-semibold sora">Tutorial details</p>
                    </div>
                </nav>
                <div ref={videoRef} className="w-full h-full">
                    {isLoading ? (
                        <div className="animate-pulse">
                            <div className="h-64 bg-gray-200 rounded mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                    ) : (
                        <VideoSection 
                            selectedLecture={selectedLecture}
                            courseId={courseId}
                            userId={Number(session?.userId)}
                        />
                    )}
                </div>
                
                <div className='w-full pe-[2.5rem] py-[12px] flex flex-col justify-center gap-[6px]'>
                    <p id="tut-topic" className="font-semibold text-[18px]/[26px]">{course?.description}</p>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-[#CDC784] border-[#514B07] border-2 rounded-lg h-[25px] px-2 py-3">
                            <Image 
                                src={BookIcon} 
                                width={15}
                                height={15}
                                alt="book icon"
                                loading="lazy"
                                className="object-contain"
                            />
                            <p className="font-semibold text-[9.28px]/[100%] sora text-[#514B07]">{course?.title}</p>
                        </div>
                        <span id='r-and-r' className='flex items-center gap-1 text-[15.04px]/[11.39px]'>
                            <Image 
                                src={UserIcon} 
                                width={15}
                                height={15}
                                alt="total no of users loving this course"
                                loading="lazy"
                                className="object-contain"
                            />
                            <p className="font-medium">{`${course?.total_enrolled} student(s)`}</p>
                        </span>
                    </div>
                </div>
                <div className="mt-[13px]">
                    <UtilityBar formatted={formatted} totalLecture={totalLecture}/>
                </div>
                <MemoizedUserBadge userName={course?.tutor}/>
                <ShowTab
                    isEnrolled={isEnrolled} 
                    course={course} 
                    onSelectLecture={setSelectedLecture} 
                    scrollToTop={scrollToVideo}
                    completedLessons={completedLessons}
                />
                <div className="w-full flex justify-center mt-[36px] sora">
                    {!isEnrolled &&  (
                        // <BuyBtn slug={course?.slug} price={course?.price}/>
                        <TempBuyBtn 
                            courseId={course?.course_id} 
                            userId={session?.userId ? Number(session?.userId): undefined} 
                            courseSlug={course?.slug}
                        />
                    )
                    }
                </div>
               
                {/* Wrap the RecommendedCorner in a div with ref */}
                <div ref={recommendedRef}>
                    {inView && course && (
                        <RecommendedCorner 
                            category={course.category} 
                            courseId={course.id} 
                        />
                    )}
                </div>
            </section>
        </div>
  )
}

CourseDetailClientBase.displayName = 'CourseDetailClient';

// Export the component directly without unnecessary memoization
export default function CourseDetailClient({courseId, course, isEnrolled, userId}: detailProps) {
    return (
        <CustomErrorBoundary>
            <CourseDetailClientBase courseId={courseId} course={course} isEnrolled={isEnrolled} userId={userId} />
        </CustomErrorBoundary>
    );
}