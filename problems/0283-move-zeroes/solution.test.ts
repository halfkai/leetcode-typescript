import { describe, test, expect } from "bun:test";
import { moveZeroes } from "./solution";

// Params: (nums: number[]) => unknown

describe("moveZeroes", () => {
  test("example 1", () => {
    const result = moveZeroes([0,1,0,3,12]);
    // TODO: replace with expected output
    expect(result).toEqual([1,3,12,0,0]);
  });

  test("example 2", () => {
    const result = moveZeroes([0]);
    // TODO: replace with expected output
    expect(result).toEqual([0]);
  });

  test("example 3", () => {
    const result = moveZeroes([0,0,1]);
    // TODO: replace with expected output
    expect(result).toEqual([1,0,0]);
  });
});
