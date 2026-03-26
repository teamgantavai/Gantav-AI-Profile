import React from 'react';
import { Play } from 'lucide-react';

const HeroSection = ({ isDarkMode }) => {
  return (
    <section className="px-4 pt-8">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className={`relative p-6 rounded-[2.2rem] border overflow-hidden ${
          isDarkMode ? 'bg-[#0F172A] border-white/10' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
          <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-400 text-[9px] font-black uppercase tracking-widest">In Progress</span>
                <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>• 45m remaining</span>
              </div>
              <h2 className={`text-2xl font-black italic tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Neural Networks: Zero to Hero</h2>
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-6 h-6 rounded-full" alt="Mentor" />
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Andrej Karpathy</span>
              </div>
              <div className="pt-2 space-y-2">
                <div className="flex justify-between items-end">
                  <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Current Mastery</span>
                  <span className="text-sm font-black italic text-violet-400">68%</span>
                </div>
                <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className={`w-16 h-16 rounded-full flex items-center justify-center pl-1 shadow-2xl hover:scale-110 active:scale-95 transition-all ${
                isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'
              }`}>
                <Play size={28} fill={isDarkMode ? 'black' : 'white'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
