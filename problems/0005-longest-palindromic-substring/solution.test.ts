import { describe, test, expect } from "bun:test";
import { longestPalindrome } from "./solution";

// Params: (s: string) => string

describe("longestPalindrome", () => {
  test("example 1", () => {
    const result = longestPalindrome("babad");
    // TODO: replace with expected output
    expect(result).toBeOneOf(["bab", "aba"]);
  });

  test("example 2", () => {
    const result = longestPalindrome("cbbd");
    // TODO: replace with expected output
    expect(result).toEqual("bb");
  });
});
