export function maxArea(height: number[]): number {
    let l = 0;
    let r = height.length - 1;
    let max = 0;
    while (l < r) {
        // calculating the area with minium height, then compare with previous stored value.
        max = Math.max((r - l) * Math.min(height[l]!, height[r]!), max);
        if (height[l]! < height[r]!) {
            l++;
        } else {
            r--;
        }
    }
    return max;
}
