import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useUser } from './useAuth';
import { logOut } from './firebase';
import Home from './components/home/Home';
import UserProfile from './components/profile/UserProfile';
import LoginScreen from './components/Authentication/LoginScreen';
import SignUpScreen from './components/Authentication/SignUpScreen';

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
    <div className="min-h-screen">
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
      ) : (
        <Home
          activeBottomTab={activeBottomTab}
          setActiveBottomTab={setActiveBottomTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}
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