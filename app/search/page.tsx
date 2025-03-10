"use client";
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useCourseStore } from '../lib/useCourseStore';
import TutorialCard from '../components/TutorialCard';
import HeaderBoard from '../components/HeaderBoard';
import Image from 'next/image';
import NoResultFoundImg from '../../public/404.svg';
import Link from 'next/link';
import BackBtn from '../components/BackBtn';

export default function SearchPage() {
  const { filteredCourses, fetchCourses, searchCourses, setFilters, filters } = useCourseStore();
  const [query, setQuery] = useState(filters.course || "");     

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Handle Search
  const handleSearch = (query: string) => {
    setQuery(query);
    if (query.trim() === "") {
      fetchCourses(); // Reset course list when input is empty
    } else {
      searchCourses(query);
    }
  };

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
            <Link key={course.id}  href={`/courses/course-detail/${course.slug}/`}>
              <TutorialCard 
                image={course.image} 
                tutor={course.tutor} 
                description={course.description} 
                price={course.price} 
              />
            </Link>
          ))
        ) : (
          <div className='w-full flex flex-col items-center justify-center mt-5 sora'>
            <Image src={NoResultFoundImg} className='w-[90%] h-auto' alt='Error image' />
            <p className='text-center text-[16px]/[20px] text-[#FFFFFF] font-semibold'>No Tutorial Found for</p>
            <p className='text-center text-[14px]/[20px] text-[#FFFFFF]/[50%] font-normal'>&lsquo;{query}&rsquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
