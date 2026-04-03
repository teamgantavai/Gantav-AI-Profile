import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useUser } from './useAuth';
import { logOut } from './firebase';
import Home from './components/home/Home';
import UserProfile from './components/profile/UserProfile';
import LoginScreen from './components/Authentication/LoginScreen';
import SignUpScreen from './components/Authentication/SignUpScreen';
import Leaderboard from './components/leaderboard/Leaderboard';
import GlobalHeader from './components/layout/GlobalHeader';
import GlobalNav from './components/layout/GlobalNav';

function AppContent() {
  const { isSignedIn, isLoaded, user, profile } = useUser();
  const [activeBottomTab, setActiveBottomTab] = useState('Discover');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [authScreen, setAuthScreen] = useState('login');

  // ── Loading ────────────────────────────────────────────────────────────────
  if (!isLoaded) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#05070A]' : 'bg-[#F8FAFC]'}`}>
        <div className="w-5 h-5 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Auth screens ───────────────────────────────────────────────────────────
  if (!isSignedIn) {
    return authScreen === 'signup'
      ? <SignUpScreen onNavigate={setAuthScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      : <LoginScreen onNavigate={setAuthScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
  }

  // Profile not yet complete → show profile screen with edit modal open
  const profileComplete = profile?.profileComplete;

  // ── Main app ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative">
      <GlobalHeader isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onSignOut={logOut} />
      
      {activeBottomTab === 'Profile' || !profileComplete ? (
        <UserProfile
          activeBottomTab={activeBottomTab}
          setActiveBottomTab={setActiveBottomTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          firebaseUser={user}
          forceEditModal={!profileComplete}
          onSignOut={logOut}
        />
      ) : activeBottomTab === 'Leaderboard' ? (
        <Leaderboard isDarkMode={isDarkMode} />
      ) : (
        <Home
          activeBottomTab={activeBottomTab}
          setActiveBottomTab={setActiveBottomTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      <GlobalNav 
        activeBottomTab={activeBottomTab} 
        setActiveBottomTab={setActiveBottomTab} 
        isDarkMode={isDarkMode} 
        user={profile} 
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;