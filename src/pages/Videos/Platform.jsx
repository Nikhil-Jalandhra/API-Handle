import { useEffect, useState } from 'react';
import millify from 'millify';
import AllVideos from './AllVideos';
import AllPlaylist from './AllPlaylist';
import PlatformSkeleton from '../../components/PlatfromSkeleton';
import { useSearchParams } from 'react-router-dom';

const formatNumber = (number) => {
   return millify(number)
};

export default function Platform() {

  // API
  // const url = import.meta.env.VITE_API + "/public/youtube/channel";

  // for local
  const url = "/youtube/channel.json";
  
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [platformData, setPlatformData] = useState(null);
  const [fullDescription, setFullDescription] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleView = () => setFullDescription(!fullDescription);
  const tab = searchParams.get('tab') || 'video';

  const toggleData = (tab) => {
    setSearchParams({tab})
  };

  const fetchAuthorData = async (url) => {
    try {
    const channelRes = await fetch(url);
    const channelJson = await channelRes.json();
    
      // Api
      // if (channelJson) {
      //   setPlatformData(channelJson?.data);
      // }

      // local api
      if (channelJson) {
        setPlatformData(channelJson?.channel);
      }

    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchAuthorData(url);
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
}, []);


  if(loading){
    return <PlatformSkeleton/>;
  }
  
  if (!platformData) return <div className="text-red-500">Channel not found</div>;
  
  const {
    snippet,
    statistics,
    brandingSettings,
  } = platformData?.info || {};

  const bannerUrl = brandingSettings?.image?.bannerExternalUrl;
  const profileImg = snippet?.thumbnails?.high?.url;
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Banner */}
      {bannerUrl && (
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img
            src="https://yt3.googleusercontent.com/kemZJqQd_ZA3UUzyk5SaISkeWdY1zwcDTq0y2NQLBQEl6iHNWcJy3K-EMg2gE9W7bGNuIb9ahqI=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            alt="Channel Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Channel Info */}
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Thumbnail */}
        <img
          src={profileImg}
          alt={snippet?.title}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{snippet?.title}</h1>
          <p className="text-gray-400 mb-2">{snippet?.customUrl}</p>

          <div className="flex flex-wrap gap-4 text-sm md:text-base mb-1">
            <span>📺 {formatNumber(statistics?.subscriberCount)} Subscribers</span>
            <span>🎥 {formatNumber(statistics?.videoCount)} Videos</span>
            <span>↝ {formatNumber(statistics?.viewCount)} Views</span>
          </div>

          <p 
          className={`whitespace-pre-line leading-relaxed overflow-auto 
          ${fullDescription ? "text-white" : "text-gray-400"}`}>
            {fullDescription ? snippet?.description : snippet?.description.slice(0,36) } 
            {fullDescription ? <br/> : ""}
            <button 
            className='text-white font-bold' 
            onClick={toggleView}>
            {fullDescription ? "view Less" : "...more"}
            </button>
          </p>
        </div>
      </div>

     <div className="max-w-6xl mx-auto px-4 py-5">
      <div className='w-full mb-3'>
        <div className='flex'>
        <div className={` ${tab === "video" ? "border-b" : ""} mr-4`}>  
          <button
          value="video"
          onClick={() => toggleData("video")}
          className={`py-2 px-3 mb-2 rounded-lg ${tab === "video" ? "bg-indigo-800" : "bg-indigo-500"}`}>
            Videos
          </button>
        </div>

        <div className={` ${tab === "playlist" ? "border-b" : ""} mr-4`}>
          <button 
          value="playlist" 
          onClick={() => toggleData("playlist")}
          className={`py-2 px-3 mb-2 rounded-lg ${tab === "playlist" ? "bg-indigo-800" : "bg-indigo-500"}`}>
            Playlist
          </button>
          </div>
        </div>
      </div>
          { tab === "video" ? <AllVideos/> : <AllPlaylist/> }
      </div>

    </div>
  );
}
