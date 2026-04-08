---
id: 3
title: "Longest Substring Without Repeating Characters"
difficulty: Medium
tags: ["Hash Table", "String", "Sliding Window"]
slug: longest-substring-without-repeating-characters
url: https://leetcode.com/problems/longest-substring-without-repeating-characters/
---

## Problem

> Original: [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

Given a string `s`, find the length of the **longest** **substring** without duplicate characters.

 

**Example 1:**

**Input:** s = "abcabcbb"
**Output:** 3
**Explanation:** The answer is "abc", with the length of 3. Note that `"bca"` and `"cab"` are also correct answers.

**Example 2:**

**Input:** s = "bbbbb"
**Output:** 1
**Explanation:** The answer is "b", with the length of 1.

**Example 3:**

**Input:** s = "pwwkew"
**Output:** 3
**Explanation:** The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

 

**Constraints:**

- `0 <= s.length <= 5 * 10^4`

- `s` consists of English letters, digits, symbols and spaces.

## Approach

<!-- Explain the key insight and algorithm here -->
Imagine **a Resizable Sliding Window**, when no repeating character shows up,
the window extend to the right, move the window left side to the next index of the repeated character.
With each time window resize, re-calculate the max width.

## Solution

### Code

> [solution.ts](./solution.ts)

<<solution>>

### Complexity

- **Time**: O(?)
- **Space**: O(?)
