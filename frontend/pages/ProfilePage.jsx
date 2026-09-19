import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Award, 
  Flame, 
  LogOut
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserAvatar, AchievementBadge } from '../components/common/Illustrations';

export const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded bg-[#121215] border border-[#27272A] text-center space-y-3">
            <div className="w-9 h-9 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 mx-auto">
              <User className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold font-outfit text-white">Profile Access</h2>
            <p className="text-xs text-zinc-400 font-sans">
              Sign in to view your profile activity and solved problems.
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

  const handleLogout = () => {
    logout();
    addToast('Signed out', 'info');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto space-y-5">
          
          {/* Header Card */}
          <div className="p-5 rounded bg-[#121215] border border-[#27272A]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <UserAvatar name={user.name} role={user.role} size="lg" />
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-base font-bold font-outfit text-white">{user.name}</h1>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono border border-zinc-700">
                      {user.role || 'Developer'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/questionnaire')}
                  className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-800 transition-colors"
                >
                  Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded bg-rose-950 text-xs font-mono text-rose-300 border border-rose-800 flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            
            <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase">Completed Problems</span>
              <div className="text-xl font-bold text-white">
                {user.completedCount || 0} <span className="text-xs font-normal text-zinc-500">/ 120</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden border border-zinc-800">
                <div className="bg-emerald-400 h-full" style={{ width: `${Math.min(((user.completedCount || 0) / 120) * 100, 100)}%` }} />
              </div>
            </div>

            <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase">Practice Score</span>
              <div className="text-xl font-bold text-blue-400">
                {user.masteryScore || 0} <span className="text-xs font-normal text-zinc-500">PTS</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden border border-zinc-800">
                <div className="bg-blue-500 h-full" style={{ width: `${Math.min(((user.masteryScore || 0) / 1000) * 100, 100)}%` }} />
              </div>
            </div>

            <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase">Primary Language</span>
              <div className="text-xl font-bold text-purple-400">
                {user.preferredLanguage || 'Python'}
              </div>
              <span className="text-[10px] text-zinc-500">Environment Ready</span>
            </div>

          </div>

          {/* Achievement Badges Showcase */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Milestones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <AchievementBadge
                title="First Trace"
                desc="Completed first step-by-step algorithm trace"
                unlocked={true}
              />
              <AchievementBadge
                title="Consistency"
                desc="Maintained a continuous practice streak"
                unlocked={true}
              />
              <AchievementBadge
                title="Trees & Graphs"
                desc="Completed Binary Tree Traversals"
                unlocked={true}
              />
              <AchievementBadge
                title="Sorting Algorithms"
                desc="Visualized QuickSort and MergeSort"
                unlocked={true}
              />
              <AchievementBadge
                title="Dynamic Programming"
                desc="Completed 5 DP problem traces"
                unlocked={false}
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
