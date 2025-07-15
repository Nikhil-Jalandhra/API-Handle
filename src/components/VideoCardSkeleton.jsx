export default function VideoCardSkeleton() {
  return (
    <div className="w-full max-w-sm sm:max-w-md rounded-lg text-white flex flex-col animate-pulse">
      {/* Thumbnail placeholder */}
      <div className="w-full h-52 rounded-xl mb-1 bg-gray-700" />

      {/* Title placeholders */}
      <div className="h-5 bg-gray-700 rounded mb-1" style={{ width: '80%' }} />
      <div className="h-5 bg-gray-700 rounded mb-3" style={{ width: '60%' }} />

      {/* Stats placeholders */}
      <div className="flex items-center gap-2">
        <div className="h-4 bg-gray-700 rounded" style={{ width: '40%' }} />
        <div className="h-4 bg-gray-700 rounded" style={{ width: '30%' }} />
      </div>
    </div>
  );
}
