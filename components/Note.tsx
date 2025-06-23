import React from "react";
export default function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 dark:border-blue-500 p-4 my-6 rounded transition-colors">
      <span className="font-semibold text-blue-600 dark:text-blue-300 mr-2">💡 Note:</span>
      <span className="text-gray-700 dark:text-gray-200">{children}</span>
    </div>
  );
}
