import { Achievement, ShopCategory, CosmeticItem, EquipmentOption, DifficultyLevel } from '../types';
import { ChairIcon, WallIcon, BedIcon, TableIcon, BackpackIcon } from '../components/icons/EquipmentIcons';
import { 
    FirstWorkoutIcon, TenWorkoutsIcon, Streak7Icon, Streak15Icon, Quests25Icon, Quests50Icon,
    MrFlojoIcon, BeginnerBadgeIcon, IntermediateBadgeIcon, AdvancedBadgeIcon, HumanScaleIcon,
    LesserCreatureScaleIcon, MediumCreatureScaleIcon, MythicalCreatureScaleIcon, HeroScaleIcon, GodScaleIcon
} from '../components/icons/AchievementIcons';

type TFunction = (key: string, ...args: any[]) => string;

export const getEquipmentOptions = (t: TFunction): EquipmentOption[] => [
    { id: 'chair', name: t('equipment.chair'), icon: ChairIcon },
    { id: 'wall', name: t('equipment.wall'), icon: WallIcon },
    { id: 'bed', name: t('equipment.bed'), icon: BedIcon },
    { id: 'table', name: t('equipment.table'), icon: TableIcon },
    { id: 'backpack', name: t('equipment.backpack'), icon: BackpackIcon },
];

export const getAchievements = (t: TFunction): Achievement[] => [
    {
        id: 'first_workout',
        title: t('achievementsContent.first_workout.title'),
        unlockedDescription: t('achievementsContent.first_workout.unlocked'),
        lockedDescription: t('achievementsContent.first_workout.locked'),
        icon: FirstWorkoutIcon,
        isUnlocked: (p) => p.workoutsCompleted >= 1
    },
    {
        id: 'beginner_badge',
        title: t('achievementsContent.beginner_badge.title'),
        unlockedDescription: t('achievementsContent.beginner_badge.unlocked'),
        lockedDescription: t('achievementsContent.beginner_badge.locked'),
        icon: BeginnerBadgeIcon,
        isUnlocked: (p) => p.firstWorkoutDifficulty[DifficultyLevel.BEGINNER]
    },
    {
        id: 'intermediate_badge',
        title: t('achievementsContent.intermediate_badge.title'),
        unlockedDescription: t('achievementsContent.intermediate_badge.unlocked'),
        lockedDescription: t('achievementsContent.intermediate_badge.locked'),
        icon: IntermediateBadgeIcon,
        isUnlocked: (p) => p.firstWorkoutDifficulty[DifficultyLevel.INTERMEDIATE]
    },
    {
        id: 'advanced_badge',
        title: t('achievementsContent.advanced_badge.title'),
        unlockedDescription: t('achievementsContent.advanced_badge.unlocked'),
        lockedDescription: t('achievementsContent.advanced_badge.locked'),
        icon: AdvancedBadgeIcon,
        isUnlocked: (p) => p.firstWorkoutDifficulty[DifficultyLevel.ADVANCED]
    },
    {
        id: 'ten_workouts',
        title: t('achievementsContent.ten_workouts.title'),
        unlockedDescription: t('achievementsContent.ten_workouts.unlocked'),
        lockedDescription: t('achievementsContent.ten_workouts.locked'),
        icon: TenWorkoutsIcon,
        isUnlocked: (p) => p.workoutsCompleted >= 10
    },
     {
        id: '25_workouts',
        title: t('achievementsContent.25_workouts.title'),
        unlockedDescription: t('achievementsContent.25_workouts.unlocked'),
        lockedDescription: t('achievementsContent.25_workouts.locked'),
        icon: Quests25Icon,
        isUnlocked: (p) => p.workoutsCompleted >= 25
    },
     {
        id: '50_workouts',
        title: t('achievementsContent.50_workouts.title'),
        unlockedDescription: t('achievementsContent.50_workouts.unlocked'),
        lockedDescription: t('achievementsContent.50_workouts.locked'),
        icon: Quests50Icon,
        isUnlocked: (p) => p.workoutsCompleted >= 50
    },
    {
        id: 'streak_7',
        title: t('achievementsContent.streak_7.title'),
        unlockedDescription: t('achievementsContent.streak_7.unlocked'),
        lockedDescription: t('achievementsContent.streak_7.locked'),
        icon: Streak7Icon,
        isUnlocked: (p) => p.streak >= 7
    },
    {
        id: 'streak_15',
        title: t('achievementsContent.streak_15.title'),
        unlockedDescription: t('achievementsContent.streak_15.unlocked'),
        lockedDescription: t('achievementsContent.streak_15.locked'),
        icon: Streak15Icon,
        isUnlocked: (p) => p.streak >= 15
    },
    {
        id: 'mr_flojo',
        title: t('achievementsContent.mr_flojo.title'),
        unlockedDescription: t('achievementsContent.mr_flojo.unlocked'),
        lockedDescription: t('achievementsContent.mr_flojo.locked'),
        icon: MrFlojoIcon,
        isUnlocked: (p) => {
            if (!p.lastWorkoutDate) return false;
            const lastDate = new Date(p.lastWorkoutDate);
            const today = new Date();
            const diffTime = today.getTime() - lastDate.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);
            return diffDays > 15;
        }
    },
    { id: 'unlock_human_scale', title: t('achievementsContent.unlock_human_scale.title'), unlockedDescription: t('achievementsContent.unlock_human_scale.unlocked'), lockedDescription: t('achievementsContent.unlock_human_scale.locked'), icon: HumanScaleIcon, isUnlocked: (p) => p.level >= 1 },
    { id: 'unlock_lesser_creatures', title: t('achievementsContent.unlock_lesser_creatures.title'), unlockedDescription: t('achievementsContent.unlock_lesser_creatures.unlocked'), lockedDescription: t('achievementsContent.unlock_lesser_creatures.locked'), icon: LesserCreatureScaleIcon, isUnlocked: (p) => p.level >= 10 },
    { id: 'unlock_medium_creatures', title: t('achievementsContent.unlock_medium_creatures.title'), unlockedDescription: t('achievementsContent.unlock_medium_creatures.unlocked'), lockedDescription: t('achievementsContent.unlock_medium_creatures.locked'), icon: MediumCreatureScaleIcon, isUnlocked: (p) => p.level >= 20 },
    { id: 'unlock_mythical_creatures', title: t('achievementsContent.unlock_mythical_creatures.title'), unlockedDescription: t('achievementsContent.unlock_mythical_creatures.unlocked'), lockedDescription: t('achievementsContent.unlock_mythical_creatures.locked'), icon: MythicalCreatureScaleIcon, isUnlocked: (p) => p.level >= 32 },
    { id: 'unlock_heroes_scale', title: t('achievementsContent.unlock_heroes_scale.title'), unlockedDescription: t('achievementsContent.unlock_heroes_scale.unlocked'), lockedDescription: t('achievementsContent.unlock_heroes_scale.locked'), icon: HeroScaleIcon, isUnlocked: (p) => p.level >= 44 },
    { id: 'unlock_gods_scale', title: t('achievementsContent.unlock_gods_scale.title'), unlockedDescription: t('achievementsContent.unlock_gods_scale.unlocked'), lockedDescription: t('achievementsContent.unlock_gods_scale.locked'), icon: GodScaleIcon, isUnlocked: (p) => p.level >= 50 }
];

