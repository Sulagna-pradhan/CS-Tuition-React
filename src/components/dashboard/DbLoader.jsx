// components/FullScreenLoader.jsx
import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-20 h-20 border-[6px] border-gray-600 border-t-indigo-500 rounded-full animate-spin shadow-xl shadow-indigo-500/20"></div>
      <p className="mt-6 text-lg font-medium animate-pulse tracking-wide text-indigo-200">
        Loading...
      </p>
    </div>
  );
};

export default FullScreenLoader;
