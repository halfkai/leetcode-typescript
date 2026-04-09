import { describe, test, expect } from "bun:test";
import { searchInsert } from "./solution";

// Params: (nums: number[], target: number) => number

describe("searchInsert", () => {
  test("example 1", () => {
    const result = searchInsert([1,3,5,6], 5);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = searchInsert([1,3,5,6], 2);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = searchInsert([1,3,5,6], 7);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
