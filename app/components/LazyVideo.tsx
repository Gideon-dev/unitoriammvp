import { useEffect, useRef, useState } from "react";

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
          <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700"></div>
        )}
    </div>
  );
};

export default LazyVideo;


