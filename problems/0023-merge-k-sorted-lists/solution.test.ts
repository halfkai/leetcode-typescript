import { describe, test, expect } from "bun:test";
import { mergeKLists } from "./solution";

// Params: (lists: unknown) => unknown

describe("mergeKLists", () => {
  test("example 1", () => {
    const result = mergeKLists([[1,4,5],[1,3,4],[2,6]]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = mergeKLists([]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = mergeKLists([[]]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
