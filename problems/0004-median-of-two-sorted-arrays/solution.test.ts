import { describe, test, expect } from "bun:test";
import { findMedianSortedArrays } from "./solution";

// Params: (nums1: number[], nums2: number[]) => number

describe("findMedianSortedArrays", () => {
  test("example 1", () => {
    const result = findMedianSortedArrays([1,3], [2]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });

  test("example 2", () => {
    const result = findMedianSortedArrays([1,2], [3,4]);
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies number);
  });
});
