"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import filterIcon from '../../public/filter.svg';
import HeaderBoard from './HeaderBoard';
import { AnimatePresence, motion } from "framer-motion";
import { CustomDropdown } from './CustomDropdown';
import { dataRated, departments } from '../utils/data';
import { useCourseStore } from '../lib/useCourseStore';
import { useRouter } from 'next/navigation';



export const FilterIcon = () => {
  const  {setFilters} = useCourseStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const courseList = dataRated.map((item) => item.tut_topic);
  const department = departments.map((item) => item.name);
  const Level = ["100", "200", "300", "400", "500"];
  

  const handleSelectDropdown = (key: string, value: string) => {
    setFilters((prev) => ({ 
      ...prev, 
       [key]: value
    }));
  };  
  

  return (
    <>
        <Image src={filterIcon} className='w-full h-full' alt="filter icon" onClick={()=> setIsOpen((prev)=> !prev)} />
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
                        <CustomDropdown 
                         labelName="Course"
                         placeholder='Search courses here'
                         toDisplay={courseList}
                         onSelect={(value)=> handleSelectDropdown("course", value) }
                        />
                        <CustomDropdown 
                          labelName="Level"
                          placeholder='Search your level here' 
                          toDisplay={Level}
                          onSelect={(value)=> handleSelectDropdown("level", value)}
                        />
                        <CustomDropdown 
                          labelName="Department" 
                          placeholder='Search your department here' 
                          toDisplay={department}
                          onSelect={(value)=> handleSelectDropdown("department", value)}
                        />
                      </div>  
                      <div className='mt-6 w-[80%] mx-auto sora'>
                        <button className='bg-[#DB0D0D] text-[10px] leading-[18px] tracking-[0.02em] px-[80px] py-[12px] rounded-[20px]' onClick={()=> router.push("/search")}>Apply and Search</button>
                      </div>
                       
                    </motion.div>
                </div>)
            }
        </AnimatePresence>
    </>
   
  )
}

