const { Queue } = require("./Queue.js");

/**
 * Function to setup the cache as per configuration
 * @param {string} cacheType 
 * @param {number} capacity 
 * @returns {*} Cache
 */
module.exports.setupCache = (cacheType, capacity) => {
  if (cacheType == "LRU") {
    return new LRUCache(capacity);
  }
  else if (cacheType == "FIFO") {
    return new FIFOCache(capacity);
  }
  else if (cacheType == "LF") {
    return new LargestFirstCache(capacity);
  }
  else {
    throw "Invalid cache type! Please select from [LRU, FIFO, LF]"
  }
}

/**
 * @class LRUCache
 */
class LRUCache {
  //Least Popular

  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map();
  }

  size() {
    let sum = 0;
    this.cache.forEach((value) => {
      sum += value.size;
    });
    return sum;
  }



  get(file) {
    if (this.cache.has(file.id)) {
      let temp = this.cache.get(file.id);
      this.cache.delete(file.id);
      this.cache.set(file.id, temp);
      return this.cache.get(file.id);
    } else {
      return null;
    }
  }

  add(file) {
    if (this.cache.has(file.id))
      return
    this.cache.set(file.id, file);
    let size = this.size();
    const iterator = this.cache.keys();
    while (size >= this.capacity) {
      let key = iterator.next().value;
      let itemSize = this.cache.get(key).size;
      this.cache.delete(key);
      size -= itemSize
    }
  }
}

/**
 * @class LargestFirstCache
 */
class LargestFirstCache {
  //Largest first

  constructor(capacity) {
    this.capacity = capacity
    this.cache = {}
  }

  size() {
    let sum = 0;
    for (let i = 0; i < Object.keys(this.cache).length; i++) {
      sum += Object.values(this.cache)[i].size;
    }
    return sum;
  }

  get(file) {
    if (file.id in this.cache)
      return this.cache[file.id];
    else
      return null;
  }

  add(file) {
    if (file.id in this.cache)
      return
    let size = this.size()
    while (size + file.size >= this.capacity) {
      if (!this.cache)
        return

      let largest;
      let largestValue = 0;
      for (let key in this.cache) {
        if (this.cache[key].size > largestValue) {
          largest = key;
          largestValue = this.cache[key].size;
        }
      }

      size -= this.cache[largest].size
      delete this.cache[largest]

    }
    this.cache[file.id] = file
  }
}

/**
 * @class FIFOCache
 */
class FIFOCache {
  //FIFO Cache


  constructor(capacity) {
    this.capacity = capacity
    this.cache = {}
    this.queue = new Queue();
  }

  size() {
    let sum = 0;
    for (let i = 0; i < Object.keys(this.cache).length; i++) {
      sum += Object.values(this.cache)[i].size;
    }
    return sum;
  }

  get(file) {
    //Search in queue
    return this.cache[file.id];
  }

  add(file) {
    if (file.id in this.cache)
      return
    let size = this.size();
    while (size + file.size >= this.capacity) {
      if (!this.queue)
        return
      let k = this.queue.dequeue();
      if (k in this.cache) {
        size -= this.cache[k].size;
        delete this.cache[k];
      }
    }
    this.cache[file.id] = file;
    this.queue.enqueue(file.id);
  }
}
