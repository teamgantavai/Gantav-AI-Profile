import React from 'react';
import { Sparkles, Rocket, Layers, Activity, ChevronRight } from 'lucide-react';

const RecommendedPaths = ({ isDarkMode }) => {
  const courses = [
    { title: "Generative AI Masterclass", lessons: 42, color: isDarkMode ? "from-violet-600/20" : "from-violet-100", border: isDarkMode ? "border-violet-500/30" : "border-violet-200", icon: Rocket, label: "Top Pick" },
    { title: "Advance System Design", lessons: 28, color: isDarkMode ? "from-blue-600/20" : "from-blue-50", border: isDarkMode ? "border-blue-500/30" : "border-blue-200", icon: Layers, label: "Advanced" },
    { title: "Fullstack Web3 Dev", lessons: 35, color: isDarkMode ? "from-emerald-600/20" : "from-emerald-50", border: isDarkMode ? "border-emerald-500/30" : "border-emerald-200", icon: Activity, label: "Trending" }
  ];

  return (
    <section className="px-4 py-6 space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={`text-xs font-black italic tracking-[0.2em] uppercase flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Sparkles size={16} className="text-violet-400" /> For You: Pro Paths
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {courses.map((course, i) => (
            <div key={i} className={`min-w-[240px] relative p-5 rounded-[2rem] border bg-gradient-to-br to-transparent group cursor-pointer hover:scale-[1.02] transition-all overflow-hidden ${course.border} ${course.color} ${
              !isDarkMode ? 'shadow-sm' : ''
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <course.icon size={18} className={isDarkMode ? 'text-white' : 'text-slate-700'} />
                </div>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest ${
                  isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-900/10 text-slate-700'
                }`}>{course.label}</span>
              </div>
              <h3 className={`text-sm font-black italic leading-tight mb-2 transition-colors ${
                isDarkMode ? 'text-white group-hover:text-violet-300' : 'text-slate-900 group-hover:text-violet-600'
              }`}>{course.title}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{course.lessons} Modules</span>
                <div className={`p-1.5 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedPaths;
