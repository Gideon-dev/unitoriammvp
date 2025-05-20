import Image from 'next/image'
import React from 'react'
const UserBadge = ({userName}:{userName: string | undefined}) => {
  return (
    <div className='w-fit flex gap-3 items-center mt-3'>
        <Image src="/user-picture.png"  width={24} height={24} className="rounded-[50%]" alt="user icon"/>
        <p className='text-[12px]/[15.12px] font-bold'> {userName} </p>
    </div>
  )
}

export default UserBadge