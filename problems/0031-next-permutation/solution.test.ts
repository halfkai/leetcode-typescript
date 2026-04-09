import { describe, test, expect } from "bun:test";
import { nextPermutation } from "./solution";

// Params: (nums: number[]) => unknown

describe("nextPermutation", () => {
  test("example 1", () => {
    const result = nextPermutation([1,2,3]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = nextPermutation([3,2,1]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = nextPermutation([1,1,5]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
