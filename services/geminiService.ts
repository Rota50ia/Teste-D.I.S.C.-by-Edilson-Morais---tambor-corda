
import { GoogleGenAI, Type } from "@google/genai";
import { APIResult } from "../types";

export const getGeminiInsights = async (result: APIResult) => {
  // Use a nova instância diretamente para garantir a chave mais atualizada do ambiente
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Como um mentor de carreira sênior, analise este resultado de perfil comportamental DISC/Temperamento: ${JSON.stringify(result)}. 
  Gere 3 conselhos práticos, estratégicos e transformadores para o desenvolvimento profissional desta pessoa. 
  Seja direto, inspirador e use um tom de mentoria executiva.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  titulo: { type: Type.STRING },
                  descricao: { type: Type.STRING }
                },
                required: ["titulo", "descricao"]
              }
            }
          },
          required: ["insights"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};
