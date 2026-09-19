import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AuthBannerIllustration } from '../components/common/Illustrations';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      addToast('Invalid email format!', 'error');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      addToast('Password too short!', 'error');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      addToast('Passwords do not match!', 'error');
      return;
    }

    register(name, email, password);
    addToast('Account created successfully!', 'success');
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-3xl bg-[#121215] border border-[#27272A] rounded p-6 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
      >
        {/* Left Side: Auth Banner Illustration */}
        <div className="hidden md:block">
          <AuthBannerIllustration />
        </div>

        {/* Right Side: Form */}
        <div>
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-5">
            <Link to="/" className="flex items-center gap-2 mb-3 font-mono text-sm font-bold text-white">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-zinc-800 text-blue-400 border border-zinc-700 text-[10px]">
                &gt;_
              </span>
              <span>VizStruct</span>
            </Link>
            <h2 className="text-lg font-bold font-outfit text-white">Create Account</h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">Start code visualization</p>
          </div>

          {/* Validation Error Alert */}
          {errorMsg && (
            <div className="mb-3 p-2.5 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 font-sans">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 mb-1 block uppercase">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 mb-1 block uppercase">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 mb-1 block uppercase">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 mb-1 block uppercase">Confirm Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded bg-[#09090B] border-[#27272A] text-blue-600"
              />
              <span>I agree to the Terms of Service &amp; Privacy Policy</span>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors mt-2 flex items-center justify-center gap-1.5"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-center text-xs text-zinc-500 mt-4 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};
