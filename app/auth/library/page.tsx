import BackBtn from "@/app/components/BackBtn";
import EnrolledTutorialCard from "@/app/components/EnrolledCard";
import { getEnrolledCourses } from "@/app/lib/getEnrolledCourse";
import { EnrolledCourse } from "@/app/utils/interface";
import Link from "next/link";


 export default async function LibraryPage () {
    const enrolledCourses: EnrolledCourse[] = await getEnrolledCourses();
    console.log(enrolledCourses);
    if(!enrolledCourses || enrolledCourses.length === 0){
      <p className="sora font-normla text-[14px]/[100%]"> Purchase a Course to have build your Library</p>
    }
    
  return (
    <div>
      <BackBtn/>
      <div className="flex flex-col gap-4 mt-3"> 
        {enrolledCourses.map((course,index) => (
            <Link key={index} href={`/courses/course-detail/${course.course_slug}`}>
              <EnrolledTutorialCard
              course_image={course.course_image}
              tutor={course.tutor}
              topic={course.lectures[0].title}
              />
            </Link>
          ))}
      </div>
    </div>
  )
}

// export default LibraryPage;