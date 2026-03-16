import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

async function streamAnswer(question: string): Promise<void> {
    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash-lite',
        contents: [
            {
                role: 'user',
                parts: [{ text: question }],
            }
        ],
    });

    process.stdout.write('คำตอบ: ');
    for await (const chunk of response) {
        if (chunk.text) {
            process.stdout.write(chunk.text);
        }
    }
    console.log();
}