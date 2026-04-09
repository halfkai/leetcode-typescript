import { describe, test, expect } from "bun:test";
import { strStr } from "./solution";

// Params: (haystack: string, needle: string) => number

describe("strStr", () => {
  test("example 1", () => {
    const result = strStr("sadbutsad", "sad");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = strStr("leetcode", "leeto");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
