import VideoCardSkeleton from "./VideoCardSkeleton";

export default function VideoDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left side: Video + Comments */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {/* Video Player */}
          <div className="aspect-w-16 aspect-h-9 w-full bg-gray-700 rounded-lg" />

          {/* Video title */}
          <div className="h-6 w-3/4 bg-gray-700 rounded" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
          </div>

          {/* Comments Skeleton */}
          <div className="mt-6">
            <div className="h-6 w-32 bg-gray-700 rounded mb-4" />
            <div className="space-y-4">
              {Array(3).fill(0).map((_, idx) => (
                <div key={idx} className="p-3 bg-gray-800 rounded-md flex gap-3 items-start">
                  <div className="w-10 h-10 bg-gray-600 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-700 rounded" />
                    <div className="h-3 w-5/6 bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Related Videos */}
        <div className="w-full lg:w-1/3">
          <div className="h-6 w-40 bg-gray-700 rounded mb-4" />
          <div className="space-y-4">
            {Array(4).fill(0).map((_, idx) => (
              <div className='my-4' key={idx}>
                <VideoCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
