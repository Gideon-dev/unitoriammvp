"use client";
import { Stream } from "@cloudflare/stream-react";  
import { useLessonProgressStore } from "../stores/lessonProgressStore";

type LazyVideoProps ={
  videoUrl: string | undefined;
  userId: number | undefined;
  courseId: string | undefined;
  lectureVariantId: string | undefined;
}
export default function LazyVideo({ videoUrl, userId, courseId, lectureVariantId }: LazyVideoProps) {  
    const updateLessonProgress = useLessonProgressStore((state) => state.updateLessonProgress)
  

    const handleEnded = async() => {
      try{
        if(!userId || !courseId || !lectureVariantId) return
        await updateLessonProgress(userId, courseId,lectureVariantId)
        console.log('✅ Lesson marked as complete!');
      }catch(error){
        console.error('❌ Failed to mark lesson as complete:', error);
      }
    } 
  
    return (  
      <div className="w-full aspect-video rounded-xl h-full overflow-hidden">
        {videoUrl ? (
          <div className="w-full h">
            <Stream  
              controls  
              src={videoUrl}              
              onEnded={handleEnded}   
            />  
          </div>
        ) : (
          <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-600 to-gray-800"></div>
        )}
      </div>
    );  
}  
