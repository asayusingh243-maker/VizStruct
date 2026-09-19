import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowDown } from 'lucide-react';

export const StackVisualizer = ({ stackFrames = [] }) => {
  return (
    <div className="bg-[#121215] rounded border border-[#27272A] p-4 flex flex-col h-full font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A] mb-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-zinc-200">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Call Stack Frames</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
          Depth: {stackFrames.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col-reverse gap-1.5 p-3 bg-[#09090B] rounded border border-[#27272A] min-h-[120px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {stackFrames.map((frame, index) => (
            <motion.div
              key={`${frame}-${index}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-bold">#{index + 1}</span>
                <span className="truncate max-w-[180px]">{frame}</span>
              </div>
              {index === stackFrames.length - 1 && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-sans font-bold bg-blue-950 text-blue-400 border border-blue-800 uppercase">
                  Active
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {stackFrames.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs py-4">
            <ArrowDown className="w-4 h-4 text-zinc-600 mb-1 opacity-50" />
            <span>Call stack is empty</span>
          </div>
        )}
      </div>
    </div>
  );
};
