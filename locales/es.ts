export const es = {
    // General
    appName: "FitQuest RPG",

    // Views
    views: {
        WORKOUT: "ENTRENAR",
        RPG: "RPG",
        PROFILE: "PERFIL",
        SHOP: "TIENDA",
        ACHIEVEMENTS: "LOGROS",
    },

    // Character Creation
    character: {
        title: "Crea Tu Héroe",
        subtitle: "Tu aventura de fitness está a punto de comenzar.",
        nameLabel: "Nombre del Héroe (Opcional)",
        namePlaceholder: "Ingresa tu nombre",
        genderLabel: "Elige el género de tu avatar.",
        male: "Masculino",
        female: "Femenino",
        submit: "Comenzar Aventura",
    },

    // Header
    header: {
        level: "Nivel",
        quests: "Misiones",
        streak: "Racha",
        gold: "Oro",
    },
    
    // Loading
    loading: {
        generating: "Forjando tu misión...",
        generatingHint: "Los herreros digitales están trabajando duro.",
    },

    // Error
    error: {
        title: "Ocurrió un Error",
        generateWorkout: "No se pudo generar tu entrenamiento. Revisa tu conexión e inténtalo de nuevo.",
        tryAgain: "Intentar de Nuevo",
    },

    // Workout Generator
    generator: {
        title: "Generar Nueva Misión",
        difficulty: "Nivel de Dificultad",
        focus: "Enfoque del Entrenamiento",
        equipment: "Equipo Disponible",
        equipmentHint: "Selecciona cualquier artículo del hogar que puedas usar. Déjalo en blanco para solo peso corporal.",
        inspiration: "Inspiración (Opcional)",
        yellowDudeLabel: "Estilo Yellow Dude",
        yellowDudeHint: "Incorpora ejercicios de calistenia creativos inspirados en el canal de YouTube 'Yellow Dude'.",
        submit: "CREAR MI ENTRENAMIENTO",
        arceusHint: "Debug: Maximizar nivel, racha y misiones mensuales.",
    },
    
    // Workout Display
    display: {
        regenerate: "REGENERAR MISIÓN",
        begin: "COMENZAR MISIÓN",
    },

    // Workout In Progress
    inProgress: {
        loading: "Cargando ejercicio...",
        exerciseCount: "Ejercicio {0} de {1}",
        restTitle: "DESCANSO",
        exerciseTitle: "EJERCICIO ACTUAL",
        restMessage: "Toma un respiro",
        nextUp: "Siguiente:",
        finishing: "Finalizando enfriamiento",
        skipRest: "SALTAR DESCANSO",
        nextExercise: "LISTO, SIGUIENTE!",
    },

    // Workout Summary
    summary: {
        title: "¡MISIÓN COMPLETA!",
        subtitle: "Conquistaste \"{0}\"",
        rewardsTitle: "RECOMPENSAS",
        xpLabel: "XP Base + Bono de Tiempo",
        goldLabel: "Monedas Obtenidas",
        progressTitle: "PROGRESO",
        levelLabel: "Nivel {0}",
        currentLevel: "Nivel Actual",
        streakLabel: "¡Racha de {0} Días!",
        keepItUp: "¡Sigue así!",
        newQuestButton: "INICIAR NUEVA MISIÓN",
    },
    
    // Profile
    profile: {
        title: "Perfil del Héroe",
        defaultName: "Aventurero Nv. {0}",
        questsDone: "Misiones Completas",
        currentStreak: "Racha Actual",
        days: "{0} Días",
        totalGold: "Oro Total",
        currentLevel: "Nivel Actual",
        restPlannerTitle: "Planificador de Descanso Semanal",
        daysOfWeekShort: "D,L,M,M,J,V,S",
        toggleDay: "Alternar {0}",
        inventoryTitle: "Tu Inventario",
        emptyInventory: "¡Visita la tienda para adquirir nuevos artículos!",
        equip: "EQUIPAR",
        unequip: "DESEQUIPAR",
        showMore: "Ver Más",
        showLess: "Ver Menos",
    },
    
    // Shop
    shop: {
        title: "Tienda del Héroe",
        monthlyFrameProgress: "Completa {0} entrenamientos más este mes.",
        lockedDefault: "Este artículo está bloqueado.",
        owned: "ADQUIRIDO",
        purchase: "Comprar por {0}",
    },

    // Achievements
    achievements: {
        title: "Salón de la Fama",
        subtitle: "Tus hazañas y medallas de honor. Puedes anclar hasta 3 en tu perfil.",
        pin: "Anclar al perfil",
        unpin: "Desanclar del perfil",
        showcaseFull: "El escaparate está lleno",
    },
    
    // RPG
    rpg: {
        title: "Arena RPG",
        progressionTitle: "Progresión del Héroe",
        currentRank: "Rango Actual",
        nextRank: "Siguiente Rango",
        reachLevel: "Alcanza el Nivel {0} para ascender",
        maxRank: "¡RANGO MÁXIMO ALCANZADO!",
        legend: "¡Eres una verdadera leyenda!",
        statsTitle: "Estadísticas del Héroe",
        statsSubtitle: "Asigna puntos para fortalecerte.",
        availablePoints: "Puntos de Héroe Disponibles",
        strength: "Fuerza",
        agility: "Agilidad",
        endurance: "Resistencia",
        reset: "Reiniciar",
        confirm: "Confirmar",
        ranks: {
            'Humano_Sedentario': 'Humano Sedentario',
            'Soldado': 'Soldado',
            'Gladiador': 'Gladiador',
            'Espartano': 'Espartano',
            'Goblin': 'Goblin',
            'Esqueleto_Animado': 'Esqueleto Animado',
            'Zombie': 'Zombie',
            'Sátiro': 'Sátiro',
            'Orco': 'Orco',
            'Troll': 'Troll',
            'Hombre_Lobo': 'Hombre Lobo',
            'Minotauro': 'Minotauro',
            'Cíclope_Joven': 'Cíclope Joven',
            'Gorgona': 'Gorgona',
            'Grifo': 'Grifo',
            'Quimera': 'Quimera',
            'Hydra_de_3_Cabezas': 'Hydra de 3 Cabezas',
            'Mantícora': 'Mantícora',
            'Gigante_de_Hielo': 'Gigante de Hielo',
            'Odiseo': 'Odiseo',
            'Atalanta': 'Atalanta',
            'Aquiles': 'Aquiles',
            'Perseo': 'Perseo',
            'Hércules': 'Hércules',
            'Artemisa': 'Artemisa',
            'Ares': 'Ares',
            'Thor': 'Thor',
        },
        scales: {
            HUMAN: 'Escala Humana',
            LESSER: 'Criaturas Menores',
            MEDIUM: 'Criaturas Medianas',
            MYTHICAL: 'Criaturas Míticas',
            HEROES: 'Héroes y Semidioses',
            GODS: 'Dioses Menores',
        },
    },

    // Difficulty Levels
    difficultyLevels: {
        BEGINNER: 'Principiante',
        INTERMEDIATE: 'Intermedio',
        ADVANCED: 'Avanzado',
    },

    // Workout Types
    workoutTypes: {
        FULL_BODY: 'Cuerpo Completo',
        UPPER_BODY: 'Tren Superior',
        LOWER_BODY: 'Tren Inferior',
        CORE: 'Núcleo',
        OFFICE: 'Pausa Activa (Oficina)',
    },

    // Gemini Prompt
    gemini: {
        noEquipment: "ninguno (solo peso corporal)",
        systemPrompt: "Actúa como un experto entrenador de calistenia y fitness en casa con un toque de motivación estilo RPG. Tu objetivo es crear un entrenamiento seguro, efectivo y atractivo.",
        officeSystemPrompt: "Actúa como un fisioterapeuta y experto en ergonomía. Tu objetivo es crear una rutina de 'pausa activa' para oficinistas. Los ejercicios deben ser sutiles, seguros y realizables en un escritorio, sin necesidad de equipo especial, sin sudar y sin llamar la atención. Enfócate en aliviar la tensión en el cuello, espalda, muñecas y mejorar la circulación en las piernas.",
        yellowDudeInspiration: "Inspiración Adicional: Si es posible, inspírate en el canal de YouTube 'Yellow Dude' para ejercicios de calistenia creativos y efectivos en casa.",
        workoutParametersTitle: "Parámetros del Entrenamiento:",
        difficultyParam: "- Nivel de Dificultad: {0}",
        focusParam: "- Enfoque del Entrenamiento: {0}",
        equipmentParam: "- Equipo Disponible: {0}",
        instructions: `
Instrucciones:
1. Diseña una rutina de entrenamiento completa basada en los parámetros del usuario.
2. El tiempo TOTAL del entrenamiento, incluyendo calentamiento y enfriamiento, debe ser entre 20 y 35 minutos (o 5-10 minutos para la Pausa Activa de oficina). Ajusta ejercicios, series y descansos para cumplir este objetivo.
3. Estructura la rutina en fases distintas: un calentamiento dinámico, el entrenamiento principal y un enfriamiento estático.
4. Para principiantes, sugiere periodos de descanso ligeramente más largos. Para avanzados, sugiere descansos más cortos.
5. Para cada ejercicio, proporciona todos los campos requeridos en el esquema.
6. 'estimatedTimeInSeconds' debe ser un tiempo realista para realizar todas las series de UN ejercicio (ej. 3 series de 10 flexiones podrían tomar 90 segundos).
7. 'restAfterInSeconds' es el descanso DESPUÉS de completar un ejercicio. Un descanso típico puede ser de 30-90 segundos.
8. Asegúrate de que los ejercicios sean apropiados para el equipo proporcionado. Si no se lista equipo, genera una rutina de solo peso corporal.

La salida completa DEBE ser un único objeto JSON válido que se adhiera estrictamente al esquema proporcionado. No incluyas ningún texto o formato markdown antes o después del objeto JSON.
        `,
    },

    equipment: {
        chair: 'Silla',
        wall: 'Pared',
        bed: 'Cama',
        table: 'Mesa',
        backpack: 'Mochila (con peso)',
    },
    
    achievementsContent: {
        first_workout: { title: 'El Viaje Comienza', unlocked: '¡Has completado tu primera misión! La aventura te espera.', locked: 'Completa tu primer entrenamiento para empezar tu leyenda.' },
        beginner_badge: { title: 'Insignia de Recluta', unlocked: 'Has probado tu valía en el campo de entrenamiento para principiantes.', locked: 'Completa un entrenamiento de nivel Principiante.' },
        intermediate_badge: { title: 'Medalla de Guerrero', unlocked: 'Superaste los desafíos intermedios, un verdadero guerrero.', locked: 'Completa un entrenamiento de nivel Intermedio.' },
        advanced_badge: { title: 'Marca del Campeón', unlocked: 'Has dominado las pruebas más duras. Eres un campeón.', locked: 'Completa un entrenamiento de nivel Avanzado.' },
        ten_workouts: { title: 'Aventurero Veterano', unlocked: '10 misiones completadas. Te estás convirtiendo en una leyenda.', locked: 'Completa 10 entrenamientos.' },
        '25_workouts': { title: 'Conquistador de Misiones', unlocked: '25 misiones no son poca cosa. Tu fama crece.', locked: 'Completa 25 entrenamientos.' },
        '50_workouts': { title: 'Maestro de Misiones', unlocked: 'Has completado 50 misiones. Tu dedicación es legendaria.', locked: 'Completa 50 entrenamientos.' },
        streak_7: { title: 'Voluntad de Hierro', unlocked: 'Una semana de dedicación ininterrumpida. ¡Impresionante!', locked: 'Mantén una racha de 7 días de entrenamiento.' },
        streak_15: { title: 'Fuerza Imparable', unlocked: '15 días seguidos. Eres una fuerza de la naturaleza.', locked: 'Mantén una racha de 15 días de entrenamiento.' },
        mr_flojo: { title: 'Sr. Flojo', unlocked: 'Has estado ausente del campo de batalla. ¿Has perdido tu toque?', locked: 'Pasa 15 días sin entrenar.' },
        unlock_human_scale: { title: 'Escala Humana', unlocked: 'Has entrado en el reino de los mortales poderosos.', locked: 'Alcanza el Nivel 1.' },
        unlock_lesser_creatures: { title: 'Escala de Criaturas Menores', unlocked: 'Tu poder rivaliza con las bestias del desierto.', locked: 'Alcanza el Nivel 10.' },
        unlock_medium_creatures: { title: 'Escala de Criaturas Medianas', unlocked: 'Has superado la fuerza de los monstruos comunes.', locked: 'Alcanza el Nivel 20.' },
        unlock_mythical_creatures: { title: 'Escala de Criaturas Míticas', unlocked: 'Tu nombre es susurrado junto a leyendas.', locked: 'Alcanza el Nivel 32.' },
        unlock_heroes_scale: { title: 'Escala de Héroes', unlocked: 'Tu poder es el de los semidioses y héroes de antaño.', locked: 'Alcanza el Nivel 44.' },
        unlock_gods_scale: { title: 'Escala de Dioses', unlocked: 'Has ascendido. Tu poder es divino.', locked: 'Alcanza el Nivel 50.' }
    },

    shopContent: {
        frames: {
            title: 'Marcos',
            monthly: { name: 'Marco de Conquista Mensual', description: 'Un marco legendario para quienes completan 25 misiones en un mes.', unlockHint: 'Completa 25 misiones este mes.' },
            legend: { name: 'Marco de la Leyenda', description: 'Un objeto mítico que no está a la venta. Solo para verdaderas leyendas.', },
            bronze: { name: 'Marco de Bronce', description: 'Un marco simple pero elegante para el guerrero humilde.' },
            white: { name: 'Marco Blanco', description: 'Un marco limpio y minimalista.' },
            gray: { name: 'Marco Gris', description: 'Un marco básico y funcional.' },
        },
        backgrounds: {
            title: 'Fondos',
            streak_25: { name: 'Fondo Mítico', description: 'Un fondo para aquellos con una voluntad inquebrantable.', unlockHint: 'Alcanza una racha de 25 días.' },
            legend: { name: 'Fondo de la Leyenda', description: 'Un objeto mítico que no está a la venta. Solo para verdaderas leyendas.' },
            blue_nebula: { name: 'Nebulosa Azul', description: 'Un fondo cósmico para tu perfil.' },
            crimson_ember: { name: 'Ascua Carmesí', description: 'Un fondo ardiente que irradia poder.' },
            matte_black: { name: 'Negro Mate', description: 'Un fondo elegante y sigiloso.' },
            matte_white: { name: 'Blanco Mate', description: 'Un fondo limpio y brillante.' },
            matte_blue: { name: 'Azul Mate', description: 'Un fondo calmado y sereno.' },
        },
        avatars: {
            title: 'Avatares',
            alpha: { name: 'Avatar Alfa', description: 'El principio de todo.' },
            omega: { name: 'Avatar Omega', description: 'El fin de todo.' },
            sigma: { name: 'Avatar Sigma', description: 'La suma de todas las cosas.' },
            robot: { name: 'Avatar Robot', description: 'Eficiencia y poder de cómputo.' },
            dragon: { name: 'Avatar Dragón', description: 'Poder antiguo y sabiduría.' },
            lion: { name: 'Avatar León', description: 'Coraje y nobleza.' },
        }
    },

    rpgRewards: {
        frame_human_scale: { name: 'Marco Humano', description: 'Forjado en la lucha de la humanidad.' },
        bg_human_scale: { name: 'Amanecer Humano', description: 'El resplandor de la perseverancia.' },
        frame_lesser_scale: { name: 'Marco de Bestia Menor', description: 'Grabado con runas de criaturas salvajes.' },
        bg_lesser_scale: { name: 'Bosque Espectral', description: 'Donde acechan las criaturas menores.' },
        avatar_goblin: { name: 'Avatar de Goblin', description: 'La astucia de las criaturas menores.' },
        frame_medium_scale: { name: 'Marco de Monstruo', description: 'Reforzado con la furia de monstruos.' },
        bg_medium_scale: { name: 'Furia Carmesí', description: 'El eco de batallas brutales.' },
        avatar_minotaur: { name: 'Avatar de Minotauro', description: 'La fuerza bruta de los monstruos.' },
        frame_mythic_scale: { name: 'Marco Mítico', description: 'Imbuido con poder legendario.' },
        bg_mythic_scale: { name: 'Nebulosa Mítica', description: 'Un vistazo a los reinos divinos.' },
        avatar_gorgon: { name: 'Avatar de Gorgona', description: 'La mirada petrificante de los mitos.' },
        frame_hero_scale: { name: 'Marco Heroico', description: 'Digno de los más grandes héroes.' },
        bg_hero_scale: { name: 'Ocaso Heroico', description: 'El brillo de una era de héroes.' },
        avatar_hercules: { name: 'Avatar de Hércules', description: 'La fuerza de un semidiós.' },
        frame_god_scale: { name: 'Marco Divino', description: 'Un regalo de los dioses.' },
        bg_god_scale: { name: 'Aura Divina', description: 'La atmósfera del Olimpo.' },
        avatar_olympic: { name: 'Avatar Olímpico', description: 'El poder del rayo de Zeus.' },
    },
};

export type Translations = typeof es;