import React from 'react';
import { TrendingUp, MoreVertical, Play } from 'lucide-react';

const TrendingFeed = ({ isDarkMode }) => {
  const videos = [
    { 
      title: "But what is a neural network? | Chapter 1, Deep learning", 
      author: "3Blue1Brown", 
      views: "16M views", 
      time: "19:13", 
      ago: "6 years ago",
      youtubeId: "aircAruvnKk",
      avatar: "Grant"
    },
    { 
      title: "How I would learn to code (if I could start over)", 
      author: "Tina Huang", 
      views: "3.2M views", 
      time: "10:02", 
      ago: "2 years ago",
      youtubeId: "MHPGeQD8TvI",
      avatar: "Tina"
    },
    { 
      title: "100+ Computer Science Concepts Explained", 
      author: "Fireship", 
      views: "8.9M views", 
      time: "12:38", 
      ago: "2 years ago",
      youtubeId: "-uleG_Vecis",
      avatar: "Jeff"
    },
    { 
      title: "Machine Learning for Everybody – Full Course", 
      author: "freeCodeCamp", 
      views: "2.1M views", 
      time: "3:53:53", 
      ago: "1 year ago",
      youtubeId: "i_LwzRVP7bg",
      avatar: "Quincy"
    }
  ];

  return (
    <section className={`py-8 space-y-6 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
      <h2 className={`px-4 text-xs font-black italic tracking-[0.2em] uppercase flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
        <TrendingUp size={16} className="text-emerald-400" /> Global Trends
      </h2>
      {videos.map((vid, i) => (
        <a 
          key={i} 
          href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer block"
        >
          <div className={`relative aspect-video overflow-hidden md:rounded-[2rem] mx-0 md:mx-4 border ${
            isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-slate-200 shadow-sm'
          }`}>
            <img 
              src={`https://img.youtube.com/vi/${vid.youtubeId}/maxresdefault.jpg`} 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" 
              alt={vid.title}
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-violet-600/90 flex items-center justify-center pl-1 shadow-2xl backdrop-blur-sm">
                <Play size={28} fill="white" className="text-white" />
              </div>
            </div>
            <div className={`absolute bottom-4 right-4 px-2 py-1 rounded text-[10px] font-black border ${
              isDarkMode ? 'bg-black/90 border-white/10 text-white' : 'bg-black/80 border-transparent text-white'
            }`}>
              {vid.time}
            </div>
          </div>
          <div className="flex gap-4 p-5 md:px-8">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vid.avatar}`} className={`w-11 h-11 rounded-2xl border shadow-lg ${
              isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'
            }`} alt="" />
            <div className="flex-1">
              <h3 className={`text-[15px] font-black leading-snug line-clamp-2 italic transition-colors ${
                isDarkMode ? 'text-white group-hover:text-violet-400' : 'text-slate-900 group-hover:text-violet-600'
              }`}>{vid.title}</h3>
              <div className={`mt-1.5 text-[11px] font-bold flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{vid.author}</span>
                <span>•</span>
                <span>{vid.views}</span>
                <span>•</span>
                <span>{vid.ago}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <MoreVertical size={18} className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} />
            </div>
          </div>
        </a>
      ))}
    </section>
  );
};

export default TrendingFeed;
