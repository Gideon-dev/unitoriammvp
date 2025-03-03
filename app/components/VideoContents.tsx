import React from 'react';
import { Lecture } from '../utils/interface';
import lockIcon from '../../public/lock-circle.svg';
import playIcon from '../../public/play-circle.svg';
import docuIcon from '../../public/document-text.svg';
import Image from 'next/image';
import Link from 'next/link';

type videoPillProps = {
  btnType: "locked"  | "open" | "document",
  mainText?: string,
  altText: any,
  proceed: boolean,
  docuLink?: string
}

export const VideoContent = ({btnType, mainText, altText, proceed,docuLink}: videoPillProps) =>{
  return(
    <button className='w-full rounded-xl flex gap-1 bg-[#1A1B1A] text-white items-center sora p-3 ' disabled={proceed ? true : false} >
      <Image src={btnType === "locked" ? lockIcon : btnType === "open" ? playIcon : docuIcon } 
      width={20}
      height={20} 
      alt="video button"
      /> 
      <span className='flex justify-between w-full items-center'>
        <p className="text-[10px]/[18px] font-semibold text-[#D1D1D6] ">
        {mainText}
        </p>
        <p className="text-[8px]/[14px] font-normal">
        {altText}
        </p>
      </span>
    </button>
  )
}

export default VideoContent;

export const DocumentContent = ({btnType, mainText, altText, proceed,docuLink}: videoPillProps)=>{
  <button className='w-full rounded-xl flex justify-between bg-[#1A1B1A] text-white items-center sora p-3' disabled={proceed ? true : false} >
  <Link href={`/${docuLink}`}>
    <Image src={btnType === "locked" ? lockIcon : btnType === "open" ? playIcon : docuIcon } 
    width={20}
    height={20} 
    alt="video button"
    />
    <p className="text-[10px]/[18px] font-semibold text-[#D1D1D6] ">
    {mainText}
    </p>
    <p className="text-[8px]/[14px] font-normal">
    {altText}
    </p>
  </Link>
</button>
} 