export const getShopCategories = (t: TFunction): ShopCategory[] => [
    {
        title: t('shopContent.frames.title'),
        type: 'frame',
        items: [
            {
                id: 'frame_monthly_current',
                name: t('shopContent.frames.monthly.name'),
                type: 'frame', cost: 500, asset: 'legendary-glow p-2',
                description: t('shopContent.frames.monthly.description'),
                unlockHint: t('shopContent.frames.monthly.unlockHint'),
                isUnlocked: (profile) => {
                    const today = new Date();
                    const isCurrentMonthAndYear = profile.monthlyWorkouts.year === today.getFullYear() && profile.monthlyWorkouts.month === today.getMonth();
                    return isCurrentMonthAndYear && profile.monthlyWorkouts.count >= 25;
                }
            },
            { id: 'frame_legend', name: t('shopContent.frames.legend.name'), type: 'frame', cost: 99999, asset: 'legendary-glow p-2', description: t('shopContent.frames.legend.description'), isUnlocked: () => false },
            { id: 'frame_bronze', name: t('shopContent.frames.bronze.name'), type: 'frame', cost: 100, asset: 'border-yellow-600', description: t('shopContent.frames.bronze.description') },
            { id: 'frame_white', name: t('shopContent.frames.white.name'), type: 'frame', cost: 20, asset: 'border-white', description: t('shopContent.frames.white.description') },
            { id: 'frame_gray', name: t('shopContent.frames.gray.name'), type: 'frame', cost: 20, asset: 'border-gray-500', description: t('shopContent.frames.gray.description') },
        ]
    },
    {
        title: t('shopContent.backgrounds.title'),
        type: 'background',
        items: [
             { id: 'bg_streak_25', name: t('shopContent.backgrounds.streak_25.name'), type: 'background', cost: 1000, asset: 'bg-cross-gradient-mythic', description: t('shopContent.backgrounds.streak_25.description'), unlockHint: t('shopContent.backgrounds.streak_25.unlockHint'), isUnlocked: (profile) => profile.streak >= 25 },
             { id: 'bg_legend', name: t('shopContent.backgrounds.legend.name'), type: 'background', cost: 99999, asset: 'legendary-glow-bg', description: t('shopContent.backgrounds.legend.description'), isUnlocked: () => false },
             { id: 'bg_blue_nebula', name: t('shopContent.backgrounds.blue_nebula.name'), type: 'background', cost: 75, asset: 'bg-gradient-to-br from-blue-800 to-indigo-900 bg-no-repeat bg-center bg-cover bg-[url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 600\'%3e%3cdefs%3e%3cfilter id=\'glow\'%3e%3cfeGaussianBlur stdDeviation=\'1.5\' result=\'coloredBlur\'/%3e%3cfeMerge%3e%3cfeMergeNode in=\'coloredBlur\'/%3e%3cfeMergeNode in=\'SourceGraphic\'/%3e%3c/feMerge%3e%3c/filter%3e%3c/defs%3e%3ccircle cx=\'100\' cy=\'200\' r=\'2\' fill=\'white\' opacity=\'0.8\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'650\' cy=\'150\' r=\'1.5\' fill=\'white\' opacity=\'0.7\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'300\' cy=\'450\' r=\'1\' fill=\'white\' opacity=\'0.9\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'750\' cy=\'500\' r=\'2.5\' fill=\'white\' opacity=\'0.6\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'50\' cy=\'50\' r=\'1\' fill=\'white\' opacity=\'0.8\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'400\' cy=\'100\' r=\'1\' fill=\'white\' opacity=\'0.7\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'200\' cy=\'300\' r=\'2\' fill=\'white\' opacity=\'0.9\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'550\' cy=\'350\' r=\'1.5\' fill=\'white\' opacity=\'0.8\' filter=\'url(%23glow)\'/%3e%3cline x1=\'350\' y1=\'250\' x2=\'400\' y2=\'280\' stroke=\'rgba(255,255,255,0.4)\' stroke-width=\'1\'/%3e%3cline x1=\'400\' y1=\'280\' x2=\'450\' y2=\'250\' stroke=\'rgba(255,255,255,0.4)\' stroke-width=\'1\'/%3e%3cline x1=\'400\' y1=\'280\' x2=\'400\' y2=\'330\' stroke=\'rgba(255,255,255,0.4)\' stroke-width=\'1\'/%3e%3cline x1=\'350\' y1=\'400\' x2=\'400\' y2=\'330\' stroke=\'rgba(255,255,255,0.4)\' stroke-width=\'1\'/%3e%3cline x1=\'450\' y1=\'400\' x2=\'400\' y2=\'330\' stroke=\'rgba(255,255,255,0.4)\' stroke-width=\'1\'/%3e%3ccircle cx=\'350\' cy=\'250\' r=\'3\' fill=\'cyan\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'450\' cy=\'250\' r=\'3\' fill=\'cyan\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'400\' cy=\'280\' r=\'2.5\' fill=\'cyan\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'400\' cy=\'330\' r=\'4\' fill=\'cyan\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'350\' cy=\'400\' r=\'3.5\' fill=\'cyan\' filter=\'url(%23glow)\'/%3e%3ccircle cx=\'450\' cy=\'400\' r=\'3.5\' fill=\'cyan\' filter=\'url(%23glow)\'/%3e%3c/svg%3e")]', description: t('shopContent.backgrounds.blue_nebula.description') },
             { id: 'bg_crimson_ember', name: t('shopContent.backgrounds.crimson_ember.name'), type: 'background', cost: 75, asset: 'bg-gradient-to-tr from-red-500 via-red-800 to-yellow-600', description: t('shopContent.backgrounds.crimson_ember.description') },
             { id: 'bg_matte_black', name: t('shopContent.backgrounds.matte_black.name'), type: 'background', cost: 10, asset: 'bg-black', description: t('shopContent.backgrounds.matte_black.description') },
             { id: 'bg_matte_white', name: t('shopContent.backgrounds.matte_white.name'), type: 'background', cost: 10, asset: 'bg-gray-100', description: t('shopContent.backgrounds.matte_white.description') },
             { id: 'bg_matte_blue', name: t('shopContent.backgrounds.matte_blue.name'), type: 'background', cost: 15, asset: 'bg-blue-900', description: t('shopContent.backgrounds.matte_blue.description') },
        ]
    },
    {
        title: t('shopContent.avatars.title'),
        type: 'avatar',
        items: [
            { id: 'avatar_alpha', name: t('shopContent.avatars.alpha.name'), type: 'avatar', cost: 0, asset: 'Α', description: t('shopContent.avatars.alpha.description') },
            { id: 'avatar_omega', name: t('shopContent.avatars.omega.name'), type: 'avatar', cost: 20, asset: 'Ω', description: t('shopContent.avatars.omega.description') },
            { id: 'avatar_sigma', name: t('shopContent.avatars.sigma.name'), type: 'avatar', cost: 20, asset: 'Σ', description: t('shopContent.avatars.sigma.description') },
            { id: 'avatar_robot', name: t('shopContent.avatars.robot.name'), type: 'avatar', cost: 200, asset: '🤖', description: t('shopContent.avatars.robot.description') },
            { id: 'avatar_dragon', name: t('shopContent.avatars.dragon.name'), type: 'avatar', cost: 200, asset: '🐲', description: t('shopContent.avatars.dragon.description') },
            { id: 'avatar_lion', name: t('shopContent.avatars.lion.name'), type: 'avatar', cost: 200, asset: '🦁', description: t('shopContent.avatars.lion.description') }
        ]
    }
];

export const getRpgRewards = (t: TFunction, baseRewards: Array<CosmeticItem & { unlockLevel: number }>): Array<CosmeticItem & { unlockLevel: number }> => {
    return baseRewards.map(reward => ({
        ...reward,
        name: t(`rpgRewards.${reward.id}.name`),
        description: t(`rpgRewards.${reward.id}.description`),
    }));
};
