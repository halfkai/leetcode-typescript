import { describe, test, expect } from "bun:test";
import { generateParenthesis } from "./solution";

// Params: (n: number) => unknown

describe("generateParenthesis", () => {
  test("example 1", () => {
    const result = generateParenthesis(3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = generateParenthesis(1);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
