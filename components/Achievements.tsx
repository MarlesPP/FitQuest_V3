import React from 'react';
import { UserProfile } from '../types';
import { TrophyIcon } from './icons/StatIcons';
import { PinIcon } from './icons/ExtraIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface AchievementsProps {
    userProfile: UserProfile;
    toggleShowcase: (achievementId: string) => void;
}

const AchievementCard: React.FC<{
    achievement: any; // Using 'any' because it's coming from a dynamic context
    isUnlocked: boolean;
    isPinned: boolean;
    canPin: boolean;
    onPin: () => void;
    t: (key: string) => string;
}> = ({ achievement, isUnlocked, isPinned, canPin, onPin, t }) => {
    const { theme } = useTheme();
    return (
        <div className={`relative flex items-center p-4 rounded-lg border transition-all duration-300 ${isUnlocked ? `bg-gray-800 ${theme === 'yellow' ? 'border-yellow-500/50' : 'border-cyan-500/50'} enchanted-glow` : 'bg-gray-800/50 border-gray-700'}`}>
            <div className={`flex-shrink-0 mr-4 ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                <achievement.icon className={`w-12 h-12 ${isUnlocked ? (theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400') : 'text-gray-500'}`} />
            </div>
            <div className="pr-10">
                <h3 className={`font-orbitron font-bold text-lg ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{achievement.title}</h3>
                <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                    {isUnlocked ? achievement.unlockedDescription : achievement.lockedDescription}
                </p>
            </div>
            {isUnlocked && (
                <button
                    onClick={onPin}
                    disabled={!canPin && !isPinned}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                        isPinned 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                    title={isPinned ? t('achievements.unpin') : (canPin ? t('achievements.pin') : t('achievements.showcaseFull'))}
                >
                    <PinIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};


const Achievements: React.FC<AchievementsProps> = ({ userProfile, toggleShowcase }) => {
    const { t, ACHIEVEMENTS } = useLanguage();
    const { theme } = useTheme();
    const canPinMore = userProfile.showcasedAchievements.length < 3;

    return (
        <div className="p-4 text-white animate-fade-in">
            <div className="text-center mb-8">
                 <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                <h2 className={`text-3xl font-orbitron font-bold ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('achievements.title')}</h2>
                <p className="text-gray-400">{t('achievements.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map(ach => {
                    const isUnlocked = userProfile.unlockedAchievements.includes(ach.id);
                    const isPinned = userProfile.showcasedAchievements.includes(ach.id);
                    return (
                        <AchievementCard 
                            key={ach.id} 
                            achievement={ach} 
                            isUnlocked={isUnlocked}
                            isPinned={isPinned}
                            canPin={canPinMore}
                            onPin={() => toggleShowcase(ach.id)}
                            t={t}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;