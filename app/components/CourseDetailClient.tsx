"use client";
import Image from "next/image";
import { Lecture, MainCourse } from "../utils/interface";
import BackBtn from "./BackBtn";
import LazyVideo from "./LazyVideo";
import UtilityBar from "./UtilityBar";
import UserBadge from "./UserBadge";
import ShowTab from "./VideoReviews";
import BookIcon from "../../public/book-icon.svg";
import { useEffect, useRef, useState } from "react";
import TempBuyBtn from "./TempBuyBtn";
import { useSession } from "next-auth/react";
import UserIcon from "../../public/user-heart.svg";
import { useLessonProgressStore } from "../stores/lessonProgressStore";
import useCourseDuration from "../utils/hooks/contentDuration";


type detailProps = {
    courseId:  string | undefined,
    course: MainCourse | null,
    isEnrolled: boolean,
    userId: number | undefined
}

const CourseDetailClient = ({courseId,course,isEnrolled,userId}: detailProps) => {
    const { data: session } = useSession();
    const [selectedLecture, setSelectedLecture] = useState<Lecture | null>( null);
    const videoRef = useRef<HTMLDivElement>(null);
    const completedLessons = useLessonProgressStore((state) => state.completedLessons);
    const updateLessonProgress = useLessonProgressStore((state) => state.updateLessonProgress);
    const {totalMinutes, formatted } = useCourseDuration(course? course.lectures : []);
      

    const scrollToVideo = () => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchCompletedLessons = async () => {
        //   setIsLoading(true);
        if(!courseId || !userId) return
        try {
            await updateLessonProgress(userId, courseId, "");
        } catch (err) {
            console.log(err,"error feching completed courses")
        }
        };
    
        fetchCompletedLessons();
    }, [userId, courseId, updateLessonProgress]);
      
      
    useEffect(() => {
        if (course?.lectures.length) {
            setSelectedLecture(course.lectures[0]);
        }
    }, [course]);
 
  return (
    <div>
        <div>
            <section className="sora">
                <nav id="details-header" className="flex items-center mb-[25px] sticky top-0 bg-black bg-opacity-5 py-2">
                    <BackBtn/>
                    <div className="text-center w-full">
                        <p className="text-[14px]/[17.64px] font-semibold sora">Tutorial details</p>
                    </div>
                </nav>
                <div ref={videoRef} className="w-full h-full">
                    <LazyVideo
                        key={selectedLecture?.cloudflare_uid} 
                        videoUrl={selectedLecture?.cloudflare_uid}
                        courseId={courseId} 
                        userId={Number(session?.userId)}
                        lectureVariantId={selectedLecture?.variant_item_id}
                    />
                </div>
              
                <div className='w-full pe-[2.5rem] py-[12px] flex flex-col justify-center gap-[6px]'>
                    <p id="tut-topic" className="font-semibold text-[18px]/[26px]">{course?.description}</p>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-[#CDC784] border-[#514B07] border-2 rounded-lg h-[25px] px-2 py-3">
                            <Image src={BookIcon} width={15} height={15} alt="book icon" />
                            <p className="font-semibold text-[9.28px]/[100%] sora text-[#514B07]">{course?.title}</p>
                        </div>
                        <span id='r-and-r' className='flex items-center gap-1 text-[15.04px]/[11.39px]'>
                            <Image src={UserIcon} width={20} height={20} alt="total no of users loving this course"/>
                            <p className="font-medium">{`${course?.total_enrolled} student(s)`}</p>
                        </span>
                    </div>
                </div>
                <div className="mt-[13px]">
                    <UtilityBar formatted={formatted}/>
                </div>
                <UserBadge userName={course?.tutor}/>
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
            </section>
        </div>
    </div>
  )
}

export default CourseDetailClient