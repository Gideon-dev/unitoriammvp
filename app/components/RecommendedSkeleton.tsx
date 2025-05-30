const RecommendedSkeleton = () => {
  return (
    <div className="mt-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      
      {/* Course Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="w-full aspect-video bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSkeleton; 