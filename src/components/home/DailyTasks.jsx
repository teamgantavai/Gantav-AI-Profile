import React from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';

const DailyTasks = ({ xp, isDarkMode }) => {
  return (
    <section className="px-4 pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className={`p-5 rounded-[2rem] border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-violet-600/10 to-transparent border-violet-500/20' 
          : 'bg-gradient-to-br from-violet-50 to-white border-violet-200 shadow-sm'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>Mastery Points</h3>
          <Coins size={16} className="text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{xp.toLocaleString()}</span>
          <span className={`text-sm font-black italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>XP</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-violet-100'}`}>
            <div className="h-full bg-violet-500 w-[65%] rounded-full shadow-[0_0_10px_#8B5CF6]"></div>
          </div>
          <span className={`text-[9px] font-bold italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>760 XP TO LVL 12</span>
        </div>
      </div>

      <div className={`p-5 rounded-[2rem] border ${
        isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Daily Quests</h3>
          <span className="text-[10px] font-bold text-emerald-400">2/3 Done</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 size={12} className="text-emerald-400" />
            </div>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Complete 1 Module</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
            </div>
            <span className={`text-[11px] font-bold line-through ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Ask AI a Question</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyTasks;
