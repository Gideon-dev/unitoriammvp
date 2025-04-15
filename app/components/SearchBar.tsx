"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import searchLogo from "../../public/search-normal.svg";
import debounce from "lodash.debounce";
import { useCourseStore } from "../lib/useCourseStore";

type SearchBarProps = {
    onSearchChange: (value: string) => void;
    defValue?: string; 
};

const   SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, defValue}) => {
    const [query, setQuery] = useState<string|undefined>(defValue);
    const {setFilters} = useCourseStore();

 
    const debouncedSearch = useMemo(
        () => debounce((value) => onSearchChange(value), 500), 
        [onSearchChange]
    );

    // Handle Input Change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        debouncedSearch(value);
        setFilters((prev) => ({
            ...prev,
            course: value, // Reset only course filter
        }));
    };

    // Handle Clear Search
    const handleClearSearch = () => {
        setQuery("");
        onSearchChange(""); // Reset search results
    };

    return (
        <div className="flex flex-col gap-5">
            <div className='flex items-center gap-3 sora'>
                <div className="relative w-[75%]">
                    <label htmlFor="search_query"></label>
                    <input 
                        type="text" 
                        id='search_query' 
                        onChange={handleInputChange} 
                        value={query}  
                        className='py-[10px] pl-[15%] bg-[#1A1B1A] rounded-lg w-full text-[10px]/[12.6px] font-normal' 
                    />
                    <Image src={searchLogo} alt="search icon" width={15} height={15} className="search-icon"/>
                </div>
                <button 
                    onClick={handleClearSearch}
                    className='text-[10px]/[12.6px] font-normal text-[#DB0D0D] w-[25%] h-full py-[10px]'
                > 
                    Cancel 
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
