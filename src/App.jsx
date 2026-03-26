import React, { useState } from 'react';
import Home from './components/home/Home';
import UserProfile from './components/profile/UserProfile';

function App() {
  const [activeBottomTab, setActiveBottomTab] = useState('Discover');
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="min-h-screen">
      {activeBottomTab === 'Profile' ? (
        <UserProfile 
          activeBottomTab={activeBottomTab} 
          setActiveBottomTab={setActiveBottomTab} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
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

export default App;
