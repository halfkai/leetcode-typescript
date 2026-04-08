import { describe, test, expect } from "bun:test";
import { lengthOfLongestSubstring } from "./solution";

// Params: (s: string) => number

describe("lengthOfLongestSubstring", () => {
  test("example 1", () => {
    const result = lengthOfLongestSubstring("abcabcbb");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = lengthOfLongestSubstring("bbbbb");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 3", () => {
    const result = lengthOfLongestSubstring("pwwkew");
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
