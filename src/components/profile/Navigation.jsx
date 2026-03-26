import React from 'react';
import { BookOpen, Target, Star, Award, Home } from 'lucide-react';

const Navigation = ({ isDarkMode, activeTab, setActiveTab, user, setActiveBottomTab }) => {
  const navItems = [
    { id: 'home', icon: Home, title: 'Home', isGlobal: true },
    { id: 'courses', icon: BookOpen, title: 'Courses' },
    { id: 'goals', icon: Target, title: 'Goals' },
    { id: 'leaderboard', icon: Star, title: 'Leaderboard' },
    { id: 'profile', icon: Award, title: 'Profile' }
  ];

  const ProfileIcon = () => (
    <div className={`w-full h-full rounded-full border overflow-hidden transition-all ${activeTab === 'profile' ? (isDarkMode ? 'border-white' : 'border-slate-900') : (isDarkMode ? 'border-slate-700' : 'border-slate-300')}`}>
      <img 
        src={user?.avatar || `https://api.dicebear.com/7.x/${user?.avatarStyle || 'avataaars'}/svg?seed=${user?.avatarSeed || 'seed'}`} 
        alt="P" 
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center pointer-events-none px-6 lg:hidden">
        <div className={`backdrop-blur-3xl border p-3 rounded-[3rem] flex items-center gap-2 pointer-events-auto transition-all ${isDarkMode ? 'bg-[#0D1625]/90 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,1)]' : 'bg-white/90 border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]'}`}>
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => item.isGlobal ? setActiveBottomTab('Discover') : setActiveTab(item.id)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative ${activeTab === item.id && !item.isGlobal ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-900/40' : (isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`} 
              title={item.title}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                {item.id === 'profile' ? <ProfileIcon /> : <item.icon className="w-6 h-6" />}
              </div>
              {activeTab === item.id && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full"></div>}
              {item.id === 'profile' && <div className="absolute top-4 right-4 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0D1625]"></div>}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex-col gap-3">
        <div className={`backdrop-blur-3xl border p-3 rounded-[2rem] flex flex-col items-center gap-3 transition-all ${isDarkMode ? 'bg-[#0D1625]/90 border-white/10 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-2xl'}`}>
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => item.isGlobal ? setActiveBottomTab('Discover') : setActiveTab(item.id)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative ${activeTab === item.id && !item.isGlobal ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-900/40' : (isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')}`} 
              title={item.title}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {item.id === 'profile' ? <ProfileIcon /> : <item.icon className="w-5 h-5" />}
              </div>
              {item.id === 'profile' && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-[#0D1625]"></div>}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
