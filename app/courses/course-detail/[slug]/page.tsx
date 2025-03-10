
import Image from "next/image";
import UtilityBar from "@/app/components/UtilityBar";
import UserBadge from "@/app/components/UserBadge";
import ShowTab from "@/app/components/VideoReviews";
import { getCourse } from "@/app/lib/getCourse";
import BackBtn from "@/app/components/BackBtn";
import { getEnrolledCourses } from "@/app/lib/getEnrolledCourse";
import { EnrolledCourse, MainCourse } from "@/app/utils/interface";
import BuyBtn from "@/app/components/BuyBtn";
// type paramsProps = {
//     params:{slug: string};
// }

export default async function CourseDetailPage({params}:{ params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const course:MainCourse | null = await getCourse(resolvedParams.slug);
    const enrolledCourses: EnrolledCourse[] = await getEnrolledCourses();
    const isEnrolled = enrolledCourses.some((c) => resolvedParams.slug.startsWith(c.course.toLowerCase()));
    // console.log("Enrolled Courses:", enrolledCourses);
    // console.log("Course Slug:", resolvedParams.slug);
    // console.log(isEnrolled); 
    
    if(!course && !enrolledCourses){
        <p>something occured, try again...</p>
    }
  return (
    <div>
        <section className="sora">
            <div id="details-header" className="flex items-center mb-[25px]">
               <BackBtn/>
                <div className="text-center w-full">
                    <p className="text-[14px]/[17.64px] font-semibold sora">Tutorial details</p>
                </div>
            </div>
            <div className="w-full h-[50%] aspect-video rounded-xl" style={{backgroundImage: `url('https://res.cloudinary.com/dtlz2vhof/${course?.image}')`, backgroundSize: "cover", backgroundPosition: "center"}}  />
            <div className='w-full h-[50%] pe-[2.5rem] py-[12px] flex flex-col justify-center gap-[6px]'>
            <p id="tut-topic" className="font-semibold text-[18px]/[26px]">{course?.description}</p>
            <div className="flex items-center gap-2 ">
                <Image src={"/subject-icon.svg"} width={70} height={25} alt="subject icon"/>
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
            <ShowTab isEnrolled={isEnrolled} course={course}/>
            <div className="w-full flex justify-center mt-[36px] sora">
                {!isEnrolled && (
                    <BuyBtn slug={course?.slug} price={course?.price}/>
                )}
            </div>
        </section>
        <section>

        </section>
    </div>
  )
};  