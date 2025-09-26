import React, { useState, useRef, useEffect, useMemo } from 'react';
import { UserProfile, Stats } from '../types';
import { RPG_RANKS, RPG_SCALES } from '../data/RPG';
import { PlusIcon, MinusIcon } from './icons/ExtraIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface RPGProps {
    userProfile: UserProfile;
    onConfirm: (pendingPoints: Partial<Stats>) => void;
}

const STAT_LIMIT = 1000;

const StatDisplay: React.FC<{
    label: string;
    value: number;
    color: string;
    pending: number;
    onPointChange: (delta: number) => void;
    canAddPoints: boolean;
    canRemovePoints: boolean;
// FIX: Destructure 'color' prop to make it available within the component.
}> = ({ label, value, color, pending, onPointChange, canAddPoints, canRemovePoints }) => {
    const { theme } = useTheme();
    const timeoutRef = useRef<number | null>(null);
    const delayRef = useRef<number>(250); // initial delay

    const startChangingPoints = (delta: 1 | -1) => {
        onPointChange(delta); // apply one change immediately

        const changeLoop = () => {
            onPointChange(delta);
            delayRef.current = Math.max(30, delayRef.current * 0.9); // Exponential decrease, with a floor
            timeoutRef.current = window.setTimeout(changeLoop, delayRef.current);
        };
        timeoutRef.current = window.setTimeout(changeLoop, delayRef.current);
    };

    const stopChangingPoints = () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        delayRef.current = 250; // Reset delay
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => stopChangingPoints();
    }, []);
    
    const totalStat = value + pending;
    const percentage = (totalStat / STAT_LIMIT) * 100;
    
    // Default Tailwind colors don't work well with dynamic class names like `bg-${color}-500`
    // So we use a map.
    const colorMap = {
        strength: { base: 'bg-red-500' },
        agility: { base: 'bg-green-500' },
        endurance: { base: 'bg-blue-500' },
    };

    // FIX: Use the 'color' prop to determine the color class, which is more robust than relying on the translated 'label'.
    const baseColorClass = colorMap[color as keyof typeof colorMap]?.base || 'bg-gray-500';

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="font-orbitron font-bold text-lg">{label}</span>
                <span className="text-sm font-mono flex items-baseline">
                    {value}
                    {pending > 0 && <span className="text-green-400 font-bold ml-1">+{pending}</span>}
                     <span className="text-gray-400 ml-1">/ {STAT_LIMIT}</span>
                </span>
            </div>
            <div className="flex items-center gap-2">
                 <button
                    onMouseDown={() => startChangingPoints(-1)}
                    onMouseUp={stopChangingPoints} onMouseLeave={stopChangingPoints}
                    onTouchStart={() => startChangingPoints(-1)} onTouchEnd={stopChangingPoints}
                    disabled={!canRemovePoints}
                    className="bg-red-600 rounded-full p-1 text-white hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Decrease ${label}`}
                >
                    <MinusIcon className="w-5 h-5" />
                </button>
                <div className="w-full bg-gray-700 rounded-full h-4 border-2 border-gray-600 overflow-hidden">
                    <div className="relative w-full h-full">
                         <div
                            className={`${baseColorClass} h-full absolute top-0 left-0 transition-all duration-300`}
                            style={{ width: `${(value / STAT_LIMIT) * 100}%` }}
                        ></div>
                        <div
                            className={`${baseColorClass} opacity-50 h-full absolute top-0 left-0 transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
                <button
                    onMouseDown={() => startChangingPoints(1)}
                    onMouseUp={stopChangingPoints} onMouseLeave={stopChangingPoints}
                    onTouchStart={() => startChangingPoints(1)} onTouchEnd={stopChangingPoints}
                    disabled={!canAddPoints || totalStat >= STAT_LIMIT}
                    className={`rounded-full p-1 text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors ${theme === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}
                    aria-label={`Increase ${label}`}
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const RPG: React.FC<RPGProps> = ({ userProfile, onConfirm }) => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    
    const [pendingPoints, setPendingPoints] = useState<Stats>({ strength: 0, agility: 0, endurance: 0 });
    // FIX: Replaced reduce with direct property access to avoid type inference issues with Object.values and resolve TS errors.
    const pointsToSpend = pendingPoints.strength + pendingPoints.agility + pendingPoints.endurance;
    const availablePoints = userProfile.statPoints - pointsToSpend;
    
    const translatedRanks = useMemo(() => RPG_RANKS.map(rank => ({...rank, title: t(`rpg.ranks.${rank.title.replace(/\s/g, '_')}`)})), [t]);
    const translatedScales = useMemo(() => Object.keys(RPG_SCALES).reduce((acc, key) => {
        acc[key] = {...RPG_SCALES[key as keyof typeof RPG_SCALES], name: t(`rpg.scales.${key}`)};
        return acc;
    }, {} as any), [t]);

    const handlePointChange = (stat: keyof Stats, delta: number) => {
        setPendingPoints(prev => {
            const currentPending = prev[stat];
            const statBaseValue = userProfile.stats[stat];

            if (delta > 0 && availablePoints <= 0) return prev;
            if (delta > 0 && statBaseValue + currentPending >= STAT_LIMIT) return prev;
            if (delta < 0 && currentPending <= 0) return prev;

            return { ...prev, [stat]: currentPending + delta };
        });
    };
    
    const handleConfirm = () => {
        onConfirm(pendingPoints);
        setPendingPoints({ strength: 0, agility: 0, endurance: 0 });
    };

    const handleReset = () => {
        setPendingPoints({ strength: 0, agility: 0, endurance: 0 });
    };
    
    const getCurrentRank = () => {
        return [...translatedRanks].reverse().find(rank => userProfile.level >= rank.level) || translatedRanks[0];
    };
    
    const getNextRank = () => {
        return translatedRanks.find(rank => userProfile.level < rank.level) || null;
    };

    const currentRank = getCurrentRank();
    const nextRank = getNextRank();
    const currentScale = currentRank ? translatedScales[Object.keys(translatedScales).find(key => translatedScales[key].unlockLevel === currentRank.scale.unlockLevel) || 'HUMAN'] : translatedScales.HUMAN;
    const nextRankLevelColor = theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';

    return (
        <div className="p-4 text-white animate-fade-in pb-20 md:pb-4">
            <h2 className={`text-3xl font-orbitron font-bold text-center mb-6 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('rpg.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Progression Panel */}
                <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-6">
                    <h3 className="font-orbitron text-xl mb-4 text-center">{t('rpg.progressionTitle')}</h3>
                    
                    <div className="text-center p-4 rounded-lg bg-gray-900/50">
                        <p className="text-sm text-gray-400">{t('rpg.currentRank')}</p>
                        <p className="text-2xl font-bold font-orbitron text-white">{currentRank.title}</p>
                        <p className={`text-sm font-bold ${currentScale.color}`}>{currentScale.name}</p>
                    </div>

                    <div className="text-center mt-6">
                        {nextRank ? (
                             <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 border-dashed">
                                <p className="text-sm text-gray-400">{t('rpg.nextRank')}</p>
                                <p className="text-xl font-bold font-orbitron text-gray-300">{nextRank.title}</p>
                                <p className={`text-sm ${nextRankLevelColor}`}>{t('rpg.reachLevel', nextRank.level)}</p>
                            </div>
                        ) : (
                             <div className="p-4 rounded-lg bg-gray-800 border border-green-500">
                                <p className="text-xl font-bold font-orbitron text-green-400">{t('rpg.maxRank')}</p>
                                <p className="text-sm text-gray-300">{t('rpg.legend')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Panel */}
                <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-6">
                    <h3 className="font-orbitron text-xl mb-2 text-center">{t('rpg.statsTitle')}</h3>
                    <p className="text-center text-sm text-gray-400 mb-4">{t('rpg.statsSubtitle')}</p>

                    <div className="text-center mb-6 bg-gray-900/50 p-3 rounded-lg">
                        <p className={`font-orbitron text-2xl font-bold ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{availablePoints}</p>
                        <p className="text-sm text-gray-400">{t('rpg.availablePoints')}</p>
                    </div>
                    
                    <div className="space-y-4">
                        <StatDisplay 
                            label={t('rpg.strength')}
                            value={userProfile.stats.strength}
                            pending={pendingPoints.strength}
                            onPointChange={(delta) => handlePointChange('strength', delta)}
                            canAddPoints={availablePoints > 0}
                            canRemovePoints={pendingPoints.strength > 0}
                            color="strength"
                        />
                         <StatDisplay 
                            label={t('rpg.agility')}
                            value={userProfile.stats.agility}
                            pending={pendingPoints.agility}
                            onPointChange={(delta) => handlePointChange('agility', delta)}
                            canAddPoints={availablePoints > 0}
                            canRemovePoints={pendingPoints.agility > 0}
                            color="agility"
                        />
                         <StatDisplay 
                            label={t('rpg.endurance')}
                            value={userProfile.stats.endurance}
                            pending={pendingPoints.endurance}
                            onPointChange={(delta) => handlePointChange('endurance', delta)}
                            canAddPoints={availablePoints > 0}
                            canRemovePoints={pendingPoints.endurance > 0}
                            color="endurance"
                        />
                    </div>
                    
                    {pointsToSpend > 0 && (
                        <div className="mt-6 flex gap-4">
                             <button onClick={handleReset} className="w-full py-2 bg-gray-600 rounded-md font-bold hover:bg-gray-500">{t('rpg.reset')}</button>
                             <button onClick={handleConfirm} className="w-full py-2 bg-green-600 rounded-md font-bold hover:bg-green-500">{t('rpg.confirm')}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RPG;