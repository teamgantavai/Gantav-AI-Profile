import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Target, Star } from 'lucide-react';

const GlobalNav = ({ activeBottomTab, setActiveBottomTab, isDarkMode, user }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const avatarSrc = user?.avatar
    || `https://api.dicebear.com/7.x/${user?.avatarStyle || 'avataaars'}/svg?seed=${user?.avatarSeed || 'seed'}`;

  const navItems = [
    { id: 'Discover', icon: Home, title: 'Home' },
    { id: 'Courses', icon: BookOpen, title: 'Courses' },
    { id: 'Goals', icon: Target, title: 'Goals' },
    { id: 'Leaderboard', icon: Star, title: 'Leaderboard' },
    { id: 'Profile', icon: null, title: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={`fixed bottom-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 lg:hidden transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className={`backdrop-blur-3xl border p-2 rounded-[2.8rem] flex items-center gap-1 pointer-events-auto transition-all shadow-2xl ${isDarkMode
          ? 'bg-[#0D1625]/95 border-white/10'
          : 'bg-white/95 border-slate-200'
          }`}>
          {navItems.map((item) => {
            const isActive = activeBottomTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveBottomTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all active:scale-95 ${isActive
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-xl shadow-violet-900/50 text-white'
                  : isDarkMode ? 'text-slate-500 hover:bg-white/5 hover:text-slate-300' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                title={item.title}
              >
                {item.id === 'Profile' ? (
                  <div className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all ${isActive ? 'border-white/50' : isDarkMode ? 'border-transparent' : 'border-slate-300'}`}>
                    <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                {isActive && (
                  <span className="text-[10px] font-black uppercase tracking-tight">{item.title}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: floating bottom-center pill */}
      <nav className={`hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className={`backdrop-blur-3xl border p-2 rounded-[2.8rem] flex items-center gap-2 transition-all shadow-2xl ${isDarkMode
          ? 'bg-[#0D1625]/95 border-white/10'
          : 'bg-white/95 border-slate-200'
          }`}>
          {navItems.map((item) => {
            const isActive = activeBottomTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveBottomTab(item.id)}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-full transition-all hover:-translate-y-1 ${isActive
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-900/40 text-white scale-105'
                  : isDarkMode ? 'hover:bg-white/5 text-slate-500 hover:text-slate-200' : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
                  }`}
                title={item.title}
              >
                {item.id === 'Profile' ? (
                  <div className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${isActive ? 'border-white/50' : 'border-transparent'}`}>
                    <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                {isActive && (
                  <span className="text-xs font-black uppercase tracking-wider">{item.title}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default GlobalNav;
