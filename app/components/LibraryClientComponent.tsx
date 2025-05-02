"use client";
import { useTransition } from "react";
import { EnrolledCourse } from "../utils/interface"
import BackBtn from "./BackBtn"
import EnrolledTutorialCard from "./EnrolledCard";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

type EnrolledCourseProps = {
  enrolledCourses: EnrolledCourse[];
}

const LibraryClientComponent = ({enrolledCourses}: EnrolledCourseProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handlePageTransition = (slug: string) =>{
    startTransition(()=>{
      router.push(`/courses/course-detail/${slug}`)
    })
  }
  return (
    <div>
      <BackBtn/>
      <div className="flex flex-col gap-4 mt-3"> 
      {enrolledCourses.map((course,index) => (
          <div key={index} onClick={() => handlePageTransition(course.course_slug)}>
              <EnrolledTutorialCard
                course_image={course.course_image}
                tutor={course.tutor}
                topic={course.lectures[0].title}
                title={course.course}
              />
          </div>
          ))}
      </div>
      {isPending && 
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner/>
        </div>
      }
  </div>
  )
}

export default LibraryClientComponent