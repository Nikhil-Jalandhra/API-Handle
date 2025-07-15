import React from 'react';

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 sm:p-10 animate-pulse">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Left side: main image + thumbnails */}
        <div>
          <div className="w-full h-[400px] bg-gray-700 rounded mb-6"></div>
          <div className="flex gap-3 flex-wrap">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="w-20 h-20 bg-gray-700 rounded" />
            ))}
          </div>
        </div>

        {/* Right side: product info */}
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-gray-700 rounded w-3/4"></div> {/* title */}
          <div className="h-4 bg-gray-600 rounded w-1/2"></div> {/* brand/category */}

          <div className="flex items-center space-x-4">
            <div className="h-6 w-24 bg-gray-600 rounded"></div> {/* price */}
            <div className="h-6 w-16 bg-gray-600 rounded"></div> {/* rating */}
            <div className="h-6 w-20 bg-gray-600 rounded"></div> {/* stock */}
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>

          <div className="h-10 w-40 bg-gray-600 rounded mt-6"></div> {/* button */}
        </div>
      </div>
    </div>
  );
}
