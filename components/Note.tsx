// components/Note.tsx
import React from "react";
export default function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded">
      <span className="font-semibold text-blue-600 mr-2">💡 Note:</span>
      {children}
    </div>
  );
}
