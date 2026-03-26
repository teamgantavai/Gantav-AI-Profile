import React, { useRef, useEffect } from 'react';

const ProgressRing = ({ isDarkMode, size = 200, stroke = 11, percentage = 68 }) => {
  const gap = 12;
  const rOuter = (size - stroke) / 2;
  const rMid   = rOuter - stroke - gap;
  const rInner = rMid   - stroke - gap;
  const circ   = (r) => 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center">
      {/* Removed expensive blur div — replaced with a simple SVG glow filter */}
      <div className="relative flex items-center justify-center gpu">
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="gViolet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#C026D3" />
            </linearGradient>
            <linearGradient id="gAmber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <radialGradient id="gSphere" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%"   stopColor={isDarkMode ? '#FEF3C7' : '#FFFBEB'} />
              <stop offset="40%"  stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </radialGradient>
            {/* Lightweight SVG glow instead of DOM blur */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Track rings */}
          {[rInner, rMid, rOuter].map((r, i) => (
            <circle
              key={i}
              cx={size / 2} cy={size / 2} r={r}
              stroke={isDarkMode ? '#1A2744' : '#CBD5E1'}
              strokeWidth={stroke}
              fill="transparent"
              opacity={isDarkMode ? 0.3 : 0.5}
            />
          ))}

          {/* Progress arcs */}
          <circle cx={size/2} cy={size/2} r={rInner}
            stroke="#34D399" strokeWidth={stroke} fill="transparent"
            strokeDasharray={circ(rInner)} strokeDashoffset={0}
            strokeLinecap="round" filter="url(#glow)"
          />
          <circle cx={size/2} cy={size/2} r={rMid}
            stroke="url(#gAmber)" strokeWidth={stroke} fill="transparent"
            strokeDasharray={circ(rMid)} strokeDashoffset={circ(rMid) * 0.4}
            strokeLinecap="round"
          />
          <circle cx={size/2} cy={size/2} r={rOuter}
            stroke="url(#gViolet)" strokeWidth={stroke} fill="transparent"
            strokeDasharray={circ(rOuter)}
            strokeDashoffset={circ(rOuter) - (percentage / 100) * circ(rOuter)}
            strokeLinecap="round" filter="url(#glow)"
          />
          <circle cx={size/2} cy={size/2} r="7" fill="url(#gSphere)" />
        </svg>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <span className={`text-5xl font-['Times_New_Roman',serif] italic font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {percentage}%
        </span>
        <span className={`text-[10px] uppercase tracking-[0.6em] font-black mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          Gantavya
        </span>
      </div>
    </div>
  );
};

export default ProgressRing;
