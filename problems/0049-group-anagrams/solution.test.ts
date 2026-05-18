import { describe, test, expect } from "bun:test";
import { groupAnagrams } from "./solution";

// Params: (strs: string[]) => unknown

describe("groupAnagrams", () => {
  test("example 1", () => {
    const result = groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
    // TODO: replace with expected output
    expect(result).toEqual([["eat","tea","ate"],["tan","nat"],["bat"]]);
  });

  test("example 2", () => {
    const result = groupAnagrams([""]);
    // TODO: replace with expected output
    expect(result).toEqual([[""]]);
  });

  test("example 3", () => {
    const result = groupAnagrams(["a"]);
    // TODO: replace with expected output
    expect(result).toEqual([["a"]]);
  });
});
