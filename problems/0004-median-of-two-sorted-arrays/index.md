---
id: 4
title: "Median of Two Sorted Arrays"
difficulty: Hard
tags: ["Array", "Binary Search", "Divide and Conquer"]
slug: median-of-two-sorted-arrays
url: https://leetcode.com/problems/median-of-two-sorted-arrays/
---

## Problem

> Original: [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

**Example 1:**

**Input:** nums1 = [1,3], nums2 = [2]
**Output:** 2.00000
**Explanation:** merged array = [1,2,3] and median is 2.

**Example 2:**

**Input:** nums1 = [1,2], nums2 = [3,4]
**Output:** 2.50000
**Explanation:** merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

**Constraints:**

- `nums1.length == m`

- `nums2.length == n`

- `0 <= m <= 1000`

- `0 <= n <= 1000`

- `1 <= m + n <= 2000`

- `-10^6 <= nums1[i], nums2[i] <= 10^6`

## Approach

<!-- Explain the key insight and algorithm here -->

Assuming nums1[i] cutting nums1 and nums2[j] cutting nums2,
making nums1[0..i-1] and nums2[0..j-1] elements are the left side elements

It is known that the number of elements on the left partition is `leftCount = (m + n + 1) >> 1`.
So we only have to find `i`, and to speed up the process of finding `i` we are using binary search.
When `i` is found, the cut index of nums2 is `j = leftCount - i`.

## Solution

### Code

> [solution.ts](./solution.ts)

<<solution>>

### Complexity

- **Time**: O(?)
- **Space**: O(?)
