import { describe, test, expect } from "bun:test";
import { convert } from "./solution";

// Params: (s: string, numRows: number) => string

describe("convert", () => {
  test("example 1", () => {
    const result = convert("PAYPALISHIRING", 3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });

  test("example 2", () => {
    const result = convert("PAYPALISHIRING", 4);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });

  test("example 3", () => {
    const result = convert("A", 1);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });
});
