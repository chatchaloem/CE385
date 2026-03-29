import {
  GoogleGenerativeAI,
  Tool,
  FunctionDeclaration,
  SchemaType,
} from "@google/generative-ai";
import { getSchemaAsText } from "./schemaReader";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Tool definition สำหรับ AI เรียก
const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "query",
        description: "Query the database using Prisma. Use this to retrieve data.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            model: {
              type: SchemaType.STRING,
              description: "The Prisma model name (e.g., User, Order)",
            },
            action: {
              type: SchemaType.STRING,
              description: "The Prisma action: findMany, findFirst, findUnique, count",
            },
            args: {
              type: SchemaType.OBJECT,
              description:
                "Prisma query arguments (where, select, orderBy, take, skip)",
              properties: {},
            },
          },
          required: ["model", "action"],
        },
      } as FunctionDeclaration,
    ],
  },
];

export async function askAI(userMessage: string): Promise<string> {
  const schemaText = getSchemaAsText();

  const systemInstruction = `
You are an AI assistant that helps users query a database.
You have access to the following database schema:

${schemaText}

Rules:
- Always use the "query" tool to retrieve data. Never answer from memory.
- Never write raw SQL.
- Only use the models and fields defined in the schema above.
- Keep responses concise and in the same language as the user's message.
`.trim();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction,
    tools,
  });

  const chat = model.startChat();
  let response = await chat.sendMessage(userMessage);

  // Handle function call loop
  while (true) {
    const calls = response.response.functionCalls();
    if (!calls || calls.length === 0) break;

    const results = await Promise.all(
      calls.map(async (call) => {
        const { runQuery } = await import("../tools/queryTool");
        const args = call.args as Record<string, unknown>;

        const result = await runQuery({
          ...args,
          model: args.model,
          action: args.action,
        });

        return {
          functionResponse: {
            name: call.name,
            response: { result },
          },
        };
      })
    );

    response = await chat.sendMessage(results);
  }

  return response.response.text();
}