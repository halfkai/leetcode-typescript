import { describe, test, expect } from "bun:test";
import { fourSum } from "./solution";

// Params: (nums: number[], target: number) => unknown

describe("fourSum", () => {
  test("example 1", () => {
    const result = fourSum([1,0,-1,0,-2,2], 0);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = fourSum([2,2,2,2,2], 8);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
