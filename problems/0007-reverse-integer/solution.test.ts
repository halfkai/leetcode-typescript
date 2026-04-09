import { describe, test, expect } from "bun:test";
import { reverse } from "./solution";

// Params: (x: number) => number

describe("reverse", () => {
  test("example 1", () => {
    const result = reverse(123);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = reverse(-123);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = reverse(120);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
