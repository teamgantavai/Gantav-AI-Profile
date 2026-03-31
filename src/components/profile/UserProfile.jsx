import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import Header from './Header';
import ProfileCard from './ProfileCard';
import GoalIntelligence from './GoalIntelligence';
import VerifiedCredentials from './VerifiedCredentials';
import Navigation from './Navigation';
import EditProfileModal from './EditProfileModal';
import SkeletonLoader from './SkeletonLoader';

const UserProfile = ({ activeBottomTab, setActiveBottomTab, isDarkMode, setIsDarkMode, clerkUser, forceEditModal = false, onProfileSetup }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(forceEditModal || false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // profile, courses, goals, leaderboard
  const [isSaving, setIsSaving] = useState(false);

  // Initialize user with Google data if available
  const getInitialUserData = () => {
    const googleName = clerkUser?.firstName && clerkUser?.lastName
      ? `${clerkUser.firstName} ${clerkUser.lastName}`
      : clerkUser?.firstName
        ? clerkUser.firstName
        : "User";

    return {
      name: googleName,
      bio: "Building my future with AI learning at Gantav.",
      destination: "",
      level: "Beginner",
      streak: 0,
      points: 0,
      progress: 0,
      location: "",
      avatarSeed: googleName,
      avatarStyle: "avataaars",
      avatar: clerkUser?.imageUrl || null,
      socials: {
        github: "",
        linkedin: "",
        x: "",
        discord: "",
        instagram: ""
      },
      activity: [
        { id: 1, type: 'course', title: 'Welcome to Gantav', status: 'in-progress', date: 'Today' }
      ],
      certificates: []
    };
  };

  // Simulate initial load — 1.2s shimmer then reveal content
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [user, setUser] = useState(getInitialUserData());

  // Compute level and EXP from points
  const pointsPerLevel = 500;
  const levelValue = Math.floor(user.points / pointsPerLevel) + 1;
  const nextLevelExp = Math.floor((user.points % pointsPerLevel) / pointsPerLevel * 100);

  const userWithComputedData = { ...user, levelValue, nextLevelExp };

  const [editForm, setEditForm] = useState(getInitialUserData());

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    setUser({ ...editForm });
    setIsEditModalOpen(false);
    setIsSaving(false);

    // Notify parent that profile setup is complete
    if (forceEditModal && onProfileSetup) {
      onProfileSetup();
    }
  };

  const getStatusConfig = () => {
    switch (user.level) {
      case 'Professional': return { color: 'from-violet-500 to-fuchsia-500', text: isDarkMode ? 'text-violet-400' : 'text-violet-700' };
      case 'Intermediate': return { color: 'from-amber-400 to-orange-500', text: isDarkMode ? 'text-amber-400' : 'text-amber-700' };
      default: return { color: 'from-emerald-400 to-teal-500', text: isDarkMode ? 'text-emerald-400' : 'text-emerald-700' };
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
        <div className={`grid grid-cols-1 ${activeTab === 'profile' ? 'lg:grid-cols-5' : 'lg:grid-cols-1'} gap-6 xl:gap-8 items-start`}>
          {activeTab === 'profile' && (
            <ProfileCard
              user={userWithComputedData}
              isDarkMode={isDarkMode}
              setIsEditModalOpen={setIsEditModalOpen}
              config={config}
            />
          )}
          <div className={`${activeTab === 'profile' ? 'lg:col-span-3' : 'max-w-4xl mx-auto w-full'} flex flex-col gap-6`}>
            {activeTab === 'profile' && (
              <>
                <GoalIntelligence user={userWithComputedData} isDarkMode={isDarkMode} />
                <div className={`p-8 rounded-[2.5rem] border backdrop-blur-3xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xl font-black mb-6">Execution Log / History</h3>
                  <div className="space-y-4">
                    {user.activity.map(act => (
                      <div key={act.id} className={`flex items-center justify-between p-4 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>
                            {act.type === 'course' ? '📚' : act.type === 'goal' ? '🎯' : '📝'}
                          </div>
                          <div>
                            <div className="text-sm font-black">{act.title}</div>
                            <div className="text-[10px] opacity-60 uppercase font-bold tracking-widest">{act.date} • {act.type}</div>
                          </div>
                        </div>
                        <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${act.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                          {act.status || `${act.score}%`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <VerifiedCredentials user={userWithComputedData} isDarkMode={isDarkMode} />
              </>
            )}
            {activeTab !== 'profile' && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <div className="w-20 h-20 rounded-3xl bg-violet-500/10 flex items-center justify-center mb-6">
                  <span className="text-4xl text-violet-500">🚧</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{activeTab} module</h3>
                <p className="text-sm font-bold">This section is currently being architected.</p>
                <button onClick={() => setActiveTab('profile')} className="mt-6 text-violet-500 font-black text-xs uppercase tracking-widest">Return to Profile</button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Navigation isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} user={userWithComputedData} setActiveBottomTab={setActiveBottomTab} />

      {isEditModalOpen && (
        <EditProfileModal
          isDarkMode={isDarkMode}
          setIsEditModalOpen={setIsEditModalOpen}
          editForm={editForm}
          setEditForm={setEditForm}
          handleSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default UserProfile;
