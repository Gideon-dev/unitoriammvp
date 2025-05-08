"use client"
import React, { useEffect, useState } from 'react'
import VideoContent from './VideoContents';
import { Lecture, MainCourse } from '../utils/interface';

type tabProps = {
  isEnrolled: boolean,
  course: MainCourse | null;
  onSelectLecture: (lecture: Lecture) => void;
  syncVideoUrl?: (vid: string | undefined) => void;
  scrollToTop: () => void;
  completedLessons?: Record<string, string[] >;
}

const ShowTab:React.FC<tabProps>= ({isEnrolled, course, onSelectLecture, scrollToTop, completedLessons}) => {
  const [tab, setTab] = useState<"tutorial" | "reviews">("tutorial");
  const isLectureLocked = (index: number) => index !== 0 && !isEnrolled;

 

  return (
    <section className='w-full mt-[49px] sora'>
      <div className='w-full flex text-center'>
        <div 
        className={`w-1/2 text-center pb-[8px] text-[12px]/[15.12px]
        ${tab === "tutorial" ? "font-semibold border-b-[2.5px]  border-[#DB0D0D]": "font-normal border-b-[2px] border-[#201E1E]"}`}
        onClick={()=> setTab("tutorial")}
        >
          Tutorial
        </div>
        <div  
        className={`w-1/2 text-center pb-[8px] text-[12px]/[15.12px] 
        ${tab === "reviews" ? "font-semibold border-b-[2.5px]  border-[#DB0D0D] tracking-[1%]": "font-normal border-b-[2px] border-[#201E1E]"}`}
        onClick={()=> setTab("reviews")}
        >
          Reviews
        </div>
      </div>
      <section className="sora">
        {tab === "tutorial" ? (
          <div className=" mt-[30px]">
            <p className="sora text-[12px]/[18px] font-semibold text-[#D1D1D6]">Video Contents</p>
            <div className='mt-6 space-y-4'>
              {course && course.lectures.map((lec,idx) => {
                const isLocked = isLectureLocked(idx);
                const isComplete: boolean = course.course_id && completedLessons
                ? completedLessons[course.course_id]?.includes(lec.variant_item_id) ?? false
                : false;
                // console.log(isComplete);
                return(
                <div 
                key={lec.variant_item_id}
                onClick={() => {
                  if (!isLocked) {
                    onSelectLecture(lec);
                    scrollToTop();
                  }
                  
                }}
                className=''
                >
                  <VideoContent
                    btnType={isLocked ? "locked" : isComplete ? "complete" : "open"}
                    // btnType={isLocked ? "locked" : "open"}
                    mainText={lec.title}
                    altText={lec.content_duration}
                    proceed={!isLocked}
                  />
                </div>
              )})}
            </div>
          </div>
        ):(
        <div className="mt-[30px]">
          <p className="text-center text-gray-400">No reviews yet. Coming soon!</p>
        </div>
        )}
      </section>
    </section>
  )
}

export default ShowTab;