"use client";
import React from 'react'
import backBtn from "../../public/back-btn.svg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {}

const BackBtn = (props: Props) => {
    const router = useRouter();
  return (
    <button className="w-[20px] aspect-square cursor-pointer" onClick={() => router.back()} >
        <Image src={backBtn} alt="back icon"/>
    </button>
  )
}

export default BackBtn