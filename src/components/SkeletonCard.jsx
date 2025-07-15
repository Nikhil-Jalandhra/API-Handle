
export default function SkeletonCard() {
  return (
    <div className="bg-gray-800 p-4 rounded shadow animate-pulse">
      <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4" />
      <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2" />
      <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mb-2" />
      <div className="h-3 bg-gray-700 rounded w-2/3 mx-auto" />
    </div>
  );
}