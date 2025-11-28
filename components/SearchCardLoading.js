import React from 'react';

export default function Loading() {
  return (
    <div class="flex w-full rounded overflow-hidden h-[100px] p-2 shadow-lg animate-pulse">
      <div class="aspect-[7/8] bg-gray-300 h-full"></div>

      <div class="w-2/3 space-y-3 mx-2">
        <div class="h-4 bg-gray-300 rounded"></div>
        <div class="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
}
