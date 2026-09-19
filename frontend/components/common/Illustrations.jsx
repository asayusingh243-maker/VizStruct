import React from 'react';

/**
 * HeroVisualIllustration - High-contrast code preview block for hero section
 */
export const HeroVisualIllustration = () => {
  return (
    <div className="w-full rounded-lg bg-[#121215] border border-[#27272A] p-4 text-left font-mono shadow-2xl">
      {/* Code Window Top Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272A] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 text-zinc-400 text-[11px]">quick_sort.py</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 font-semibold">
            Line 4 Active
          </span>
          <span className="text-zinc-500">Python 3.11</span>
        </div>
      </div>

      {/* Grid: Code Editor Pane + Memory State Pane */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start text-xs">
        
        {/* Left Side: Real Code snippet */}
        <div className="md:col-span-7 bg-[#09090B] rounded p-3 border border-[#27272A] space-y-1 overflow-x-auto">
          <div className="flex items-center gap-3 text-zinc-600 select-none">
            <span className="w-4 text-right">1</span>
            <span className="text-blue-400">def</span> <span className="text-zinc-200">quick_sort</span>(arr, low, high):
          </div>
          <div className="flex items-center gap-3 text-zinc-600 select-none">
            <span className="w-4 text-right">2</span>
            <span className="text-zinc-400 pl-4">if low &lt; high:</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-950/60 text-blue-200 px-1 py-0.5 rounded border-l-2 border-blue-500 font-semibold">
            <span className="w-4 text-right text-blue-400">3</span>
            <span className="pl-8">pi = partition(arr, low, high)</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-600 select-none">
            <span className="w-4 text-right">4</span>
            <span className="text-zinc-400 pl-8">quick_sort(arr, low, pi - 1)</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-600 select-none">
            <span className="w-4 text-right">5</span>
            <span className="text-zinc-400 pl-8">quick_sort(arr, pi + 1, high)</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-600 select-none">
            <span className="w-4 text-right">6</span>
            <span className="text-zinc-400 pl-4">return arr</span>
          </div>
        </div>

        {/* Right Side: Execution Memory State Inspector */}
        <div className="md:col-span-5 space-y-3">
          
          {/* Variables Table */}
          <div className="bg-[#09090B] rounded p-3 border border-[#27272A] space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1.5 flex justify-between">
              <span>Variables</span>
              <span>Frame #2</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-400">arr</span>
                <span className="text-blue-400 font-semibold">[1, 4, 2, 5, 8]</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">low</span>
                <span className="text-zinc-200">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">high</span>
                <span className="text-zinc-200">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">pi (pivot)</span>
                <span className="text-amber-400 font-semibold">2</span>
              </div>
            </div>
          </div>

          {/* Visual Array Inspector */}
          <div className="bg-[#09090B] rounded p-3 border border-[#27272A] space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1.5">
              Array Memory State
            </div>
            <div className="flex gap-1.5 pt-1">
              {[
                { val: 1, idx: 0, state: 'sorted' },
                { val: 4, idx: 1, state: 'active' },
                { val: 2, idx: 2, state: 'active' },
                { val: 5, idx: 3, state: 'normal' },
                { val: 8, idx: 4, state: 'normal' }
              ].map((item) => (
                <div key={item.idx} className="flex-1 text-center font-mono">
                  <div className={`py-1.5 rounded text-xs font-bold ${
                    item.state === 'active' ? 'bg-blue-600 text-white' : item.state === 'sorted' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {item.val}
                  </div>
                  <span className="text-[9px] text-zinc-500">[{item.idx}]</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

/**
 * TopicIllustration - Simple topic icon block
 */
export const TopicIllustration = ({ type = 'arrays', className = 'w-5 h-5' }) => {
  return (
    <div className="font-mono text-xs font-bold text-zinc-300">
      [DSA]
    </div>
  );
};

/**
 * AuthBannerIllustration - Clean artwork for Login / Register side panels
 */
export const AuthBannerIllustration = () => {
  return (
    <div className="w-full h-full min-h-[380px] rounded-lg bg-[#09090B] border border-[#27272A] p-6 flex flex-col justify-between font-mono">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-blue-400">
          <span>&gt;_ Visual Debugger</span>
        </div>
        <h3 className="text-lg font-bold text-white leading-tight font-outfit">
          Master Coding Concepts Visually
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
          Inspect memory pointers, call stacks, and array states step by step as your code executes.
        </p>
      </div>

      {/* Code preview block */}
      <div className="bg-[#121215] rounded p-3 border border-[#27272A] text-xs space-y-1.5 my-4">
        <div className="text-zinc-500 text-[10px]"># Stack Frame Inspector</div>
        <div className="text-zinc-300">stack = [<span className="text-blue-400 font-mono">"("</span>, <span className="text-blue-400 font-mono">"&#123;"</span>]</div>
        <div className="text-zinc-400">top = stack.<span className="text-amber-400">pop()</span></div>
        <div className="text-emerald-400 text-[11px] pt-1">✓ Match verified</div>
      </div>

      <div className="pt-3 border-t border-[#27272A] text-[11px] text-zinc-500 flex justify-between">
        <span>Execution Engine:</span>
        <span className="text-zinc-300 font-semibold">Line-by-Line</span>
      </div>
    </div>
  );
};

/**
 * UserAvatar - Minimalist avatar component
 */
export const UserAvatar = ({ name = 'Alex', role = 'pro', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base'
  };

  const initial = name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className={`${sizeMap[size]} rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-white shrink-0`}>
      {initial}
    </div>
  );
};

/**
 * AchievementBadge - Achievement item graphic
 */
export const AchievementBadge = ({ title, desc, unlocked = true }) => {
  return (
    <div className={`p-3 rounded bg-[#121215] border border-[#27272A] ${unlocked ? 'opacity-100' : 'opacity-40'} flex items-center gap-3`}>
      <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-blue-400 shrink-0">
        ✓
      </div>
      <div>
        <h4 className="text-xs font-bold text-white font-outfit">{title}</h4>
        <p className="text-[11px] text-zinc-400 leading-tight font-sans mt-0.5">{desc}</p>
      </div>
    </div>
  );
};
