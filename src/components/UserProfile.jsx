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
    const t = setTimeout(() => setIsLoading(false), 1200);
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

      {/* Background blobs — fixed & GPU-composited, no repaints */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full gpu ${isDarkMode ? 'bg-violet-600/8' : 'bg-violet-600/12'}`}
          style={{ filter: 'blur(80px)' }} />
        <div className={`absolute top-1/2 -left-24 w-64 h-64 rounded-full gpu ${isDarkMode ? 'bg-blue-600/6' : 'bg-blue-600/10'}`}
          style={{ filter: 'blur(70px)' }} />
      </div>

      {/* Sticky Header */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Network Alert */}
      {!isOnline && (
        <div className="fixed top-20 left-0 right-0 z-[55] px-6 pointer-events-none">
          <div className={`max-w-sm mx-auto border rounded-[2rem] p-5 shadow-2xl transition-all gpu ${isDarkMode ? 'bg-[#0e0a1c]/95 border-rose-500/20 shadow-rose-900/30' : 'bg-rose-50/95 border-rose-200'}`}
            style={{ backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/20 flex items-center justify-center shrink-0">
                <WifiOff className="w-5 h-5 text-rose-500 animate-pulse" />
              </div>
              <div>
                <div className={`text-xs font-black uppercase tracking-[0.18em] ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>Network Offline</div>
                <div className={`text-[10px] font-bold mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Check your connection</div>
              </div>
            </div>
            {/* Sweep progress bar */}
            <div className={`h-1 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-rose-500/10'}`}>
              <div className="h-full w-1/3 bg-rose-500 rounded-full sweep" />
            </div>
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
