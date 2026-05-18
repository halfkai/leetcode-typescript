export function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>()
    for (const i in strs) {
        const str = strs[i]!
        const key = !!str ? str.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join() : ""
        if (map.has(key)) {
            map.get(key)?.push(str)
        } else {
            map.set(key, [str])
        }
    }
    return [...map.values()]
}
