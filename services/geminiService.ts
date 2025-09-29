// api/generateWorkout.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { Workout, DifficultyLevel, EquipmentOption, WorkoutType } from "../../types";

// Inicializa las APIs con las keys desde variables de entorno
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { difficulty, equipment, workoutType, useYellowDudeInspiration, t } = req.body;

    // Construye los textos
    const equipmentList =
      equipment.length > 0
        ? equipment.map((e: EquipmentOption) => e.name).join(", ")
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

    // Intentamos generar con Gemini
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          // responseSchema: workoutSchema, // Opcional, si tienes schema definido
        },
      });

      const workoutData: Workout = JSON.parse(response.text);
      workoutData.level = difficulty;
      workoutData.workoutType = workoutType;

      return res.status(200).json(workoutData);
    } catch (geminiError) {
      console.error("Error con Gemini:", geminiError);

      // Fallback a OpenAI
      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres un generador de rutinas de entrenamiento en formato JSON. Sigue el esquema proporcionado estrictamente.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      });

      const workoutData: Workout = JSON.parse(
        openaiResponse.choices[0].message?.content || "{}"
      );
      workoutData.level = difficulty;
      workoutData.workoutType = workoutType;

      return res.status(200).json(workoutData);
    }
  } catch (error) {
    console.error("Error general al generar la rutina:", error);
    return res.status(500).json({ error: "No se pudo generar la rutina" });
  }
}
