/*
const isProfitableConnect = (left, right) => {
	if (left.length < 1 || right.length < 1) return [false, undefined]

	const [lastLeft, firstRight, secondRight] = [left[left.length - 1], right[0], right[1]]

	const connect1 = lastLeft + firstRight < secondRight
	const connect2 = lastLeft < firstRight + secondRight

	return connect1 || connect2
		? [true, connect1 ? 0 : 1]
		: [false, undefined]
}
const maxIncSubRec = nums => {
	if (nums.length === 0) return 0
	if (nums.length === 1) return 1

	const [left, right] = [nums.slice(0, nums.length / 2), nums.slice(nums.length / 2)]

	const maxLeft = maxIncSubRec(left)
	const maxRight = maxIncSubRec(right)

	const [isProfitable, idx] = isProfitableConnect(left, right)
	const connections = [
		[...left.slice(0, left.length - 1), left[left.length - 1] + right[0]].concat(right.slice(1)),
		[...left, right[0] + right[1]].concat(right.slice(2))
	] // both connection types
	if (isProfitable) {
		return Math.max(maxIncSubRec(connections[0]), maxIncSubRec(connections[1]))
	}
	return left.length > 0 && left[left.length - 1] < right[0]
		? maxLeft + maxRight
		: Math.max(maxLeft, maxRight)
}
*/

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

/*
Observations:

1. if the whole array is sorted in increasing order, you return the length of that array
	- ex: [1, 2, 3, 4] => 4 because reducing anything will reduce length

1a. Reducing a sub-array that is sorted in increasing order 
	will only help you in specific situations.
	- ex: [5, 4, (1, 2, 3, 4)] => 4 because reducing sub-arr [1, 2, 3, 4] is pointless
	- ex: [1, 4, (1, 2, 3), 7, 8] summing 1,2,3 will reveal a longer increasing sequence
		= [1, 4, 6, 7, 8] => 5 because the whole array is sorted in increasing order
 
1b. Reducing a sub-array that is sorted should only happen if all of these are true:
	- before < sum(sub-array) < after
	- sub-array < len(before + after) + 1
 
1c. Early return cases:
	- before > after # if after is less than before, then you don't reduce sub-arr

2. Reducing a sub-array that is not sorted in increasing order
	will help you in specific situation, but far more often than the sorted case.
	- ex: [4, 3, 2, 6] # max is 1
		= [4, 5, 6] # max is 3

2a. Reducing a sub-array that is not sorted should only happen if all of these are true:
	- before < sum(sub-array) < after
	- sub-array < len(before + after) + 1
	# NOTE: This is exactly the same logic we had for the sorted case!
	# NOTE: It also has the exact same early return conditions too.

3. Every list will have sub-arrays that are sorted in increasing order with atleast a size of 1.
	- ex: [(5), (2), (2)] => 1 
	- ex: [(5), (2, 3), (1)] = 2 # before > after

4. (conjecture 1) 
		No matter how long the list is, if you do a reduction, 
		for either sorted or unsorted sub-arr, and it increased the sub-array size,
		then it will always represent an improvement.
	- ex: [4, (2, 3), 6, .... very long] # max sub-arr = 2
		= [4, 5, 6, .... very long] # max sub-arr = 3
		=> Always better than not doing it?
		(Is there a possible case where doing it is worse?)

4a. (proof of conjecture 1)
	let us have a very long list of numbers in any random order, lis.
		let lis = [a, b, c, d, ...rest]
	let us define a function called, max-sub, that returns the max-sub we have so far.
	assume the max-sub(lis) = 1 for this initial example
	assume we find a sub-list that satisfies these conditions:
		- before < sum(sub-array) < after
		- sub-array < len(before + after) + 1
	since it satisfies these conditions, we would do a reduction:
		lis_1 = [a, x, d, ...rest]
		max-sub(lis_1) = 3 for our example

	for a proof by contradiction, let us assume that there exists a seq 
	such that doing this operation will lead to a shorter max-sub len than is optimal.

	This would imply:

		max-sub([a, b, c, d, ...rest]) > max-sub([a, x, d, ...rest])

	after filling out the rest of the respective lists.

	We know from the identity law that:

		max-sub(a) = max-sub(a) 
    
	for all a.

	So now we know that this must hold for both lis and lis_1:

		max-sub(...rest) = max-sub(...rest)

	Thus, we can simplify our lists by replacing those values in the list.

		max-sub([a, b, c, d, z]) > max-sub([a, x, d, z])

	From this we can deduce a property of max-sub:

		if a < b < c:
			max-sub([a, b, c]) = max-sub(a) + max-sub(b) + max-sub(c)
	    
	This also follows from our initial observation (1) above.

	From this property, we see that in lis_1, a < x < d, but it does not hold for a,b,c,d.

		max-sub([a, b, c, d]) + max-sub(z) > max-sub(a) + max-sub(x) + max-sub(d) + max-sub(z)
 
	Since a, b, c, d do not satisfy the property, the maximum possible sub-len can be 2.
	So we will assume it is the maximum possible value it can be, even though our example was 1.

		2 + max-sub(z) > max-sub(a) + max-sub(x) + max-sub(d) + max-sub(z)
		2 + max-sub(z) > 1 + 1 + 1 + max-sub(z)
		2 + max-sub(z) > 3 + max-sub(z)
		2 > 3 + max-sub(z) - max-sub(z)
		2 > 3 # contradiction

	We have arrived at a contradiction when assuming that the conjecture 1 is false. 
	Thus, conjecture 1 must be true.
	QED
*/