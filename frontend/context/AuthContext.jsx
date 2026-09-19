import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vizstruct_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vizstruct_auth') === 'true';
  });

  const [preferences, setPreferences] = useState({
    skillLevel: 'Beginner',
    language: 'Python',
    goal: 'interview',
    dailyCommitment: '30m'
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem('vizstruct_user', JSON.stringify(user));
      localStorage.setItem('vizstruct_auth', 'true');
    } else {
      localStorage.removeItem('vizstruct_user');
      localStorage.removeItem('vizstruct_auth');
    }
  }, [user, isAuthenticated]);

  const login = (email, password) => {
    // Check if it's the demo login
    if (email === 'alex.mercer@dev.io' || email === 'demo') {
      setUser(MOCK_USER);
    } else {
      // Create user session with actual input email/name
      const extractedName = email.split('@')[0];
      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
      setUser({
        id: `usr_${Date.now()}`,
        name: formattedName,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formattedName}`,
        role: "Developer Learner",
        masteryScore: 0,
        streak: 1,
        completedCount: 0,
        totalProblems: 120,
        joinedDate: "Today",
        skillLevel: "Beginner",
        preferredLanguage: "Python",
        masteryBreakdown: [
          { topic: "Arrays & Strings", score: 0, status: "Not Started", color: "#3B82F6" },
          { topic: "Stacks & Queues", score: 0, status: "Not Started", color: "#8B5CF6" },
          { topic: "Trees & Graphs", score: 0, status: "Not Started", color: "#F59E0B" },
          { topic: "Dynamic Programming", score: 0, status: "Not Started", color: "#EF4444" },
        ],
        weakTopics: [],
        strongTopics: [],
        recentActivity: []
      });
    }
    setIsAuthenticated(true);
    return true;
  };

  const register = (name, email, password) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || "Learner",
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'user')}`,
      role: "Developer Learner",
      masteryScore: 0,
      streak: 1,
      completedCount: 0,
      totalProblems: 120,
      joinedDate: "Today",
      skillLevel: "Beginner",
      preferredLanguage: "Python",
      masteryBreakdown: [
        { topic: "Arrays & Strings", score: 0, status: "Not Started", color: "#3B82F6" },
        { topic: "Stacks & Queues", score: 0, status: "Not Started", color: "#8B5CF6" },
        { topic: "Trees & Graphs", score: 0, status: "Not Started", color: "#F59E0B" },
        { topic: "Dynamic Programming", score: 0, status: "Not Started", color: "#EF4444" },
      ],
      weakTopics: [],
      strongTopics: [],
      recentActivity: []
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('vizstruct_user');
    localStorage.removeItem('vizstruct_auth');
  };

  const savePreferences = (newPrefs) => {
    setPreferences((prev) => ({ ...prev, ...newPrefs }));
    if (user) {
      setUser((prev) => ({
        ...prev,
        skillLevel: newPrefs.skillLevel || prev.skillLevel,
        preferredLanguage: newPrefs.language || prev.preferredLanguage
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        register,
        logout,
        preferences,
        savePreferences
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
