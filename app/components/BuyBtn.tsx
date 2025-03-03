"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

type buyBtnProps = {
  slug: string,
  price: string,
}

const BuyBtn: React.FC<buyBtnProps> = ({slug, price}) => {
    const router = useRouter();
    const handleCheckOut = ()=>{
      router.push(`/auth/checkout/${slug}`);

    }
  return (
    <button className="w-4/5 rounded-lg  text-white px-3 py-5 bg-[#DB0D0D]" onClick={handleCheckOut}>
    <p className="text-[12px]/[15.12px] font-normal">
        Buy Tutorial now @ <span className="font-bold">{price}</span>
    </p>
</button>
  )
}

export default BuyBtn;