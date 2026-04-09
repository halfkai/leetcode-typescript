import { describe, test, expect } from "bun:test";
import { threeSumClosest } from "./solution";

// Params: (nums: number[], target: number) => number

describe("threeSumClosest", () => {
  test("example 1", () => {
    const result = threeSumClosest([-1,2,1,-4], 1);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = threeSumClosest([0,0,0], 1);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
