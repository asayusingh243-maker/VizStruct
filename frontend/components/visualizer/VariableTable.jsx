import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Variable, Box } from 'lucide-react';

export const VariableTable = ({ variables = {} }) => {
  const entries = Object.entries(variables);

  return (
    <div className="bg-[#121215] rounded border border-[#27272A] p-4 flex flex-col h-full font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A] mb-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-zinc-200">
          <Variable className="w-4 h-4 text-purple-400" />
          <span>Variables Scope</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
          {entries.length} Scope Variables
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-6 text-zinc-500 text-xs">
          <Box className="w-6 h-6 text-zinc-600 mb-1 opacity-60" />
          <span>No active variables in scope</span>
        </div>
      ) : (
        <div className="space-y-1.5 overflow-y-auto max-h-52 pr-1">
          <AnimatePresence mode="popLayout">
            {entries.map(([key, val]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between p-2 rounded bg-[#09090B] border border-[#27272A] text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">{key}</span>
                  <span className="text-zinc-600">=</span>
                </div>
                <div className="font-bold text-blue-400 max-w-[140px] truncate">
                  {String(val)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
