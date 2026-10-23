import React from 'react';

export const LoadingSkeleton = ({ className = "h-4 w-full" }) => {
  return (
    <div className={`animate-pulse bg-slate-800/80 rounded-lg ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="h-5 w-1/3 bg-slate-700/60 rounded-md" />
      <div className="h-5 w-16 bg-slate-700/60 rounded-full" />
    </div>
    <div className="h-4 w-3/4 bg-slate-800/80 rounded-md" />
    <div className="h-4 w-1/2 bg-slate-800/80 rounded-md" />
    <div className="pt-4 flex justify-between items-center border-t border-slate-800/60">
      <div className="h-6 w-20 bg-slate-700/40 rounded-lg" />
      <div className="h-8 w-24 bg-blue-600/30 rounded-lg" />
    </div>
  </div>
);
