import { useEffect, useState } from 'react';
import PlaylistCard from '../../components/PlaylistCard';
import PlaylistCardSkeleton from '../../components/PlaylistCardSkeleton';

function AllPlaylist() {

  // for API
  // const url = import.meta.env.VITE_API + "/public/youtube/playlists";

  // for local
  const url = "/youtube/playlists.json";

  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlatformData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      // for API
      setMediaData(json?.data?.data || []);

      // for local
      setMediaData(json || []);


    } catch (err) {
      console.error("Failed to fetch playlists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatformData();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {loading ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(15).fill().map((item) => (
            <PlaylistCardSkeleton key={item?.id} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaData.map((item) => (
            <PlaylistCard key={item?.id} playlist={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPlaylist;
