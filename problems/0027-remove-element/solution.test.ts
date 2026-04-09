import { describe, test, expect } from "bun:test";
import { removeElement } from "./solution";

// Params: (nums: number[], val: number) => number

describe("removeElement", () => {
  test("example 1", () => {
    const result = removeElement([3,2,2,3], 3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = removeElement([0,1,2,2,3,0,4,2], 2);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
