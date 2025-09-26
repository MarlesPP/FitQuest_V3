import React from 'react';
import { Workout, UserProfile } from '../types';
import { XP_PER_WORKOUT, GOLD_PER_WORKOUT } from '../constants';
import { MedalIcon, TrophyIcon, LevelIcon, StreakIcon, GoldIcon } from './icons/StatIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';


interface WorkoutSummaryProps {
    workout: Workout;
    userProfile: UserProfile;
    onNewWorkout: () => void;
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout, userProfile, onNewWorkout }) => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    // This is an approximation as the exact XP is calculated in the hook.
    // It's sufficient for display purposes here.
    const baseXP = XP_PER_WORKOUT[workout.level] || 100;
    const goldGained = GOLD_PER_WORKOUT[workout.level] || 10;
    const iconColor = theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
    
    return (
        <div className="text-center animate-fade-in">
            <TrophyIcon className="h-24 w-24 mx-auto text-yellow-400" />
            <h2 className={`text-4xl font-black font-orbitron mt-4 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('summary.title')}</h2>
            <p className="text-xl text-gray-300 mt-2">{t('summary.subtitle', workout.workoutName)}</p>

            <div className="mt-8 max-w-2xl mx-auto bg-gray-800/70 border border-gray-700 rounded-lg p-6">
                <h3 className="font-orbitron text-xl mb-4">{t('summary.rewardsTitle')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg">
                        <MedalIcon className={`h-8 w-8 mb-2 ${iconColor}`}/>
                        <p className="text-lg font-bold font-orbitron text-white">~{baseXP} XP</p>
                        <p className="text-xs text-gray-400">{t('summary.xpLabel')}</p>
                    </div>
                     <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg">
                        <GoldIcon className="h-8 w-8 text-yellow-400 mb-2"/>
                        <p className="text-lg font-bold font-orbitron text-white">+{goldGained} Gold</p>
                        <p className="text-xs text-gray-400">{t('summary.goldLabel')}</p>
                    </div>
                </div>

                 <h3 className="font-orbitron text-xl mt-6 mb-4">{t('summary.progressTitle')}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg">
                        <LevelIcon className={`h-8 w-8 mb-2 ${iconColor}`}/>
                        <p className="text-lg font-bold font-orbitron text-white">{t('summary.levelLabel', userProfile.level)}</p>
                        <p className="text-xs text-gray-400">{t('summary.currentLevel')}</p>
                    </div>
                     <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg">
                        <StreakIcon className="h-8 w-8 text-orange-400 mb-2"/>
                        <p className="text-lg font-bold font-orbitron text-white">{t('summary.streakLabel', userProfile.streak)}</p>
                        <p className="text-xs text-gray-400">{t('summary.keepItUp')}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <button
                    onClick={onNewWorkout}
                    className={`w-full md:w-auto px-12 py-4 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 font-orbitron tracking-wider ${theme === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                >
                    {t('summary.newQuestButton')}
                </button>
            </div>
        </div>
    );
};

export default WorkoutSummary;