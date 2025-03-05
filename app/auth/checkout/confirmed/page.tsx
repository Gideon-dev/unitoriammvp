import Image from 'next/image';
import React from 'react'

type Props = {}

const confirmedPage = (props: Props) => {
  return (
    <div className='w-full rounded-[10px] bg-[#1A1B1A] flex flex-col'>
        <div className='flex flex-col gap-6 justify-center items-center mt-[44px]'>
            <div>
                <Image src="/payment-success.svg" width={280} height={230} alt='success icon'/>
            </div>
            <p className='w-3/5 mx-auto font-semibold text-[16px]/[20px] sora text-center text-white'>You have successfully paid for your tutorial</p>

        </div>
        <div>
            
        </div>

    </div>
  )
}

export default confirmedPage;