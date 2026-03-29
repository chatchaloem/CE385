import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { z } from "zod";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// อนุญาตเฉพาะ action ที่ใช้ดึงข้อมูล
const ALLOWED_ACTIONS = ["findMany", "findFirst", "findUnique", "count"] as const;

// ไม่อนุญาต
// deleteMany, updateMany, create, upsert, executeRaw, ...

const QueryInputSchema = z.object({
  model: z.enum(["User", "Order"]),
  action: z.enum(ALLOWED_ACTIONS),
  args: z
    .object({
      where: z.record(z.string(), z.unknown()).optional(),
      select: z.record(z.string(), z.boolean()).optional(),
      orderBy: z.record(z.string(), z.unknown()).optional(),
      take: z.number().int().positive().max(100).optional(), // จำกัดสูงสุด 100 rows
      skip: z.number().int().nonnegative().optional(),
    })
    .optional()
    .default({}),
});

export type QueryInput = z.infer<typeof QueryInputSchema>;

export async function runQuery(input: unknown) {
  // 1. validate input
  const { model, action, args } = QueryInputSchema.parse(input);

  // 2. map model name -> prisma client model
  const prismaModel = prisma[model.toLowerCase() as keyof typeof prisma] as any;

  if (!prismaModel || typeof prismaModel[action] !== "function") {
    throw new Error(`Invalid model or action: ${model}.${action}`);
  }

  // 3. run query
  const result = await prismaModel[action](args);
  return result;
}