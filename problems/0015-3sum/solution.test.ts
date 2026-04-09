import { describe, test, expect } from "bun:test";
import { threeSum } from "./solution";

// Params: (nums: number[]) => unknown

describe("threeSum", () => {
  test("example 1", () => {
    const result = threeSum([-1,0,1,2,-1,-4]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = threeSum([0,1,1]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = threeSum([0,0,0]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
