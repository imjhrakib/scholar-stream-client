import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Animated Spinner with Glow */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
      </div>

      {/* Brand Name */}
      <h2 className="mt-8 text-3xl font-extrabold text-gray-800 tracking-wide">
        Scholar<span className="text-blue-600">Stream</span>
      </h2>

      {/* Sub Text */}
      <p className="mt-3 text-sm text-gray-500 tracking-wide animate-pulse">
        Loading your experience...
      </p>
    </div>
  );
};

export default Loading;
