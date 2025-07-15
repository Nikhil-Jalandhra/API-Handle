function PlaylistDetailCardSkeleton() {
  return (
    <div className="flex bg-gray-800 animate-pulse rounded-md overflow-hidden w-full">
      {/* Thumbnail Skeleton */}
      <div className="w-40 h-24 bg-gray-700 flex-shrink-0" />

      {/* Text Skeleton */}
      <div className="p-2 flex flex-col justify-between w-full">
        <div>
          <div className="h-3 w-10 bg-gray-700 rounded mb-2" /> {/* index */}
          <div className="h-4 w-3/4 bg-gray-700 rounded mb-1" /> {/* title line 1 */}
          <div className="h-4 w-1/2 bg-gray-700 rounded" /> {/* title line 2 */}
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-3 w-full bg-gray-700 rounded" /> {/* desc line 1 */}
          <div className="h-3 w-5/6 bg-gray-700 rounded" /> {/* desc line 2 */}
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetailCardSkeleton;
