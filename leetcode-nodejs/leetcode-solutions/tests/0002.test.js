const addTwoNums = require('../src/0002')
const ListNode = require('../src/ListNode')

describe("0002 should return the correct output given (ListNode, ListNode)", () => {
    describe("Should have proper return value", () => {
        const goodArr1In1 = [2, 4, 3]
        const goodArr2In1 = [5, 6, 4]
        const goodSum1 = parseFloat(goodArr1In1.join("")) + parseFloat(goodArr2In1.join(""))
        const lenSum = Math.floor(Math.log10(goodSum1)) + 1
        const goodRes1 = addTwoNums(goodArr1In1, goodArr2In1)

        it("Should return a List Node", () => {
            expect(goodRes1 instanceof ListNode).toBeTruthy()
        })

        /*
        it("Should return a linked list size log10(sum(...arr1, ...arr2))", () => {
            expect(goodRes1.size).toBe(lenSum);
        })

        it("Should return a linked list that has the sum as the elements in reverse order", () => {
            expect(goodRes1).toEqual(Array.from(String(goodSum1), Number).reverse());
        })
        */
    })
})