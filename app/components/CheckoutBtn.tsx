"use client";
import React from 'react'
import { MainCourse } from '../utils/interface'
import { HandlePayment } from '../lib/paymentHandle'
import { useSession } from 'next-auth/react'

type CheckoutProps = {
  course: MainCourse | null,
  gateway:string,
  checkProceed: boolean
}

const CheckoutBtn = ({course, gateway, checkProceed}:CheckoutProps) => {
  const { data: session } = useSession();

  const handlePaymentClick = () => {
      if (!session) return;
      HandlePayment({ gateway, course, session });
  };

  return (
    <div className="w-full mt-7 flex items-center justify-center sora ">
      <button 
      className="w-[90%] rounded-[15px] p-3 bg-[#DB0D0D] text-center text-white text-[12px]/[15.12px] font-normal disabled:bg-[#AC8D8A] disabled:text-red-500"
      onClick={handlePaymentClick}
      disabled={!checkProceed} 
      >
          Procced to pay 
      </button>
    </div>
  )
}

export default CheckoutBtn