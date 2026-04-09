import { describe, test, expect } from "bun:test";
import { romanToInt } from "./solution";

// Params: (s: string) => number

describe("romanToInt", () => {
  test("example 1", () => {
    const result = romanToInt("III");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = romanToInt("LVIII");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = romanToInt("MCMXCIV");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
