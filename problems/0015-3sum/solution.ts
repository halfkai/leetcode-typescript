export function threeSum(nums: number[]): number[][] {
    nums = nums.sort((a, b) => a - b);
    const ans: number[][] = [];
    const nLength = nums.length;
    for (let i = 0; i < nLength; i++) {
        if (nums[i]! > 0) break; // nums[i] > 0 => nums[i+1] + nums[i+2] > 0, no right answers after that
        if (i > 0 && nums[i] === nums[i - 1]) continue; // deduplication
        for (let l = i + 1, r = nLength - 1; l < r; ) {
            const sum = nums[i]! + nums[l]! + nums[r]!
            if (sum === 0) {
                ans.push([nums[i]!, nums[l]!, nums[r]!])
                while (l < r && nums[l] === nums[l+1]) l++; // deduplication
                while (l < r && nums[r] === nums[r-1]) r--; // deduplication
                l++;
                r--; 
            } else if (sum > 0) {
                r--;
            } else {
                l++;
            }
        }
    }
    return ans
}
