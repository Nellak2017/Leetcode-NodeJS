class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.head = null
        this.size = 0
    }
    size() {
        let [count, node] = [0, this.head]
        while (node) { [count, node] = [count + 1, node.next] }
        return count
    }
    clear() { this.head = null }
    getLast() {
        let lastNode = this.head
        if (lastNode) { while (lastNode.next) lastNode = lastNode.next }
        return lastNode
    }
    getFirst() { return this.head }
    add(element) {
        let [node, current] = [new ListNode(element), undefined]
        if (this.head == null) this.head = node
        else {
            current = this.head
            while (current.next) { current = current.next }
            current.next = node
        }
        this.size++
    }
    printList() {
        let [curr, str] = [this.head, '']
        while (curr) { [str, curr] = [str + curr.val + ' ', curr.next] }
        return str
    }
}
module.exports = ListNode