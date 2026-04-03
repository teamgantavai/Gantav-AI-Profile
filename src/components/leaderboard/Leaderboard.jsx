import React, { useState } from 'react';
import { 
  Trophy, Zap, Flame, Crown, Medal, Search, 
  Users, Globe, UserPlus, Info, TrendingUp, ChevronRight, Sparkles, Star
} from 'lucide-react';
import { useUser } from '../../useAuth';

// --- UTILS ---
const getLevel = (xp) => Math.floor(xp / 1000) + 1;

// --- MOCK DATA ---
const MOCK_USERS = [
  { id: 'u1', name: 'Alex Rivera', username: '@arivera', avatarSeed: 'Alex', avatarStyle: 'avataaars', xp: 14500, streak: 45, rank: 1, destination: 'Full Stack AI Architect', isFriend: true, bio: "Building the future of neural networks. 🧠" },
  { id: 'u2', name: 'Sarah Chen', username: '@schen_ai', avatarSeed: 'Sarah', avatarStyle: 'bottts', xp: 13200, streak: 32, rank: 2, destination: 'Full Stack AI Architect', isFriend: true, bio: "Coffee first, then clean code. ☕️" },
  { id: 'u3', name: 'Marcus Doe', username: '@marcusd', avatarSeed: 'Marcus', avatarStyle: 'adventurer', xp: 12850, streak: 12, rank: 3, destination: 'Full Stack AI Architect', isFriend: false, bio: "Lvl 12 Wizard in JS. 🪄" },
  { id: 'u4', name: 'Priya Sharma', username: '@priya_dev', avatarSeed: 'Priya', avatarStyle: 'avataaars', xp: 11000, streak: 28, rank: 4, destination: 'Data Scientist', isFriend: true, bio: "Data is the new oil. 📈" },
  { id: 'u5', name: 'David Kim', username: '@dkim', avatarSeed: 'David', avatarStyle: 'bottts', xp: 10500, streak: 5, rank: 5, destination: 'Full Stack AI Architect', isFriend: false, bio: "Automating everything." },
  { id: 'u6', name: 'Elena R.', username: '@elena_codes', avatarSeed: 'Elena', avatarStyle: 'adventurer', xp: 9800, streak: 14, rank: 6, destination: 'UX Engineer', isFriend: true, bio: "Pixel perfect or nothing." },
  { id: 'u7', name: 'James L.', username: '@james_l', avatarSeed: 'James', avatarStyle: 'avataaars', xp: 9100, streak: 3, rank: 7, destination: 'Full Stack AI Architect', isFriend: false, bio: "Learning every single day." },
];

