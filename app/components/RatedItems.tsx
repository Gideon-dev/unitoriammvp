import Image from "next/image";
import rateIcon from "../../public/star.png";
import { MainCourse, RatedBoxProps } from "../utils/interface";
import BookIcon from "../../public/book-icon.svg";
import Link from "next/link";

type RatedCourses = {
    dataRated: MainCourse[]
}

const RatedItems = ({dataRated}: RatedCourses) => {
    return(
        <section className='w-full flex gap-8 overflow-x-scroll pt-3 pb-3'>
          {dataRated.map((item)=> (
            <Link key={item.id} href={`/courses/${item.id}`} className="min-w-[48%]">
                <RatedItem
                    key={item.id}
                    author_name={item.tutor}
                    tut_topic={item.description}
                    course_jpg={item.image}
                    course_code={item.name}
                />
            </Link>
          ))}
        </section>
    )
};



export const RatedItem = ({
    course_jpg, 
    author_name, 
    tut_topic,
    course_code
}: RatedBoxProps) => {
  return (
    <div className='relative flex flex-col aspect-square w-full rounded-[10px] overflow-hidden sora cursor-pointer'>
        <div 
        style={{backgroundImage: `url('https://res.cloudinary.com/dtlz2vhof/${course_jpg}')`, backgroundPosition: "top", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}
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