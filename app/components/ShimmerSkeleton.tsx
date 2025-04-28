// components/SkeletonCard.tsx
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden animate-pulse flex flex-col aspect-video rounded-[15px] bg-gray-300/20">
      {/* Shimmer layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-20 animate-shimmer" />
      
      {/* Main skeleton content */}
      <div className="bg-gray-300 h-[50%] w-full" />
      <div className="flex flex-col justify-center gap-2 p-4 bg-gray-100 h-[50%]">
        <div className="h-3 w-1/2 bg-gray-300 rounded" />
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-10 bg-gray-300 rounded" />
          <div className="h-3 w-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
