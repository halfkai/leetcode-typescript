export function lengthOfLongestSubstring(s: string): number {
    const map = new Map();
    let max = 0;
    for (let l = 0, r = 0; r < s.length;) {
        if (typeof map.get(s[r]) === 'number') {
            
        }
        map.set(s[r], r);
    }
};
