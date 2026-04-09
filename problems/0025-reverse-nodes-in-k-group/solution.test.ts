import { describe, test, expect } from "bun:test";
import { reverseKGroup } from "./solution";

// Params: (head: unknown, k: number) => unknown

describe("reverseKGroup", () => {
  test("example 1", () => {
    const result = reverseKGroup([1,2,3,4,5], 2);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = reverseKGroup([1,2,3,4,5], 3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
