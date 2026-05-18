export function longestConsecutive(nums: number[]): number {
    const set = new Set<number>()
    for (const num of nums) {
        set.add(num);
    }

    let maxStreak = 0;

    for (const num of set) {
        if (!set.has(num - 1)) {
            let streak = 1;
            let current = num;
            while (set.has(current + 1)) {
                current += 1;
                streak += 1;
            }
            maxStreak = Math.max(streak, maxStreak)
        }
    }
    return maxStreak;  
};
