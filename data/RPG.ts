import { CosmeticItem } from '../types';

export const RPG_SCALES = {
    HUMAN: { name: 'Escala Humana', color: 'text-orange-400', unlockLevel: 1 },
    LESSER: { name: 'Criaturas Menores', color: 'text-green-400', unlockLevel: 10 },
    MEDIUM: { name: 'Criaturas Medianas', color: 'text-red-500', unlockLevel: 20 },
    MYTHICAL: { name: 'Criaturas Míticas', color: 'text-purple-400', unlockLevel: 32 },
    HEROES: { name: 'Héroes y Semidioses', color: 'text-yellow-400', unlockLevel: 44 },
    GODS: { name: 'Dioses Menores', color: 'text-cyan-300', unlockLevel: 50 },
};

export const RPG_RANKS = [
    { level: 1, title: 'Humano Sedentario', scale: RPG_SCALES.HUMAN },
    { level: 3, title: 'Soldado', scale: RPG_SCALES.HUMAN },
    { level: 5, title: 'Gladiador', scale: RPG_SCALES.HUMAN },
    { level: 7, title: 'Espartano', scale: RPG_SCALES.HUMAN },
    
    { level: 10, title: 'Goblin', scale: RPG_SCALES.LESSER },
    { level: 13, title: 'Esqueleto Animado', scale: RPG_SCALES.LESSER },
    { level: 15, title: 'Zombie', scale: RPG_SCALES.LESSER },
    { level: 17, title: 'Sátiro', scale: RPG_SCALES.LESSER },

    { level: 20, title: 'Orco', scale: RPG_SCALES.MEDIUM },
    { level: 22, title: 'Troll', scale: RPG_SCALES.MEDIUM },
    { level: 25, title: 'Hombre Lobo', scale: RPG_SCALES.MEDIUM },
    { level: 27, title: 'Minotauro', scale: RPG_SCALES.MEDIUM },
    { level: 30, title: 'Cíclope Joven', scale: RPG_SCALES.MEDIUM },

    { level: 32, title: 'Gorgona', scale: RPG_SCALES.MYTHICAL },
    { level: 34, title: 'Grifo', scale: RPG_SCALES.MYTHICAL },
    { level: 36, title: 'Quimera', scale: RPG_SCALES.MYTHICAL },
    { level: 38, title: 'Hydra de 3 Cabezas', scale: RPG_SCALES.MYTHICAL },
    { level: 40, title: 'Mantícora', scale: RPG_SCALES.MYTHICAL },
    { level: 42, title: 'Gigante de Hielo', scale: RPG_SCALES.MYTHICAL },

    { level: 44, title: 'Odiseo', scale: RPG_SCALES.HEROES },
    { level: 45, title: 'Atalanta', scale: RPG_SCALES.HEROES },
    { level: 46, title: 'Aquiles', scale: RPG_SCALES.HEROES },
    { level: 47, title: 'Perseo', scale: RPG_SCALES.HEROES },
    { level: 49, title: 'Hércules', scale: RPG_SCALES.HEROES },

    { level: 50, title: 'Artemisa', scale: RPG_SCALES.GODS },
    { level: 51, title: 'Ares', scale: RPG_SCALES.GODS },
    { level: 52, title: 'Thor', scale: RPG_SCALES.GODS },
];

