import { describe, test, expect } from "bun:test";
import { longestCommonPrefix } from "./solution";

// Params: (strs: string[]) => string

describe("longestCommonPrefix", () => {
  test("example 1", () => {
    const result = longestCommonPrefix(["flower","flow","flight"]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });

  test("example 2", () => {
    const result = longestCommonPrefix(["dog","racecar","car"]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies string);
  });
});
