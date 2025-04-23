"use client"
import React, { useEffect, useState } from 'react'
import VideoContent from './VideoContents';
import { Lecture, MainCourse } from '../utils/interface';

type tabProps = {
  isEnrolled: boolean,
  course: MainCourse | null;
  onSelectLecture: (lecture: Lecture) => void;
  syncVideoUrl?: (vid: string | undefined) => void;
}

const ShowTab:React.FC<tabProps>= ({isEnrolled, course, onSelectLecture,syncVideoUrl}) => {
  const [tab, setTab] = useState<string>("tutorial");
  const [selectedCourse,  setSelectedCourse] = useState<Lecture | null>(null);

  useEffect(() => {
    if (course && course.lectures.length > 0) {
      setSelectedCourse(course.lectures[0]);
    }
  }, [course]);


  const handleVideo = (vid: string | undefined) => {
    if (syncVideoUrl && vid !== selectedCourse?.hls_video_url) {  // currentVideoUrl is the state you're maintaining in the parent
      syncVideoUrl(vid);
    }
  };
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
            <div className='mt-6'>
              <div className='w-full mb-3'>
                <VideoContent btnType='open' mainText={selectedCourse?.title} altText={selectedCourse?.content_duration} proceed={true}/>
              </div>
             <div className="flex flex-col gap-3 w-full h-auto ">
                {course?.lectures.slice(1).map((lecture, index) => ( 
                  <div 
                    key={index}
                    onClick={() => {
                      if (isEnrolled) {
                        setSelectedCourse(lecture);
                        onSelectLecture(lecture);
                      }
                    }}
                  >
                    <VideoContent
                      btnType={isEnrolled ? "open" : "locked"}
                      mainText={lecture.title}
                      altText={lecture.content_duration}
                      proceed={isEnrolled}
                      videoLink={lecture.hls_video_url}
                      syncLink={handleVideo}
                    />  
                  </div>
                ))}
             </div>
             <div className='mt-[25px]'>
                <h1 className="sora text-[12px]/[18px] font-semibold mb-[15px]"> Documents </h1>
                <VideoContent 
                  btnType="document"
                  mainText={course?.document}
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