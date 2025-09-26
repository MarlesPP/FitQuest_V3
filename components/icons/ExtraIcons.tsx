import React from 'react';

export const LockClosedIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const MinusIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const PinIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 3.01V11c0 1.1-.9 2-2 2H9.52l-1.29 1.29c-.19.19-.19.51 0 .71l4.57 4.57c.19.19.51.19.71 0l4.24-4.24c.2-.2.2-.51 0-.71l-1.06-1.06V3.01c0-.55-.45-1-1-1s-1 .45-1 1zm-2 0H8c-.55 0-1 .45-1 1V11c0 .55.45 1 1 1h4.48l1.29-1.29c.19-.19.19-.51 0-.71L9.2 4.43c-.19-.19-.51-.19-.71 0l-.71.71c-.2.2-.2.51 0 .71l1.06 1.06v1.08h.01V3.01c0-.55.45-1 1-1h4c.55 0 1 .45 1 1z" />
    </svg>
);