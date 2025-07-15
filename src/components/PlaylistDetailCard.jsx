import { Link } from "react-router-dom";

function PlaylistDetailCard({ video, index }) {
  const { snippet } = video || {};
  const { title, thumbnails, resourceId } = snippet || {};

  const thumbnailUrl =
    thumbnails?.medium?.url || thumbnails?.high?.url || thumbnails?.default?.url;

  return (
    <Link to={`/videos/${resourceId?.videoId}`} className="block">
      <div className="flex  bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-200 overflow-hidden">
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-40 h-24 object-cover flex-shrink-0"
        />

        {/* Info */}
        <div className="p-2 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-400">#{index}</p>
            <h3 className="text-white text-md font-semibold line-clamp-2">{title}</h3>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2 mt-1">
            {snippet?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PlaylistDetailCard;
