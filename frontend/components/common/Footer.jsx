import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer className="bg-[#09090B] border-t border-[#27272A] text-zinc-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold text-white">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-zinc-800 text-blue-400 border border-zinc-700 text-[10px]">
                &gt;_
              </span>
              <span>VizStruct</span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Interactive Data Structure &amp; Algorithm Visualizer. Trace code execution line by line.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="#" className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:text-white transition-colors">
                <FaGithub className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:text-white transition-colors">
                <FaTwitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:text-white transition-colors">
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-200 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/problems" className="hover:text-white transition-colors">Problem Library</Link></li>
              <li><Link to="/visualizer" className="hover:text-white transition-colors">Code Visualizer</Link></li>
              <li><Link to="/recovery" className="hover:text-white transition-colors">Debug Hints</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-200 mb-3">Topics</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors">Arrays &amp; Strings</li>
              <li className="hover:text-white transition-colors">Stacks &amp; Queues</li>
              <li className="hover:text-white transition-colors">Binary Trees &amp; Graphs</li>
              <li className="hover:text-white transition-colors">Dynamic Programming</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-200 mb-3">Features</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-white cursor-pointer transition-colors">Line-by-Line Stepper</li>
              <li className="hover:text-white cursor-pointer transition-colors">Variable State Inspector</li>
              <li className="hover:text-white cursor-pointer transition-colors">Side-by-Side Trace Comparison</li>
              <li className="hover:text-white cursor-pointer transition-colors">Monaco Code Sandbox</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs gap-3">
          <div>
            <span>© 2026 VizStruct. Built for software engineers.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
