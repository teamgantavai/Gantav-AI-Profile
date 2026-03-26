import React from 'react';
import { Search, Sparkles, MessageSquare, Sun, Moon } from 'lucide-react';

const HomeHeader = ({ isVisible, isDarkMode, setIsDarkMode }) => {
  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-md px-4 md:px-6 py-4 flex items-center justify-between gap-4 transition-all duration-500 ease-in-out border-b ${
        isDarkMode 
          ? 'bg-[#050810]/95 border-white/5' 
          : 'bg-white/95 border-slate-200'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Left: Branding with Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center relative overflow-hidden ${
          isDarkMode ? 'bg-[#0F172A] border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <img src="/logo.png" alt="Gantav AI" className="w-full h-full object-cover" />
        </div>
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center">
            <span className={`text-lg font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gantav</span>
            <span className="text-lg font-black tracking-tight text-[#8B5CF6] ml-1 italic">AI</span>
          </div>
          <span className={`text-[8px] font-bold tracking-[0.3em] uppercase -mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>YOUR GANTAVYA</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} />
        <input 
          type="text" 
          placeholder="Search mentors, courses, topics..."
          className={`w-full border rounded-2xl py-2.5 pl-12 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all ${
            isDarkMode 
              ? 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500' 
              : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
          }`}
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className={`md:hidden p-2.5 rounded-xl border ${
          isDarkMode ? 'bg-white/[0.03] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
        }`}>
          <Search size={20} />
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2.5 rounded-xl border transition-all ${
            isDarkMode ? 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-amber-400' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700 shadow-sm'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all group border border-violet-400/20">
          <Sparkles size={16} className="text-white animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-wider hidden lg:block text-white">AI Tutor</span>
        </button>

        <button className={`p-2.5 rounded-xl border transition-all relative ${
          isDarkMode ? 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-violet-400' : 'bg-white border-slate-200 text-slate-500 hover:text-violet-600 shadow-sm'
        }`}>
          <MessageSquare size={20} />
          <span className={`absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 ${isDarkMode ? 'border-[#050810]' : 'border-white'}`}></span>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
