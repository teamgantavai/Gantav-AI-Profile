import React from 'react';
import { Compass, ShieldCheck, TrendingUp, Target } from 'lucide-react';
import ProgressRing from './ProgressRing';

const GoalIntelligence = ({ user, isDarkMode }) => {
  const d = isDarkMode;
  const progress = user?.progress || 0;
  const hasGoal = !!(user?.destination?.trim());

  return (
    <section className={`border rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl transition-colors ${d ? 'bg-[#0D1625]/60 border-white/10' : 'bg-white border-slate-200 shadow-slate-200/30'}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2.5 ${d ? 'text-slate-500' : 'text-slate-600'}`}>
          <Compass size={18} className="text-violet-500" /> Goal Intelligence
        </h2>
        <button className={`text-[10px] font-black px-4 py-2 rounded-2xl transition-all ${d ? 'bg-violet-500/10 hover:bg-violet-500/20 text-violet-400' : 'bg-violet-50 hover:bg-violet-100 text-violet-600'}`}>
          Update Path
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <ProgressRing percentage={progress} isDarkMode={d} />
        </div>

        <div className="flex-1 w-full space-y-6">
          {hasGoal ? (
            <>
              <div className="text-center md:text-left">
                <div className={`text-xl xl:text-2xl font-black tracking-tight italic ${d ? 'text-white' : 'text-slate-900'}`}>
                  Full Stack AI Architect
                </div>
                <div className={`text-xs mt-1.5 font-medium ${d ? 'text-slate-500' : 'text-slate-600'}`}>
                  Goal:{' '}
                  <span className={`font-bold ${d ? 'text-white' : 'text-slate-900'}`}>
                    {user.destination}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: 'Foundation Stage',
                    status: progress >= 33 ? 'Mastered' : progress > 0 ? 'In Progress' : 'Not Started',
                    color: progress >= 33 ? 'text-emerald-500' : progress > 0 ? 'text-amber-500' : d ? 'text-slate-600' : 'text-slate-400',
                    bgColor: 'bg-emerald-500',
                    icon: <ShieldCheck size={16} className={progress >= 33 ? 'text-emerald-500' : d ? 'text-slate-600' : 'text-slate-400'} />,
                  },
                  {
                    label: 'Core Technicals',
                    status: progress >= 66 ? 'Mastered' : progress >= 33 ? `${Math.round((progress - 33) / 33 * 100)}% Complete` : 'Locked',
                    color: progress >= 66 ? 'text-emerald-500' : progress >= 33 ? 'text-amber-600' : d ? 'text-slate-700' : 'text-slate-300',
                    bgColor: 'bg-amber-500',
                    icon: <TrendingUp size={16} className={progress >= 33 ? 'text-amber-500' : d ? 'text-slate-700' : 'text-slate-300'} />,
                  },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-[1.5rem] border transition-all ${d ? 'bg-slate-900/40 border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`${item.bgColor}/10 p-2.5 rounded-xl`}>{item.icon}</div>
                      <span className={`text-xs font-black uppercase tracking-tight ${d ? 'text-white' : 'text-slate-900'}`}>{item.label}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty state for new users */
            <div className="text-center md:text-left space-y-4">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-black uppercase tracking-widest ${d ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-violet-50 border-violet-200 text-violet-600'}`}>
                <Target size={14} /> Set your destination
              </div>
              <p className={`text-sm font-medium leading-relaxed ${d ? 'text-slate-400' : 'text-slate-600'}`}>
                Define your career goal to unlock your personalised AI learning path and progress tracking.
              </p>
              <p className={`text-xs font-bold ${d ? 'text-slate-600' : 'text-slate-400'}`}>
                Edit your profile → Career Goal to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoalIntelligence;