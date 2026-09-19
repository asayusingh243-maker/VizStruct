import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Cpu, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { MOCK_PROBLEMS } from '../data/mockData';
import { TopicIllustration } from '../components/common/Illustrations';

export const ProblemsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const navigate = useNavigate();

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const topics = ['All', 'Sorting & Searching', 'Arrays & Strings', 'Stacks & Queues', 'Dynamic Programming'];

  const filteredProblems = MOCK_PROBLEMS.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || problem.category === selectedTopic;
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto space-y-5">
          
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-xl font-bold font-outfit text-white">Problem Library</h1>
            <p className="text-xs text-zinc-400 font-sans">
              Data structure and algorithm problems with step execution tracing.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-3.5 rounded bg-[#121215] border border-[#27272A] space-y-3 font-mono text-xs">
            <div className="flex flex-col md:flex-row gap-3">
              
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter title or category..."
                  className="w-full bg-[#09090B] border border-[#27272A] rounded pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
                />
              </div>

              {/* Difficulty Filters */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-zinc-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-zinc-400" /> Filter:
                </span>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'bg-[#09090B] text-zinc-400 hover:text-white border border-[#27272A]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

            </div>

            {/* Topic Filter Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#27272A]">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider shrink-0">Topics:</span>
              {topics.map((top) => (
                <button
                  key={top}
                  onClick={() => setSelectedTopic(top)}
                  className={`px-2 py-0.5 rounded text-xs shrink-0 transition-colors ${
                    selectedTopic === top
                      ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
              <span>{filteredProblems.length} Problems Available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredProblems.map((prob) => (
                <div
                  key={prob.id}
                  className="p-4 rounded bg-[#121215] border border-[#27272A] hover:border-zinc-700 transition-colors flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold font-outfit text-white group-hover:text-blue-400 transition-colors">
                          {prob.title}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {prob.category}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                      {prob.description.replace(/```[\s\S]*?```/g, '').slice(0, 100)}...
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500">
                      Acceptance: {prob.acceptanceRate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate('/visualizer')}
                        className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs border border-zinc-800 flex items-center gap-1 transition-colors"
                      >
                        <Cpu className="w-3.5 h-3.5 text-blue-400" />
                        <span>Trace</span>
                      </button>

                      <button
                        onClick={() => navigate(`/problem/${prob.id}`)}
                        className="px-3 py-1 rounded bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Solve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
