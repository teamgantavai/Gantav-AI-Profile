import React from 'react';
import { Compass, ShieldCheck, TrendingUp } from 'lucide-react';
import ProgressRing from './ProgressRing';

const GoalIntelligence = ({ user, isDarkMode }) => {
  return (
    <section className={`border rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl transition-colors ${isDarkMode ? 'bg-[#0D1625]/60 border-white/10' : 'bg-white border-slate-200 shadow-slate-200/30'}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          <Compass className="w-5 h-5 text-violet-500" /> Goal Intelligence
        </h2>
        <button className="bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 text-[10px] font-black px-4 py-2 rounded-2xl transition-all">
          Update Path
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <ProgressRing percentage={user.progress} isDarkMode={isDarkMode} />
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="text-center md:text-left">
            <div className={`text-xl xl:text-2xl font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Full Stack AI Architect</div>
            <div className={`text-xs mt-1.5 font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              Destination: <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.destination}</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Foundation Stage', status: 'Mastered', color: 'text-emerald-500', bgColor: 'bg-emerald-500', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
              { label: 'Core Technicals', status: '68% Complete', color: 'text-amber-600', bgColor: 'bg-amber-500', icon: <TrendingUp className="w-4 h-4 text-amber-500" /> },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-[1.5rem] border transition-all ${isDarkMode ? 'bg-slate-900/40 border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                  <div className={`${item.bgColor}/10 p-2.5 rounded-xl`}>
                    {item.icon}
                  </div>
                  <span className={`text-xs font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.label}</span>
                </div>
                <span className={`text-[10px] font-black uppercase ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalIntelligence;
