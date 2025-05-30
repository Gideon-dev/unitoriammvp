import Image from "next/image";
import rateIcon from "../../public/star.png";
import { EnrolledCourse, MainCourse, NewEnrolledCourseProps, RatedBoxProps } from "../utils/interface";
import BookIcon from "../../public/book-icon.svg";
import Link from "next/link";

type RatedCourses = {
    dataRated?: MainCourse[] | NewEnrolledCourseProps[];
    isEnrolled?: boolean;
}

// Type guard functions to check the type of course
function isEnrolledCourse(course: MainCourse | NewEnrolledCourseProps): course is NewEnrolledCourseProps {
    return 'course_image' in course && 'enrollment_id' in course;
}

function isMainCourse(course: MainCourse | EnrolledCourse): course is MainCourse {
    return 'id' in course && 'image' in course;
}

const RatedItems = ({dataRated, isEnrolled = false}: RatedCourses) => {
    return(
        <section className='w-full flex gap-8 overflow-x-scroll pt-3 pb-3'>
          {dataRated && dataRated.map((item: MainCourse | NewEnrolledCourseProps)=> {
            if (!isEnrolledCourse(item) && !isMainCourse(item)) {
              console.error('Invalid course type:', item);
              return null;
            }

            return (
              <Link 
                key={isEnrolledCourse(item) ? item.enrollment_id : item.id} 
                href={`/courses/course-detail/${isEnrolledCourse(item) ? item.course_slug : item.slug}`}
                className="min-w-[48%]"
              >
                <RatedItem
                    course_jpg={isEnrolledCourse(item) ? item.course_image : item.image}
                    author_name={item.tutor}
                    tut_topic={isEnrolledCourse(item) ? item.course.description : item.description}
                    course_code={isEnrolledCourse(item) ? item.course.title : item.name}
                />
              </Link>
            );
          })}
        </section>
    )
};

export const RatedItem = ({
    course_jpg, 
    author_name, 
    tut_topic,
    course_code
}: RatedBoxProps) => {
    const src = course_jpg.startsWith('http') ? course_jpg : `https://res.cloudinary.com/dtlz2vhof/${course_jpg}`;
  return (
    <div className='relative flex flex-col aspect-square w-full rounded-[10px] overflow-hidden sora cursor-pointer'>
        <div 
        style={{backgroundImage: `url('${src}')`, backgroundPosition: "top", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}
        className="w-full h-[55%] overflow-hidden"
        />
        <div className='w-full h-auto flex flex-col gap-1 bg-[#1A1B1A] pl-3 pt-2 pb-2'>
            <p className="text-[10px]/[12.3px] text-[#9EAD9A] font-normal">By<span className="text-white">{author_name}</span></p>
            <h1 className="text-[10px]/[12.08px] font-semibold capitalize pr-3">{tut_topic.toLowerCase()}</h1>
            <div className="text-[4px]/[5.04px] flex items-center gap-1">
                    <div className="flex items-center gap-1 bg-[#CDC784] border-[#514B07] border-2 rounded-lg h-[25px] px-2 py-3">
                        <Image src={BookIcon} width={15} height={15} alt="book icon" />
                        <p className="font-semibold text-[9.28px]/[100%] sora text-[#514B07]">{course_code}</p>
                    </div>
                <Image src={rateIcon} width={10} height={10} alt="5-star rating"/>
                <p className="font-semibold">4.5 <span className="font-nomal text-[#9EAD9A]">200 reviews</span></p>
            </div>
        </div>
    </div>
  )
}

export default RatedItems;