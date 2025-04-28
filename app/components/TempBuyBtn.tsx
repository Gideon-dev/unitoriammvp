import Confetti from 'react-confetti';
import React, { useState } from 'react'
import apiClient from '../lib/apiClient'
import { useRouter } from 'next/navigation'
import { useWindowSize } from 'react-use';


type TempBuyBtnProps = {
    userId: number | undefined,
    courseId?: string | undefined,
    courseSlug: string | undefined,
}

const TempBuyBtn = ({userId, courseId, courseSlug}: TempBuyBtnProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize(); 
    const handleEnrollment = async() => {
        setIsLoading(true);
        if(userId){
            try{
                const enrollUser = await apiClient.post("https://tutormeapi-6w2f.onrender.com/api/v2/enroll-course/",
                    {
                        user_id: userId,
                        course_id: courseId
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${session?.token}`
                    }
                    }
                );
                if(enrollUser.data.status && enrollUser.data.message){
                    router.replace(`/courses/course-detail/${courseSlug}`)
                    alert("Enrollment Successful");
                }
                
            }catch(error){
                console.log(error)
                alert("Enrollment Failed, try again later!");
            }
        
            setIsLoading(false);
            setShowConfetti(true);

            // Stop confetti after 3 seconds
            setTimeout(() => setShowConfetti(false), 3000);
        }else{
            router.push("/auth/signIn");
            setIsLoading(false);
        }
    }
  return (
    <div className='relative w-full flex justify-center'>
        {showConfetti && <Confetti width={width} height={height} />}
        <button 
        className='w-4/5 rounded-lg  text-white px-3 py-5 bg-[#DB0D0D] flex justify-center items-center'
        onClick={handleEnrollment}
        >
            {isLoading ? (
        
        <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        
        ):
        (
        <p className="text-[12px]/[15.12px] font-normal">Enroll Now</p>
        )}
        </button>
    </div>
  )
}

export default TempBuyBtn