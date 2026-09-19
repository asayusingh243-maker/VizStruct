import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export const ArrayVisualizer = ({ array = [], highlightIndices = [], status = 'normal' }) => {
  const maxValue = Math.max(...array, 10);

  return (
    <div className="bg-[#121215] rounded border border-[#27272A] p-4 flex flex-col h-full font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A] mb-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-zinc-200">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <span>Array State Visualization</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-sans">
          <span className="flex items-center gap-1 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Comparing
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Swapped
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Sorted
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-center gap-2.5 min-h-[160px] p-4 bg-[#09090B] rounded border border-[#27272A] overflow-x-auto">
        {array.map((val, idx) => {
          const isHighlighted = highlightIndices.includes(idx);
          let barBg = 'bg-zinc-700 border-zinc-500';
          let textColor = 'text-zinc-300';

          if (isHighlighted) {
            if (status === 'swapped') {
              barBg = 'bg-emerald-500 border-emerald-300 ring-2 ring-emerald-400';
              textColor = 'text-emerald-300';
            } else if (status === 'comparing') {
              barBg = 'bg-amber-500 border-amber-300 ring-2 ring-amber-400';
              textColor = 'text-amber-300';
            } else if (status === 'sorted') {
              barBg = 'bg-blue-600 border-blue-400';
              textColor = 'text-blue-300';
            }
          } else if (status === 'sorted') {
            barBg = 'bg-blue-600 border-blue-400';
            textColor = 'text-blue-300';
          }

          const heightPercent = Math.max((val / maxValue) * 100, 20);

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[46px] min-w-[30px]">
              {/* Element Value Label */}
              <span className={`text-xs font-bold font-mono ${textColor}`}>{val}</span>

              {/* Bar representation with framer-motion */}
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-full rounded-t border-t-2 ${barBg} transition-colors duration-200`}
              />

              {/* Index Indicator */}
              <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
