import { readFile } from "fs/promises";

export async function readFileContent(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    return content.trim();
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}