export const RPG_REWARDS: Array<CosmeticItem & { unlockLevel: number }> = [
    // Human Scale Rewards
    { 
        id: 'frame_human_scale', 
        name: 'Marco Humano', 
        type: 'frame', 
        cost: 0, 
        asset: 'border-orange-500', 
        description: 'Forjado en la lucha de la humanidad.', 
        unlockLevel: RPG_SCALES.HUMAN.unlockLevel 
    },
    { 
        id: 'bg_human_scale', 
        name: 'Amanecer Humano', 
        type: 'background', 
        cost: 0, 
        asset: 'bg-gradient-to-br from-orange-600 to-gray-800', 
        description: 'El resplandor de la perseverancia.', 
        unlockLevel: RPG_SCALES.HUMAN.unlockLevel 
    },
    // Lesser Creatures Scale Rewards
    { 
        id: 'frame_lesser_scale', 
        name: 'Marco de Bestia Menor', 
        type: 'frame', 
        cost: 0, 
        asset: 'border-green-500', 
        description: 'Grabado con runas de criaturas salvajes.', 
        unlockLevel: RPG_SCALES.LESSER.unlockLevel 
    },
    { 
        id: 'bg_lesser_scale', 
        name: 'Bosque Espectral', 
        type: 'background', 
        cost: 0, 
        asset: 'bg-gradient-to-br from-green-600 to-gray-800', 
        description: 'Donde acechan las criaturas menores.', 
        unlockLevel: RPG_SCALES.LESSER.unlockLevel 
    },
    { 
        id: 'avatar_goblin', 
        name: 'Avatar de Goblin', 
        type: 'avatar', 
        cost: 0, 
        asset: '👺', 
        description: 'La astucia de las criaturas menores.', 
        unlockLevel: RPG_SCALES.LESSER.unlockLevel 
    },
    // Medium Creatures Scale Rewards
    { 
        id: 'frame_medium_scale', 
        name: 'Marco de Monstruo', 
        type: 'frame', 
        cost: 0, 
        asset: 'border-red-700', 
        description: 'Reforzado con la furia de monstruos.', 
        unlockLevel: RPG_SCALES.MEDIUM.unlockLevel 
    },
    { 
        id: 'bg_medium_scale', 
        name: 'Furia Carmesí', 
        type: 'background', 
        cost: 0, 
        asset: 'bg-gradient-to-br from-red-800 to-gray-800', 
        description: 'El eco de batallas brutales.', 
        unlockLevel: RPG_SCALES.MEDIUM.unlockLevel 
    },
    { 
        id: 'avatar_minotaur', 
        name: 'Avatar de Minotauro', 
        type: 'avatar', 
        cost: 0, 
        asset: '🐃', 
        description: 'La fuerza bruta de los monstruos.', 
        unlockLevel: RPG_SCALES.MEDIUM.unlockLevel 
    },
    // Mythical Creatures Scale Rewards
    { 
        id: 'frame_mythic_scale', 
        name: 'Marco Mítico', 
        type: 'frame', 
        cost: 0, 
        asset: 'border-purple-500', 
        description: 'Imbuido con poder legendario.', 
        unlockLevel: RPG_SCALES.MYTHICAL.unlockLevel 
    },
    { 
        id: 'bg_mythic_scale', 
        name: 'Nebulosa Mítica', 
        type: 'background', 
        cost: 0, 
        asset: 'bg-gradient-to-br from-purple-600 to-gray-800', 
        description: 'Un vistazo a los reinos divinos.', 
        unlockLevel: RPG_SCALES.MYTHICAL.unlockLevel 
    },
    { 
        id: 'avatar_gorgon', 
        name: 'Avatar de Gorgona', 
        type: 'avatar', 
        cost: 0, 
        asset: '🐍', 
        description: 'La mirada petrificante de los mitos.', 
        unlockLevel: RPG_SCALES.MYTHICAL.unlockLevel 
    },
    // Heroes & Demigods Scale Rewards
    { 
        id: 'frame_hero_scale', 
        name: 'Marco Heroico', 
        type: 'frame', 
        cost: 0, 
        asset: 'border-yellow-400', 
        description: 'Digno de los más grandes héroes.', 
        unlockLevel: RPG_SCALES.HEROES.unlockLevel 
    },
    { 
        id: 'bg_hero_scale', 
        name: 'Ocaso Heroico', 
        type: 'background', 
        cost: 0, 
        asset: 'bg-gradient-to-br from-yellow-500 to-gray-800', 
        description: 'El brillo de una era de héroes.', 
        unlockLevel: RPG_SCALES.HEROES.unlockLevel 
    },
    { 
        id: 'avatar_hercules', 
        name: 'Avatar de Hércules', 
        type: 'avatar', 
        cost: 0, 
        asset: '💪', 
        description: 'La fuerza de un semidiós.', 
        unlockLevel: RPG_SCALES.HEROES.unlockLevel 
    },
    // Gods Scale Rewards
    { 
        id: 'frame_god_scale', 
        name: 'Marco Divino', 
        type: 'frame', 
        cost: 0, 
        asset: 'border-cyan-300', 
        description: 'Un regalo de los dioses.', 
        unlockLevel: RPG_SCALES.GODS.unlockLevel 
    },
    { 
        id: 'bg_god_scale', 
        name: 'Aura Divina', 
        type: 'background', 
        cost: 0, 
        asset: 'bg-gradient-to-br from-cyan-400 to-gray-800', 
        description: 'La atmósfera del Olimpo.', 
        unlockLevel: RPG_SCALES.GODS.unlockLevel 
    },
    { 
        id: 'avatar_olympic', 
        name: 'Avatar Olímpico', 
        type: 'avatar', 
        cost: 0, 
        asset: '⚡️', 
        description: 'El poder del rayo de Zeus.', 
        unlockLevel: 52 // Max level
    },
];
