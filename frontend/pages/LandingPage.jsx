import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { HeroVisualIllustration } from '../components/common/Illustrations';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-6"
          >
            <span className="text-blue-400 font-bold">&gt;_</span>
            <span>Interactive Code Execution Tracer</span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight font-outfit max-w-4xl mx-auto leading-tight text-white"
          >
            Visualize code execution <span className="text-blue-400 font-mono">line by line</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Step through Python, JavaScript, and C++ algorithms. Inspect variable values, call stacks, and array mutations in real-time as your code runs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/visualizer"
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Visualizing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/problems"
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-zinc-400" />
              <span>Browse Problems</span>
            </Link>
          </motion.div>

          {/* Hero Visual Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-14 max-w-5xl mx-auto"
          >
            <HeroVisualIllustration />
          </motion.div>

        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-16 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
              Essential Debugging Capabilities
            </h2>
            <p className="text-zinc-400 text-xs font-sans">
              Inspect internal execution state without setting up complex local debuggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded bg-[#121215] border border-[#27272A] space-y-3">
              <div className="font-mono text-xs text-blue-400 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>01. Step Execution</span>
              </div>
              <h3 className="text-sm font-bold font-outfit text-white">Line-by-Line Stepper</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                Advance execution step-by-step or jump back to previous states to pinpoint logic flow and loop iterations.
              </p>
            </div>

            <div className="p-5 rounded bg-[#121215] border border-[#27272A] space-y-3">
              <div className="font-mono text-xs text-purple-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>02. State Inspection</span>
              </div>
              <h3 className="text-sm font-bold font-outfit text-white">Variables &amp; Call Stack</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                Inspect local variables, scope bindings, recursion stack frames, and array pointer locations dynamically.
              </p>
            </div>

            <div className="p-5 rounded bg-[#121215] border border-[#27272A] space-y-3">
              <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>03. Debug Hints</span>
              </div>
              <h3 className="text-sm font-bold font-outfit text-white">Side-by-Side Comparison</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                When a testcase fails, compare expected vs actual execution traces side by side to fix edge cases.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-[#121215] border-y border-[#27272A]">
        <div className="max-w-3xl mx-auto text-center px-4 space-y-4">
          <h2 className="text-2xl font-bold font-outfit text-white">
            Ready to debug your algorithms?
          </h2>
          <p className="text-zinc-400 text-xs max-w-lg mx-auto font-sans">
            Explore execution traces or practice core data structure problems in Python, JavaScript, and C++.
          </p>
          <div>
            <button
              onClick={() => navigate('/visualizer')}
              className="px-5 py-2.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
            >
              Open Code Visualizer
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
