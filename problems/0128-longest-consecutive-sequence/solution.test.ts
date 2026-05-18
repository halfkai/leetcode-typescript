import { describe, test, expect } from "bun:test";
import { longestConsecutive } from "./solution";

// Params: (nums: number[]) => number

describe("longestConsecutive", () => {
  test("example 1", () => {
    const result = longestConsecutive([100,4,200,1,3,2]);
    // TODO: replace with expected output
    expect(result).toEqual(4);
  });

  test("example 2", () => {
    const result = longestConsecutive([0,3,7,2,5,8,4,6,0,1]);
    // TODO: replace with expected output
    expect(result).toEqual(9);
  });

  test("example 3", () => {
    const result = longestConsecutive([1,0,1,2]);
    // TODO: replace with expected output
    expect(result).toEqual(3);
  });
});
