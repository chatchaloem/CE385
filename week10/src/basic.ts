// import 'dotenv/config';
// import { GoogleGenAI } from '@google/genai';

// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY!,
// });

// async function askQuestion(question: string): Promise<string> {
//     const response = await ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: [
//             {
//                 role: 'user',
//                 parts: [{ text: question }],

//             }
//         ]
//     });

//     return response.text ?? '';
// }

// async function main() {
//     const answer = await askQuestion('Node.js คืออะไร อธิบายสั้นๆ');
//     console.log('คำตอบ:', answer);
// }

// main();