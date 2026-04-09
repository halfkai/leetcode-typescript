import { describe, test, expect } from "bun:test";
import { maxArea } from "./solution";

// Params: (height: number[]) => number

describe("maxArea", () => {
  test("example 1", () => {
    const result = maxArea([1,8,6,2,5,4,8,3,7]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = maxArea([1,1]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
