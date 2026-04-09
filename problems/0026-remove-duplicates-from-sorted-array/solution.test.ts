import { describe, test, expect } from "bun:test";
import { removeDuplicates } from "./solution";

// Params: (nums: number[]) => number

describe("removeDuplicates", () => {
  test("example 1", () => {
    const result = removeDuplicates([1,1,2]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = removeDuplicates([0,0,1,1,1,2,2,3,3,4]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
