import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuickDeck = async (userInput: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a thematic 3-card Arabic learning deck starting with the word/concept "${userInput}". 
    Include "${userInput}" and two highly related words to build a useful context. 
    Return ONLY valid JSON format.`,
    config: { 
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          deck: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                arabic: { type: Type.STRING },
                english: { type: Type.STRING },
                transliteration: { type: Type.STRING }
              },
              required: ["arabic", "english", "transliteration"]
            }
          }
        }
      }
    }
  });
  
  if (!response.text) throw new Error("No AI response");
  return JSON.parse(response.text.trim());
};