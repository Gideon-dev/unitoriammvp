"use client";
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react';
import filterIcon from '../../public/filter.svg';
import HeaderBoard from './HeaderBoard';
import { AnimatePresence, motion } from "framer-motion";
import { CustomDropdown } from './CustomDropdown';
import { useCourseStore } from '../stores/useCourseStore';
import { useRouter } from 'next/navigation';
import searchIcon from '../../public/search-normal.svg';


// type FilterIconProps = {
//     courseList: string[],
//     department: string[]
// }

 const FilterIconClient= () => {
  const  {setFilters} = useCourseStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [courseList, setCourseList] = useState();
  const [department, setDepartment] = useState();
  const [isPending, startTransition] = useTransition(); 
  
  const Level = ["100", "200", "300", "400", "500"];
  
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/filter");
        const data = await response.json();
        if (response.ok) {
          setCourseList(data.courseList);
          setDepartment(data.department);
        } else {
          console.error("Error fetching data:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);


  const handleSelectDropdown = (key: string, value: string) => {
    setFilters((prev) => ({ 
      ...prev, 
      [key]: value
    }));
    // console.log("Updated Filters in Zustand:", key, value);
  };  
  
  const handleSearch = () =>{
    startTransition(() => {
      router.push("/search");
    });
  }

  return (
    <>
      <div className='flex w-full items-center justify-between sora' >
        <div id='search-box' className='w-[80%] relative'>
          <Image src={searchIcon} alt='search-icon' className='search-icon'/>
          <div  className='text-white w-full bg-[#1A1B1A] rounded-md py-[10px] ps-[30px] text-[10px]/[12.6px]'  
            onClick={()=> setIsOpen((prev)=> !prev)}>
            search tutorials here
          </div>
        </div>
        <div className="w-[15%] h-full rounded-lg bg-[#1A1B1A] p-[8px] flex justify-center">
          <Image src={filterIcon} className='' alt="filter icon" onClick={()=> setIsOpen((prev)=> !prev)} />
        </div>
      </div>
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-[#504646A6] bg-opacity-65 justify-center w-full z-10" onClick={() => setIsOpen((prev)=> !prev)}>
                    <motion.div
                    initial={{ y: "100%" }}  
                    animate={{ y: 0 }} 
                    exit={{ y: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}          
                    className="p-[25px] absolute bottom-0 left-0 bg-[#0F0F0F] rounded-t-2xl h-[62%] w-full z-20 overflow-y-scroll scrollbar-hide"
                    onClick={(e)=> e.stopPropagation()}
                    >
                       
                      <div>
                        <HeaderBoard mainHead="Search filter" nextHead='Reset' styles='mb-[36px]'/>
                        {/* <CustomDropdown 
                         labelName="Course"
                         placeholder='Search courses here'
                         toDisplay={courseList}
                         onSelect={(value)=> handleSelectDropdown("course", value) }
                          isLoading={loading}
                        /> */}
                        <CustomDropdown 
                          labelName="Level"
                          placeholder='Search your level here' 
                          toDisplay={Level}
                          onSelect={(value)=> handleSelectDropdown("level", value)}
                          isLoading={loading}
                        />
                        <CustomDropdown 
                          labelName="Department" 
                          placeholder='Search your department here' 
                          toDisplay={department}
                          onSelect={(value)=> handleSelectDropdown("department", value)}
                          isLoading={loading}
                        />
                      </div>  
                      <div className='mt-6 w-[80%] mx-auto sora'>
                        <button className='bg-[#DB0D0D] text-[10px] leading-[18px] tracking-[0.02em] px-[80px] py-[12px] rounded-[20px]' onClick={handleSearch}>Apply and Search</button>
                      </div>
                       
                    </motion.div>
                </div>)
            }
        </AnimatePresence>
        {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
    </>
   
  )
}

export default FilterIconClient;