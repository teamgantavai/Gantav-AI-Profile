import React from 'react';
import { GraduationCap } from 'lucide-react';

const MentorsSection = ({ followedMentors, toggleFollow, isDarkMode }) => {
  const mentors = [
    { name: "Andrew Ng", focus: "AI Fundamentals", seed: "Felix", stu: "2M+", live: true },
    { name: "Andrej Karpathy", focus: "Neural Arch", seed: "Jack", stu: "900K", live: false },
    { name: "Harkirat Singh", focus: "Full Stack", seed: "Leo", stu: "400K", live: true },
    { name: "Arpit Bhayani", focus: "Sys Design", seed: "Max", stu: "150K", live: false }
  ];

  return (
    <section className="px-4 py-10 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className={`text-xs font-black italic tracking-[0.2em] uppercase flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <GraduationCap size={16} className="text-amber-400" /> Elite Curators
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {mentors.map((mentor, i) => (
          <div key={i} className={`min-w-[160px] p-5 rounded-[2.2rem] border flex flex-col items-center text-center group transition-all ${
            isDarkMode 
              ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' 
              : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}>
            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-2xl border p-1 transition-colors ${
                isDarkMode ? 'bg-[#0F172A] border-white/10 group-hover:border-violet-500/50' : 'bg-slate-50 border-slate-200 group-hover:border-violet-400'
              }`}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.seed}`} className="w-full h-full rounded-xl" alt={mentor.name} />
              </div>
              {mentor.live && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-rose-600 rounded text-[7px] font-black uppercase italic animate-pulse text-white">Live</span>
              )}
            </div>
            <h3 className={`text-sm font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{mentor.name}</h3>
            <p className={`text-[9px] font-bold mb-4 ${isDarkMode ? 'text-violet-400/80' : 'text-violet-500'}`}>{mentor.focus}</p>
            <button 
              onClick={() => toggleFollow(mentor.name)}
              className={`w-full py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                followedMentors.includes(mentor.name)
                  ? isDarkMode 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'bg-violet-100 text-violet-600 border border-violet-200'
                  : isDarkMode 
                    ? 'bg-white text-black hover:bg-violet-400' 
                    : 'bg-slate-900 text-white hover:bg-violet-600'
              }`}
            >
              {followedMentors.includes(mentor.name) ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MentorsSection;
