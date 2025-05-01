

const LazyVideo = ({ videoUrl }: { videoUrl: string | undefined}) => {
  return (
    <div className="w-full aspect-video rounded-xl h-full overflow-hidden">
      {videoUrl ? (
        <iframe
        src={`https://iframe.videodelivery.net/${videoUrl}`}
        loading="lazy"
        className="w-full h-full object-cover "
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
      ):(
        <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-600 to-gray-800"></div>
      )}
    </div>
  );
};

export default LazyVideo;


