export default function PlatformSkeleton() {
  return (
    <div className="min-h-screen bg-gray-800 text-white animate-pulse">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 bg-gray-700" />

      {/* Channel Info */}
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-600 rounded-full border-4 border-white" />

        {/* Info */}
        <div className="flex-1 space-y-3 w-full">
          <div className="h-8 w-2/3 bg-gray-600 rounded" />
          <div className="h-4 w-1/2 bg-gray-600 rounded" />
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="h-4 w-32 bg-gray-600 rounded" />
            <div className="h-4 w-28 bg-gray-600 rounded" />
            <div className="h-4 w-24 bg-gray-600 rounded" />
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-4 w-full bg-gray-600 rounded" />
            <div className="h-4 w-5/6 bg-gray-600 rounded" />
            <div className="h-4 w-1/4 bg-gray-600 rounded" />
          </div>
        </div>
      </div>

      {/* Button Row */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex gap-4 mb-4">
          <div className="h-10 w-24 bg-gray-600 rounded-lg" />
          <div className="h-10 w-24 bg-gray-600 rounded-lg" />
        </div>

        {/* Placeholder for videos or playlists */}
        <div className="space-y-4">
          {Array(6)
            .fill()
            .map((_, idx) => (
              <div key={idx} className="w-full h-28 bg-gray-700 rounded-md" />
            ))}
        </div>
      </div>
    </div>
  );
}
