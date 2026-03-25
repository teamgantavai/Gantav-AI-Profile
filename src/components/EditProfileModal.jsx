import React from 'react';
import { X, Camera, RefreshCw, Save } from 'lucide-react';

const EditProfileModal = ({ isDarkMode, setIsEditModalOpen, editForm, setEditForm, handleSave }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-950/60 backdrop-blur-sm">
      <div className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-[3rem] sm:rounded-[3rem] p-8 border shadow-2xl ${isDarkMode ? 'bg-[#0D1625] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black">Edit Profile</h3>
          <button onClick={() => setIsEditModalOpen(false)} className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/5 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className={`w-28 h-28 rounded-[2.2rem] border-[3px] p-1.5 ${isDarkMode ? 'bg-slate-900 border-violet-500/30' : 'bg-slate-50 border-violet-500/20'}`}>
                <img 
                  src={`https://api.dicebear.com/7.x/${editForm.avatarStyle}/svg?seed=${editForm.avatarSeed}`} 
                  alt="Preview" 
                  className={`rounded-[1.6rem] w-full h-full object-cover ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-[2.2rem]">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex gap-2 p-1 rounded-2xl bg-slate-500/10 border border-slate-500/10">
                {['avataaars', 'bottts', 'adventurer'].map(style => (
                  <button 
                    key={style}
                    onClick={() => setEditForm({...editForm, avatarStyle: style})}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${editForm.avatarStyle === style ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-500/10'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setEditForm({...editForm, avatarSeed: Math.random().toString(36).substring(7)})}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-colors ${isDarkMode ? 'text-violet-400 hover:bg-violet-400/10' : 'text-violet-600 hover:bg-violet-600/10'}`}
              >
                <RefreshCw className="w-3.5 h-3.5" /> Randomize Persona
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Full Name</label>
              <input 
                type="text" 
                value={editForm.name} 
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className={`w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Bio</label>
              <textarea 
                rows="3"
                value={editForm.bio} 
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                className={`w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Career Goal</label>
              <input 
                type="text" 
                value={editForm.destination} 
                onChange={(e) => setEditForm({...editForm, destination: e.target.value})}
                className={`w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
              />
            </div>

            <button 
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-violet-900/40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
