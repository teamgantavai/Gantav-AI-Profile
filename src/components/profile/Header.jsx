import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, MessageCircle, Settings, LogOut, User, Bell } from 'lucide-react';

const Header = ({ isDarkMode, setIsDarkMode, onSignOut }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-[60] w-full border-b transition-colors duration-500 ${isDarkMode ? 'bg-[#070B16]/80 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'} backdrop-blur-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transform -rotate-2 overflow-hidden bg-white/10">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className={`font-extrabold tracking-tighter text-lg leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Gantav <span className="text-violet-500">AI</span>
            </div>
            <div className={`text-[9px] uppercase tracking-widest font-black mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              Your Gantavya
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 items-center">
          {/* Notifications */}
          <button
            className={`p-2.5 rounded-2xl border transition-all relative ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className={`absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 ${isDarkMode ? 'border-[#070B16]' : 'border-white'}`} />
          </button>

          {/* Settings Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
              title="Settings"
            >
              <Settings className={`w-4 h-4 ${isSettingsOpen ? 'text-violet-500' : ''}`} />
            </button>

            {isSettingsOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in duration-200 ${isDarkMode ? 'bg-[#0D1625] border-white/10 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/80'}`}>
                <div className="p-2 space-y-1">
                  {/* Appearance section */}
                  <div className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Appearance
                  </div>
                  <button
                    onClick={() => { setIsDarkMode(!isDarkMode); setIsSettingsOpen(false); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-sm font-bold ${isDarkMode ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                      {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                      {isDarkMode ? 'Dark' : 'Light'}
                    </span>
                  </button>

                  <div className={`my-1 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`} />

                  {/* Account section */}
                  <div className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Account
                  </div>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className={`w-full flex items-center gap-2.5 p-3 rounded-xl transition-all text-sm font-bold ${isDarkMode ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <User className="w-4 h-4 text-violet-400" />
                    Edit Profile
                  </button>

                  <div className={`my-1 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`} />

                  <button
                    onClick={() => { setIsSettingsOpen(false); onSignOut?.(); }}
                    className={`w-full flex items-center gap-2.5 p-3 rounded-xl transition-all text-sm font-bold ${isDarkMode ? 'hover:bg-rose-500/10 text-rose-400' : 'hover:bg-rose-50 text-rose-500'}`}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
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

export default Header;