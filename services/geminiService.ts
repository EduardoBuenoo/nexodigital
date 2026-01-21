
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

export const getBusinessDiagnosis = async (businessInfo: string): Promise<DiagnosisResult> => {
  // Fix: Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analise o seguinte negócio e forneça um diagnóstico digital rápido: "${businessInfo}". Foco em landing pages, automação de WhatsApp e Google Meu Negócio.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: {
            type: Type.STRING,
            description: "Uma breve análise do cenário atual do negócio.",
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de 3 recomendações prioritárias.",
          },
        },
        required: ["analysis", "recommendations"],
      },
    },
  });

  try {
    // Fix: Access text property directly
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      analysis: "Não foi possível gerar uma análise automática no momento.",
      recommendations: ["Entre em contato diretamente para um diagnóstico manual."],
    };
  }
};
