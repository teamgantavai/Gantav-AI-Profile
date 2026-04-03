import React from 'react';
import { BookOpen, Target, Star, Home } from 'lucide-react';

const Navigation = ({ isDarkMode, activeTab, setActiveTab, user, setActiveBottomTab }) => {
  const navItems = [
    { id: 'home', icon: Home, title: 'Home', isGlobal: true },
    { id: 'courses', icon: BookOpen, title: 'Courses' },
    { id: 'goals', icon: Target, title: 'Goals' },
    { id: 'leaderboard', icon: Star, title: 'Leaderboard' },
    { id: 'profile', icon: null, title: 'Profile' }, // uses avatar
  ];

  const avatarSrc = user?.avatar
    || `https://api.dicebear.com/7.x/${user?.avatarStyle || 'avataaars'}/svg?seed=${user?.avatarSeed || 'seed'}`;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 lg:hidden">
        <div className={`backdrop-blur-3xl border p-2.5 rounded-[2.8rem] flex items-center gap-1 pointer-events-auto transition-all ${isDarkMode
          ? 'bg-[#0D1625]/95 border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-white/95 border-slate-200 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)]'
          }`}>
          {navItems.map((item) => {
            const isActive = item.isGlobal ? false : activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.isGlobal ? setActiveBottomTab?.('Discover') : setActiveTab(item.id)}
                className={`relative w-13 h-13 min-w-[52px] min-h-[52px] rounded-full flex items-center justify-center transition-all active:scale-90 ${isActive
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-xl shadow-violet-900/50'
                  : isDarkMode ? 'hover:bg-white/8' : 'hover:bg-slate-100'
                  }`}
                title={item.title}
              >
                {item.id === 'profile' ? (
                  <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${isActive
                    ? 'border-white'
                    : isDarkMode ? 'border-slate-600' : 'border-slate-300'
                    }`}>
                    <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <item.icon
                    size={22}
                    className={isActive ? 'text-white' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                {isActive && (
                  <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: floating bottom-center pill (NOT side nav) */}
      <nav className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <div className={`backdrop-blur-3xl border p-2.5 rounded-[2.8rem] flex items-center gap-1 transition-all ${isDarkMode
          ? 'bg-[#0D1625]/95 border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-white/95 border-slate-200 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)]'
          }`}>
          {navItems.map((item) => {
            const isActive = item.isGlobal ? false : activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.isGlobal ? setActiveBottomTab?.('Discover') : setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${isActive
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-900/40'
                  : isDarkMode ? 'hover:bg-white/8' : 'hover:bg-slate-100'
                  }`}
                title={item.title}
              >
                {item.id === 'profile' ? (
                  <div className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all ${isActive ? 'border-white' : isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
                    <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <item.icon
                    size={18}
                    className={isActive ? 'text-white' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                {isActive && (
                  <span className="text-white text-xs font-black">{item.title}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;