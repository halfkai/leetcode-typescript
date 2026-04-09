import { describe, test, expect } from "bun:test";
import { removeNthFromEnd } from "./solution";

// Params: (head: unknown, n: number) => unknown

describe("removeNthFromEnd", () => {
  test("example 1", () => {
    const result = removeNthFromEnd([1,2,3,4,5], 2);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = removeNthFromEnd([1], 1);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = removeNthFromEnd([1,2], 1);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
