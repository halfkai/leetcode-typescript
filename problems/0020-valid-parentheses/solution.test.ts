import { describe, test, expect } from "bun:test";
import { isValid } from "./solution";

// Params: (s: string) => boolean

describe("isValid", () => {
  test("example 1", () => {
    const result = isValid("()");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 2", () => {
    const result = isValid("()[]{}");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 3", () => {
    const result = isValid("(]");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 4", () => {
    const result = isValid("([])");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });

  test("example 5", () => {
    const result = isValid("([)]");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies boolean);
  });
});
