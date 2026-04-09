import { describe, test, expect } from "bun:test";
import { letterCombinations } from "./solution";

// Params: (digits: string) => unknown

describe("letterCombinations", () => {
  test("example 1", () => {
    const result = letterCombinations("23");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = letterCombinations("2");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
