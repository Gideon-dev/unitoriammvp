import Image from "next/image";
import rateIcon from "../../public/star.png";
import newIcon from "../../public/new-icon.svg";
import { RatedBoxProps } from "../utils/interface";
import { dataRated } from "../utils/data";
import Link from "next/link";



const RatedItems = () =>{
    // const [data, setData] = useState(dataRated); 
    return(
        <section className='w-full flex gap-8 sora overflow-x-scroll pt-3 pb-3'>
          {dataRated.map((item)=> (
                <Link key={item.id} href={`/courses/${item.id}`} className="min-w-[48%]">
                    <RatedItem
                    key={item.id}
                    author_name={item.author_name}
                    tut_topic={item.tut_topic}
                    subject_icon={item.subject_icon}
                    course_jpg={item.course_jpg}
                    price={item.price}
                    isNew={item.isNew}
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
    subject_icon, 
    price,
    isNew
}: RatedBoxProps) => {
  return (
    <div className='relative flex flex-col aspect-square w-full rounded-[10px] overflow-hidden sora cursor-pointer' >
        {isNew ? (
            <Image 
            src={newIcon} 
            width={20} 
            height={20} 
            alt="new course icon" 
            className="absolute top-[2vw] right-[2vw] w-[20px] h-[20px] object-cover object-center" />) 
            : (<></>)
        }
        <div 
        style={{backgroundImage: `url('${course_jpg}')`, backgroundPosition: "top", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}
        className="w-full h-[55%] overflow-hidden"
        >
        </div>
        <div className='w-full h-auto flex flex-col gap-1 bg-[#1A1B1A] pl-3 pt-2 pb-2'>
            <p className="text-[10px]/[12.3px] text-[#9EAD9A] font-normal">By<span className="text-white">{author_name}</span></p>
            <h1 className="text-[10px]/[12.08px] font-semibold pr-3">How to solve quadratic equations</h1>
            <div className="text-[4px]/[5.04px] flex items-center gap-1">
                <Image src={subject_icon} width={50} height={17} alt={`${tut_topic}'s icon`}/>
                <Image src={rateIcon} width={10} height={10} alt="5-star rating"/>
                <p className="font-semibold">4.5 <span className="font-nomal text-[#9EAD9A]">200 reviews</span></p>
            </div>
            <p className="font-semibold text-[9px]/[10.2px]">#<span>{price}</span></p>
        </div>
    </div>
  )
}







export default RatedItems;