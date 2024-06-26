const ListNode = require('../src/ListNode')
const addTwoNums = (l1, l2) => {
    let [sum, current] = [0, new ListNode(0)]
    let result = current
    while (l1 || l2) {
        if (l1) [sum, l1] = [sum + l1.val, l1.next]
        if (l2) [sum, l2] = [sum + l2.val, l2.next]
        current.next = new ListNode(sum % 10)
        current = current.next
        sum = sum > 9 ? 1 : 0
    }
    if (sum) current.next = new ListNode(sum) 
    return result.next
}
module.exports = addTwoNums