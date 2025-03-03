import Link from 'next/link';
import React from 'react';

type HeaderProps = {
    mainHead: string,
    nextHead: string,
    styles?: string
}

const HeaderBoard = (props: HeaderProps) => {
  return (
    <section className={`flex items-center justify-between ${props.styles}`}>
      <p className="font-semibold text-[14px]/[17.64px]">{props.mainHead}</p>
      <Link href="" className='text-[#5F5E74] text-[12px]/[15.12px] font-normal'>{props.nextHead}</Link>
    </section>
  )
}

export default HeaderBoard