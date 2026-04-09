import { describe, test, expect } from "bun:test";
import { searchRange } from "./solution";

// Params: (nums: number[], target: number) => number[]

describe("searchRange", () => {
  test("example 1", () => {
    const result = searchRange([5,7,7,8,8,10], 8);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number[]);
  });

  test("example 2", () => {
    const result = searchRange([5,7,7,8,8,10], 6);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number[]);
  });

  test("example 3", () => {
    const result = searchRange([], 0);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number[]);
  });
});
