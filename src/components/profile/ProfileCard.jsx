import React from 'react';
import { Edit3, MapPin, Star, Flame, Trophy, CheckCircle2, AtSign } from 'lucide-react';

// Social icon paths
const SOCIALS = [
  {
    id: 'github', label: 'GitHub',
    href: (v) => `https://github.com/${v}`,
    vb: '0 0 24 24',
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    hoverColor: 'hover:text-[#333] dark:hover:text-white',
  },
  {
    id: 'linkedin', label: 'LinkedIn',
    href: (v) => `https://linkedin.com/in/${v}`,
    vb: '0 0 24 24',
    d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    hoverColor: 'hover:text-[#0a66c2]',
  },
  {
    id: 'x', label: 'X',
    href: (v) => `https://x.com/${v}`,
    vb: '0 0 24 24',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
    hoverColor: 'hover:text-black dark:hover:text-white',
  },
  {
    id: 'discord', label: 'Discord',
    href: (v) => `https://discord.com/users/${v}`,
    vb: '0 0 24 24',
    d: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z',
    hoverColor: 'hover:text-[#5865F2]',
  },
  {
    id: 'instagram', label: 'Instagram',
    href: (v) => `https://instagram.com/${v}`,
    vb: '0 0 24 24',
    d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    hoverColor: 'hover:text-[#E4405F]',
  },
];

const ProfileCard = ({ user, isDarkMode, setIsEditModalOpen, config }) => {
  const d = isDarkMode;

  // Only show social icons that have a value
  const activeSocials = SOCIALS.filter(s => user?.socials?.[s.id]?.trim());

  return (
    <section className="lg:col-span-2 relative group w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent rounded-[3rem] blur-xl opacity-40 pointer-events-none" />
      <div className={`relative backdrop-blur-3xl border rounded-[2.5rem] p-6 sm:p-8 shadow-2xl transition-all ${d ? 'bg-gradient-to-b from-white/5 to-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
        <div className="flex flex-col items-center">

          {/* Avatar */}
          <div className="relative mb-6">
            <div className={`w-32 h-32 lg:w-36 lg:h-36 rounded-[2.5rem] border-[3px] p-2 transition-transform duration-700 hover:rotate-3 ${d ? 'bg-slate-900/80' : 'bg-slate-100'} border-amber-400`}>
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/${user.avatarStyle}/svg?seed=${user.avatarSeed}`}
                alt="Avatar"
                className={`rounded-[2rem] w-full h-full object-cover ${d ? 'bg-slate-800' : 'bg-slate-200'}`}
              />
            </div>
            <div className={`absolute -bottom-2 -right-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white w-12 h-12 rounded-2xl shadow-2xl border-[4px] flex items-center justify-center flex-col leading-none ${d ? 'border-[#0D1625]' : 'border-white'}`}>
              <span className="text-sm font-black">{user.levelValue}</span>
              <span className="text-[7px] font-bold uppercase tracking-tighter">LVL</span>
            </div>
          </div>

          {/* Name & rank */}
          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className={`text-2xl lg:text-3xl font-black tracking-tight ${d ? 'text-white' : 'text-slate-900'}`}>
                {user.name || 'New Learner'}
              </h1>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className={`p-1.5 rounded-lg transition-colors ${d ? 'hover:bg-white/10 text-slate-500' : 'hover:bg-slate-100 text-slate-500'}`}
              >
                <Edit3 size={16} />
              </button>
            </div>

            {/* Username */}
            {user.username && (
              <div className={`flex items-center justify-center gap-1 mb-3 ${d ? 'text-violet-400' : 'text-violet-600'}`}>
                <AtSign size={13} />
                <span className="text-sm font-bold tracking-tight">{user.username}</span>
              </div>
            )}

            {/* Rank badge */}
            <div className={`inline-flex px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest items-center gap-1.5 border mb-4 ${d ? `bg-white/5 border-white/10 ${config.text}` : `bg-slate-50 border-slate-200 ${config.text}`}`}>
              <CheckCircle2 size={13} /> {user.level} Rank
            </div>

            {/* Location & star */}
            <div className={`flex items-center justify-center gap-3 mb-4 ${d ? 'text-slate-500' : 'text-slate-500'}`}>
              {user.location && (
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <MapPin size={13} className="text-violet-500" /> {user.location}
                </div>
              )}
              {user.location && (
                <span className={`w-1 h-1 rounded-full ${d ? 'bg-slate-700' : 'bg-slate-300'}`} />
              )}
              <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Star size={13} className="fill-amber-500 stroke-amber-600" /> Architect
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className={`text-sm leading-relaxed font-medium px-2 italic mb-5 ${d ? 'text-slate-300' : 'text-slate-700'}`}>
                "{user.bio}"
              </p>
            )}

            {/* Social icons — only visible ones */}
            {activeSocials.length > 0 && (
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                {activeSocials.map(site => (
                  <a
                    key={site.id}
                    href={site.href(user.socials[site.id])}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={site.label}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border hover:scale-110 ${d ? 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm'} ${site.hoverColor}`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox={site.vb}>
                      <path d={site.d} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Course Progress */}
          <div className="w-full space-y-2 mb-6">
            <div className="flex justify-between items-end px-1">
              <span className={`text-[10px] font-black uppercase tracking-widest ${d ? 'text-slate-500' : 'text-slate-600'}`}>Course Progression</span>
              <span className={`text-xs font-black ${d ? 'text-white' : 'text-slate-900'}`}>{user.courseProgression || 0}%</span>
            </div>
            <div className={`h-2.5 rounded-full border p-0.5 overflow-hidden ${d ? 'bg-slate-900/50 border-white/5' : 'bg-slate-200 border-slate-300'}`}>
              <div
                className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${config.color}`}
                style={{ width: `${Math.max(user.courseProgression || 0, 0)}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex w-full gap-3">
            <div className={`flex-1 rounded-[1.5rem] p-4 border flex flex-col items-center transition-all ${d ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
              <Flame size={22} className="text-orange-500 mb-1" />
              <div className={`text-2xl font-black ${d ? 'text-white' : 'text-slate-900'}`}>{user.streak}</div>
              <div className={`text-[9px] uppercase font-black tracking-widest ${d ? 'text-slate-500' : 'text-slate-500'}`}>Streak</div>
            </div>
            <div className={`flex-1 rounded-[1.5rem] p-4 border flex flex-col items-center transition-all ${d ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
              <Trophy size={22} className="text-amber-500 mb-1" />
              <div className={`text-2xl font-black ${d ? 'text-white' : 'text-slate-900'}`}>{user.points.toLocaleString()}</div>
              <div className={`text-[9px] uppercase font-black tracking-widest ${d ? 'text-slate-500' : 'text-slate-500'}`}>Points</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;