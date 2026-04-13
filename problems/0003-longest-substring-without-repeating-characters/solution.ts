export function lengthOfLongestSubstring(s: string): number {
  const map = new Map();
  let max = 0;
  for (let l = 0, r = 0; r < s.length; r++) {
    const idx = map.get(s[r]);
    if (typeof idx === "number" && idx >= l) {
      // l represents the boundary of the current window
      // if idx >= l meaning that the repeated character is inside the current window
      // so we need to move the left pointer to the next index of the repeated character
      l = idx + 1;
    }
    max = Math.max(max, r - l + 1);
    map.set(s[r], r);
  }
  return max;
}
