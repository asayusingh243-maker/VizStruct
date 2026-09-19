import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Terminal, 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  PlayCircle, 
  Menu, 
  X, 
  LogOut,
  Flame,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    addToast('Logged out', 'info');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Problems', path: '/problems', icon: BookOpen },
    { name: 'Visualizer', path: '/visualizer', icon: Cpu },
    { name: 'Debug Hints', path: '/recovery', icon: PlayCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090B]/95 backdrop-blur border-b border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-zinc-800 text-blue-400 border border-zinc-700 text-xs">
              &gt;_
            </span>
            <span>VizStruct</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-medium transition-colors ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 font-mono">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{user.streak}d</span>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium">{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded text-zinc-400 hover:text-rose-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <Link
                  to="/login"
                  className="px-3 py-1.5 font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded bg-zinc-100 text-zinc-950 hover:bg-white font-semibold transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-zinc-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#27272A] bg-[#09090B] px-4 py-4 space-y-2 text-xs"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded font-medium ${
                    active ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="text-left px-3 py-2 text-rose-400 font-medium"
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded bg-zinc-100 text-zinc-950 font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
