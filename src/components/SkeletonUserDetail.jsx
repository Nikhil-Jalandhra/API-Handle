export default function SkeletonUserDetail() {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white rounded-lg shadow-lg p-6 md:p-10 animate-pulse">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-40 h-40 rounded-full bg-gray-700" />

        <div className="flex-1 space-y-4 w-full">
          <div className="h-6 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-2/4" />
          <div className="h-4 bg-gray-700 rounded w-1/3" />
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}
