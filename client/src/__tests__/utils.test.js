import { describe, it, expect } from "vitest";
import { formatToUSD } from "@/lib/transformers";

describe("formatToUSD function", () => {
  it("should take an integer and return a string with a dollar sign and period", () => {
    expect(formatToUSD(20)).toBe("$20.00");
  });

  it("should take a double and return the USD string representation of it", () => {
    expect(formatToUSD(45.99)).toBe("$45.99");
  });

  it("should take a number bigger than 1 thousand and return a string with a comma in it", () => {
    expect(formatToUSD(999999.99)).toBe("$999,999.99");
  });
});
