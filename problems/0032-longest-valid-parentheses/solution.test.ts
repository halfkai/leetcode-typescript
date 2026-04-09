import { describe, test, expect } from "bun:test";
import { longestValidParentheses } from "./solution";

// Params: (s: string) => number

describe("longestValidParentheses", () => {
  test("example 1", () => {
    const result = longestValidParentheses("(()");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = longestValidParentheses(")()())");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = longestValidParentheses("");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
