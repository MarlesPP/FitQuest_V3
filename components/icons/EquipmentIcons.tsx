
import React from 'react';

export const ChairIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 9v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
    <path d="M4 9h16"/>
    <path d="M15 9V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
    <path d="M6 19v2"/>
    <path d="M18 19v2"/>
  </svg>
);

export const WallIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10h10V2z"/>
    <path d="M22 12h-10v10h10V12z"/>
    <path d="M12 12H2v10h10V12z"/>
    <path d="M22 2h-10v10h10V2z"/>
  </svg>
);

export const BedIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16"/>
    <path d="M2 12h18a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2"/>
    <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
  </svg>
);

export const TableIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
    <path d="M2 10h20"/>
    <path d="M6 19v-9"/>
    <path d="M18 19v-9"/>
  </svg>
);

export const BackpackIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
    <path d="M10 21v-4a2 2 0 1 1 4 0v4"/>
    <path d="M8 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"/>
    <path d="M8 8h8"/>
  </svg>
);
