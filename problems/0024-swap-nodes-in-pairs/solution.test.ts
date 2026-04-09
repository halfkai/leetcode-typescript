import { describe, test, expect } from "bun:test";
import { swapPairs } from "./solution";

// Params: (head: unknown) => unknown

describe("swapPairs", () => {
  test("example 1", () => {
    const result = swapPairs([1,2,3,4]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = swapPairs([]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = swapPairs([1]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 4", () => {
    const result = swapPairs([1,2,3]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