const Leaderboard = ({ isDarkMode }) => {
  const { profile } = useUser();
  const [activeFilter, setActiveFilter] = useState('cohort');
  const [searchQuery, setSearchQuery] = useState('');

  const d = isDarkMode;

  // Real data for current user
  const me = profile ? {
    id: profile.uid,
    name: profile.name || 'You',
    username: profile.username || '@myhandle',
    avatar: profile.avatar,
    avatarSeed: profile.avatarSeed || profile.name || 'You',
    avatarStyle: profile.avatarStyle || 'avataaars',
    xp: profile.points || 8400,
    streak: profile.streak || 7,
    rank: 12, // Since actual ranking isn't implemented in the backend yet
    destination: profile.destination || 'Full Stack AI Architect',
    bio: profile.bio || "On my way to become an AI Architect! 🚀"
  } : {
    id: 'me', name: 'You', username: '@myhandle', 
    avatarSeed: 'You', avatarStyle: 'avataaars', avatar: null,
    xp: 8400, streak: 7, rank: 12, destination: 'Full Stack AI Architect',
    bio: "On my way to become an AI Architect! 🚀"
  };

  const getAvatar = (u) => {
    if (u.avatar) return u.avatar;
    return `https://api.dicebear.com/7.x/${u.avatarStyle || 'avataaars'}/svg?seed=${u.avatarSeed || 'fallback'}`;
  };

  const filteredByTab = MOCK_USERS.filter(u => {
    if (activeFilter === 'friends') return u.isFriend;
    if (activeFilter === 'cohort') return u.destination === me.destination;
    return true; 
  });

  const displayUsers = filteredByTab.filter(u => {
    const query = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(query) || u.username.toLowerCase().includes(query);
  });

  const isSearching = searchQuery.trim().length > 0;
  const topThree = isSearching ? [] : displayUsers.slice(0, 3);
  const restOfList = isSearching ? displayUsers : displayUsers.slice(3);

  return (
    <div className={`pt-24 pb-32 font-sans transition-colors duration-500 ${d ? 'bg-[#070B16]' : 'bg-[#F1F5F9]'}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="max-w-5xl mx-auto w-full space-y-8">
          
          {/* Header & Advanced Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2 rounded-xl ${d ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-100 text-amber-600'}`}>
                  <Trophy size={24} />
                </div>
                <h2 className={`text-3xl lg:text-4xl font-black tracking-tighter ${d ? 'text-white' : 'text-slate-900'}`}>
                  Arena
                </h2>
              </div>
              <p className={`text-xs font-bold ${d ? 'text-slate-500' : 'text-slate-500'}`}>
                {activeFilter === 'cohort' && "Competing with learners in your career path."}
                {activeFilter === 'friends' && "How you stack up against your network."}
                {activeFilter === 'global' && "The top 1% of the entire community."}
              </p>
            </div>

            <div className={`flex p-1 sm:p-1.5 rounded-[1.5rem] sm:rounded-3xl border shadow-xl w-full md:w-auto overflow-x-auto hide-scrollbar ${d ? 'bg-[#0D1625]/80 border-white/10' : 'bg-white border-slate-200'}`}>
              {[
                { id: 'cohort', label: 'My Cohort', icon: Users },
                { id: 'friends', label: 'Friends', icon: UserPlus },
                { id: 'global', label: 'Global', icon: Globe }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 flex-1 md:flex-none px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/40 scale-[1.02] sm:scale-105'
                      : d ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <filter.icon size={14} className="shrink-0" />
                  <span className="whitespace-nowrap">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Context Banner */}
          {!isSearching && (
            <div className={`flex items-center justify-between p-6 rounded-[2rem] border relative overflow-hidden group ${d ? 'bg-violet-500/5 border-violet-500/20' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                <TrendingUp size={120} className="text-violet-500" />
              </div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-900/20`}>
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${d ? 'text-violet-400' : 'text-violet-600'}`}>
                    Active League: {activeFilter.toUpperCase()}
                  </div>
                  <div className={`text-xl font-black ${d ? 'text-white' : 'text-slate-900'}`}>
                    {activeFilter === 'cohort' ? me.destination : activeFilter === 'friends' ? 'Your Social Circle' : 'Worldwide Elites'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Podium (Top 3) */}
          {!isSearching && topThree.length >= 3 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end pt-8 md:pt-10 pb-6 px-1.5 sm:px-0">
              <PodiumCard user={topThree[1]} rank={2} isDarkMode={d} getAvatar={getAvatar} />
              <div className="relative">
                <Crown className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 text-amber-400 fill-amber-400 w-8 h-8 sm:w-12 sm:h-12 z-10 animate-bounce" />
                <PodiumCard user={topThree[0]} rank={1} isDarkMode={d} getAvatar={getAvatar} />
              </div>
              <PodiumCard user={topThree[2]} rank={3} isDarkMode={d} getAvatar={getAvatar} />
            </div>
          )}

          {/* Main Competitor List */}
          <div className={`border rounded-[3rem] overflow-hidden shadow-2xl transition-all ${d ? 'bg-[#0D1625]/40 border-white/10 backdrop-blur-md' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
            <div className={`p-6 border-b flex items-center gap-4 ${d ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'}`}>
              <div className={`p-2.5 rounded-xl ${d ? 'bg-white/5 text-slate-400' : 'bg-white border border-slate-200 text-slate-400'}`}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search competitors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent text-base font-bold focus:outline-none ${d ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}
              />
            </div>

            <div className="flex flex-col">
              {displayUsers.length === 0 ? (
                <div className="py-24 px-4 text-center flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center mb-5 ${d ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-200'}`}>
                     <Search size={24} className={d ? 'text-slate-500' : 'text-slate-400'} />
                  </div>
                  <h4 className={`text-lg font-black mb-2 tracking-tight ${d ? 'text-white' : 'text-slate-900'}`}>No Competitors Found</h4>
                  <p className={`text-xs font-medium max-w-xs leading-relaxed ${d ? 'text-slate-500' : 'text-slate-500'}`}>
                    We couldn't track anyone currently dominating this specific league criteria.
                  </p>
                </div>
              ) : (
                <>
                  {restOfList.map((u, idx) => (
                    <ListRow key={u.id} user={u} isDarkMode={d} getAvatar={getAvatar} isLast={idx === restOfList.length - 1} />
                  ))}
                </>
              )}
            </div>

            {/* Sticky Current User Progress */}
            {!isSearching && displayUsers.length > 0 && (
              <div className={`sticky bottom-0 p-4 sm:p-5 border-t backdrop-blur-2xl flex items-center justify-between group cursor-pointer transition-all ${
                d ? 'bg-[#070B16]/95 border-white/10 hover:bg-violet-600/10' : 'bg-white/95 border-slate-200 shadow-[0_-15px_50px_rgba(0,0,0,0.1)] hover:bg-violet-50'
              }`}>
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black ${d ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'}`}>
                    #{me.rank || '-'}
                  </div>
                  <div className="relative">
                    <img src={getAvatar(me)} className={`w-14 h-14 rounded-2xl border-2 border-violet-500 object-cover ${d ? 'bg-slate-800' : 'bg-slate-100'}`} alt={me.name} />
                    <div className="absolute -bottom-1 -right-1 bg-violet-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg border-2 border-[#070B16]">
                      Lvl {getLevel(me.xp)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black ${d ? 'text-white' : 'text-slate-900'}`}>{me.name}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md bg-violet-600 text-white uppercase tracking-tighter`}>You</span>
                    </div>
                    <div className={`text-[11px] font-black flex items-center gap-1.5 mt-0.5 ${d ? 'text-violet-400' : 'text-violet-600'}`}>
                      <Flame size={12} fill="currentColor" /> {me.xp?.toLocaleString() || 0} XP
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className={`${d ? 'text-slate-600' : 'text-slate-300'}`} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const PodiumCard = ({ user, rank, isDarkMode, getAvatar }) => {
  const d = isDarkMode;
  let styles = {
    rank1: { border: d ? 'border-amber-400/40' : 'border-amber-400', rankIcon: 'from-yellow-400 to-amber-600', accent: 'text-amber-500' },
    rank2: { border: d ? 'border-slate-300/30' : 'border-slate-300', rankIcon: 'from-slate-300 to-slate-500', accent: 'text-slate-400' },
    rank3: { border: d ? 'border-orange-400/30' : 'border-orange-400', rankIcon: 'from-orange-400 to-rose-600', accent: 'text-orange-500' }
  };
  const current = rank === 1 ? styles.rank1 : rank === 2 ? styles.rank2 : styles.rank3;

  return (
    <div className={`relative flex flex-col items-center p-3 sm:p-8 rounded-[1.5rem] sm:rounded-[3.5rem] border transition-all hover:-translate-y-2 sm:hover:-translate-y-3 group ${rank === 1 ? 'scale-[1.03] sm:scale-110 shadow-xl sm:shadow-2xl z-20 bg-amber-400/5' : 'bg-white/[0.03]'} ${current.border}`}>
      <div className={`absolute -top-3 sm:-top-5 w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl border-2 sm:border-4 flex items-center justify-center z-10 bg-gradient-to-br ${current.rankIcon} border-[#070B16] shadow-lg`}>
        {rank === 1 ? <Trophy size={14} className="text-white sm:text-lg" /> : <Medal size={14} className="text-white sm:text-lg" />}
      </div>
      <div className={`relative w-14 h-14 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2rem] p-0.5 sm:p-1 border-2 mb-3 sm:mb-5 transition-transform group-hover:scale-105 duration-500 ${d ? 'bg-slate-900 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
        <img src={getAvatar(user)} alt={user.name} className={`w-full h-full object-cover rounded-[0.85rem] sm:rounded-3xl ${d ? 'bg-slate-800' : 'bg-slate-200'}`} />
        <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[0.4rem] sm:rounded-xl border-2 border-[#070B16] shadow-lg">
          Lvl {getLevel(user.xp)}
        </div>
      </div>
      <h3 className={`text-xs sm:text-lg font-black text-center truncate w-full mb-0.5 sm:mb-1 ${d ? 'text-white' : 'text-slate-900'}`}>{user.name}</h3>
      
      <p className={`hidden sm:block text-[11px] font-medium text-center mb-4 line-clamp-1 italic ${d ? 'text-slate-400' : 'text-slate-500'}`}>
        "{user.bio || 'Ready to learn!'}"
      </p>

      <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl mb-3 sm:mb-4 ${d ? 'bg-white/5' : 'bg-slate-50'}`}>
        <Flame size={12} className={`${current.accent} sm:w-3.5 sm:h-3.5`} fill="currentColor" />
        <span className={`text-[10px] sm:text-sm font-black ${d ? 'text-white' : 'text-slate-900'}`}>{user.xp.toLocaleString()}</span>
      </div>

      <button className={`w-full py-2 sm:py-3 rounded-[0.8rem] sm:rounded-[1.8rem] flex items-center justify-center gap-2 transition-all active:scale-[0.95] group/btn ${
        d ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
      }`}>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest">View Profile</span>
      </button>
    </div>
  );
};

const ListRow = ({ user, isDarkMode, getAvatar, isTop3 = false, isLast = false }) => {
  const d = isDarkMode;
  return (
    <div className={`group flex items-center justify-between p-6 transition-all ${!isLast ? 'border-b border-white/5' : ''} ${d ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'}`}>
      <div className="flex items-center gap-6 sm:gap-8">
        <div className={`w-8 text-center text-base font-black ${isTop3 ? 'text-violet-400' : 'text-slate-700'}`}>
          {user.rank}
        </div>
        <div className="flex items-center gap-5">
          <div className={`relative w-14 h-14 rounded-[1.2rem] p-0.5 border-2 transition-transform group-hover:scale-105 duration-300 ${d ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
            <img src={getAvatar(user)} alt={user.name} className={`w-full h-full object-cover rounded-[1rem] ${d ? 'bg-slate-800' : 'bg-slate-100'}`} />
            <div className={`absolute -bottom-1.5 -right-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-lg border-2 shadow-lg ${
              d ? 'bg-violet-600 border-[#0D1625] text-white' : 'bg-violet-600 border-white text-white'
            }`}>
              Lvl {getLevel(user.xp)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className={`text-base font-black ${d ? 'text-white' : 'text-slate-900'}`}>{user.name}</div>
            </div>
            <div className={`text-[11px] font-medium max-w-[200px] truncate ${d ? 'text-slate-500' : 'text-slate-400'}`}>
              {user.bio || 'Chasing goals...'}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="text-right hidden sm:block">
          <div className={`text-lg font-black tracking-tight ${d ? 'text-white' : 'text-slate-900'}`}>{user.xp.toLocaleString()}</div>
          <div className={`text-[10px] font-black uppercase tracking-widest ${d ? 'text-violet-500' : 'text-violet-600'}`}>XP Points</div>
        </div>
        <div className="flex gap-2">
          <button className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${d ? 'bg-white/5 text-slate-300 hover:bg-violet-600 hover:text-white' : 'bg-slate-50 text-slate-500 hover:bg-violet-600 hover:text-white'}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
