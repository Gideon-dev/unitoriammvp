"use client";
import React, { useState, useTransition } from 'react'
import { MainCourse } from '../utils/interface'
import { HandlePayment } from '../lib/paymentHandle'
import { useSession } from 'next-auth/react'
import LoadingSpinner from './LoadingSpinner';

type CheckoutProps = {
  course: MainCourse | null,
  gateway:string,
  checkProceed: boolean,
}

const CheckoutBtn = ({course, gateway, checkProceed}:CheckoutProps) => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

const handlePaymentClick = (course: MainCourse| null, gateway: string) => {
    if (!session) return;
    setIsLoading(true);
    startTransition(async() => { 
     await  HandlePayment({ gateway, course, session });
     setIsLoading(false);
    });
  };

  return (
    <div className="w-full mt-7 flex items-center justify-center sora ">
      <button 
      className="w-[90%] rounded-[15px] p-3 bg-[#DB0D0D] text-center text-white text-[12px]/[15.12px] font-normal disabled:bg-[#AC8D8A] disabled:text-red-500"
      onClick={()=>handlePaymentClick(course,gateway)}
      disabled={!checkProceed || isLoading} 
      >
        {isLoading ?  
        (
          <div className="w-full flex justify-center items-center">
            <LoadingSpinner/>
          </div>
        ):`Procced to pay`} 
      </button>
    </div>
  )
}

export default CheckoutBtn