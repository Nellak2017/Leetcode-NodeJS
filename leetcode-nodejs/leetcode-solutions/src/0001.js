const twoSum = (nums, target) => {
    /** 
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    const result = {}
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i]          // It is the value in the array at the current index
        const diff = target - value    // It is the difference between target and current value
        if (result[value] !== undefined) { return [result[value], i] } 
        else { result[diff] = i }
    }
    return [];                         // If there is no solution, return an empty array
}
module.exports = twoSum;