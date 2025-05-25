import LibraryClientComponent from "@/app/components/LibraryClientComponent";
import { getEnrolledCourses } from "@/app/lib/getEnrolledCourse";
import { NewEnrolledCourseProps } from "@/app/utils/interface";



 export default async function LibraryPage () {
    const enrolledCourses: NewEnrolledCourseProps[] = await getEnrolledCourses();
    if(!enrolledCourses || enrolledCourses.length === 0){
      return <p className="sora font-normal text-[14px]/[100%]"> Purchase a Course to build your Library</p>
    }


  return <LibraryClientComponent enrolledCourses={enrolledCourses} />
}