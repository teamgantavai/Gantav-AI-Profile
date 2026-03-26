import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, MessageCircle, Settings } from 'lucide-react';

const Header = ({ isDarkMode, setIsDarkMode }) => {
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transform -rotate-2 overflow-hidden bg-white/10">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className={`font-extrabold tracking-tighter text-lg leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gantav <span className="text-violet-500">AI</span></div>
            <div className={`text-[9px] ${isDarkMode ? 'text-slate-500' : 'text-slate-600'} uppercase tracking-widest font-black mt-0.5`}>Your Gantavya</div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="relative" ref={settingsRef}>
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
              title="Settings"
            >
              <Settings className={`w-4 h-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`} />
            </button>
            
            {isSettingsOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-2xl border shadow-xl overflow-hidden font-bold text-xs ${isDarkMode ? 'bg-[#0D1625] border-white/10 text-white shadow-black/50' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'} z-[100] animate-in slide-in-from-top-2 fade-in duration-200`}>
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      setIsSettingsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-50'}`}
                  >
                    <span className="flex items-center gap-2">
                      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`} 
            title="Messages"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
