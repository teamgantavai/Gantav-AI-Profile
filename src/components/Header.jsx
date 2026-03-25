import React from 'react';
import { Sun, Moon, Share2 } from 'lucide-react';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className={`sticky top-0 z-[60] w-full border-b transition-colors duration-500 ${isDarkMode ? 'bg-[#070B16]/80 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'} backdrop-blur-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-xl transform -rotate-2">
            <span className="font-black text-white italic text-xl">G</span>
          </div>
          <div>
            <div className={`font-extrabold tracking-tighter text-lg leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gantav <span className="text-violet-500">AI</span></div>
            <div className={`text-[9px] ${isDarkMode ? 'text-slate-500' : 'text-slate-600'} uppercase tracking-widest font-black mt-0.5`}>Learning OS</div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`} title="Share profile">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
