const twoSum = (nums, target) => {
    const result = {}
    for (let i = 0; i < nums.length; i++) {
        const [value, diff] = [nums[i], target - nums[i]]          
        if (result[value] !== undefined) return [result[value], i]
        result[diff] = i
    }
    return []                          // If there is no solution, return an empty array
}
module.exports = twoSum