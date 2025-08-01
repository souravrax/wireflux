import { promises as fs } from "node:fs";
import path from "node:path";

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
	targetFolder: string,
): Promise<void> {
	const fileName = `${operationId}.ts`;
	const filePath = path.join(targetFolder, fileName);

	await fs.writeFile(filePath, content, "utf-8");
}

export async function writeFile(
	filePath: string,
	content: string,
): Promise<void> {
	const dir = path.dirname(filePath);
	await ensureDirectoryExists(dir);
	await fs.writeFile(filePath, content, "utf-8");
}
