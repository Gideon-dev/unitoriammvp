import { useEffect, useRef, useState } from "react";

const LazyVideo = ({ videoUrl, posterUrl }: { videoUrl: string | undefined, posterUrl: string | undefined }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

 
  return (
    // <video
    //   // key={videoRef} 
    //   ref={videoRef}
    //   controls
    //   autoPlay
    //   muted
    //   controlsList="nodownload"
    //   disablePictureInPicture
    //   className="w-full h-full object-cover"
    //   poster={`https://res.cloudinary.com/dtlz2vhof/${posterUrl}`}
    // >
    //   { videoUrl && <source src={videoUrl} type="video/mp4"/>}
    //   Your browser does not support the video tag.
    // </video>
    <iframe
    src="https://iframe.videodelivery.net/a4ca4480bed4ebafe94f1d6952e7f48b"
    loading="lazy"
    className="w-full h-full object-cover "
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowFullScreen
  ></iframe>
  );
};

export default LazyVideo;


