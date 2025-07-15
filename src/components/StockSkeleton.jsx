import React from 'react';

export default function StockSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 animate-pulse border border-gray-700">
      <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );
}
