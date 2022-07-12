/**
 * @class Node
 */
class Node {
  /**
   * Create a node with value
   * @param {*} value 
   */
  constructor(value) {
      this.value = value;
      this.next = null;
  }
}

/**
 * @class Queue
 */
class Queue {
  /**
   * Create a Queue
   */
  constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
  }

  /**
   * Add value to queue
   * @param {*} value 
   */
  enqueue(value) {
      const node = new Node(value);

      if (this.head) {
          this.tail.next = node;
          this.tail = node;
      } else {
          this.head = node;
          this.tail = node
      }

      this.length++;
  }

  /**
   * Pop item from queue
   * @returns {*} item - the item from queue
   */
  dequeue() {
      const current = this.head;
      this.head = this.head.next;
      this.length--;

      return current.value;
  }

  /**
   * If the queue is empty
   * @returns {boolean}
   */
  isEmpty() {
      return this.length === 0;
  }

  /**
   * Get length of Queue
   * @returns {int} length
   */
  getLength() {
      return this.length;
  }

  /**
   * Print the Queue
   */
  print() {
      let current = this.head;

      while(current) {
          console.log(current.value);
          current = current.next;
      }
  }
}

module.exports.Queue = Queue;