// Estructura básica de lista doblemente enlazada
class DNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(value) {
    const n = new DNode(value)
    if (!this.head) {
      this.head = this.tail = n
    } else {
      n.prev = this.tail
      this.tail.next = n
      this.tail = n
    }
    this.length++
    return n
  }

  size() { return this.length }

  toArray() {
    const a = []
    let cur = this.head
    while (cur) { a.push(cur.value); cur = cur.next }
    return a
  }
}
