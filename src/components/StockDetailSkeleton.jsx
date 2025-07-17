export default function StockDetailSkeleton () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="animate-pulse w-full max-w-4xl p-6 bg-gray-800 rounded shadow-lg">
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded w-3/4"></div>
            ))}
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded w-3/4"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}