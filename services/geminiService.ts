
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAnalysis, PageData } from "../types";

export const analyzeSEO = async (data: PageData): Promise<SEOAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following SEO data and provide expert optimization feedback.
    
    Current Title: "${data.currentTitle}" (Measured Pixel Width: ${data.currentPixelWidth}px)
    Target Keyword: "${data.targetKeyword}"
    Page Content Context: 
    ---
    ${data.content.substring(0, 5000)}
    ---

    Task:
    1. Verify if the current title is optimized for the target keyword and page content.
    2. Check title width. Note: Google uses a container width of approx 580px-600px.
       - Optimal: 200px to 580px. 
       - If the language is non-Latin (CJK, etc.), pay extra attention to visual balance.
    3. Generate 4 high-performing title suggestions that stay within the 580px limit.
    4. Estimate a score from 0-100 based on keyword placement, width, and user intent.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          pixelWidthOk: { type: Type.BOOLEAN },
          keywordIncluded: { type: Type.BOOLEAN },
          sentiment: { type: Type.STRING },
          improvements: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                reason: { type: Type.STRING },
                type: { type: Type.STRING }
              },
              required: ["title", "reason", "type"]
            }
          },
          extractedKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedCTR: { type: Type.STRING }
        },
        required: ["score", "pixelWidthOk", "keywordIncluded", "sentiment", "improvements", "suggestions", "extractedKeywords", "estimatedCTR"]
      },
    },
  });

  const result = JSON.parse(response.text) as SEOAnalysis;
  return { ...result, measuredPixelWidth: data.currentPixelWidth };
};
