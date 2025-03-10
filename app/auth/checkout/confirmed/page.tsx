import ConfirmedPageClient from "@/app/components/CheckoutConfirmedClient";
import CheckOutPageClient from "@/app/components/CheckOutPageClient";
import { getCourse } from "@/app/lib/getCourse";
import { MainCourse } from "@/app/utils/interface";


interface ConfirmedProps {
  searchParams: Promise<{ course_slug?: string; payment_method?: string }>;
}
const ConfirmedPage = async({searchParams}: ConfirmedProps) => {
  const {course_slug, payment_method} = await searchParams;

  if(!course_slug){
    return <p>No course specified.</p>; 
  }

  const course: MainCourse | null = await getCourse(course_slug);

  if (!course) {
    return <p>Course not found.</p>;
  }

  return <ConfirmedPageClient course={course} payment_method={payment_method}/>
  
}
  export default ConfirmedPage;