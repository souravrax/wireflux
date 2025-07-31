import { promises as fs } from "fs";
import path from "path";
import { createIndexContent } from "./template-generator";

// File system utilities
export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

export async function writeOperationFile(
  operationId: string,
  content: string,
  targetFolder: string
): Promise<void> {
  const fileName = `${operationId}.ts`;
  const filePath = path.join(targetFolder, fileName);

  await fs.writeFile(filePath, content, "utf-8");
  console.log(`✓ Generated ${fileName}`);
}

export async function writeIndexFile(
  operationIds: string[],
  targetFolder: string
): Promise<void> {
  const indexPath = path.join(targetFolder, "index.ts");
  const content = createIndexContent(operationIds);

  await fs.writeFile(indexPath, content, "utf-8");
  console.log("✓ Generated index.ts");
}
