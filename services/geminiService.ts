// services/geminiService.ts
import { GoogleGenAI } from "@google/genai";
import { Workout, DifficultyLevel, EquipmentOption, WorkoutType } from "../types";

// Inicializa Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const generateWorkout = async (
  difficulty: DifficultyLevel,
  equipment: EquipmentOption[],
  workoutType: WorkoutType,
  t: (key: string, ...args: any[]) => string,
  useYellowDudeInspiration: boolean
): Promise<Workout> => {
  const equipmentList =
    equipment.length > 0
      ? equipment.map((e) => e.name).join(", ")
      : t("gemini.noEquipment");

  const difficultyText = t(`difficultyLevels.${difficulty}`);
  const workoutTypeText = t(`workoutTypes.${workoutType}`);

  const systemPrompt =
    workoutType === WorkoutType.OFFICE
      ? t("gemini.officeSystemPrompt")
      : t("gemini.systemPrompt");

  const yellowDudePrompt = useYellowDudeInspiration
    ? `\n${t("gemini.yellowDudeInspiration")}\n`
    : "";

  const prompt = `
    ${systemPrompt}
    
    ${t("gemini.workoutParametersTitle")}
    - ${t("gemini.difficultyParam", difficultyText)}
    - ${t("gemini.focusParam", workoutTypeText)}
    - ${t("gemini.equipmentParam", equipmentList)}
    ${yellowDudePrompt}
    ${t("gemini.instructions")}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite", // Cambia aquí si quieres usar otro modelo gratuito
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // responseSchema: workoutSchema, // opcional si tienes un esquema definido
      },
    });

    const workoutData: Workout = JSON.parse(response.text);
    workoutData.level = difficulty;
    workoutData.workoutType = workoutType;

    return workoutData;
  } catch (error) {
    console.error("Error generando la rutina con Gemini:", error);
    throw new Error("No se pudo generar la rutina con Gemini.");
  }
};
