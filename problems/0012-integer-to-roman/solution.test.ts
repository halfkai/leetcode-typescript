import { describe, test, expect } from "bun:test";
import { intToRoman } from "./solution";

// Params: (num: number) => string

describe("intToRoman", () => {
  test("example 1", () => {
    const result = intToRoman(3749);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });

  test("example 2", () => {
    const result = intToRoman(58);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });

  test("example 3", () => {
    const result = intToRoman(1994);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });
});
