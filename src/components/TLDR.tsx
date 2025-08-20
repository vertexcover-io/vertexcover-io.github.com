import React from 'react';

interface TLDRProps {
  children: React.ReactNode;
}

export default function TLDR({ children }: TLDRProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-5 border-l-4 border-l-blue-500 dark:border-l-blue-400">
      <strong className="text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wide font-semibold">
        TL;DR:
      </strong>
      <div className="mt-2 text-gray-800 dark:text-gray-200">
        {children}
      </div>
    </div>
  );
}