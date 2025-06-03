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
import { useCourseStore } from '@/app/stores/useCourseStore';
import { MainCourse } from '@/app/utils/interface';
import TutorialCard from '@/app/components/TutorialCard';
import SkeletonCard from '@/app/components/ShimmerSkeleton';
import DashboardRecommendations from '@/app/components/DashboardRecommendations';
import RecommendedSkeleton from '@/app/components/RecommendedSkeleton';
import StatusSection from '@/app/components/StatusSection';
import UserBanner from '@/app/components/UserBanner';

const DashboardHome = () => {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {courses,fetchCourses,isFetched} = useCourseStore();
  const [onboardingCourse, setOnboardingCourse] = useState<MainCourse>();
  const [totalTime, setTotalTime] = useState(0);
  const [totalCompletedTutorials, setTotalCompletedTutorials] = useState<number>(0);
  const [tutorialLoading, setTotalLoading] = useState<boolean>(false);
 



  // funtions
  const handlePageTransition = (slug: string)=>{
    startTransition(()=>{
      router.push(`/courses/course-detail/${slug}`)
    })
  }


  // useEffect hooks
  {/*for getting the total completed tutorial for a user*/}
  useEffect(() => {
    if(!session) return;
    
    const fetchProgress = async () => {
      setTotalLoading(true);
      const user_id = Number(session.userId);
      try {
        const res = await fetch(`/api/get-completed?user_id=${user_id}`, {
          next: { 
            revalidate: 300, // Revalidate every 5 minutes
            tags: ['userProgress']
          }
        });

        if (!res.ok) throw new Error('Failed to fetch user total completed');

        const data = await res.json();
        setTotalCompletedTutorials(data.total_completed);
        setTotalLoading(false);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setTotalLoading(false);
      }
    };

    fetchProgress();
  }, [session]);



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
      <UserBanner user={session?.user} status={status} />

      <section id='search-section' className="">
        <div id="filter-box" className=''>
          <FilterIconClient />
        </div> 
      </section>

      <StatusSection 
        totalCompletedTutorials={totalCompletedTutorials}
        totalTime={totalTime}
        tutorialLoading={tutorialLoading}
      />

      <section id="tutorials-section" className='flex flex-col gap-[20px] sora'>
        <HeaderBoard mainHead='Tutorials for you' nextHead='see all'/>
        <Suspense fallback={<SkeletonCard />}>
          {onboardingCourse ? (
            <div onClick={()=> handlePageTransition(onboardingCourse.slug)} className='cursor-pointer'>
              <TutorialCard
                description={onboardingCourse.description}
                image={onboardingCourse.image}
                title={onboardingCourse.title}
                tutor={onboardingCourse.tutor}
              />
            </div>
          ) : (
            <SkeletonCard />
          )}
        </Suspense>
      </section>

      <Suspense fallback={<RecommendedSkeleton />}>
        {session?.userId ? (
          <DashboardRecommendations userId={session.userId} />
        ) : (
          <RecommendedSkeleton />
        )}
      </Suspense>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <LoadingSpinner/>
        </div>
      )}
    </div>
  )
}

export default DashboardHome;