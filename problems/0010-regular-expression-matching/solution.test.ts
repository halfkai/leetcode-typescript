import { describe, test, expect } from "bun:test";
import { isMatch } from "./solution";

// Params: (s: string, p: string) => boolean

describe("isMatch", () => {
  test("example 1", () => {
    const result = isMatch("aa", "a");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 2", () => {
    const result = isMatch("aa", "a*");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 3", () => {
    const result = isMatch("ab", ".*");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });
});
