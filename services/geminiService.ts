import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";
import { Workout, DifficultyLevel, EquipmentOption, WorkoutType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });



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
    // Intento con Gemini primero
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

    workoutData.level = difficulty;
    workoutData.workoutType = workoutType;

    return workoutData as Workout;
  } catch (error: any) {
    console.error("Error con Gemini:", error);

    // Si Gemini falla, intento con OpenAI
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // puedes usar también gpt-4.1-mini o el gratuito disponible
        messages: [
          {
            role: "system",
            content:
              "Eres un generador de rutinas de entrenamiento en formato JSON. Sigue el esquema proporcionado estrictamente.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      });

      const jsonText = response.choices[0].message?.content ?? "{}";
      const workoutData = JSON.parse(jsonText);

      workoutData.level = difficulty;
      workoutData.workoutType = workoutType;

      return workoutData as Workout;
    } catch (fallbackError) {
      console.error("Error con OpenAI:", fallbackError);
      throw new Error("No se pudo generar la rutina con Gemini ni con OpenAI.");
    }
  }
};
