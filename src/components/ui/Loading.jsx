import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Brand Text */}
      <h2 className="mt-6 text-2xl font-bold text-gray-800 tracking-wide">
        Scholar<span className="text-blue-600">Stream</span>
      </h2>

      {/* Sub Text */}
      <p className="mt-2 text-sm text-gray-500">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
