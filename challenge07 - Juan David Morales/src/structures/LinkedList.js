// Estructura básica de lista enlazada
export class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export default class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(value) {
    const n = new Node(value)
    if (!this.head) {
      this.head = this.tail = n
    } else {
      this.tail.next = n
      this.tail = n
    }
    this.length++
    return n
  }

  size() { return this.length }

  peek(index=0) {
    if (index < 0 || index >= this.length) return null
    let i = 0, cur = this.head
    while (cur && i < index) { cur = cur.next; i++ }
    return cur
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) return null
    let removed = null
    if (index === 0) {
      removed = this.head
      this.head = this.head.next
      if (!this.head) this.tail = null
    } else {
      let prev = this.peek(index-1)
      removed = prev.next
      prev.next = removed?.next || null
      if (!prev.next) this.tail = prev
    }
    this.length--
    return removed
  }

  toArray() {
    const out = []
    let cur = this.head
    while (cur) { out.push(cur.value); cur = cur.next }
    return out
  }
}
