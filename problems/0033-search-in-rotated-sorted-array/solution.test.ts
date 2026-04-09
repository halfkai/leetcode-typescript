import { describe, test, expect } from "bun:test";
import { search } from "./solution";

// Params: (nums: number[], target: number) => number

describe("search", () => {
  test("example 1", () => {
    const result = search([4,5,6,7,0,1,2], 0);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = search([4,5,6,7,0,1,2], 3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = search([1], 0);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
