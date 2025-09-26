import React from 'react';
import { UserProfile, MainView } from '../types';
import { LevelIcon, StreakIcon, TrophyIcon, GoldIcon } from './icons/StatIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
    userProfile: UserProfile;
    activeView: MainView;
}

const StatBox: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => {
    const { theme } = useTheme();
    return (
        <div className="flex items-center space-x-1.5 bg-gray-800/70 p-1.5 rounded-md border border-gray-700">
            <div className={theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}>{icon}</div>
            <div>
                <p className="text-[10px] leading-tight text-gray-400">{label}</p>
                <p className="font-orbitron text-sm font-bold text-white">{value}</p>
            </div>
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ userProfile, activeView }) => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const xpPercentage = (userProfile.xp / userProfile.xpToNextLevel) * 100;

    return (
        <header className="fixed top-0 left-0 md:left-24 right-0 bg-gray-900/50 backdrop-blur-md border-b border-gray-700/50 p-2 shadow-lg z-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                {activeView === 'WORKOUT' && (
                    <div className="text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl font-black font-orbitron text-white tracking-wider">
                            FitQuest <span className={theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}>RPG</span>
                        </h1>
                    </div>
                )}
                
                <div className={`w-full ${activeView === 'WORKOUT' ? 'sm:w-auto' : 'sm:w-full'} grid grid-cols-2 sm:grid-cols-4 gap-1.5`}>
                     <StatBox icon={<LevelIcon className="w-4 h-4"/>} label={t('header.level')} value={userProfile.level} />
                     <StatBox icon={<TrophyIcon className="w-4 h-4"/>} label={t('header.quests')} value={userProfile.workoutsCompleted} />
                     <StatBox icon={<StreakIcon className="w-4 h-4"/>} label={t('header.streak')} value={`${userProfile.streak} D`} />
                     <StatBox icon={<GoldIcon className="w-4 h-4"/>} label={t('header.gold')} value={userProfile.gold} />
                </div>
            </div>
            <div className="mt-1.5">
                <div className="flex justify-between items-center mb-0.5 text-xs font-bold">
                    <span className={`font-orbitron ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>XP</span>
                    <span className="text-gray-300">{userProfile.xp} / {userProfile.xpToNextLevel}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 border border-gray-600">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${theme === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                        style={{ width: `${xpPercentage}%` }}
                    ></div>
                </div>
            </div>
        </header>
    );
};

export default Header;