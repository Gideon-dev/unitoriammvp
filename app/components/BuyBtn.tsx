"use client";
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'

type buyBtnProps = {
  slug: string | undefined,
  price: string | undefined,
}

const BuyBtn: React.FC<buyBtnProps> = ({slug, price}) => {
  const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleNavigation = ( path: string) => {
      startTransition(() => {
        router.push(path);
      });
    };
      
  return (
    <button className="w-4/5 rounded-lg  text-white px-3 py-5 bg-[#DB0D0D] flex justify-center items-center" onClick={() => handleNavigation(`/auth/checkout/${slug}`)}>
      {isPending ? (
       
        <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        
      ):
      (
        <p className="text-[12px]/[15.12px] font-normal">Buy Tutorial now @<span className="font-bold">{price}</span></p>
      )}
    </button>
  )
}

export default BuyBtn;