const findMaximumLength = nums => {
	const n = nums.length
	const prefix = nums.reduce((acc, num, i) => [...acc, num + (i > 0 ? acc[i] : 0)], [0])
	const max = (pair1, pair2) => (pair1[0] !== pair2[0]) && (pair1[0] > pair2[0] || pair1[1] > pair2[1]) ? pair1 : pair2
	let maxAfter = Array.from({ length: n + 1 }, _ => [1, 1])
	for (let i = 1; i <= n; i++) {
		maxAfter[i] = max(maxAfter[i - 1], maxAfter[i])
		const [cnt, ind] = maxAfter[i]
		const lastSum = prefix[i] - prefix[ind - 1]
		const firstValidInd = prefix.findIndex(el => el >= prefix[i] + lastSum)
		if (firstValidInd > n || firstValidInd < 0) continue
		maxAfter[firstValidInd] = max(maxAfter[firstValidInd], [cnt + 1, i + 1])
	}
	return maxAfter[n][0]
}

console.log(findMaximumLength([4, 3, 2, 6]))

module.exports = findMaximumLength