"use client";
import React, { useTransition } from 'react'
import { MainCourse } from '../utils/interface'
import { HandlePayment } from '../lib/paymentHandle'
import { useSession } from 'next-auth/react'

type CheckoutProps = {
  course: MainCourse | null,
  gateway:string,
  checkProceed: boolean,
}

const CheckoutBtn = ({course, gateway, checkProceed}:CheckoutProps) => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition()

const handlePaymentClick = (course: MainCourse| null, gateway: string) => {
    if (!session) return;
    startTransition(async() => { 
      HandlePayment({ gateway, course, session });
    });
  };

  return (
    <div className="w-full mt-7 flex items-center justify-center sora ">
      <button 
      className="w-[90%] rounded-[15px] p-3 bg-[#DB0D0D] text-center text-white text-[12px]/[15.12px] font-normal disabled:bg-[#AC8D8A] disabled:text-red-500"
      onClick={()=>handlePaymentClick(course,gateway)}
      disabled={!checkProceed} 
      >
        {isPending ?  
        (
          <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ):`Procced to pay`} 
      </button>
    </div>
  )
}

export default CheckoutBtn