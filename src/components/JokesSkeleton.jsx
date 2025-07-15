// components/SkeletonJokeCard.jsx
import React from "react";

export default function SkeletonJokeCard(){
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 animate-pulse">
      <div className="h-6 w-10 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mt-4"></div>
    </div>
  );
};
