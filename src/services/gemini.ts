import { GoogleGenAI } from "@google/genai";

export async function generateBlockTexture(blockType: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Teksturgenerering er ikke tilgjengelig.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Generate a seamless, tileable texture of ${blockType} for a voxel game like Minecraft. 
                   Use a flat lighting, top-down view, high quality, pixel art style. 
                   Fill the entire image with no borders.`,
          },
        ],
      },
      config: {
        // @ts-ignore - imageConfig types might be missing in some versions but valid in API
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Extract the image from the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating texture:", error);
    throw error;
  }
}
