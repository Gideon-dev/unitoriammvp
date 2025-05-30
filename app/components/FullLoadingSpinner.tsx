"use client";
import LoadingSpinner from "./LoadingSpinner";

export const FullLoadingSpinner = () => {
    return(
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
            <LoadingSpinner/>
        </div>
    )
}