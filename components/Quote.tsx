import React from "react";

export default function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="relative pl-6 pr-4 py-4 my-8 bg-gray-50 border-l-4 border-indigo-500 rounded-xl shadow-sm text-gray-700 text-lg font-medium">
      <span className="absolute left-1 top-2 text-indigo-400 text-3xl select-none">“</span>
      {children}
      <span className="absolute right-2 bottom-1 text-indigo-400 text-3xl select-none">”</span>
    </blockquote>
  );
}
