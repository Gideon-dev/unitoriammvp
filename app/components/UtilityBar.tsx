import Image from 'next/image'
import React from 'react'

const UtilityBar = () => {
  return (
    <div className='flex w-fit gap-2 items-center'>
      <div className='flex items-center gap-1 text-[8.73px]/[11px] -tracking-[3%]'>
        <Image src="/video-octagon.svg" width={12} height={12} alt='video icon'/> 
        <p><span className='mr-1'>12</span>videos</p>
      </div>
      <div className='flex items-center gap-1 text-[8.73px]/[11px] -tracking-[3%]'>
        <Image src="/note-2.svg" width={12} height={12} alt='book icon'/> 
        <p><span className='mr-1'>12</span>docs</p>
      </div>
      <div className='flex items-center gap-1 text-[8.73px]/[11px] -tracking-[3%]'>
        <Image src="/clock.svg" width={12} height={12} alt='clock icon'/> 
        <p><span>2</span>hours <span>13</span> minutes</p>
      </div>
    </div>
  )
}

export default UtilityBar;