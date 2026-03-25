import React from 'react';
import { BookOpen, Target, Star, Award } from 'lucide-react';

const Navigation = ({ isDarkMode }) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center pointer-events-none px-6 lg:hidden">
        <div className={`backdrop-blur-3xl border p-3 rounded-[3rem] flex items-center gap-4 pointer-events-auto transition-all ${isDarkMode ? 'bg-[#0D1625]/90 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,1)]' : 'bg-white/90 border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]'}`}>
          <button className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`} title="Courses"><BookOpen className="w-6 h-6" /></button>
          <button className="w-16 h-16 rounded-[2rem] flex items-center justify-center relative bg-gradient-to-b from-violet-600 to-fuchsia-600 shadow-2xl shadow-violet-900/60 transform -translate-y-2 active:scale-95 transition-transform" title="Goals">
            <Target className="w-8 h-8 text-white" />
            <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full"></div>
          </button>
          <button className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`} title="Leaderboard"><Star className="w-6 h-6" /></button>
          <button className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-all ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`} title="Achievements">
            <Award className="w-6 h-6" />
            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-rose-500 rounded-full border-[3px] border-[#0D1625]"></div>
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex-col gap-3">
        <div className={`backdrop-blur-3xl border p-3 rounded-[2rem] flex flex-col items-center gap-3 transition-all ${isDarkMode ? 'bg-[#0D1625]/90 border-white/10 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-2xl'}`}>
          <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`} title="Courses"><BookOpen className="w-5 h-5" /></button>
          <button className="w-12 h-12 rounded-2xl flex items-center justify-center relative bg-gradient-to-b from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-900/60 active:scale-95 transition-transform" title="Goals">
            <Target className="w-6 h-6 text-white" />
          </button>
          <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`} title="Leaderboard"><Star className="w-5 h-5" /></button>
          <button className={`w-12 h-12 rounded-2xl flex items-center justify-center relative transition-all ${isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`} title="Achievements">
            <Award className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0D1625]"></div>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
