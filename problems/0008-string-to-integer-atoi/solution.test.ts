import { describe, test, expect } from "bun:test";
import { myAtoi } from "./solution";

// Params: (s: string) => number

describe("myAtoi", () => {
  test("example 1", () => {
    const result = myAtoi("42");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = myAtoi("   -042");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = myAtoi("1337c0d3");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 4", () => {
    const result = myAtoi("0-1");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 5", () => {
    const result = myAtoi("words and 987");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
