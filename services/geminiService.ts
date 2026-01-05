
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAnalysis, PageData } from "../types";

export const analyzeSEO = async (data: PageData): Promise<SEOAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following SEO data for a webpage and provide detailed optimization feedback for both the Title and the Meta Description.
    
    Current Title: "${data.currentTitle}" (Measured Pixel Width: ${data.currentTitlePixelWidth}px)
    Current Meta Description: "${data.currentDescription}" (Measured Pixel Width: ${data.currentDescriptionPixelWidth}px)
    Target Keyword: "${data.targetKeyword}"
    Page Content/Table of Contents: 
    ---
    ${data.content.substring(0, 4000)}
    ---

    Task:
    1. Analyze the Title:
       - Optimal Width: 200px - 580px.
       - Verify keyword presence and relevance to content.
    2. Analyze the Meta Description:
       - Optimal Width: 400px - 920px.
       - Check if it's "SEO friendly": Does it have a Call to Action (CTA)? Does it contain the keyword? Is it engaging?
    3. Generate 3-4 suggestions for both.
    4. Provide an overall SEO score (0-100).
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
          titleMetrics: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              pixelWidthOk: { type: Type.BOOLEAN },
              keywordIncluded: { type: Type.BOOLEAN },
              improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
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
              }
            },
            required: ["score", "pixelWidthOk", "keywordIncluded", "improvements", "suggestions"]
          },
          descriptionMetrics: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              pixelWidthOk: { type: Type.BOOLEAN },
              keywordIncluded: { type: Type.BOOLEAN },
              improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  },
                  required: ["text", "reason"]
                }
              }
            },
            required: ["score", "pixelWidthOk", "keywordIncluded", "improvements", "suggestions"]
          },
          sentiment: { type: Type.STRING },
          extractedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          estimatedCTR: { type: Type.STRING }
        },
        required: ["score", "titleMetrics", "descriptionMetrics", "sentiment", "extractedKeywords", "estimatedCTR"]
      },
    },
  });

  const result = JSON.parse(response.text) as SEOAnalysis;
  // Inject measured widths back for display consistency
  result.titleMetrics.measuredPixelWidth = data.currentTitlePixelWidth;
  result.descriptionMetrics.measuredPixelWidth = data.currentDescriptionPixelWidth;
  
  return result;
};
