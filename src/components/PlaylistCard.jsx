import { Link } from 'react-router-dom';

function PlaylistCard({ playlist }) {
  const { id, snippet } = playlist || {};
  const { title, description, thumbnails } = snippet || {};
  const thumbnailUrl = thumbnails?.high?.url || thumbnails?.standard?.url || thumbnails?.default?.url;

  const playlistLength = Math.floor(Math.random() * 10) + 1;

  return (
    <Link to={`/playlist/${id}`} className="w-full">
      <div className=" rounded-lg overflow-hidden">
        <div className="aspect-video relative">
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
           <span className="absolute bg-opacity-70 bottom-0 right-0 bg-black text-opacity-100 rounded-md px-1 mr-2 mb-2 text-xs">⇶ {playlistLength} videos</span>
        </div>
        <div className="pt-1 space-y-1">
          <h3 className="text-md font-semibold line-clamp-2 text-white leading-tight">{title}</h3>
          <p className="text-sm line-clamp-2">{description || "Bhut Acha course hai"}</p>
          <p className="text-xs text-gray-400">View full playlist</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaylistCard;
