import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileContent } from "../lib/fileReader";
import * as fs from "fs/promises";

// Use vi.mock with proper implementation
vi.mock("fs/promises", async () => {
  return {
    readFile: vi.fn(),
  };
});

describe("readFileContent function", () => {
  beforeEach(() => {
    // Runs before each test
    vi.resetAllMocks();

    // Set up default mock behavior for fs.readFile
    fs.readFile.mockResolvedValue("Mocked content");
  });

  it("should successfully read the content of a text file", async () => {
    const content = await readFileContent("text-content.txt");

    // Check that fs.readFile was called once
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith("text-content.txt", "utf-8");

    // Ensure the content matches the mocked value
    expect(content).toBe("Mocked content");
  });

  it("should throw an error when file reading fails", async () => {
    // Set up mock to throw an error
    fs.readFile.mockRejectedValue(new Error("File not found"));

    // Expect the function to throw an error
    await expect(readFileContent("non-existent.txt")).rejects.toThrow(
      "Failed to read file: File not found"
    );

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith("non-existent.txt", "utf-8");
  });
});
