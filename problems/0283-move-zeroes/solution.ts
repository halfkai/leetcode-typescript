/**
 Do not return anything, modify nums in-place instead.
 */
export function moveZeroes(nums: number[]): number[] {
    let length = 0;
    for (let i = 0; i < nums.length;) {
        const n = nums[i]
        if (n === 0) {
            nums.splice(i, 1);
            i--;
            length++;
        } else {
            i++;
        }
    }
    nums.push(...Array.from<number>({ length }).fill(0))
    
    console.log(moveZeroes);
    return nums;
}

export function moveZeroesTwoPointers(nums: number[]): void {
    for (let i = 0, j = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            const tmp = nums[i]!;
            nums[i] = nums[j]!;
            nums[j++] = tmp;
        }
    }
}
