import { GoogleGenAI, Type } from "@google/genai";
import { Workout, DifficultyLevel, EquipmentOption, WorkoutType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const exerciseSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        muscles: { type: Type.STRING, description: "Primary muscle groups targeted." },
        sets: { type: Type.INTEGER },
        reps: { type: Type.STRING, description: "Reps or duration (e.g., '10-12', '30 seconds')." },
        description: { type: Type.STRING, description: "Clear, concise instructions on how to perform the exercise, including tips for using the specified household item." },
        equipment: { type: Type.STRING, description: "Household item used, or 'Bodyweight'." },
        estimatedTimeInSeconds: { type: Type.INTEGER, description: "The estimated time in seconds to complete all sets of this single exercise, excluding rest time."},
        restAfterInSeconds: { type: Type.INTEGER, description: "Recommended rest time in seconds after completing all sets of this exercise before moving to the next."}
    },
    required: ["name", "muscles", "sets", "reps", "description", "equipment", "estimatedTimeInSeconds", "restAfterInSeconds"]
};

const workoutSectionSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        exercises: {
            type: Type.ARRAY,
            items: exerciseSchema
        }
    },
    required: ["title", "exercises"]
};

const workoutSchema = {
    type: Type.OBJECT,
    properties: {
        workoutName: { type: Type.STRING, description: "A cool, motivational, RPG-style name for the workout (e.g., 'The Forge of Strength', 'Goblin Gauntlet')." },
        level: { type: Type.STRING, enum: Object.values(DifficultyLevel), description: "The difficulty level of the workout. This should match the user's requested difficulty." },
        workoutType: { type: Type.STRING, enum: Object.values(WorkoutType), description: "The focus of the workout, e.g., 'Full Body'."},
        estimatedTime: { type: Type.STRING, description: "Estimated total time to complete the workout in minutes (e.g., '25-30 minutes')." },
        warmup: workoutSectionSchema,
        mainWorkout: workoutSectionSchema,
        cooldown: workoutSectionSchema
    },
    required: ["workoutName", "level", "workoutType", "estimatedTime", "warmup", "mainWorkout", "cooldown"]
};


export const generateWorkout = async (
    difficulty: DifficultyLevel, 
    equipment: EquipmentOption[], 
    workoutType: WorkoutType,
    t: (key: string, ...args: any[]) => string,
    useYellowDudeInspiration: boolean
): Promise<Workout> => {
    const equipmentList = equipment.length > 0 ? equipment.map(e => e.name).join(', ') : t('gemini.noEquipment');
    const difficultyText = t(`difficultyLevels.${difficulty}`);
    const workoutTypeText = t(`workoutTypes.${workoutType}`);
    
    const systemPrompt = workoutType === WorkoutType.OFFICE 
        ? t('gemini.officeSystemPrompt')
        : t('gemini.systemPrompt');
        
    const yellowDudePrompt = useYellowDudeInspiration ? `\n${t('gemini.yellowDudeInspiration')}\n` : "";

    const prompt = `
        ${systemPrompt}
        
        ${t('gemini.workoutParametersTitle')}
        - ${t('gemini.difficultyParam', difficultyText)}
        - ${t('gemini.focusParam', workoutTypeText)}
        - ${t('gemini.equipmentParam', equipmentList)}
        ${yellowDudePrompt}
        ${t('gemini.instructions')}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: workoutSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const workoutData = JSON.parse(jsonText);
        
        // Ensure the level from the response matches the requested difficulty
        workoutData.level = difficulty;
        workoutData.workoutType = workoutType;

        return workoutData as Workout;

    } catch (error) {
        console.error("Error generating workout from Gemini:", error);
        throw new Error("Failed to generate workout plan.");
    }
};