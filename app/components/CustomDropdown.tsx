"use client"
import { useState } from 'react'
import { CaretBtn } from './CaretBtn'
import { DropdownProps } from '../utils/interface';
import LoadingSpinner from './LoadingSpinner';



export const CustomDropdown:React.FC<DropdownProps> = ({placeholder,labelName,onSelect,toDisplay,isLoading}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputPlaceholder, setInputPlaceholder] = useState<string>(placeholder);      
    const rotateToggleDrop = (event: React.MouseEvent<SVGSVGElement>)=>{
        const caretIcon = event.currentTarget;
        
        const currentRotation = caretIcon.style.transform.includes("180deg") ? "0deg" : "180deg"; 
        caretIcon.style.transform = `rotate(${currentRotation})`;
        caretIcon.style.transition = "transform 0.3s ease-in-out"; 

        setIsOpen((prev)=> !prev);
    };

    const activateBorder = (event: React.MouseEvent<HTMLDivElement>)=>{
        document.querySelectorAll("#custom-label").forEach((label)=> {
            label.classList.remove("selected-border");
            event.currentTarget.classList.add("selected-border");
        })
    }

   const handleSelection = (value: string) =>{
        onSelect(value);
   };

  return (
    <div className='w-full h-auto  py-[9px] text-[#B1B1B1] flex flex-col gap-2'>
        <div className='relative w-full flex flex-col gap-2' >
            <label htmlFor="course-name" className='font-normal text-[10px] leading-[12.6px] tracking-[-0.02em]'>{labelName}</label>
            <div id="custom-label" className='w-full bg-[#1A1B1A] py-[9px] px-[16px] flex justify-between items-center rounded-[5px]' onClick={activateBorder}>
                <p className='text-[10px] leading-[12.6px] tracking-[-0.02em]'>{inputPlaceholder}</p>
                <CaretBtn styles='w-[20px] h-[20px] rotate-0' triggerClick={rotateToggleDrop}/> 
            </div>
        </div>
        <div className='h-auto bg-[#1A1B1A] font-normal text-[10px] leading-[12.6px] tracking-[-0.02em]  rounded-[5px]'> 
            {isOpen && (
                <ul className='w-full  flex flex-col gap-1 p-3'>
                    {
                    isLoading ? (
                        <div className='w-full flex justify-center items-center'>
                            <LoadingSpinner/>
                        </div>  
                    ):(
                        toDisplay?.map((item, index)=> (
                            <li className='w-full p-3 hover:bg-[#111111] hover: rounded-md' key={index} value={item} onClick={()=> {setInputPlaceholder(item); setIsOpen((prev)=> !prev); handleSelection(item)}}> 
                                {item} 
                            </li>
                        ))
                    )
                    }
                </ul>
            )}
        </div>
    </div>
  )
}

