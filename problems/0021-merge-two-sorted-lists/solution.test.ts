import { describe, test, expect } from "bun:test";
import { mergeTwoLists } from "./solution";

// Params: (list1: unknown, list2: unknown) => unknown

describe("mergeTwoLists", () => {
  test("example 1", () => {
    const result = mergeTwoLists([1,2,4], [1,3,4]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = mergeTwoLists([], []);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = mergeTwoLists([], [0]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
