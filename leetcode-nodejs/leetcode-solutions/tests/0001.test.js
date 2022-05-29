const twoSum = require('../src/0001');

describe("0001 should return the correct output given ([int],target:int)", () => {
    describe("Should have proper return value", () => {
        const goodArrIn1 = [2, 7, 11, 15];
        const goodTarget1 = 9;
        const goodResIndices1 = twoSum(goodArrIn1, goodTarget1);
        const goodResValues1 = goodResIndices1.map(value => (goodArrIn1[value]));

        const goodArrIn2 = [3, 2, 4];
        const goodTarget2 = 6;
        const goodResIndices2 = twoSum(goodArrIn2, goodTarget2);
        const goodResValues2 = goodResIndices2.map(value => (goodArrIn2[value]));

        const goodArrIn3 = [3, 2, 4];
        const goodTarget3 = 6;
        const goodResIndices3 = twoSum(goodArrIn3, goodTarget3);
        const goodResValues3 = goodResIndices3.map(value => (goodArrIn3[value]));

        it("Should return an array size 2", () => {
            expect(goodResIndices1.length).toBe(2);
            expect(goodResIndices2.length).toBe(2);
            expect(goodResIndices3.length).toBe(2);
        })

        it("Should have values of type int in the returned array", () => {
            goodResIndices1.every(number => (typeof number === 'number' && number === Math.floor(number)))
            goodResIndices2.every(number => (typeof number === 'number' && number === Math.floor(number)))
            goodResIndices3.every(number => (typeof number === 'number' && number === Math.floor(number)))
        })

        it("Should have array return values < input array length and >= 0", () => {
            goodResIndices1.every(number => (number < goodArrIn1.length && number >= 0))
            goodResIndices2.every(number => (number < goodArrIn2.length && number >= 0))
            goodResIndices3.every(number => (number < goodArrIn3.length && number >= 0))
        })

        it("Should not repeat indices", () => {
            expect(goodResIndices1[0] !== goodResIndices1[1]).toBeTruthy();
            expect(goodResIndices2[0] !== goodResIndices2[1]).toBeTruthy();
            expect(goodResIndices3[0] !== goodResIndices3[1]).toBeTruthy();
        })

        it("Should have the returned array sum to target", () => {
            expect(goodResValues1.reduce((a,b) => a + b)).toBe(goodTarget1);
            expect(goodResValues2.reduce((a,b) => a + b)).toBe(goodTarget2);
            expect(goodResValues3.reduce((a,b) => a + b)).toBe(goodTarget2);
        })
    })
})