"use client";
import Image from 'next/image';
import UserImage from '../../../public/user-picture.png';
import completedIcon from '../../../public/completed-icon.svg';
import completedBg from '../../../public/award.svg';
import timeIcon from '../../../public/time-icon.svg';
import timeBg from '../../../public/timer.svg';
import RatedItems from '../../components/RatedItems';
import HeaderBoard from '../../components/HeaderBoard';
import { signOut, useSession } from "next-auth/react";
import { Suspense, useEffect, useTransition } from 'react';   
import FilterIconClient from '@/app/components/FilterIconClient';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';




const DashboardHome = () => {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return; // Wait until session is ready
    if (status === "unauthenticated") router.push("/auth/signIn");
  }, [session, status]);



  
  return (
    <div className='flex flex-col gap-7 h-screen'>
      <div id="user-banner" className='w-full flex items-center gap-5 sora'>
        <div className='w-[46px] aspect-square'>
          <Image src={UserImage} className='rounded-[50%]' alt='user image'/>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-[14px]/[12px]  font-semibold capitalize'>
          {`Hey ${status === "authenticated" ? session.user?.name : "..fetching username"} `}
          </p>
          <p id="" className="font-normal text-[10px]/[12.6px]">Welcome back to learning!!</p> 
        </div>
      </div>

      <section id='search-section' className="">
        <div id="filter-box" className=''>
          <Suspense fallback={<p>...</p>}>
            <FilterIconClient /> 
          </Suspense>
        </div> 
      </section>

      <section id='status-section' className='w-full h-full flex justify-between items-center sora'>
        <div id='completed-bar' className='relative overflow-hidden bg-[#A5C69D] w-[45%] rounded-xl ps-3 pe-0 py-3 flex flex-col gap-1'>
          <Image src={completedBg} className='absolute -right-0 -top-0' alt='background award icon'/>
          <Image src={completedIcon} alt='completed icon' className=''/>
          <p className='uppercase text-[#16430C] text-[11px]/[13.86px] font-extrabold'>Completed</p>
          <p className="font-normal text-[9px]/[12px] text-[#292828] flex items-center gap-[3px]"><span className='text-[#292828]'>10</span>Tutorials</p>
        </div>
        <div id='timespent-bar' className='relative overflow-hidden bg-[#A1A8BC] w-[45%] rounded-xl ps-3 pe-0 py-3 flex flex-col gap-1'>
          <Image src={timeBg} alt='timer background icon' className='absolute -right-0 -top-0' />
          <Image src={timeIcon} alt='timer icon' className='' />
          <p className="uppercase text-[#16430C] text-[11px]/[13.86px] font-extrabold ">TIME SPENT</p>
          <p className='font-semibold text-[9px]/[12px] text-[#292828]'>
            <span>18</span><span className="font-normal mr-1">h</span>
            <span>24</span><span className="font-normal">m</span>
          </p>
        </div>
      </section>

      <section id="tutorials-section" className='flex flex-col gap-[20px] sora'>
        <HeaderBoard mainHead='Tutorials for you' nextHead='see all'/>
        <div className="flex flex-col items-center first-letter:w-full h-full relative aspect-video overflow-hidden rounded-[15px]">
          <div className="bg-[url('/tutor.png')] w-full bg-cover bg-top center bg-no-repeat h-[50%]" />
          <div className='w-full h-[50%] px-[17px] py-[12px] flex flex-col justify-center gap-[6px] bg-[#1A1B1A]'>
            <p className="text-[10px]/[12.6px] text-[#9EAD9A] flex items-center gap-1">By<span id='tutor-name' className="text-[#FAFAFA]">Aishatou Abdullahi</span></p>
            <p id="tut-topic" className="font-semibold text-[12px]/[15.12px] ">How to solve arithmetic Progression (A.P.)</p>
            <div className="flex items-center gap-2 ">
              <Image src={"/subject-icon.svg"} width={70} height={25} alt="subject icon"/>
              <span id='r-and-r' className='flex items-center gap-2 text-[9.04px]/[11.39px]'>
                <Image src={'/star.png'} width={11} height={11} alt="rating icon"/>
                <p className="font-sembiold">4.5</p>
                <p className="font-normal text-[#9EAD9A]">200 Reviews</p>
              </span>
            </div>
            <p className='text-[10px]/[12.6px] font-semibold '>#2,500</p>
          </div>
        </div>
      </section>

      <section id="rated-section" className='w-full'>
        <HeaderBoard mainHead='Top Rated' nextHead='See all'/> 
        <RatedItems/>
      </section>
      <button
      onClick={() => startTransition(() => signOut({ callbackUrl: "/auth/signIn" }))} 
      className="px-4 py-2 bg-red-500 text-white rounded-md w-full"
      >
        {isPending ? (
          <div className='w-full flex justify-center items-center'>
            <LoadingSpinner/>
          </div>
        ) : (
          <p> Sign Out</p>
        ) }
      </button>
    </div>
  )
}

export default DashboardHome;