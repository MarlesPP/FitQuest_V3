import React from 'react';

interface AvatarDisplayProps {
    gender: 'male' | 'female' | null;
    level: number;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ gender, level }) => {
    // Simple avatar logic: emoji changes based on level
    const getAvatarEmoji = () => {
        if (level < 5) return gender === 'male' ? '👨' : '👩';
        if (level < 10) return gender === 'male' ? '🧑‍🚀' : '👩‍🚀';
        return gender === 'male' ? '🦸‍♂️' : '🦸‍♀️';
    };

    return (
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-700 border-4 border-cyan-500">
            <span className="text-7xl">{getAvatarEmoji()}</span>
        </div>
    );
};

export default AvatarDisplay;
