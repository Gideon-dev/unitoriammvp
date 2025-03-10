import Image from 'next/image';
import React from 'react'
import { TutorialCardProps } from '../utils/interface';

const TutorialCard: React.FC<TutorialCardProps> = ({
    tutor,
    description,
    image,  
    price
}) => {
  return (
    <div className="flex flex-col items-center w-full relative h-[212px] overflow-hidden rounded-[15px]">
      <div className="w-full h-[50%]" style={{backgroundImage: `url('https://res.cloudinary.com/dtlz2vhof/${image}')`, backgroundSize: "cover", backgroundPosition: "center"}} />
      <div className='w-full h-[50%] px-[17px] py-[12px] flex flex-col justify-center gap-[6px] bg-[#1A1B1A]'>
        <p className="text-[10px]/[12.6px] text-[#9EAD9A] flex items-center gap-1">By<span id='tutor-name' className="text-[#FAFAFA]">{tutor}</span></p>
        <p id="tut-topic" className="font-semibold text-[12px]/[15.12px]">{description}</p>
        <div className="flex items-center gap-2 ">
          <Image src={"/subject-icon.svg"} width={70} height={25} alt="subject icon"/>
          <span id='r-and-r' className='flex items-center gap-2 text-[9.04px]/[11.39px]'>
            <Image src={'/star.png'} width={11} height={11} alt="rating icon"/>
            <p className="font-sembiold">4.5</p>
            <p className="font-normal text-[#9EAD9A]">200 Reviews</p>
          </span>
        </div>
        <p className='text-[10px]/[12.6px] font-semibold '>#{price}</p>
      </div>
    </div>
  )
}

export default TutorialCard; 