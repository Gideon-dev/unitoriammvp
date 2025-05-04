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
import { Suspense, useEffect, useState, useTransition } from 'react';   
import FilterIconClient from '@/app/components/FilterIconClient';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useCourseStore } from '@/app/lib/useCourseStore';
import { MainCourse } from '@/app/utils/interface';
import TutorialCard from '@/app/components/TutorialCard';
import SkeletonCard from '@/app/components/ShimmerSkeleton';




const DashboardHome = () => {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {courses,fetchCourses,isFetched} = useCourseStore();
  const [onboardingCourse, setOnboardingCourse] = useState<MainCourse>();
  const [totalTime, setTotalTime] = useState(0);
 



  // funtions
    const handlePageTransition = (slug: string)=>{
      startTransition(()=>{
        router.push(`/courses/course-detail/${slug}`)
      })
    }


  // useEffect hooks
  {/*for getting the total time for a user*/}
  // useEffect(() => {
  //   if (!session) return;

  //   const fetchTime = async () => {
  //     const { count, error } = await supabase
  //       .from('user_activity_events')
  //       .select('*', { count: 'exact', head: true })
  //       .eq('user_id', session.userId)
  //       .eq('type', 'heartbeat');

  //     if (error) {
  //       console.error('Error fetching time:', error);
  //       return;
  //     }

  //     setTotalTime((count || 0) * 30); // 30 seconds per heartbeat
  //   };

  //   fetchTime();
  // }, [session]);


  {/*for prefetching courses and setting onboarding course*/}

  useEffect(() => {
    if (!isFetched) {
      fetchCourses();
    }
  }, [isFetched]);
  
  useEffect(() => {
    if (courses.length > 0) {
      setOnboardingCourse(courses[0]);
    }
  }, [courses]);

  {/*for authentication redirect*/}

  useEffect(() => {
    if (status === "loading") return; 
    if (status === "unauthenticated") {router.push("/auth/signIn")};
  }, [session, status]);

  
  return (
    <div className='flex flex-col gap-7 h-screen'>
      <div id="user-banner" className='w-full flex items-center gap-5 sora'>
        <div className='w-[46px] aspect-square'>
          <Image src={UserImage} className='rounded-[50%]' alt='user image'/>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-[14px]/[12px]  font-semibold capitalize'>
          {`Hey ${status === "authenticated" ? session.user?.name || session?.full_name : "..fetching username"} `}
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
            <span>18</span><span className="font-normal mr-1"> {Math.floor(totalTime / 60)}m</span>
            {/* <span>24</span><span className="font-normal">m</span> */}
            {/* {Math.floor(totalTimeInSeconds / 60)} minutes */}
          </p>
        </div>
      </section>

      <section id="tutorials-section" className='flex flex-col gap-[20px] sora'>
        <HeaderBoard mainHead='Tutorials for you' nextHead='see all'/>
        <Suspense fallback={<SkeletonCard />}>
          {onboardingCourse ? (
            <div onClick={()=> handlePageTransition(onboardingCourse.slug)} className='cursor-pointer'>
              <TutorialCard
                description={onboardingCourse.description}
                image={onboardingCourse.image}
                // price={onboardingCourse.price}
                title={onboardingCourse.title}
                tutor={onboardingCourse.tutor}
              />
            </div>
          ) : (
            <SkeletonCard />
          )}
        </Suspense>
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
      {isPending &&
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner/>
        </div>
      }
    </div>
  )
}

export default DashboardHome;