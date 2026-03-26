import React from 'react';
import { Compass, PlaySquare, Layers, Trophy, User } from 'lucide-react';

const BottomNav = ({ isVisible, activeBottomTab, setActiveBottomTab, isDarkMode }) => {
  const navItems = [
    { icon: Compass, label: "Discover", id: "Discover" },
    { icon: PlaySquare, label: "Shorts", id: "Shorts" },
    { icon: Layers, label: "Courses", id: "Courses" },
    { icon: Trophy, label: "Ranking", id: "Ranking" },
    { icon: User, label: "Profile", id: "Profile" },
  ];

  return (
    <nav 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-90'
      }`}
    >
      <div className={`h-16 rounded-[2.2rem] border backdrop-blur-2xl flex items-center justify-around px-2 ${
        isDarkMode 
          ? 'bg-[#0F172A]/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
          : 'bg-white/90 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
      }`}>
        {navItems.map((item, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all cursor-pointer group"
            onClick={() => setActiveBottomTab(item.id)}
          >
            <item.icon 
              size={22} 
              className={activeBottomTab === item.id 
                ? 'text-violet-400' 
                : isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
              } 
              strokeWidth={activeBottomTab === item.id ? 2.5 : 2}
            />
            {activeBottomTab === item.id && (
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-1.5 shadow-[0_0_8px_#a78bfa]"></div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
