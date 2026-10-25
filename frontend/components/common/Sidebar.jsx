import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  ShieldAlert, 
  User, 
  Flame, 
  ChevronRight,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Problem Library', path: '/problems', icon: BookOpen },
    { name: 'Code Visualizer', path: '/visualizer', icon: Cpu },
    { name: 'Debug Hints', path: '/recovery', icon: ShieldAlert },
    { name: 'Profile & Activity', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-56 shrink-0 bg-[#09090B] border-r border-[#27272A] p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-3.5rem)]">
      <div className="space-y-5">
        
        {/* User Card Widget */}
        {isAuthenticated && user ? (
          <div className="p-3 rounded bg-[#121215] border border-[#27272A]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-mono text-xs font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-zinc-100 truncate">{user.name}</span>
                <span className="text-[10px] text-zinc-400">{user.role || 'Developer'}</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Flame className="w-3 h-3 fill-amber-400" />
                <span>{user.streak || 0}d streak</span>
              </div>
              <div>
                <span>{user.masteryScore || 0} pts</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded bg-[#121215] border border-[#27272A] text-center space-y-2">
            <p className="text-[11px] text-zinc-400">Sign in to save your practice score</p>
            <Link
              to="/login"
              className="w-full py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  active
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </div>
                {active && <ChevronRight className="w-3 h-3 text-zinc-400" />}
              </Link>
            );
          })}
        </div>

      </div>

      <div className="pt-3 border-t border-[#27272A] text-center">
        <span className="text-[10px] text-zinc-500 font-mono">VizStruct v2.4</span>
      </div>
    </aside>
  );
};
