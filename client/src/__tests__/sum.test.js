import { describe, it, expect, test } from "vitest";
import { sum } from "@/lib/sum.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("sum function", () => {
  it("should return 3 when adding 1 and 2", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("should return 5 when adding 2 and 3", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
