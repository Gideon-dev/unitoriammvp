"use client";
import BillingItems from '@/app/components/BillingItems';
import UtilityBar from '@/app/components/UtilityBar';
import { MainCourse } from '@/app/utils/interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ConfirmedClientProps = {
  course: MainCourse | null,
  payment_method: string | null | undefined,
}

const ConfirmedPageClient = ({course, payment_method}: ConfirmedClientProps) => {
  const router = useRouter();

 
  return (
    <div className='w-full rounded-[10px] bg-[#1A1B1A] flex flex-col'>
        <div className='flex flex-col gap-6 justify-center items-center mt-[44px]'>
          <div>
              <Image src="/payment-success.svg" width={280} height={230} alt='success icon'/>
          </div>
          <p className='w-3/5 mx-auto font-semibold text-[16px]/[20px] sora text-center text-white'>You have successfully paid for your tutorial</p>
        </div>
        { course  ? (
          <div className="mt-[41px] px-2 flex flex-col gap-2 w-[95%] mx-auto">
            <p className='text-[12px]/[100%] font-semibold sora'>{course.description}</p>
            <p className='text-[#9EAD9A] text-[8px]/[100%] sora'>By <span className='text-white'>{course.tutor}</span></p>
            <UtilityBar />
          </div>
        ) : (
          <>
          </>
        )}
        <div className='mt-[30px] px-2 flex flex-col gap-3 w-[95%] mx-auto mb-[32px]'>
          <h1 className="text-[12px]/[100%] font-semibold">Payment summary</h1>
          <div className='flex gap-2 flex-col'>
            <BillingItems left='Payment Method' right={payment_method}/>
            <BillingItems left="Total Amount" right={`#${course?.price}`}/>
          </div>
        </div>
        <div className='w-full flex justify-center items-center mb-[25px]'>
          <button
           className='w-[85%] rounded-lg text-center flex  justify-center items-center bg-[#DB0D0D] font-normal text-[12px]/[100%] sora py-4' 
           onClick={()=> router.replace(`/auth/library`)}
           >
            Start Tutorial now
          </button>
        </div>


    </div>
  )
}

export default ConfirmedPageClient;