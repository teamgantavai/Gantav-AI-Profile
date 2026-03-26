import React from 'react';
import { PlaySquare, Plus, Eye } from 'lucide-react';

const ShortsSection = ({ isDarkMode }) => {
  const shorts = [
    { id: 1, title: "How Transformers Work in 60s", views: "124K", seed: "Aria", img: "1673191837751-2428562304ee" },
    { id: 2, title: "Mastering Python Decorators", views: "89K", seed: "Leo", img: "1550439062-609e154a278e" },
    { id: 3, title: "The GPU Scarcity Problem", views: "256K", seed: "Zoey", img: "1518770660439-4636190af475" },
    { id: 4, title: "Future of LLMs", views: "310K", seed: "Jack", img: "1620712946850-d1b77c071a11" },
  ];

  return (
    <section className="py-8 space-y-6">
      <div className="px-4 flex justify-between items-center">
        <h2 className={`text-xs font-black italic tracking-[0.2em] uppercase flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <PlaySquare size={16} className="text-rose-500" /> AI Insights Shorts
        </h2>
        <button className="text-[10px] font-black text-violet-400 uppercase tracking-widest hover:underline">View All</button>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-2">
        {shorts.map((short) => (
          <div key={short.id} className={`min-w-[140px] md:min-w-[180px] aspect-[9/16] relative rounded-[1.5rem] overflow-hidden group cursor-pointer border shadow-2xl ${
            isDarkMode ? 'border-white/5' : 'border-slate-200'
          }`}>
            <img 
              src={`https://images.unsplash.com/photo-${short.img}?auto=format&fit=crop&q=80&w=400`} 
              className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="px-1.5 py-0.5 bg-rose-600 rounded-md text-[7px] font-black uppercase italic shadow-lg text-white">Live</span>
                <div className="p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={12} className="text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-[11px] font-black italic leading-tight text-white line-clamp-2">{short.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${short.seed}`} className="w-5 h-5 rounded-full bg-slate-800" alt="" />
                    <span className="text-[9px] font-bold text-slate-300">@{short.seed}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-black text-slate-400">
                    <Eye size={10} />
                    {short.views}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShortsSection;
