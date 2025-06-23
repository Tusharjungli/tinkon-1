// components/Warning.tsx
import React from "react";
export default function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 my-6 rounded transition-colors">
      <span className="font-semibold text-yellow-600 dark:text-yellow-300 mr-2">⚠️ Warning:</span>
      <span className="text-gray-700 dark:text-gray-100">{children}</span>
    </div>
  );
}
