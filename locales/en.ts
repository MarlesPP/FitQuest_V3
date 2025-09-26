import { Translations } from './es';

export const en: Translations = {
    // General
    appName: "FitQuest RPG",

    // Views
    views: {
        WORKOUT: "WORKOUT",
        RPG: "RPG",
        PROFILE: "PROFILE",
        SHOP: "SHOP",
        ACHIEVEMENTS: "LOGS",
    },

    // Character Creation
    character: {
        title: "Create Your Hero",
        subtitle: "Your fitness adventure is about to begin.",
        nameLabel: "Hero Name (Optional)",
        namePlaceholder: "Enter your name",
        genderLabel: "Choose your avatar's gender.",
        male: "Male",
        female: "Female",
        submit: "Begin Adventure",
    },
    
    // Header
    header: {
        level: "Level",
        quests: "Quests",
        streak: "Streak",
        gold: "Gold",
    },
    
    // Loading
    loading: {
        generating: "Forging your quest...",
        generatingHint: "The digital blacksmiths are hard at work.",
    },

    // Error
    error: {
        title: "An Error Occurred",
        generateWorkout: "Failed to generate your workout. Please check your connection and try again.",
        tryAgain: "Try Again",
    },

    // Workout Generator
    generator: {
        title: "Generate New Quest",
        difficulty: "Difficulty Level",
        focus: "Workout Focus",
        equipment: "Available Equipment",
        equipmentHint: "Select any household items you can use. Leave blank for bodyweight only.",
        inspiration: "Inspiration (Optional)",
        yellowDudeLabel: "Yellow Dude Style",
        yellowDudeHint: "Incorporate creative calisthenics exercises inspired by the 'Yellow Dude' YouTube channel.",
        submit: "CREATE MY WORKOUT",
        arceusHint: "Debug: Max out level, streak, and monthly quests.",
    },

    // Workout Display
    display: {
        regenerate: "REGENERATE QUEST",
        begin: "BEGIN MISSION",
    },

    // Workout In Progress
    inProgress: {
        loading: "Loading exercise...",
        exerciseCount: "Exercise {0} of {1}",
        restTitle: "REST",
        exerciseTitle: "CURRENT EXERCISE",
        restMessage: "Take a breather",
        nextUp: "Next up:",
        finishing: "Finishing cooldown",
        skipRest: "SKIP REST",
        nextExercise: "DONE, NEXT!",
    },

    // Workout Summary
    summary: {
        title: "QUEST COMPLETE!",
        subtitle: "You conquered \"{0}\"",
        rewardsTitle: "REWARDS",
        xpLabel: "Base XP + Time Bonus",
        goldLabel: "Currency Gained",
        progressTitle: "PROGRESS",
        levelLabel: "Level {0}",
        currentLevel: "Current Level",
        streakLabel: "{0} Day Streak!",
        keepItUp: "Keep it up!",
        newQuestButton: "START NEW QUEST",
    },
    
    // Profile
    profile: {
        title: "Hero Profile",
        defaultName: "Lv. {0} Adventurer",
        questsDone: "Quests Done",
        currentStreak: "Current Streak",
        days: "{0} Days",
        totalGold: "Total Gold",
        currentLevel: "Current Level",
        restPlannerTitle: "Weekly Rest Planner",
        daysOfWeekShort: "S,M,T,W,T,F,S",
        toggleDay: "Toggle {0}",
        inventoryTitle: "Your Inventory",
        emptyInventory: "Visit the shop to acquire new items!",
        equip: "EQUIP",
        unequip: "UNEQUIP",
        showMore: "Show More",
        showLess: "Show Less",
    },
    
    // Shop
    shop: {
        title: "Hero's Shop",
        monthlyFrameProgress: "Complete {0} more workouts this month.",
        lockedDefault: "This item is currently locked.",
        owned: "OWNED",
        purchase: "Purchase for {0}",
    },

    // Achievements
    achievements: {
        title: "Hall of Fame",
        subtitle: "Your deeds and medals of honor. You can pin up to 3 on your profile.",
        pin: "Pin to profile",
        unpin: "Unpin from profile",
        showcaseFull: "Showcase is full",
    },
    
    // RPG
    rpg: {
        title: "RPG Arena",
        progressionTitle: "Hero Progression",
        currentRank: "Current Rank",
        nextRank: "Next Rank",
        reachLevel: "Reach Level {0} to achieve",
        maxRank: "MAX RANK ACHIEVED!",
        legend: "You are a true legend!",
        statsTitle: "Hero Stats",
        statsSubtitle: "Assign points to become stronger.",
        availablePoints: "Available Hero Points",
        strength: "Strength",
        agility: "Agility",
        endurance: "Endurance",
        reset: "Reset",
        confirm: "Confirm",
        ranks: {
            'Humano_Sedentario': 'Sedentary Human',
            'Soldado': 'Soldier',
            'Gladiador': 'Gladiator',
            'Espartano': 'Spartan',
            'Goblin': 'Goblin',
            'Esqueleto_Animado': 'Animated Skeleton',
            'Zombie': 'Zombie',
            'Sátiro': 'Satyr',
            'Orco': 'Orc',
            'Troll': 'Troll',
            'Hombre_Lobo': 'Werewolf',
            'Minotauro': 'Minotaur',
            'Cíclope_Joven': 'Young Cyclops',
            'Gorgona': 'Gorgon',
            'Grifo': 'Griffin',
            'Quimera': 'Chimera',
            'Hydra_de_3_Cabezas': '3-Headed Hydra',
            'Mantícora': 'Manticore',
            'Gigante_de_Hielo': 'Ice Giant',
            'Odiseo': 'Odysseus',
            'Atalanta': 'Atalanta',
            'Aquiles': 'Achilles',
            'Perseo': 'Perseus',
            'Hércules': 'Hercules',
            'Artemisa': 'Artemis',
            'Ares': 'Ares',
            'Thor': 'Thor',
        },
        scales: {
            HUMAN: 'Human Scale',
            LESSER: 'Lesser Creatures',
            MEDIUM: 'Medium Creatures',
            MYTHICAL: 'Mythical Creatures',
            HEROES: 'Heroes & Demigods',
            GODS: 'Minor Gods',
        },
    },

    // Difficulty Levels
    difficultyLevels: {
        BEGINNER: 'Beginner',
        INTERMEDIATE: 'Intermediate',
        ADVANCED: 'Advanced',
    },

    // Workout Types
    workoutTypes: {
        FULL_BODY: 'Full Body',
        UPPER_BODY: 'Upper Body',
        LOWER_BODY: 'Lower Body',
        CORE: 'Core',
        OFFICE: 'Office / Active Break',
    },

    // Gemini Prompt
    gemini: {
        noEquipment: "none (bodyweight only)",
        systemPrompt: "Act as an expert calisthenics and home fitness coach with a flair for RPG-style motivation. Your goal is to create a safe, effective, and engaging workout.",
        officeSystemPrompt: "Act as a physical therapist and ergonomics expert. Your goal is to create an 'active break' routine for office workers. The exercises must be subtle, safe, and performable at a desk, requiring no special equipment, no sweating, and without drawing attention. Focus on relieving tension in the neck, back, wrists, and improving circulation in the legs.",
        yellowDudeInspiration: "Additional Inspiration: Where possible, draw inspiration from the 'Yellow Dude' YouTube channel for creative and effective home calisthenics exercises.",
        workoutParametersTitle: "Workout Parameters:",
        difficultyParam: "- Difficulty Level: {0}",
        focusParam: "- Workout Focus: {0}",
        equipmentParam: "- Available Equipment: {0}",
        instructions: `
Instructions:
1.  Design a complete workout routine based on the user's parameters.
2.  The TOTAL workout time, including warm-up and cool-down, should be between 20 and 35 minutes (or 5-10 minutes for the Office Active Break). Adjust exercises, sets, and rests to meet this goal.
3.  Structure the routine into three distinct phases: a dynamic warm-up, the main workout, and a static cool-down.
4.  For beginners, suggest slightly longer rest periods. For advanced, suggest shorter rests.
5.  For each exercise, provide all the required fields in the schema.
6.  'estimatedTimeInSeconds' should be a realistic time to perform all sets of ONE exercise (e.g., 3 sets of 10 push-ups might take 90 seconds).
7.  'restAfterInSeconds' is the break AFTER an exercise is completed. A typical rest might be 30-90 seconds.
8.  Ensure the exercises are appropriate for the equipment provided. If no equipment is listed, generate a bodyweight-only routine.

The entire output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any text or markdown formatting before or after the JSON object.
        `,
    },

    equipment: {
        chair: 'Chair',
        wall: 'Wall',
        bed: 'Bed',
        table: 'Table',
        backpack: 'Backpack (weighted)',
    },

    achievementsContent: {
        first_workout: { title: 'The Journey Begins', unlocked: 'You completed your first quest! The adventure awaits.', locked: 'Complete your first workout to begin your legend.' },
        beginner_badge: { title: 'Recruit\'s Badge', unlocked: 'You have proven your mettle on the beginner training grounds.', locked: 'Complete a Beginner level workout.' },
        intermediate_badge: { title: 'Warrior\'s Medal', unlocked: 'You overcame intermediate challenges, a true warrior.', locked: 'Complete an Intermediate level workout.' },
        advanced_badge: { title: 'Champion\'s Mark', unlocked: 'You have mastered the toughest trials. You are a champion.', locked: 'Complete an Advanced level workout.' },
        ten_workouts: { title: 'Seasoned Adventurer', unlocked: '10 quests completed. You are becoming a legend.', locked: 'Complete 10 workouts.' },
        '25_workouts': { title: 'Quest Conqueror', unlocked: '25 quests is no small feat. Your fame grows.', locked: 'Complete 25 workouts.' },
        '50_workouts': { title: 'Quest Master', unlocked: 'You have completed 50 quests. Your dedication is legendary.', locked: 'Complete 50 workouts.' },
        streak_7: { title: 'Iron Will', unlocked: 'A week of unbroken dedication. Impressive!', locked: 'Maintain a 7-day workout streak.' },
        streak_15: { title: 'Unstoppable Force', unlocked: '15 days in a row. You are a force of nature.', locked: 'Maintain a 15-day workout streak.' },
        mr_flojo: { title: 'Mr. Lazy', unlocked: 'You have been absent from the battlefield. Have you lost your touch?', locked: 'Go 15 days without training.' },
        unlock_human_scale: { title: 'Human Scale', unlocked: 'You have entered the realm of powerful mortals.', locked: 'Reach Level 1.' },
        unlock_lesser_creatures: { title: 'Lesser Creature Scale', unlocked: 'Your power rivals the beasts of the wild.', locked: 'Reach Level 10.' },
        unlock_medium_creatures: { title: 'Medium Creature Scale', unlocked: 'You have surpassed the strength of common monsters.', locked: 'Reach Level 20.' },
        unlock_mythical_creatures: { title: 'Mythical Creature Scale', unlocked: 'Your name is whispered alongside legends.', locked: 'Reach Level 32.' },
        unlock_heroes_scale: { title: 'Hero Scale', unlocked: 'Your power is that of demigods and heroes of old.', locked: 'Reach Level 44.' },
        unlock_gods_scale: { title: 'God Scale', unlocked: 'You have ascended. Your power is divine.', locked: 'Reach Level 50.' }
    },

    shopContent: {
        frames: {
            title: 'Frames',
            monthly: { name: 'Monthly Conquest Frame', description: 'A legendary frame for those who complete 25 quests in a month.', unlockHint: 'Complete 25 quests this month.' },
            legend: { name: 'Frame of the Legend', description: 'A mythical item not for sale. For true legends only.' },
            bronze: { name: 'Bronze Frame', description: 'A simple yet elegant frame for the humble warrior.' },
            white: { name: 'White Frame', description: 'A clean and minimalistic frame.' },
            gray: { name: 'Gray Frame', description: 'A basic and functional frame.' },
        },
        backgrounds: {
            title: 'Backgrounds',
            streak_25: { name: 'Mythic Background', description: 'A background for those with an unbreakable will.', unlockHint: 'Reach a 25-day streak.' },
            legend: { name: 'Background of the Legend', description: 'A mythical item not for sale. For true legends only.' },
            blue_nebula: { name: 'Blue Nebula', description: 'A cosmic backdrop for your profile.' },
            crimson_ember: { name: 'Crimson Ember', description: 'A fiery background that radiates power.' },
            matte_black: { name: 'Matte Black', description: 'A sleek and stealthy background.' },
            matte_white: { name: 'Matte White', description: 'A clean and bright background.' },
            matte_blue: { name: 'Matte Blue', description: 'A calm and serene background.' },
        },
        avatars: {
            title: 'Avatars',
            alpha: { name: 'Alpha Avatar', description: 'The beginning of everything.' },
            omega: { name: 'Omega Avatar', description: 'The end of everything.' },
            sigma: { name: 'Sigma Avatar', description: 'The sum of all things.' },
            robot: { name: 'Robot Avatar', description: 'Efficiency and computing power.' },
            dragon: { name: 'Dragon Avatar', description: 'Ancient power and wisdom.' },
            lion: { name: 'Lion Avatar', description: 'Courage and nobility.' },
        }
    },

    rpgRewards: {
        frame_human_scale: { name: 'Human Frame', description: 'Forged in the struggle of humanity.' },
        bg_human_scale: { name: 'Human Dawn', description: 'The glow of perseverance.' },
        frame_lesser_scale: { name: 'Lesser Beast Frame', description: 'Engraved with runes of wild creatures.' },
        bg_lesser_scale: { name: 'Ethereal Forest', description: 'Where lesser creatures lurk.' },
        avatar_goblin: { name: 'Goblin Avatar', description: 'The cunning of lesser creatures.' },
        frame_medium_scale: { name: 'Monster Frame', description: 'Reinforced with the fury of monsters.' },
        bg_medium_scale: { name: 'Crimson Fury', description: 'The echo of brutal battles.' },
        avatar_minotaur: { name: 'Minotaur Avatar', description: 'The brute force of monsters.' },
        frame_mythic_scale: { name: 'Mythic Frame', description: 'Imbued with legendary power.' },
        bg_mythic_scale: { name: 'Mythic Nebula', description: 'A glimpse into divine realms.' },
        avatar_gorgon: { name: 'Gorgon Avatar', description: 'The petrifying gaze of myths.' },
        frame_hero_scale: { name: 'Heroic Frame', description: 'Worthy of the greatest heroes.' },
        bg_hero_scale: { name: 'Heroic Sunset', description: 'The glow of an era of heroes.' },
        avatar_hercules: { name: 'Hercules Avatar', description: 'The strength of a demigod.' },
        frame_god_scale: { name: 'Divine Frame', description: 'A gift from the gods.' },
        bg_god_scale: { name: 'Divine Aura', description: 'The atmosphere of Olympus.' },
        avatar_olympic: { name: 'Olympian Avatar', description: 'The power of Zeus\'s lightning.' },
    },
};