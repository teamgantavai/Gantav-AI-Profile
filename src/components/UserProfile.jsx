import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import Header from './Header';
import ProfileCard from './ProfileCard';
import GoalIntelligence from './GoalIntelligence';
import VerifiedCredentials from './VerifiedCredentials';
import Navigation from './Navigation';
import EditProfileModal from './EditProfileModal';
import SkeletonLoader from './SkeletonLoader';

const UserProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load — 1.2s shimmer then reveal content
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online',  handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [user, setUser] = useState({
    name: "Aryan Sharma",
    bio: "Building the future of AI-driven education. Currently mastering Neural Architectures.",
    destination: "Senior AI Engineer at Google",
    level: "Intermediate",
    streak: 12,
    points: 4850,
    progress: 68,
    levelValue: 42,
    location: "New Delhi, IN",
    nextLevelExp: 75,
    avatarSeed: "Aryan",
    avatarStyle: "avataaars",
    avatar: null,
    certificates: [
      { id: 1, name: "Neural Networks & Deep Learning", issuer: "Gantav x DeepLearning.AI", date: "Aug 2025" },
      { id: 2, name: "Advanced React Patterns",        issuer: "Gantav AI Academy",       date: "June 2025" }
    ]
  });

  const [editForm, setEditForm] = useState({ ...user });

  const handleSave = () => {
    setUser({ ...editForm });
    setIsEditModalOpen(false);
  };

  const getStatusConfig = () => {
    switch (user.level) {
      case 'Professional': return { color: 'from-violet-500 to-fuchsia-500', text: isDarkMode ? 'text-violet-400' : 'text-violet-700' };
      case 'Intermediate': return { color: 'from-amber-400 to-orange-500',   text: isDarkMode ? 'text-amber-400'  : 'text-amber-700'  };
      default:             return { color: 'from-emerald-400 to-teal-500',   text: isDarkMode ? 'text-emerald-400': 'text-emerald-700'};
    }
  };
  const config = getStatusConfig();

  // Show shimmer skeleton while loading
  if (isLoading) return <SkeletonLoader isDarkMode={isDarkMode} />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#070B16] text-slate-200' : 'bg-[#F1F5F9] text-slate-900'} font-['Sora','sans-serif'] selection:bg-violet-500/30`}>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full gpu ${isDarkMode ? 'bg-violet-600/5' : 'bg-violet-600/8'}`}
          style={{ filter: 'blur(50px)' }} />
        <div className={`absolute top-1/2 -left-24 w-64 h-64 rounded-full gpu ${isDarkMode ? 'bg-blue-600/4' : 'bg-blue-600/6'}`}
          style={{ filter: 'blur(40px)' }} />
      </div>

      {/* Sticky Header */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Network Alert (Small bottom toast) */}
      {!isOnline && (
        <div className="fixed bottom-6 left-6 right-6 z-[60] sm:max-w-xs sm:left-auto pointer-events-none animate-in fade-in slide-in-from-bottom-5">
          <div className={`px-4 py-3 rounded-2xl border flex items-center gap-3 shadow-xl backdrop-blur-md transition-all ${isDarkMode ? 'bg-[#0e0a1c]/90 border-rose-500/20 shadow-rose-900/40 text-rose-100' : 'bg-rose-50/95 border-rose-200 text-rose-900'}`}>
            <WifiOff className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-xs font-bold tracking-tight">Offline. Progress may not save.</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:gap-8 items-start">
          <ProfileCard
            user={user}
            isDarkMode={isDarkMode}
            setIsEditModalOpen={setIsEditModalOpen}
            config={config}
          />
          <div className="lg:col-span-3 flex flex-col gap-6">
            <GoalIntelligence user={user} isDarkMode={isDarkMode} />
            <VerifiedCredentials user={user} isDarkMode={isDarkMode} />
          </div>
        </div>
      </main>

      <Navigation isDarkMode={isDarkMode} />

      {isEditModalOpen && (
        <EditProfileModal
          isDarkMode={isDarkMode}
          setIsEditModalOpen={setIsEditModalOpen}
          editForm={editForm}
          setEditForm={setEditForm}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserProfile;
