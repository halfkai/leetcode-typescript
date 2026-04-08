import { describe, test, expect } from "bun:test";
import { addTwoNumbersArray } from "./solution";

// Params: (l1: unknown, l2: unknown) => unknown

describe("addTwoNumbersArray", () => {
  test("example 1", () => {
    const result = addTwoNumbersArray([2,4,3], [5,6,4]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = addTwoNumbersArray([0], [0]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = addTwoNumbersArray([9,9,9,9,9,9,9], [9,9,9,9]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
