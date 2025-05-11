"use client";
import BackBtn from "@/app/components/BackBtn";
import Image from "next/image";
import CaretUp from "../../../public/caretdown.svg";
import SettingIcon from "../../../public/setting-4.svg";
import NoResultFoundImg from '../../../public/404.svg';
import SearchBar from "@/app/components/SearchBar";
import { useEffect, useState, useTransition } from "react";
import { useCourseStore } from "@/app/stores/useCourseStore";
import TutorialCard from "@/app/components/TutorialCard";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";


const page = () => {
  const { 
    filteredCourses, 
    fetchCourses, 
    searchCourses, 
    filters, 
    isFetched,
    courseLoading,
    setCourseLoading
  } = useCourseStore();
  const setFilters = useCourseStore((state) => state.setFilters);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();




  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setQuery(query);
    if (query.trim() === "") {
      fetchCourses();
    } else {
      searchCourses(query);
    }
  };
  const handlePageNavigation = (slug:string)=>{
    startTransition(() => {
      router.push(`/courses/course-detail/${slug}/`);
    });
  }

   useEffect(() => {
      const fetchAndSearch = async () => {
        setCourseLoading(true);
    
        await fetchCourses();
    
        if (filters.course || filters.department || filters.level) {
          console.log("🔍 Applying search filter from explore page:", filters.course);
         
          searchCourses(filters.course, {
            level: filters.level,
            department: filters.department
          });
        }
    
        setCourseLoading(false);
      };
    
      if (!isFetched) {
        fetchAndSearch();
      } else if (filters.course || filters.department || filters.level) {
        console.log("🔍 Courses already fetched. Applying filter:", filters.course);
        searchCourses(filters.course, {
          level: filters.level,
          department: filters.department
        });
      } 
    }, [isFetched]);


  return (
    <section className="flex flex-col overflow-y-hidden w-full h-screen">
      <nav id="details-header" className="flex items-center mb-[25px] py-2">
        <BackBtn/>
        <div className="text-center w-full">
          <p className="text-[14px]/[17.64px] font-semibold sora">Discover Tutorials</p>
        </div>
      </nav>
      <div className="w-full flex justify-between items-center ">
        <div className="w-[80%]">
          <SearchBar onSearchChange={handleSearch} defValue={query}/>
        </div>
        <div className="flex items-center bg-[#1A1B1A] py-[8px] px-[10px] gap-[10px] rounded-[5px]">
          <Image src={SettingIcon} width={10} height={10} alt="caret up icon"/>
          <p className="font-semibold text-[10px]/[100%] text-white sora"> Filters </p>
          <Image src={CaretUp} width={10} height={10} className="rotate-180" alt="filter caret down"/>
        </div>
      </div>
      <div className="w-full h-auto overflow-y-scroll scrollbar-hide flex flex-col space-y-[21px] py-[30px] mt-4">
          {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} onClick={ ()=> handlePageNavigation(course.slug) }>
              <TutorialCard 
                image={course.image} 
                tutor={course.tutor} 
                description={course.description} 
                // price={course.price} 
                title={course.title}
              />
            </div>
            
          ))
        ): (
          <div >
            { 
              !isFetched || courseLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ):(
                <div className='w-full flex flex-col items-center justify-center mt-5 sora'>
                  <Image src={NoResultFoundImg} className='w-[90%] h-auto' alt='Error image' />
                  <p className='text-center text-[16px]/[20px] text-[#FFFFFF] font-semibold'>No Tutorial Found for</p>
                  <p className='text-center text-[14px]/[20px] text-[#FFFFFF]/[50%] font-normal'>&lsquo;{query}&rsquo;</p>
                </div>
              )
            }
          </div>
        )}
         {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <LoadingSpinner/>
          </div>
        )}
      </div>
    </section>
  )
}

export default page