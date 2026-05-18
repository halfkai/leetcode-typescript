export function longestPalindrome(s: string): string {
  const n = s.length;
  if (n < 2) return s;

  let maxLen = 1;
  let begin = 0;

  // dp[i][j] represents whether the substring s[i..j] is a palindrome
  const dp: boolean[][] = new Array(n).fill(new Array(n).fill(false));
  for (let i = 0; i < n; i++) dp[i]![i] = true; // single character is a palindrome

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (s[i] !== s[j]) {
        dp[i]![j] = false;
      } else if (j - i < 3) {
        dp[i]![j] = true;
      } else {
        dp[i]![j] = dp[i + 1]![j - 1]!;
      }
      if (dp[i]![j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        begin = i;
      }
    }
  }
  return s.slice(begin, begin + maxLen);
}
