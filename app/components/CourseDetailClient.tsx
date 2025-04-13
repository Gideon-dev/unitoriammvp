"use client";
import Image from "next/image";
import { Lecture, MainCourse } from "../utils/interface";
import BackBtn from "./BackBtn";
import LazyVideo from "./LazyVideo";
import UtilityBar from "./UtilityBar";
import UserBadge from "./UserBadge";
import ShowTab from "./VideoReviews";
import BuyBtn from "./BuyBtn";
import BookIcon from "../../public/book-icon.svg";
import { useEffect, useState } from "react";
import TempBuyBtn from "./TempBuyBtn";
import { useSession } from "next-auth/react";
type detailProps = {
    lectures:  Lecture[] | undefined,
    course: MainCourse | null,
    isEnrolled: boolean
}

const CourseDetailClient = ({lectures,course,isEnrolled}: detailProps) => {
    const [selectedLecture, setSelectedLecture] = useState<Lecture | null>( null);
  const { data: session } = useSession();

    useEffect(() => {
        if (course?.lectures.length) {
            setSelectedLecture(course.lectures[0]);
        }
    }, [course])
    
  return (
    <div>
         <div>
        <section className="sora">
            <div id="details-header" className="flex items-center mb-[25px]">
               <BackBtn/>
                <div className="text-center w-full">
                    <p className="text-[14px]/[17.64px] font-semibold sora">Tutorial details</p>
                </div>
            </div>
            {/* <div className="w-full aspect-video rounded-xl" style={{backgroundImage: `url('https://res.cloudinary.com/dtlz2vhof/${course?.image}')`, backgroundSize: "cover", backgroundPosition: "center"}}  /> */}
            <div className="w-full aspect-video rounded-xl h-full overflow-hidden"> 
                <LazyVideo videoUrl ={course?.lectures[0].intro_url} posterUrl={course?.image} />
            </div>
            <div className='w-full pe-[2.5rem] py-[12px] flex flex-col justify-center gap-[6px]'>
                <p id="tut-topic" className="font-semibold text-[18px]/[26px]">{course?.description}</p>
                <div className="flex items-center gap-2">
                    {/* <Image src={"/subject-icon.svg"} width={70} height={25} alt="subject icon"/> */}
                    <div className="flex items-center gap-1 bg-[#CDC784] border-[#514B07] border-2 rounded-lg h-[25px] px-2 py-3">
                        <Image src={BookIcon} width={15} height={15} alt="book icon" />
                        <p className="font-semibold text-[9.28px]/[100%] sora text-[#514B07]">{course?.title}</p>
                    </div>
                    <span id='r-and-r' className='flex items-center gap-2 text-[9.04px]/[11.39px]'>
                        <Image src={'/star.png'} width={11} height={11} alt="rating icon"/>
                        <p className="font-sembiold">4.5</p>
                        <p className="font-normal text-[#9EAD9A]">200 Reviews</p>
                    </span>
                </div>
            </div>
            <div className="mt-[13px]">
                <UtilityBar/>
            </div>
            <UserBadge userName={course?.tutor}/>
            <ShowTab isEnrolled={isEnrolled} course={course} onSelectLecture={setSelectedLecture}/>
            <div className="w-full flex justify-center mt-[36px] sora">
                {!isEnrolled && (
                    // <BuyBtn slug={course?.slug} price={course?.price}/>
                    <TempBuyBtn 
                        courseId={course?.course_id} 
                        userId={session?.userId ? Number(session?.userId): undefined} 
                        courseSlug={course?.slug}
                    />
                )}
            </div>
        </section>
    </div>
    </div>
  )
}

export default CourseDetailClient