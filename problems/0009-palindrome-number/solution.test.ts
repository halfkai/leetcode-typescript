import { describe, test, expect } from "bun:test";
import { isPalindrome } from "./solution";

// Params: (x: number) => boolean

describe("isPalindrome", () => {
  test("example 1", () => {
    const result = isPalindrome(121);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 2", () => {
    const result = isPalindrome(-121);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 3", () => {
    const result = isPalindrome(10);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });
});
