import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

const VerifiedCredentials = ({ user, isDarkMode }) => {
  return (
    <section className={`border rounded-[2.5rem] p-8 shadow-2xl transition-colors ${isDarkMode ? 'bg-[#0D1625]/60 border-white/10' : 'bg-white border-slate-200 shadow-slate-200/30'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Verified Credentials</h2>
        <button className="text-[10px] font-bold text-violet-600">View All</button>
      </div>
      
      <div className="space-y-3">
        {user.certificates.map((cert) => (
          <div key={cert.id} className={`border rounded-[1.8rem] p-5 flex items-center gap-5 transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-violet-500/30' : 'bg-slate-50 border-slate-200 hover:border-violet-500/40 hover:shadow-md shadow-sm'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}>
              <Award className="w-7 h-7 text-violet-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-black truncate leading-tight uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cert.name}</div>
              <div className={`text-[10px] mt-1 font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>{cert.issuer} • {cert.date}</div>
            </div>
            <button className={`p-3 rounded-2xl border transition-colors shrink-0 ${isDarkMode ? 'bg-slate-900 border-white/5 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VerifiedCredentials;
