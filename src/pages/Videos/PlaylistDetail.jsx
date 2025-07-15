import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistDetailCard from "../../components/PlaylistDetailCard";
import PlaylistDetailSkeleton from "../../components/PlaylistDetailSkeleton";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // for API
  // const url = import.meta.env.VITE_API + `/public/youtube/playlists/${playlistId}`;

  // for local
  const url = "/youtube/playlists.json";

  const fetchVideoDetails = async () => {
    try {
      const res = await fetch(url);
      const json = await res.json();

      // for API
      // if (json) setPlaylistDetails(json?.data);

      // for local 
      if (json) {
        console.log(json);
        
        const data = json.find((list) => list.id === playlistId)
        console.log(data);
        
        setPlaylistDetails(json)
      };

    } catch (err) {
      console.log("Error fetching playlist details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
  return <PlaylistDetailSkeleton/>;
}

if (!playlistDetails) {
  return <div className="text-white text-center py-10">No playlist found</div>;
}

const { playlist, playlistItems, channel } = playlistDetails;


  return (
    <div className=" bg-gray-800 min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left: Playlist Info */}
        <div className="w-full lg:w-1/3 space-y-4">
          <img
            className="w-full rounded-lg"
            src={playlist?.snippet?.thumbnails?.high?.url}
            alt={playlist?.snippet?.title}
          />
          <div>
            <h1 className="text-xl font-bold">{playlist?.snippet?.title}</h1>
            <p className="text-sm text-gray-400 mt-1">{playlist?.snippet?.description}</p>
            <div className="mt-2 text-sm text-gray-300">
              <p>Channel: <span className="text-blue-400">{channel?.snippet?.title}</span></p>
              <p>Views: {channel?.statistics?.viewCount}</p>
              <p>Total Videos: {playlistItems?.length}</p>
            </div>
          </div>
        </div>

        {/* Right: Video List */}
        <div className="w-full lg:w-2/3 space-y-4 overflow-y-auto max-h-[100vh] pr-2">
            {playlistItems?.map((item, index) => (
              <PlaylistDetailCard key={item?.id} video={item} index={index + 1} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetail;
