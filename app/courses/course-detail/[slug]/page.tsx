import { getCourse } from "@/app/lib/getCourse";
import { getEnrolledCourses } from "@/app/lib/getEnrolledCourse";
import { EnrolledCourse, MainCourse } from "@/app/utils/interface";
import CourseDetailClient from "@/app/components/CourseDetailClient";

export default async function CourseDetailServerPage({params}:{ params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const course: MainCourse | null = await getCourse(resolvedParams.slug);
    const enrolledCourses: EnrolledCourse[] = await getEnrolledCourses();
    // const isEnrolled = enrolledCourses.some((c) => resolvedParams.slug.startsWith(c.course.toLowerCase()));
    const isEnrolled = enrolledCourses.some((c) => 
      resolvedParams.slug.trim().toLowerCase() === c.course_slug.trim().toLowerCase()
    );
    

    // console.log("Enrolled Courses:", enrolledCourses);
    // console.log("Course Slug:", resolvedParams.slug);
    // console.log(isEnrolled); 
    
    if(!course && !enrolledCourses){
      return <p>something occured, try again...</p>
    }
  return (
    <CourseDetailClient  course={course} lectures={course?.lectures} isEnrolled={isEnrolled} />
  )
};  