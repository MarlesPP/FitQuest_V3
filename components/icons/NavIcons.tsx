import React from 'react';

export const WorkoutIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.4 14.4 9.6 9.6"/><path d="M18 12h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/><path d="M6 12H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2"/><path d="M12 18V6"/><path d="M12 6h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4"/><path d="M12 6H8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4"/>
    </svg>
);

export const ProfileIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const ShopIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const AchievementsIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const RPGIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-12H4m16 8H4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 3l-6 6-3-3-6 6" />
    </svg>
);