import { describe, test, expect } from "bun:test";
import { divide } from "./solution";

// Params: (dividend: number, divisor: number) => number

describe("divide", () => {
  test("example 1", () => {
    const result = divide(10, 3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = divide(7, -3);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
