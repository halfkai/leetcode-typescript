export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[],
): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const mid = merged.length >> 1;
  return merged.length % 2 === 0
    ? (merged[mid - 1]! + merged[mid]!) / 2
    : merged[mid]!;
}

export function findMedianSortedArrays2(
  nums1: number[],
  nums2: number[],
): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays2(nums2, nums1);
  }
  const m = nums1.length;
  const n = nums2.length;
  // leftCount is the number of elements to the left of the median
  const leftCount = (m + n + 1) >> 1;

  let l = 0; // meaning that at least 0 elements of nums1 are to the left of the median
  let r = m; // meaning that at most m elements of nums1 are to the left of the median

  while (l < r) {
    const i = (l + r + 1) >> 1;
    const j = leftCount - i;

    // nums1[i - 1] is on the left side of the median
    // nums2[j] is on the right side of the median
    if (nums1[i - 1]! <= nums2[j]!) {
      // nums1[i - 1] <= nums2[j] meaning that the current cut is valid
      // we need to search for a larger possible cut on the right side of nums1
      l = i;
    } else {
      // nums1[i - 1] > nums2[j] meaning that the current cut is invalid
      // we need to search for a smaller possible cut on the left side of nums1
      // so we set r to i - 1
      r = i - 1;
    }
  }

  // when the loop ends
  // l is the index of the cut on the left side of nums1, the index of median
  // and j is the index of the cut on the right side of nums2
  const j = leftCount - l;

  // use ±Infinity to handle the out of bounds cases
  const nums1LeftMax = l === 0 ? -Infinity : nums1[l - 1]!;
  const nums1RightMin = l === m ? Infinity : nums1[l]!;
  const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1]!;
  const nums2RightMin = j === n ? Infinity : nums2[j]!;

  // leftMax is the maximum element on the left side of the median
  const leftMax = Math.max(nums1LeftMax, nums2LeftMax);
  // rightMin is the minimum element on the right side of the median
  const rightMin = Math.min(nums1RightMin, nums2RightMin);

  // when the total number of elements is odd
  // leftMax is the median
  if ((m + n) % 2 === 1) {
    return leftMax;
  }
  // when the total number of elements is even
  // (leftMax + rightMin) / 2 is the median
  return (leftMax + rightMin) / 2;
}
