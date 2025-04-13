import { useEffect, useRef, useState } from "react";

const LazyVideo = ({ videoUrl, posterUrl }: { videoUrl: string | undefined, posterUrl: string | undefined }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

 
  return (
    <video
      // key={videoRef} 
      ref={videoRef}
      controls
      className="w-full h-full object-cover"
      poster={`https://res.cloudinary.com/dtlz2vhof/${posterUrl}`}
    >
      { videoUrl && <source src={`https://res.cloudinary.com/dtlz2vhof/${videoUrl}`} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
