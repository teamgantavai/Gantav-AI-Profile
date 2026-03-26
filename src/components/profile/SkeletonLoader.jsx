import React from 'react';

const SkeletonBlock = ({ className, isDarkMode }) => (
  <div
    className={`rounded-2xl ${isDarkMode ? 'bg-white/5 shimmer' : 'bg-slate-200 shimmer-light'} ${className}`}
  />
);

const SkeletonLoader = ({ isDarkMode }) => {
  const dark = isDarkMode;

  return (
    <div className={`min-h-screen ${dark ? 'bg-[#070B16]' : 'bg-[#F1F5F9]'} font-['Sora','sans-serif']`}>

      {/* Header skeleton */}
      <div className={`sticky top-0 z-[60] w-full border-b ${dark ? 'bg-[#070B16]/80 border-white/5' : 'bg-white/90 border-slate-200'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SkeletonBlock isDarkMode={dark} className="w-10 h-10 !rounded-xl" />
            <div className="space-y-1.5">
              <SkeletonBlock isDarkMode={dark} className="w-24 h-3.5" />
              <SkeletonBlock isDarkMode={dark} className="w-16 h-2.5" />
            </div>
          </div>
          <div className="flex gap-2.5">
            <SkeletonBlock isDarkMode={dark} className="w-10 h-10 !rounded-2xl" />
            <SkeletonBlock isDarkMode={dark} className="w-10 h-10 !rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Main grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:gap-8 items-start">

          {/* Profile Card skeleton */}
          <div className={`lg:col-span-2 border rounded-[2.5rem] p-8 ${dark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-col items-center">
              <SkeletonBlock isDarkMode={dark} className="w-32 h-32 lg:w-36 lg:h-36 !rounded-[2.5rem]" />
              <div className="mt-7 w-full space-y-4 flex flex-col items-center">
                <SkeletonBlock isDarkMode={dark} className="w-48 h-6" />
                <SkeletonBlock isDarkMode={dark} className="w-36 h-5 !rounded-full" />
                <SkeletonBlock isDarkMode={dark} className="w-56 h-3.5" />
                <SkeletonBlock isDarkMode={dark} className="w-full h-3 !rounded-full mt-6" />
                <div className="flex w-full gap-4 mt-2">
                  <SkeletonBlock isDarkMode={dark} className="flex-1 h-24 !rounded-[1.8rem]" />
                  <SkeletonBlock isDarkMode={dark} className="flex-1 h-24 !rounded-[1.8rem]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column skeleton */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Goal Intelligence skeleton */}
            <div className={`border rounded-[2.5rem] p-8 ${dark ? 'bg-[#0D1625]/60 border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center mb-8">
                <SkeletonBlock isDarkMode={dark} className="w-36 h-3.5" />
                <SkeletonBlock isDarkMode={dark} className="w-24 h-8 !rounded-2xl" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <SkeletonBlock isDarkMode={dark} className="w-48 h-48 !rounded-full shrink-0" />
                <div className="flex-1 w-full space-y-4">
                  <SkeletonBlock isDarkMode={dark} className="w-56 h-6" />
                  <SkeletonBlock isDarkMode={dark} className="w-72 h-3.5" />
                  <SkeletonBlock isDarkMode={dark} className="w-full h-16 !rounded-[1.5rem]" />
                  <SkeletonBlock isDarkMode={dark} className="w-full h-16 !rounded-[1.5rem]" />
                </div>
              </div>
            </div>

            {/* Credentials skeleton */}
            <div className={`border rounded-[2.5rem] p-8 ${dark ? 'bg-[#0D1625]/60 border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <SkeletonBlock isDarkMode={dark} className="w-40 h-3.5" />
                <SkeletonBlock isDarkMode={dark} className="w-16 h-3.5" />
              </div>
              <div className="space-y-3">
                {[0, 1].map(i => (
                  <div key={i} className={`border rounded-[1.8rem] p-5 flex items-center gap-5 ${dark ? 'border-white/5' : 'border-slate-200'}`}>
                    <SkeletonBlock isDarkMode={dark} className="w-14 h-14 !rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <SkeletonBlock isDarkMode={dark} className="w-3/4 h-3.5" />
                      <SkeletonBlock isDarkMode={dark} className="w-1/2 h-3" />
                    </div>
                    <SkeletonBlock isDarkMode={dark} className="w-10 h-10 !rounded-2xl shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
