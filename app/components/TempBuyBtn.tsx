import confetti from 'canvas-confetti'
import React, { useState } from 'react'
import apiClient from '../lib/apiClient'
import { useRouter } from 'next/navigation'


type TempBuyBtnProps = {
    userId: number | undefined,
    courseId: string | undefined,
    courseSlug: string | undefined,
}

const TempBuyBtn = ({userId, courseId, courseSlug}: TempBuyBtnProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const handleEnrollment = async() =>{
        setIsLoading(true);
        
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
    }
  return (
    <button 
    className='w-4/5 rounded-lg  text-white px-3 py-5 bg-[#DB0D0D] flex justify-center items-center'
    onClick={ () => {
        confetti({
            particleCount: 150,
            angle: 60,
            spread: 360,
            startVelocity: 25,
            origin: { x: 0.5, y: 0.8 }, 
            colors: ['#ff0000', '#ff9900', '#ffff00', '#33cc33', '#3399ff', '#cc33ff'],
            scalar: 0.8,
        });
        handleEnrollment();
    }}
    >
        {isLoading ? (
       
       <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
       
     ):
     (
       <p className="text-[12px]/[15.12px] font-normal">Enroll Now</p>
     )}
    </button>
  )
}

export default TempBuyBtn