import * as fs from "fs";
import * as path from "path";

interface ModelInfo {
  name: string;
  fields: string[];
}

export function readPrismaSchema(): ModelInfo[] {
  const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
  const content = fs.readFileSync(schemaPath, "utf-8"); // อ่านไฟล์ schema.prisma เป็น text
  const models: ModelInfo[] = []; // เตรียม array เก็บชื่อ model และฟิลด์
  const modelRegex = /model\s+(\w+)\s+\{([^}]*)\}/g; // regex สำหรับจับ model และ body ของมัน

  let match;
  while ((match = modelRegex.exec(content)) !== null) { // loop หยิบทุก match ที่เจอ
    const modelName = match[1]; // ชื่อ model คือ group ที่ 1
    const body = match[2]; // body ของ model คือ group ที่ 2

    // extract field names (ข้ามพวก relation และ decorator)
    const fields = body
      .split("\n") // แยกเป็นบรรทัด
      .map((line) => line.trim()) // ตัดช่องว่าง
      // กรองบรรทัดที่ไม่ใช่ field (เช่น comment และ decorator ที่ขึ้นต้น @ หรือ @@)
      .filter((line) => line && !line.startsWith("//") && !line.startsWith("@") && !line.startsWith("@@"))
      .map((line) => line.split(/\s+/)[0]) // ชื่อ field (ตัวแรกของบรรทัด)
      .filter(Boolean); // กรองชื่อ field ว่างเปล่า

    models.push({ name: modelName, fields }); // เพิ่ม model info ลงใน array
  }
  return models;
}

export function getSchemaAsText(): string {
  const models = readPrismaSchema(); // อ่าน schema และได้ข้อมูล model มาเป็น array
  return models
    .map((m) => `Model: ${m.name}\nFields: ${m.fields.join(", ")}`) // แปลงแต่ละ model เป็น string ที่มีชื่อและ field
    .join("\n\n"); // รวมทุก model เป็น string เดียวโดยคั่นบรรทัดว่าง
}