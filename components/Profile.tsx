import React, { useState } from 'react';
import { UserProfile, CosmeticItem } from '../types';
import { LevelIcon, StreakIcon, TrophyIcon, GoldIcon } from './icons/StatIcons';
import { CheckIcon } from './icons/ExtraIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileProps {
    userProfile: UserProfile;
    equipItem: (item: CosmeticItem) => void;
    setRestDays: (days: number[]) => void;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => {
    const { theme } = useTheme();
    return (
        <div className="bg-gray-800/70 p-4 rounded-lg flex items-center gap-4">
            <div className={theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}>{icon}</div>
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="font-orbitron text-xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};


const Profile: React.FC<ProfileProps> = ({ userProfile, equipItem, setRestDays }) => {
    const { t, language, setLanguage, SHOP_CATEGORIES, ACHIEVEMENTS, RPG_REWARDS } = useLanguage();
    const { theme } = useTheme();
    const [isInventoryExpanded, setInventoryExpanded] = useState(false);
    
    const allCosmetics = [...SHOP_CATEGORIES.flatMap(cat => cat.items), ...RPG_REWARDS];
    const daysOfWeek = t('profile.daysOfWeekShort').split(',');

    const getCosmeticById = (id: string | null) => id ? allCosmetics.find(item => item.id === id) : null;

    const equippedBackground = getCosmeticById(userProfile.equippedBackground);
    const equippedFrame = getCosmeticById(userProfile.equippedFrame);
    const equippedAvatar = getCosmeticById(userProfile.equippedAvatar);
    
    const showcasedAchievements = userProfile.showcasedAchievements
        .map(id => ACHIEVEMENTS.find(ach => ach.id === id))
        .filter((ach): ach is NonNullable<typeof ach> => ach !== undefined);

    const ownedItems = allCosmetics.filter(item => userProfile.ownedCosmetics.includes(item.id));
    const visibleItems = isInventoryExpanded ? ownedItems : ownedItems.slice(0, 8);

    const getAvatarWithCosmetic = () => {
        if (equippedAvatar && equippedAvatar.type === 'avatar') {
            return equippedAvatar.asset;
        }
        if (userProfile.level < 5) return userProfile.gender === 'male' ? '👨' : '👩';
        if (userProfile.level < 10) return userProfile.gender === 'male' ? '🧑‍🚀' : '👩‍🚀';
        return userProfile.gender === 'male' ? '🦸‍♂️' : '🦸‍♀️';
    };
    
    const handleDayToggle = (dayIndex: number) => {
        const newRestDays = userProfile.restDays.includes(dayIndex)
            ? userProfile.restDays.filter(d => d !== dayIndex)
            : [...userProfile.restDays, dayIndex];
        setRestDays(newRestDays.sort((a, b) => a - b));
    };
    
    const gradientFrames = ['frame_monthly_current', 'frame_legend'];
    
    const renderFrame = () => {
        if (equippedFrame && gradientFrames.includes(equippedFrame.id)) {
            return (
                <div className={`relative w-40 h-40 mx-auto rounded-full p-2 ${equippedFrame.asset}`}>
                    <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-8xl">{getAvatarWithCosmetic()}</span>
                    </div>
                </div>
            );
        }
        return (
            <div className={`relative w-40 h-40 mx-auto rounded-full flex items-center justify-center bg-gray-700 border-8 transition-all duration-300 ${equippedFrame ? equippedFrame.asset : (theme === 'yellow' ? 'border-yellow-500' : 'border-cyan-500')}`}>
                <span className="text-8xl">{getAvatarWithCosmetic()}</span>
            </div>
        );
    };


    return (
        <div className="p-4 text-white animate-fade-in pb-20 md:pb-4">
            <h2 className={`text-3xl font-orbitron font-bold text-center mb-6 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('profile.title')}</h2>
            
            <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                        <div className="bg-gray-700 rounded-full p-1 flex">
                            <button 
                                onClick={() => setLanguage('es')}
                                className={`px-4 py-1 text-sm font-bold rounded-full ${language === 'es' ? (theme === 'yellow' ? 'bg-yellow-500' : 'bg-cyan-500') + ' text-white' : 'text-gray-300'}`}
                            >
                                Español
                            </button>
                            <button 
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-1 text-sm font-bold rounded-full ${language === 'en' ? (theme === 'yellow' ? 'bg-yellow-500' : 'bg-cyan-500') + ' text-white' : 'text-gray-300'}`}
                            >
                                English
                            </button>
                        </div>
                    </div>
                <div className={`relative p-4 rounded-xl transition-all duration-300 ${equippedBackground ? equippedBackground.asset : 'bg-gray-800'}`}>
                     {renderFrame()}
                    {showcasedAchievements.length > 0 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3">
                            {showcasedAchievements.map(ach => (
                                <div key={ach.id} className="bg-gray-900/60 p-1.5 rounded-full backdrop-blur-sm border border-yellow-500/50" title={ach.title}>
                                    <ach.icon className="w-6 h-6 text-yellow-400" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-center mt-4">
                     <h3 className="text-2xl font-orbitron font-bold">{userProfile.name || t('profile.defaultName', userProfile.level)}</h3>
                     <p className="text-gray-400">XP: {userProfile.xp} / {userProfile.xpToNextLevel}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <StatCard label={t('profile.questsDone')} value={userProfile.workoutsCompleted} icon={<TrophyIcon />} />
                    <StatCard label={t('profile.currentStreak')} value={t('profile.days', userProfile.streak)} icon={<StreakIcon />} />
                    <StatCard label={t('profile.totalGold')} value={userProfile.gold} icon={<GoldIcon />} />
                    <StatCard label={t('profile.currentLevel')} value={userProfile.level} icon={<LevelIcon />} />
                </div>

                <div className="mt-8">
                    <h4 className="font-orbitron text-xl mb-4 text-center">{t('profile.restPlannerTitle')}</h4>
                     <div className="bg-gray-800/50 p-4 rounded-lg flex justify-around">
                        {daysOfWeek.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => handleDayToggle(index)}
                                className={`w-10 h-10 rounded-full font-bold transition-colors ${
                                    userProfile.restDays.includes(index)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                                title={t('profile.toggleDay', day)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="font-orbitron text-xl mb-4 text-center">{t('profile.inventoryTitle')}</h4>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        {ownedItems.length > 0 ? (
                            <>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
                                    {visibleItems.map(item => {
                                        if (!item) return null;
                                        const isEquipped = [userProfile.equippedAvatar, userProfile.equippedBackground, userProfile.equippedFrame].includes(item.id);
                                        return (
                                            <div key={item.id} className="flex flex-col items-center gap-2">
                                                <div className="relative">
                                                    <div className={`p-2 rounded-md transition-all w-20 h-20 flex items-center justify-center ${item.asset.includes('bg-gray-100') ? 'bg-gray-800' : 'bg-gray-700'}`}>
                                                        {item.type === 'avatar' && <span className={`text-4xl ${item.asset.includes('text-black') ? 'text-black' : ''}`}>{item.asset}</span>}
                                                        {item.type === 'background' && <div className={`w-16 h-16 rounded ${item.asset}`}></div>}
                                                        {item.type === 'frame' && <div className={`w-16 h-16 rounded border-4 ${item.asset}`}></div>}
                                                    </div>
                                                    {isEquipped && (
                                                        <div className="absolute inset-0 bg-black/60 rounded-md flex items-center justify-center">
                                                            <CheckIcon className={`w-8 h-8 ${theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}`} />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-center text-gray-300 truncate w-full">{item.name}</p>
                                                <button
                                                    onClick={() => equipItem(item)}
                                                    className={`w-full text-xs font-bold py-1 rounded transition-colors ${
                                                        isEquipped 
                                                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                                                        : (theme === 'yellow' ? 'bg-yellow-600 text-white hover:bg-yellow-500' : 'bg-cyan-600 text-white hover:bg-cyan-500')
                                                    }`}
                                                >
                                                    {isEquipped ? t('profile.unequip') : t('profile.equip')}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                {ownedItems.length > 8 && (
                                    <div className="mt-4 text-center">
                                        <button 
                                            onClick={() => setInventoryExpanded(!isInventoryExpanded)}
                                            className={`px-4 py-2 text-sm font-bold bg-gray-700 rounded-lg hover:bg-gray-600 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}
                                        >
                                            {isInventoryExpanded ? t('profile.showLess') : t('profile.showMore')}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-center text-gray-500">{t('profile.emptyInventory')}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;