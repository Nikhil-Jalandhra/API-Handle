function PlaylistDetailSkeleton() {
  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 animate-pulse">
        {/* Left: Playlist Image + Info */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="w-full h-64 bg-gray-700 rounded-lg" /> {/* Thumbnail */}

          <div className="space-y-2">
            <div className="h-6 bg-gray-700 rounded w-3/4" /> {/* Title */}
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />

            <div className="mt-4 space-y-1">
              <div className="h-3 bg-gray-700 rounded w-2/3" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
              <div className="h-3 bg-gray-700 rounded w-1/3" />
            </div>
          </div>
        </div>

        {/* Right: List of Skeleton Video Cards */}
        <div className="w-full lg:w-2/3 space-y-4 overflow-y-auto max-h-[100vh] pr-2">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="flex bg-gray-700 rounded-md overflow-hidden">
              <div className="w-40 h-24 bg-gray-600 flex-shrink-0" />
              <div className="p-2 flex flex-col justify-between w-full space-y-2">
                <div className="h-4 w-3/4 bg-gray-600 rounded" />
                <div className="h-3 w-1/2 bg-gray-600 rounded" />
                <div className="h-3 w-5/6 bg-gray-600 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetailSkeleton;
