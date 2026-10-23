import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Award, 
  Target, 
  BookOpen, 
  ChevronRight, 
  ShieldAlert,
  ArrowUpRight,
  LogIn,
  PlayCircle
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROBLEMS } from '../data/mockData';
import { UserAvatar, TopicIllustration, AchievementBadge } from '../components/common/Illustrations';

export const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded bg-[#121215] border border-[#27272A] text-center space-y-4">
            <div className="w-9 h-9 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 mx-auto">
              <LogIn className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold font-outfit text-white">Sign In Required</h2>
            <p className="text-xs text-zinc-400 font-sans">
              Sign in to view your solved problems and activity history.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                className="w-full py-2 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full py-2 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="p-5 rounded bg-[#121215] border border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <UserAvatar name={user.name} role={user.role} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold font-outfit text-white">
                    {user.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono border border-zinc-700">
                    {user.role || 'Developer'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                  Stack: {user.preferredLanguage || 'Python'}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/visualizer')}
              className="px-4 py-2 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Open Visualizer</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Today's Goal */}
            <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">Practice Goal</span>
                <span className="text-xs font-mono text-amber-400">{user.completedCount > 0 ? '70%' : '0%'}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>Solved Problems</span>
                  <span>{user.completedCount} / 10</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                  <div className="bg-amber-400 h-full" style={{ width: `${Math.min((user.completedCount / 10) * 100, 100)}%` }} />
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">Streak: {user.streak} days</p>
              </div>
            </div>

            {/* Score Card */}
            <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">Practice Points</span>
                <span className="text-xs font-mono text-blue-400">Score</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold font-mono text-white">
                  {user.masteryScore} <span className="text-xs text-zinc-500 font-normal">/ 1000</span>
                </div>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                <div className="bg-blue-500 h-full" style={{ width: `${Math.min((user.masteryScore / 1000) * 100, 100)}%` }} />
              </div>
            </div>

            {/* Debug Hints Card */}
            <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Debug Hints &amp; Analysis
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Review line-by-line trace comparisons for failed testcases.
              </p>
              <Link
                to="/recovery"
                className="w-full py-1.5 px-3 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-800 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Error Breakdown</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            </div>

          </div>

          {/* Badges Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Milestones &amp; Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <AchievementBadge
                title="First Trace"
                desc="Completed first step-by-step trace"
                unlocked={true}
              />
              <AchievementBadge
                title="Consistency"
                desc="Maintained a continuous practice streak"
                unlocked={user.streak >= 1}
              />
              <AchievementBadge
                title="Trees & Graphs"
                desc="Completed Binary Tree Traversals"
                unlocked={user.completedCount >= 2}
              />
              <AchievementBadge
                title="Sorting Algorithms"
                desc="Visualized QuickSort and MergeSort"
                unlocked={user.masteryScore >= 350}
              />
            </div>
          </div>

          {/* Recommended Problems */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Recommended Practice Problems
              </h2>
              <Link to="/problems" className="text-xs text-blue-400 hover:underline font-medium flex items-center gap-1">
                <span>All Problems</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {MOCK_PROBLEMS.slice(0, 3).map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => navigate(`/problem/${prob.id}`)}
                  className="p-3.5 rounded bg-[#121215] border border-[#27272A] hover:border-zinc-700 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                      <TopicIllustration type={prob.category} className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                          {prob.title}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                          prob.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        {prob.category} • Acceptance: {prob.acceptanceRate}
                      </p>
                    </div>
                  </div>

                  <button className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors shrink-0">
                    Solve
                  </button>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
