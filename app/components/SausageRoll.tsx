import React from 'react'
import { SausageProps } from '../utils/interface'
import Image from 'next/image'



const SausageRoll: React.FC<SausageProps> = ({headUrl, bodyText, tailText }) => {
  return (
    <div className='flex items-center w-full bg-[#1A1B1A] rounded-lg p-4'>
        <Image src={headUrl} width={15} height={15} alt="icon"/>
        <p>
            {bodyText}
        </p>
        <p>
            {tailText}
        </p>
    </div>
  )
}

export default SausageRoll