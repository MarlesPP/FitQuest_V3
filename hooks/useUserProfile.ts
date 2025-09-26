import { useState, useEffect, useCallback } from 'react';
import { UserProfile, DifficultyLevel, ExerciseTiming, CosmeticItem, Stats } from '../types';
import { XP_PER_WORKOUT, GOLD_PER_WORKOUT, XP_FOR_NEXT_LEVEL } from '../constants';
import { es } from '../locales/es';
import { getAchievements } from '../locales/content';
import { RPG_REWARDS, RPG_RANKS } from '../data/RPG';

const LOCAL_STORAGE_KEY = 'fitquest-user-profile';

const createDefaultProfile = (): UserProfile => {
    const today = new Date();
    return {
        name: '',
        gender: null,
        level: 1,
        xp: 0,
        xpToNextLevel: XP_FOR_NEXT_LEVEL(1),
        gold: 0,
        workoutsCompleted: 0,
        streak: 0,
        lastWorkoutDate: null,
        firstWorkoutDifficulty: {
            [DifficultyLevel.BEGINNER]: false,
            [DifficultyLevel.INTERMEDIATE]: false,
            [DifficultyLevel.ADVANCED]: false,
        },
        monthlyWorkouts: {
            year: today.getFullYear(),
            month: today.getMonth(),
            count: 0
        },
        unlockedAchievements: [],
        showcasedAchievements: [],
        ownedCosmetics: ['avatar_alpha'], // Start with a free avatar
        equippedFrame: null,
        equippedBackground: null,
        equippedAvatar: 'avatar_alpha',
        restDays: [],
        statPoints: 10,
        stats: {
            strength: 0,
            agility: 0,
            endurance: 0,
        },
    };
};

// A dummy 't' function that just returns the key, since we only need the structure here.
// The actual translation happens in the UI. We use the Spanish object as a base for keys.
const t = (key: string) => {
    const keys = key.split('.');
    let result: any = es;
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key;
        }
    }
    return typeof result === 'string' ? result : key;
};

const ALL_ACHIEVEMENTS = getAchievements(t);


