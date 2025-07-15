import { formatDistanceToNow } from "date-fns";
import millify from "millify";
import { Link } from "react-router-dom";


 const formatDuration = (duration) => {
  const regex = /PT(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  const minutes = matches[1] ? parseInt(matches[1]) : 0;
  const seconds = matches[2] ? parseInt(matches[2]) : 0;

  // Pad with zero if less than 10
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  if( `${formattedMinutes}:${formattedSeconds}` == "00:00"){
    return "01:45"
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};  

const formatNumber = (number) => {
   return millify(number)
};  

export default function VideoCard({ video }) {
  
  const { id, snippet, statistics, contentDetails } = video?.items || {};
  const thumbnail = snippet?.thumbnails?.high?.url;
  const title = snippet?.title;
  const views = statistics?.viewCount; 
  let publishedAt = formatDistanceToNow(new Date(snippet?.publishedAt));
  publishedAt = publishedAt.replace(/about |almost |over /g, '');

  return (
    <Link to={`/videos/${id}`}>
  <div className="w-full max-w-sm sm:max-w-md rounded-lg text-white flex flex-col">
    <div className="w-full aspect-video rounded-xl mb-1 overflow-hidden relative">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
      />
      <span className="absolute bg-opacity-70 bottom-0 right-0 bg-black text-opacity-100 rounded-md px-1 mr-2 mb-2 text-xs">
        {formatDuration(contentDetails?.duration)}
      </span>
    </div>

    <h3 className="text-lg font-semibold mb-0.5 line-clamp-2 leading-tight">
      {title}
    </h3>

    <div className="text-sm text-gray-200 flex flex-wrap gap-2">
      <span>{formatNumber(views)} views</span>
      <span>{publishedAt}</span>
    </div>
  </div>
</Link>
  );
}
