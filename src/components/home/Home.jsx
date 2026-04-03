import React, { useState, useEffect } from 'react';
import CategoryNav from './CategoryNav';
import DailyTasks from './DailyTasks';
import HeroSection from './HeroSection';
import MentorsSection from './MentorsSection';
import RecommendedPaths from './RecommendedPaths';
import ShortsSection from './ShortsSection';
import TrendingFeed from './TrendingFeed';

const Home = ({ activeBottomTab, setActiveBottomTab, isDarkMode, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [followedMentors, setFollowedMentors] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [xp, setXp] = useState(1240);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleFollow = (name) => {
    setFollowedMentors(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const categories = ['All', 'AI ML', 'Web Dev', 'Python', 'DSA', 'System Design', 'Open Source'];

  return (
    <div className={`min-h-screen font-sans pt-24 pb-32 selection:bg-violet-500/30 transition-colors duration-500 ${
      isDarkMode ? 'bg-[#050810] text-white' : 'bg-[#F1F5F9] text-slate-900'
    }`}>
      <CategoryNav 
        categories={categories} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isVisible={isVisible}
        isDarkMode={isDarkMode}
      />

      <div className="max-w-screen-md mx-auto">
        <DailyTasks xp={xp} isDarkMode={isDarkMode} />
        <HeroSection isDarkMode={isDarkMode} />
        <MentorsSection 
          followedMentors={followedMentors} 
          toggleFollow={toggleFollow}
          isDarkMode={isDarkMode}
        />
        <RecommendedPaths isDarkMode={isDarkMode} />
        <ShortsSection isDarkMode={isDarkMode} />
        <TrendingFeed isDarkMode={isDarkMode} />
      </div>



      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Home;
