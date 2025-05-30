const VideoShimmer = () => {
  return (
    <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default VideoShimmer; 