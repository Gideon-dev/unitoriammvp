"use client";
import BillingItems from '@/app/components/BillingItems';
import CheckoutBtn from '@/app/components/CheckoutBtn';
import UtilityBar from '@/app/components/UtilityBar';
import { MainCourse } from '@/app/utils/interface';
import React, { useRef, useState } from 'react'
import useCourseDuration from '../utils/hooks/contentDuration';

type CheckoutProps ={
    course: MainCourse
}
 const CheckOutPageClient:React.FC<CheckoutProps> = ({course}) => {
    const price = course.price;
    const flutterWaveRef = useRef<HTMLButtonElement | null>(null);
    const payStackRef = useRef<HTMLButtonElement | null>(null);
    const [gateway, setGateway] = useState<string>("");
    const {formatted } = useCourseDuration(course? course.lectures : []); 
    const totalLecture: number   = course ? course.lectures.length : 1;


    const handleSelect = (selected: "flutterwave" | "paystack") => {
        if (selected === "flutterwave") {
            setGateway("flutterwave")
            flutterWaveRef.current?.classList.add("bg-white", "text-red-500", "border", "border-red-500");
            flutterWaveRef.current?.classList.remove("bg-[#1A1B1A]", "text-white","border", "border-[#99A097]");
      
            payStackRef.current?.classList.remove("bg-white", "text-red-500", "border", "border-red-500");
            payStackRef.current?.classList.add("bg-[#1A1B1A]", "text-white", "border", "border-[#99A097]");
        } else {
            setGateway("paystack")
            payStackRef.current?.classList.add("bg-white", "text-red-500", "border", "border-red-500");
            payStackRef.current?.classList.remove("bg-[#1A1B1A", "text-white","border", "border-[#99A097]");
      
            flutterWaveRef.current?.classList.remove("bg-white", "text-red-500", "border", "border-red-500");
            flutterWaveRef.current?.classList.add("bg-[#1A1B1A]", "text-white","border", "border-[#99A097]");
        }
    }
    const discount = 100; // Apply discount logic later when needed
    const total = price ? parseFloat(price) - discount : NaN;
    const headingStyles = "text-[12px]/[15.12px] font-semibold sora text-[#FFFFFF]"
  return (
   <section className='sora w-full'>
        <h1 className="text-center sora text-[14px]/[17.64px] font-semibold sora">Complete your purchase</h1>
        <div className='bg-[#1A1B1A] mt-[17px] rounded-lg px-3 py-5 sora w-full'>
            <h1 className={`${headingStyles} text-[12px]/[15.12px] font-semibold sora`}>Tutorial Details</h1>
            <div className='flex flex-col gap-[5px] mt-[15px]'>
                <p className="font-semibold font-[14px]/[17.64px] sora">{course?.description}</p>
                <p className='text-[#9EAD9A] text-[10px]/[12.6px] sora'>By <span className='text-white'>{course?.tutor}</span></p>
                <UtilityBar formatted={formatted} totalLecture={totalLecture}/>
            </div>
            <div className='mt-[30px] sora'>
                <h1 className={`${headingStyles} sora`}>Billing Summary</h1>
                <div className="flex flex-col gap-[8px] mt-[15px]">
                    <BillingItems left='Tutorial Price' right={`#${course?.price}`}/>
                    <BillingItems left='Discount' right={`#${discount}`}/>
                    <BillingItems left='Amount to pay' right={`#${total}`}/>
                </div>
            </div>  
            <div className="mt-[33px]">
                <h1 className={`${headingStyles} sora`}>Select a payment method</h1>
                <div className="flex justify-between items-center w-full mt-[15px]">
                    <button 
                    className='w-[40%] rounded-lg border bg-[#1A1B1A] border-[#99A097] text-[#99A097] text-[10.91px]/[13.75px] font-normal p-3 sora'
                    ref={payStackRef}
                    onClick={() => handleSelect("paystack")}
                    >
                        Paystack
                    </button>
                    <button
                     className='w-[40%] rounded-lg  border bg-[#1A1B1A] border-[#99A097] text-[#99A097] text-[10.91px]/[13.75px] font-normal p-3 sora'
                     ref={flutterWaveRef}
                     onClick={() => handleSelect("flutterwave")}
                    >
                        Flutterwave
                    </button>
                </div>
            </div>
            <CheckoutBtn gateway={gateway} course={course} checkProceed={gateway !== "" ? true : false}/>
        </div>
   </section>
  )
}

export default CheckOutPageClient;