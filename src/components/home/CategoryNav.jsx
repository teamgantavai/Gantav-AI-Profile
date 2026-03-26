import React from 'react';

const CategoryNav = ({ categories, activeTab, setActiveTab, isVisible, isDarkMode }) => {
  return (
    <div 
      className={`sticky top-[73px] z-40 backdrop-blur-xl py-3 px-4 flex gap-2 overflow-x-auto hide-scrollbar border-b transition-all duration-500 delay-75 ${
        isDarkMode 
          ? 'bg-[#050810]/80 border-white/5' 
          : 'bg-[#F1F5F9]/80 border-slate-200'
      } ${isVisible ? 'translate-y-0 shadow-xl' : '-translate-y-[150px]'}`}
    >
      {categories.map(tab => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
            activeTab === tab 
              ? isDarkMode 
                ? 'bg-white text-black border-transparent' 
                : 'bg-slate-900 text-white border-transparent'
              : isDarkMode 
                ? 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/10' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
