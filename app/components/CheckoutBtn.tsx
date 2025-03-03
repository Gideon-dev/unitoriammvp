import React from 'react'
import { MainCourse } from '../utils/interface'
import { handlePayment } from '../lib/paymentHandle'

type CheckoutProps = {
  course: MainCourse | null,
  gateway:string,
  checkProceed: boolean
}

const CheckoutBtn = ({course, gateway, checkProceed}:CheckoutProps) => {
  return (
    <div className="w-full mt-7 flex items-center justify-center sora ">
      <button 
      className="w-[90%] rounded-[15px] p-3 bg-[#DB0D0D] text-center text-white text-[12px]/[15.12px] font-normal disabled:bg-[#AC8D8A] disabled:text-red-500"
      onClick={()=> handlePayment({gateway, course})}
      disabled={!checkProceed} 
      >
          Procced to pay 
      </button>
    </div>
  )
}

export default CheckoutBtn