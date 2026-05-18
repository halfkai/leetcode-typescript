---
id: 49
title: "Group Anagrams"
difficulty: Medium
tags: ["Array", "Hash Table", "String", "Sorting"]
slug: group-anagrams
url: https://leetcode.com/problems/group-anagrams/
---

## Problem

> Original: [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)

Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.

 

**Example 1:**

**Input:** strs = ["eat","tea","tan","ate","nat","bat"]

**Output:** [["bat"],["nat","tan"],["ate","eat","tea"]]

**Explanation:**

- There is no string in strs that can be rearranged to form `"bat"`.

- The strings `"nat"` and `"tan"` are anagrams as they can be rearranged to form each other.

- The strings `"ate"`, `"eat"`, and `"tea"` are anagrams as they can be rearranged to form each other.

**Example 2:**

**Input:** strs = [""]

**Output:** [[""]]

**Example 3:**

**Input:** strs = ["a"]

**Output:** [["a"]]

 

**Constraints:**

- `1 <= strs.length <= 10^4`

- `0 <= strs[i].length <= 100`

- `strs[i]` consists of lowercase English letters.

## Approach

<!-- Explain the key insight and algorithm here -->
First sort strs[i], then use a `map<sorted, strs[i][]>` to store the results.

## Solution

### Code

> [solution.ts](./solution.ts)

<<solution>>

### Complexity

- **Time**: O(?)
- **Space**: O(?)
