const findMaximumLength = require('../src/maxIncreasingArrLen.js')

describe('Maximum Increasing Array', () => {
	const testCases = [
		{ nums: [5, 2, 2], expected: 1 },
		{ nums: [1, 2, 3, 4], expected: 4 },
		{ nums: [4, 3, 2, 6], expected: 3 },
		{ nums: [769, 131, 241], expected: 1 },
		{ nums: [780, 591, 213], expected: 2 },
	]

	testCases.forEach(({ nums, expected }) => {
		test(`returns ${expected} for nums ${nums}`, () => {
			const result = findMaximumLength(nums)
			expect(result).toBe(expected)
		})
	})
})