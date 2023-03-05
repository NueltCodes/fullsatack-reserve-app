import React from "react";

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed inset-0 z-50">
      <div className="w-28 h-28 border-2 border-b-red-600 border-l-red-600 border-t-white  border-solid rounded-full animate-spin "></div>
    </div>
  );
}
