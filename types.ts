import React from 'react';

export enum DifficultyLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
}

export enum WorkoutType {
    FULL_BODY = 'FULL_BODY',
    UPPER_BODY = 'UPPER_BODY',
    LOWER_BODY = 'LOWER_BODY',
    CORE = 'CORE',
    OFFICE = 'OFFICE',
}

export interface EquipmentOption {
    id: string;
    name: string;
    icon: React.FC<{ className?: string }>;
}

export interface Exercise {
    name: string;
    muscles: string;
    sets: number;
    reps: string;
    description: string;
    equipment: string;
    estimatedTimeInSeconds: number;
    restAfterInSeconds: number;
    section?: string; // Added for progress tracking
}

export interface WorkoutSection {
    title: string;
    exercises: Exercise[];
}

export interface Workout {
    workoutName: string;
    level: DifficultyLevel;
    workoutType: WorkoutType;
    estimatedTime: string;
    warmup: WorkoutSection;
    mainWorkout: WorkoutSection;
    cooldown: WorkoutSection;
}

export interface ExerciseTiming {
    exerciseName: string;
    timeTaken: number;
    estimatedTime: number;
}

export type Stats = {
    strength: number;
    agility: number;
    endurance: number;
};

export interface UserProfile {
    name: string;
    gender: 'male' | 'female' | null;
    level: number;
    xp: number;
    xpToNextLevel: number;
    gold: number;
    workoutsCompleted: number;
    streak: number;
    lastWorkoutDate: string | null;
    firstWorkoutDifficulty: Record<DifficultyLevel, boolean>;
    monthlyWorkouts: {
        year: number;
        month: number;
        count: number;
    };
    unlockedAchievements: string[];
    showcasedAchievements: string[];
    ownedCosmetics: string[];
    equippedFrame: string | null;
    equippedBackground: string | null;
    equippedAvatar: string | null;
    restDays: number[];
    statPoints: number;
    stats: Stats;
}

export interface Achievement {
    id: string;
    title: string;
    unlockedDescription: string;
    lockedDescription: string;
    icon: React.FC<{ className?: string }>;
    isUnlocked: (profile: UserProfile) => boolean;
}

export type CosmeticType = 'frame' | 'background' | 'avatar';

export interface CosmeticItem {
    id: string;
    name: string;
    type: CosmeticType;
    cost: number;
    asset: string;
    description: string;
    unlockHint?: string;
    isUnlocked?: (profile: UserProfile) => boolean;
}

export interface ShopCategory {
    title: string;
    type: CosmeticType;
    items: CosmeticItem[];
}

export type MainView = 'WORKOUT' | 'PROFILE' | 'SHOP' | 'ACHIEVEMENTS' | 'RPG';

export type AppState = 'GENERATOR' | 'DISPLAY' | 'IN_PROGRESS' | 'SUMMARY';

export type UserProfileHook = {
    userProfile: UserProfile | null;
    setupProfile: (gender: 'male' | 'female', name: string) => void;
    completeWorkout: (difficulty: DifficultyLevel, timingData: ExerciseTiming[]) => void;
    purchaseItem: (item: CosmeticItem) => { success: boolean; message: string };
    equipItem: (item: CosmeticItem) => void;
    setRestDays: (days: number[]) => void;
    confirmStatAllocation: (pendingPoints: Partial<Stats>) => void;
    arceusPowerUp: () => void;
    toggleShowcaseAchievement: (achievementId: string) => void;
};
