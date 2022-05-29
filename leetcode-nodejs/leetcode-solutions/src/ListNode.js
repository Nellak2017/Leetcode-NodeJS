class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
        this.head = null;
        this.size = 0;
    }
    size() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }

    clear() {
        this.head = null;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode
    }

    getFirst() {
        return this.head;
    }

    add(element) {
        var node = new ListNode(element);
        var current;

        if (this.head == null)
            this.head = node;
        else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.val + " ";
            curr = curr.next;
        }
        return str;
    }
}
module.exports = ListNode;