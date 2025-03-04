"use client"
import React, { useEffect, useState } from 'react'
import VideoContent from './VideoContents';
import { Lecture, MainCourse } from '../utils/interface';

type tabProps = {
  isEnrolled: boolean,
  course: MainCourse;
}

const ShowTab:React.FC<tabProps>= ({isEnrolled, course}) => {
  const [tab, setTab] = useState<string>("tutorial");
  const [selectedCourse,  setSelectedCourse] =useState<Lecture | null>();

    useEffect(() => {
      if (course?.lectures.length > 0) {
        setSelectedCourse(course.lectures[0]);
      }
    }, [course.lectures]);
    
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
        onClick={()=> setTab("reviews") }
        >
          Reviews
        </div>
      </div>
      <section className="sora">
        {tab === "tutorial" ? (
          <div className=" mt-[30px]">
            <p className="sora text-[12px]/[18px] font-semibold text-[#D1D1D6]">Video Contents</p>
            <div className='mt-6'>
              <div className='w-full mb-3'>
                <VideoContent btnType='open' mainText={selectedCourse?.description} altText={selectedCourse?.content_duration} proceed={true}/>
              </div>
             <div className="flex flex-col gap-3 w-full h-auto ">
                {course.lectures.map((lecture, index)=> (
                  <VideoContent
                  key={index}
                  btnType={isEnrolled ? "open": "locked"}
                  mainText={lecture.description}
                  altText={lecture.content_duration}
                  proceed={isEnrolled}
                  />  
                ))}
             </div>
             <div className='mt-[25px]'>
                <h1 className="sora text-[12px]/[18px] font-semibold mb-[15px]"> Documents </h1>
                <VideoContent 
                  btnType="document"
                  mainText={course.document}
                  altText="30Pages"
                  proceed={true}
                />
             </div>
            </div>
          </div>
        ):(
          <>
          </>
        )}
      </section>
      
      
        
    </section>
  )
}

export default ShowTab;