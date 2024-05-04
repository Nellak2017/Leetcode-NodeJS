const firstValidIndice = (arr, target) => {
    let [low, high] = [0, arr.length - 1]
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if (arr[mid] >= target && (mid === 0 || arr[mid - 1] < target)) return mid
        if (arr[mid] >= target && arr[mid - 1] >= target && mid !== 0) high = mid - 1 
        if (arr[mid] < target) low = mid + 1
    }
    return arr.length
}
const findMaximumLength = nums => {
    const n = nums.length
    const prefix = Array.from({ length: n + 1 }, _ => 0)
    for (let j = 1; j <= n; j++) prefix[j] = prefix[j - 1] + nums[j - 1]
    const max = (pair1, pair2) => pair1[0] >= pair2[0] && (pair1[1] > pair2[1] || pair1[0] > pair2[0]) ? pair1 : pair2
    let maxAfter = Array.from({ length: n + 1 }, _ => [1, 1])
    for (let i = 1; i <= n; i++) {
        maxAfter[i] = max(maxAfter[i - 1], maxAfter[i])
        const [cnt, ind] = maxAfter[i]
        const lastSum = prefix[i] - prefix[ind - 1]
        const firstValidInd = firstValidIndice(prefix, prefix[i] + lastSum)
        if (firstValidInd > n || firstValidInd < 0) continue
        maxAfter[firstValidInd] = max(maxAfter[firstValidInd], [cnt + 1, i + 1])
    }
    return maxAfter[n][0]
}

console.log(findMaximumLength([4, 3, 2, 6]))

module.exports = findMaximumLength