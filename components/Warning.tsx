// components/Warning.tsx
import React from "react";
export default function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded">
      <span className="font-semibold text-yellow-600 mr-2">⚠️ Warning:</span>
      {children}
    </div>
  );
}
