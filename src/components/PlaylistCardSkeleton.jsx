function PlaylistCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="rounded-lg overflow-hidden">
        <div className="h-40 bg-gray-700 rounded-md relative" />
        <div className="pt-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default PlaylistCardSkeleton;
