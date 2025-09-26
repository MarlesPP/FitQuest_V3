import { DifficultyLevel } from './types';

export const XP_PER_WORKOUT: Record<DifficultyLevel, number> = {
    [DifficultyLevel.BEGINNER]: 100,
    [DifficultyLevel.INTERMEDIATE]: 150,
    [DifficultyLevel.ADVANCED]: 225,
};

export const GOLD_PER_WORKOUT: Record<DifficultyLevel, number> = {
    [DifficultyLevel.BEGINNER]: 10,
    [DifficultyLevel.INTERMEDIATE]: 15,
    [DifficultyLevel.ADVANCED]: 25,
};

export const XP_FOR_NEXT_LEVEL = (level: number): number => {
    return Math.floor(100 * Math.pow(level, 1.5));
};
