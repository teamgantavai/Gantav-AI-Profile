import React from 'react';
import { Sun, Moon, Share2 } from 'lucide-react';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Gantav AI Profile',
          text: 'Check out my AI learning profile on Gantav!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <header className={`sticky top-0 z-[60] w-full border-b transition-colors duration-500 ${isDarkMode ? 'bg-[#070B16]/80 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'} backdrop-blur-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className={`absolute -inset-1.5 rounded-xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100 ${isDarkMode ? 'bg-violet-500/20' : 'bg-violet-500/10'}`}></div>
            <img 
              src="/logo.png" 
              alt="Gantav AI Logo" 
              className="w-10 h-10 object-contain rounded-xl relative transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <div className={`font-[900] tracking-tight text-xl leading-none flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Gantav <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">AI</span>
            </div>
            <div className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} uppercase font-black tracking-[0.2em] mt-1 flex items-center gap-2`}>
              <span className="w-1.5 h-[1.5px] bg-violet-500/50"></span>
              Learning OS
              <span className="w-1.5 h-[1.5px] bg-violet-500/50"></span>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button 
            onClick={handleShare}
            className={`p-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`} 
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
