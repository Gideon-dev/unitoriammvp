import { getCourse } from "@/app/lib/getCourse";
import { getEnrolledCourses } from "@/app/lib/getEnrolledCourse";
import { EnrolledCourse, MainCourse } from "@/app/utils/interface";
import CourseDetailClient from "@/app/components/CourseDetailClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export default async function CourseDetailServerPage({params}:{ params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const course: MainCourse | null = await getCourse(resolvedParams.slug);
    const enrolledCourses: EnrolledCourse[] = await getEnrolledCourses();
    const isEnrolled = enrolledCourses.some(
      (c) => c.course_slug.trim().toLowerCase() === resolvedParams.slug.trim().toLowerCase()
    );
    const session = await getServerSession(authOptions);
    const userId = Number(session?.userId);
    if(!course){
      return <p>something occured, try again...</p>
    }
  return (
    <CourseDetailClient  course={course} courseId={course?.course_id} userId={userId} isEnrolled={isEnrolled} />
  )
};  