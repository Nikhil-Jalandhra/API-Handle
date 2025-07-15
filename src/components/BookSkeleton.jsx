export default function SkeletonCard() {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse">

      <div className="w-full sm:w-48 h-64 sm:h-auto bg-gray-700 flex-shrink-0" />

      <div className="flex flex-col justify-between p-4 flex-1 space-y-4">

        <div>
          <div className="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>

          <div className="h-4 bg-gray-600 rounded w-1/2 mb-3"></div>

          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-5/6"></div>
            <div className="h-3 bg-gray-600 rounded w-2/3"></div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="h-3 bg-gray-600 rounded w-24"></div>
            <div className="h-3 bg-gray-600 rounded w-20"></div>
            <div className="h-3 bg-gray-600 rounded w-28"></div>
          </div>
        </div>

        <div className="h-4 bg-gray-600 rounded w-24 mt-2"></div>
      </div>
    </div>
  );
}
