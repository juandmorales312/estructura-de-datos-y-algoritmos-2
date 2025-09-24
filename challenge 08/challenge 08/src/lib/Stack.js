export default class Stack {
  constructor() {
    this._items = []
  }

  // Adds a new value on top of the stack
  push(value){
    this._items.push(value)
  }

  // Returns the last value and removes it
  pop(){
    return this._items.pop()
  }

  // Returns the last value without removing it
  peek(){
    return this._items[this._items.length - 1]
  }

  // True if empty
  isEmpty(){
    return this._items.length === 0
  }

  // Number of elements
  size(){
    return this._items.length
  }

  // Array snapshot from top -> bottom
  toArrayTopFirst(){
    return [...this._items].reverse()
  }

  // Prints to console (debug)
  print(){
    console.table(this.toArrayTopFirst())
  }
}
