import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Search, Settings, LogOut, User, Bell, Sparkles, MessageSquare } from 'lucide-react';

const GlobalHeader = ({ isDarkMode, setIsDarkMode, onSignOut }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const settingsRef = useRef(null);
  const notifRef = useRef(null);
  
  // For home screen scroll hidden effect
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] w-full border-b transition-all duration-500 backdrop-blur-2xl ${
        isDarkMode ? 'bg-[#070B16]/80 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center gap-4">
        {/* Left: Branding with Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transform -rotate-2 overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-violet-600 text-white'}`}>
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
            {/* Fallback pattern if no logo image */}
            <span className="absolute inset-0 flex items-center justify-center text-xl font-black bg-violet-600/20 mix-blend-overlay">G</span>
          </div>
          <div className="hidden sm:block">
            <div className={`font-extrabold tracking-tighter text-lg leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Gantav <span className="text-violet-500">AI</span>
            </div>
            <div className={`text-[9px] uppercase tracking-widest font-black mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              Your Gantavya
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} />
          <input 
            type="text" 
            placeholder="Search mentors, courses, topics..."
            className={`w-full border rounded-2xl py-2 pl-12 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all ${
              isDarkMode 
                ? 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500' 
                : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button className={`md:hidden p-2 rounded-xl border ${
            isDarkMode ? 'bg-white/[0.03] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
          }`}>
            <Search size={18} />
          </button>
          
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all border border-violet-400/20">
            <Sparkles size={14} className="text-white animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-white">AI Tutor</span>
          </button>

          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2 rounded-2xl border transition-all relative ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`} 
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 ${isDarkMode ? 'border-[#070B16]' : 'border-white'}`} />
            </button>
            {isNotifOpen && (
              <div className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in duration-200 ${isDarkMode ? 'bg-[#0D1625] border-white/10 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/80'}`}>
                <div className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <Bell className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>
                  <h4 className={`text-sm font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Notifications</h4>
                  <p className={`text-[10px] font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    You're all caught up! Check back later for updates on your courses and cohort.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
              title="Settings"
            >
              <Settings className={`w-4 h-4 ${isSettingsOpen ? 'text-violet-500' : ''}`} />
            </button>

            {isSettingsOpen && (
              <div className={`absolute right-0 mt-3 w-56 rounded-2xl border shadow-2xl overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in duration-200 ${isDarkMode ? 'bg-[#0D1625] border-white/10 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/80'}`}>
                <div className="p-2 space-y-1">
                  <div className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Appearance</div>
                  <button onClick={() => { setIsDarkMode(!isDarkMode); setIsSettingsOpen(false); }} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-sm font-bold ${isDarkMode ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                    <span className="flex items-center gap-2.5">
                      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${!isDarkMode ? 'bg-slate-300' : 'bg-violet-600'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${!isDarkMode ? 'left-0.5' : 'right-0.5'}`} />
                    </div>
                  </button>

                  <div className={`my-1 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`} />

                  <div className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Account</div>
                  <button onClick={() => setIsSettingsOpen(false)} className={`w-full flex items-center gap-2.5 p-3 rounded-xl transition-all text-sm font-bold ${isDarkMode ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                    <User className="w-4 h-4 text-violet-400" /> Account Details
                  </button>

                  <div className={`my-1 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`} />

                  <button onClick={() => { setIsSettingsOpen(false); onSignOut?.(); }} className={`w-full flex items-center gap-2.5 p-3 rounded-xl transition-all text-sm font-bold ${isDarkMode ? 'hover:bg-rose-500/10 text-rose-400' : 'hover:bg-rose-50 text-rose-500'}`}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
