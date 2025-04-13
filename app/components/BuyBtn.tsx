"use client";
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import confetti from 'canvas-confetti';


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
    <button className="w-4/5 rounded-lg  text-white px-3 py-5 bg-[#DB0D0D] flex justify-center items-center"
     onClick={() => { 
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 360,
        startVelocity: 25,
        origin: { x: 0.5, y: 0.8 }, 
        colors: ['#ff0000', '#ff9900', '#ffff00', '#33cc33', '#3399ff', '#cc33ff'],
        scalar: 0.8,
      });
      
      handleNavigation(`/auth/checkout/${slug}`)}}
    >
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