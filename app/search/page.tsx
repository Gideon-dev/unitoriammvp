"use client";
import React, { useEffect, useState, useTransition } from 'react';
import SearchBar from '../components/SearchBar';
import { useCourseStore } from '../stores/useCourseStore';
import TutorialCard from '../components/TutorialCard';
import HeaderBoard from '../components/HeaderBoard';
import Image from 'next/image';
import NoResultFoundImg from '../../public/404.svg';
import BackBtn from '../components/BackBtn';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const { 
    filteredCourses, 
    fetchCourses, 
    searchCourses, 
    filters, 
    isFetched,
    courseLoading,
    setCourseLoading
   } = useCourseStore();
  // console.log("this is filter in zustand: ", filters);
  const setFilters = useCourseStore((state) => state.setFilters);
  const [query, setQuery] = useState(filters.course || "");    
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // const [courseLoading, setCourseLoading] = useState(false);



  useEffect(() => {
    const fetchAndSearch = async () => {
      setCourseLoading(true);
  
      await fetchCourses();
  
      if (filters.course || filters.department || filters.level) {
        console.log("🔍 Applying search filter with:", filters.course);
       
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

  // Handle Search
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

  // Remove filters and reset query
  const removeFilter = () => {
    setFilters((prev) => ({
      ...prev,
      course: undefined, // Reset only course filter
    }));
    setQuery("");
    fetchCourses(); // Reset full course list
  };

  return (
    <div>
      <div className='mb-3'>
        <BackBtn/>
      </div>
      <SearchBar onSearchChange={handleSearch} defValue={query} />
      
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 my-3">
        {filters.course && (
          <div className="bg-[#212220] text-[#FFFFFF] px-3 py-1 rounded-md flex items-center justify-center">
            <span className="text-[8px]/[10.08px] font-semibold">{filters.course}</span>
            <button className="ml-2 text-white" onClick={removeFilter}>
              ✖
            </button>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className='flex flex-col gap-4'>
        <HeaderBoard mainHead='Search Result' nextHead={`${filteredCourses.length} tutorial`} />
        
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
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
      </div>
    </div>
  );
}
