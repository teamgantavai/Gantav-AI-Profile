import React from 'react';
import { Compass, PlaySquare, Layers, Trophy } from 'lucide-react';
import { useUser } from '../../useAuth';

const BottomNav = ({ isVisible, activeBottomTab, setActiveBottomTab, isDarkMode }) => {
  const { profile } = useUser();

  const avatarSrc = profile?.avatar
    || `https://api.dicebear.com/7.x/${profile?.avatarStyle || 'avataaars'}/svg?seed=${profile?.avatarSeed || 'seed'}`;

  const navItems = [
    { icon: Compass, label: 'Discover', id: 'Discover' },
    { icon: PlaySquare, label: 'Shorts', id: 'Shorts' },
    { icon: Layers, label: 'Courses', id: 'Courses' },
    { icon: Trophy, label: 'Ranking', id: 'Ranking' },
    { id: 'Profile', label: 'Profile', isAvatar: true },
  ];

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-90'}`}
    >
      <div className={`h-16 rounded-[2.2rem] border backdrop-blur-2xl flex items-center justify-around px-2 ${isDarkMode
        ? 'bg-[#0F172A]/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
        : 'bg-white/90 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
        }`}>
        {navItems.map((item, i) => {
          const isActive = activeBottomTab === item.id;
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all cursor-pointer group"
              onClick={() => setActiveBottomTab(item.id)}
            >
              {item.isAvatar ? (
                <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${isActive
                  ? 'border-violet-500 ring-2 ring-violet-500/30'
                  : isDarkMode ? 'border-slate-600' : 'border-slate-300'
                  }`}>
                  <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <item.icon
                  size={22}
                  className={isActive ? 'text-violet-400' : isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              )}
              {isActive && !item.isAvatar && (
                <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-1 shadow-[0_0_8px_#a78bfa]" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;