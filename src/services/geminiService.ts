import { GoogleGenAI } from "@google/genai";

export const analyzePlantHealth = async (base64Image: string): Promise<string> => {
  try {
    // ✅ CRA reads env like this
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;

    if (!API_KEY) {
      throw new Error("API Key is missing");
    }

    // ✅ Create client correctly
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          {
            text: `You are an expert botanist and plant pathologist.
1. Identify the plant name.
2. Diagnose any visible diseases or health issues.
3. Provide step-by-step treatment.
Keep the response concise and in Markdown.`
          }
        ]
      }
    });

    return response.text || "Could not analyze the image.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while analyzing the plant. Please ensure your API Key is configured correctly.";
  }
};