export const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
        try {
            const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedProfile) {
                const profile = JSON.parse(savedProfile);
                // Backward compatibility for profiles missing new features
                if (!profile.restDays) profile.restDays = [];
                if (!profile.statPoints) profile.statPoints = 0;
                if (!profile.stats) profile.stats = { strength: 0, agility: 0, endurance: 0 };
                if (!profile.ownedCosmetics.includes('avatar_alpha')) profile.ownedCosmetics.push('avatar_alpha');
                if (!profile.name) profile.name = '';
                if (!profile.showcasedAchievements) profile.showcasedAchievements = [];
                 if (!profile.firstWorkoutDifficulty) {
                    profile.firstWorkoutDifficulty = {
                        [DifficultyLevel.BEGINNER]: false,
                        [DifficultyLevel.INTERMEDIATE]: false,
                        [DifficultyLevel.ADVANCED]: false,
                    };
                }


                return profile;
            }
            return null;
        } catch (error) {
            console.error("Failed to load user profile from localStorage", error);
            return null;
        }
    });

    useEffect(() => {
        if (userProfile) {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProfile));
            } catch (error) {
                console.error("Failed to save user profile to localStorage", error);
            }
        }
    }, [userProfile]);
    
    const setupProfile = useCallback((gender: 'male' | 'female', name: string) => {
        const profile = createDefaultProfile();
        profile.gender = gender;
        profile.name = name;
        setUserProfile(profile);
    }, []);

    const arceusPowerUp = useCallback(() => {
        setUserProfile(prev => {
            if (!prev) return null;
            const maxLevel = Math.max(...RPG_RANKS.map(r => r.level));
            const newProfile: UserProfile = {
                ...prev,
                level: maxLevel,
                xp: 0,
                xpToNextLevel: XP_FOR_NEXT_LEVEL(maxLevel),
                streak: 30,
                gold: 9999,
                statPoints: prev.statPoints + Math.max(0, (maxLevel - prev.level)) * 10,
                monthlyWorkouts: {
                    ...prev.monthlyWorkouts,
                    count: 30,
                }
            };

            // Unlock all level-based cosmetics
            newProfile.ownedCosmetics = [...new Set([...newProfile.ownedCosmetics, ...RPG_REWARDS.filter(r => newProfile.level >= r.unlockLevel).map(r => r.id)])];
            // Re-check ALL achievements against the new profile
            newProfile.unlockedAchievements = [...new Set([...newProfile.unlockedAchievements, ...ALL_ACHIEVEMENTS.filter(a => a.isUnlocked(newProfile)).map(a => a.id)])];
            
            return newProfile;
        });
    }, []);

    const completeWorkout = useCallback((difficulty: DifficultyLevel, timingData: ExerciseTiming[]) => {
        setUserProfile(prevProfile => {
            if (!prevProfile) return null;

            let newProfile = { ...prevProfile, ownedCosmetics: [...prevProfile.ownedCosmetics] };

            // 1. Calculate XP & Gold
            let xpGained = XP_PER_WORKOUT[difficulty];
            const timeBonus = timingData.reduce((acc, curr) => {
                const performance = curr.estimatedTime / Math.max(1, curr.timeTaken); // avoid division by zero
                return acc + (performance > 1 ? Math.min(5, (performance - 1) * 10) : 0);
            }, 0);
            xpGained += Math.round(timeBonus);
            let goldGained = GOLD_PER_WORKOUT[difficulty];

            newProfile.xp += xpGained;
            newProfile.gold += goldGained;
            newProfile.workoutsCompleted += 1;
            
            // 2. Handle Level Ups
            const oldLevel = newProfile.level;
            while (newProfile.xp >= newProfile.xpToNextLevel) {
                newProfile.xp -= newProfile.xpToNextLevel;
                newProfile.level += 1;
                newProfile.xpToNextLevel = XP_FOR_NEXT_LEVEL(newProfile.level);
                newProfile.statPoints += 10;
            }

            // 2.5 Grant RPG Rewards if a new scale is reached
            if (newProfile.level > oldLevel) {
                 RPG_REWARDS.forEach(reward => {
                    if (newProfile.level >= reward.unlockLevel && oldLevel < reward.unlockLevel) {
                        if (!newProfile.ownedCosmetics.includes(reward.id)) {
                            newProfile.ownedCosmetics.push(reward.id);
                        }
                    }
                });
                // Special unlock for reaching level 50 (Minor Gods)
                if (newProfile.level >= 50 && oldLevel < 50) {
                    const legendItems = ['frame_legend', 'bg_legend'];
                    legendItems.forEach(item => {
                        if (!newProfile.ownedCosmetics.includes(item)) {
                            newProfile.ownedCosmetics.push(item);
                        }
                    });
                }
            }

            // 3. Update Streak & Dates
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const lastWorkoutDate = newProfile.lastWorkoutDate ? new Date(newProfile.lastWorkoutDate) : null;
            if (lastWorkoutDate) {
                lastWorkoutDate.setHours(0, 0, 0, 0);
                const diffTime = today.getTime() - lastWorkoutDate.getTime();
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    newProfile.streak += 1;
                } else if (diffDays > 1) {
                    newProfile.streak = 1;
                }
            } else {
                newProfile.streak = 1;
            }
            newProfile.lastWorkoutDate = new Date().toISOString();

            // 4. Update Monthly workouts
            const currentMonth = new Date();
            if (currentMonth.getFullYear() === newProfile.monthlyWorkouts.year && currentMonth.getMonth() === newProfile.monthlyWorkouts.month) {
                newProfile.monthlyWorkouts.count += 1;
            } else {
                newProfile.monthlyWorkouts = { year: currentMonth.getFullYear(), month: currentMonth.getMonth(), count: 1 };
            }
            
            // 5. Update first workout by difficulty
            if (!newProfile.firstWorkoutDifficulty[difficulty]) {
                 newProfile.firstWorkoutDifficulty[difficulty] = true;
            }

            // 6. Check for Achievements
            const newlyUnlocked = ALL_ACHIEVEMENTS.filter(ach => 
                !newProfile.unlockedAchievements.includes(ach.id) && ach.isUnlocked(newProfile)
            );
            if (newlyUnlocked.length > 0) {
                newProfile.unlockedAchievements = [...newProfile.unlockedAchievements, ...newlyUnlocked.map(a => a.id)];
            }

            return newProfile;
        });
    }, []);

    const purchaseItem = useCallback((item: CosmeticItem) => {
        if (!userProfile || userProfile.gold < item.cost || userProfile.ownedCosmetics.includes(item.id)) {
            return { success: false, message: "Cannot purchase item." };
        }

        setUserProfile(prev => prev ? ({
            ...prev,
            gold: prev.gold - item.cost,
            ownedCosmetics: [...new Set([...prev.ownedCosmetics, item.id])]
        }) : null);

        return { success: true, message: "Item purchased!" };
    }, [userProfile]);

    const equipItem = useCallback((item: CosmeticItem) => {
        if (!userProfile || !userProfile.ownedCosmetics.includes(item.id)) return;

        setUserProfile(prev => {
            if (!prev) return null;
            const newProfile = { ...prev };
            switch (item.type) {
                case 'frame':
                    newProfile.equippedFrame = item.id === prev.equippedFrame ? null : item.id;
                    break;
                case 'background':
                    newProfile.equippedBackground = item.id === prev.equippedBackground ? null : item.id;
                    break;
                case 'avatar':
                    newProfile.equippedAvatar = item.id === prev.equippedAvatar ? null : item.id;
                    break;
            }
            return newProfile;
        });
    }, [userProfile]);
    
    const setRestDays = useCallback((days: number[]) => {
        setUserProfile(prev => {
            if (!prev) return null;
            return { ...prev, restDays: days };
        });
    }, []);
    
    const confirmStatAllocation = useCallback((pendingPoints: Partial<Stats>) => {
        setUserProfile(prev => {
            if (!prev) return null;

            const totalPointsToSpend = Object.values(pendingPoints).reduce((sum, val) => sum + (val || 0), 0);

            if (totalPointsToSpend <= 0 || totalPointsToSpend > prev.statPoints) {
                return prev; // Not enough points or no points to spend
            }

            const newStats = { ...prev.stats };
            for (const key in pendingPoints) {
                const statKey = key as keyof Stats;
                newStats[statKey] = Math.min(1000, newStats[statKey] + (pendingPoints[statKey] || 0));
            }

            return {
                ...prev,
                statPoints: prev.statPoints - totalPointsToSpend,
                stats: newStats,
            };
        });
    }, []);
    
    const toggleShowcaseAchievement = useCallback((achievementId: string) => {
        setUserProfile(prev => {
            if (!prev) return null;

            const currentShowcase = prev.showcasedAchievements;
            const isShowcased = currentShowcase.includes(achievementId);

            let newShowcase: string[];

            if (isShowcased) {
                newShowcase = currentShowcase.filter(id => id !== achievementId);
            } else {
                if (currentShowcase.length < 3) {
                    newShowcase = [...currentShowcase, achievementId];
                } else {
                    return prev; // Limit reached, do nothing
                }
            }
            
            return { ...prev, showcasedAchievements: newShowcase };
        });
    }, []);

    return { userProfile, setupProfile, completeWorkout, purchaseItem, equipItem, setRestDays, confirmStatAllocation, arceusPowerUp, toggleShowcaseAchievement };
};
