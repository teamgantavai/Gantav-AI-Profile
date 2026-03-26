import React from 'react';
import { Edit3, MapPin, Star, Flame, Trophy, CheckCircle2 } from 'lucide-react';

const ProfileCard = ({ user, isDarkMode, setIsEditModalOpen, config }) => {
  return (
    <section className="lg:col-span-2 relative group w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent rounded-[3rem] blur-xl opacity-40 pointer-events-none"></div>
      <div className={`relative backdrop-blur-3xl border rounded-[2.5rem] p-8 shadow-2xl transition-all ${isDarkMode ? 'bg-gradient-to-b from-white/5 to-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative">
            <div className={`w-32 h-32 lg:w-36 lg:h-36 rounded-[2.5rem] border-[3px] p-2 transition-transform duration-700 hover:rotate-3 ${isDarkMode ? 'bg-slate-900/80 font-bold' : 'bg-slate-100'} border-amber-400`}>
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/${user.avatarStyle}/svg?seed=${user.avatarSeed}`} 
                alt="Avatar" 
                className={`rounded-[2rem] w-full h-full object-cover shadow-inner ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}
              />
            </div>
            <div className={`absolute -bottom-2 -right-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white w-12 h-12 rounded-2xl shadow-2xl border-[4px] flex items-center justify-center flex-col leading-none ${isDarkMode ? 'border-[#131b2b]' : 'border-white'}`}>
              <span className="text-sm font-black">{user.levelValue}</span>
              <span className="text-[7px] font-bold uppercase tracking-tighter">LVL</span>
            </div>
          </div>

          {/* Name & Title */}
          <div className="mt-7 text-center w-full">
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <h1 className={`text-2xl lg:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</h1>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-slate-500' : 'hover:bg-slate-100 text-slate-500'}`}
                  aria-label="Edit Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border ${isDarkMode ? `bg-white/5 border-white/10 ${config.text}` : `bg-slate-50 border-slate-200 ${config.text}`}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> {user.level} Rank
              </div>
            </div>

            <div className={`flex items-center justify-center gap-3 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'} mb-5`}>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
                <MapPin className="w-3.5 h-3.5 text-violet-500" /> {user.location}
              </div>
              <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></span>
              <div className="text-xs font-bold uppercase tracking-tighter text-amber-600 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-600" /> Architect Status
              </div>
            </div>

            <p className={`text-sm leading-relaxed font-medium px-2 opacity-90 italic ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              "{user.bio}"
            </p>
          </div>

          <div className="w-full mt-8 space-y-2">
            <div className="flex justify-between items-end px-1">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Next Evolution</span>
              <span className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.nextLevelExp}%</span>
            </div>
            <div className={`h-3 rounded-full border p-0.5 overflow-hidden ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-slate-200 border-slate-300'}`}>
              <div className={`h-full rounded-full bg-gradient-to-r ${config.color}`} style={{width: `${user.nextLevelExp}%`}}></div>
            </div>
          </div>

          <div className="flex w-full gap-4 mt-6">
            <div className={`flex-1 rounded-[1.8rem] p-5 border flex flex-col items-center transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:shadow-md shadow-sm'}`}>
              <Flame className="w-6 h-6 text-orange-500 mb-1.5" />
              <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.streak}</div>
              <div className={`text-[9px] uppercase font-black tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Day Streak</div>
            </div>
            <div className={`flex-1 rounded-[1.8rem] p-5 border flex flex-col items-center transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:shadow-md shadow-sm'}`}>
              <Trophy className="w-6 h-6 text-amber-500 mb-1.5" />
              <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.points.toLocaleString()}</div>
              <div className={`text-[9px] uppercase font-black tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Gantav Pts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
