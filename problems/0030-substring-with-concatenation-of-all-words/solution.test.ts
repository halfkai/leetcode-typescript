import { describe, test, expect } from "bun:test";
import { findSubstring } from "./solution";

// Params: (s: string, words: string[]) => unknown

describe("findSubstring", () => {
  test("example 1", () => {
    const result = findSubstring("barfoothefoobarman", ["foo","bar"]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 2", () => {
    const result = findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });

  test("example 3", () => {
    const result = findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies unknown);
  });
});
