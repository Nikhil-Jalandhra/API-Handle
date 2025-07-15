import { useEffect, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import VideoCardSkeleton from '../../components/VideoCardSkeleton';

function AllVideos() {

    //  API
    //  const url = import.meta.env.VITE_API + "/public/youtube/videos";

    // for local
     const url = "/youtube/videos.json";

    const [mediaData, setMediaData] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchPlatformData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();

            // for api
            setMediaData(json?.data?.data || []);

            // for local
            setMediaData(json?.channelVideos || []);

        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
      fetchPlatformData();
    }, []);

  return (
    <div>
        
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? 
            (Array(15).fill().map((_, idx) => (
              <VideoCardSkeleton key={idx} />
            ))) 
            : Array.isArray(mediaData) && mediaData.length > 0 &&
            mediaData.map((item, idx) => (
            <VideoCard key={idx} video={item} />
            ))}
        </div>
      
    </div>
  );
}

export default AllVideos;
