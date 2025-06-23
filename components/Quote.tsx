import React from "react";

export default function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="relative pl-7 pr-5 py-5 my-8 bg-gray-50 dark:bg-gray-800 border-l-4 border-indigo-500 dark:border-indigo-400 rounded-xl shadow-sm dark:shadow-md text-gray-700 dark:text-gray-200 text-lg font-medium transition-colors">
      <span className="absolute left-1 top-2 text-indigo-400 dark:text-indigo-300 text-3xl select-none">“</span>
      {children}
      <span className="absolute right-2 bottom-1 text-indigo-400 dark:text-indigo-300 text-3xl select-none">”</span>
    </blockquote>
  );
}
