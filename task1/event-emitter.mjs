export class EventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    if (!this.listeners[eventName])
      this.listeners[eventName] = [fn]
    else
      this.listeners[eventName].push(fn)
  }

  on(eventName, fn) {
    this.addListener(eventName, fn)
  }

  removeListener(eventName, fn) {
    this.listeners[eventName] = null
    fn()
  }

  off(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
    }
  }

  once(eventName, fn) {
    this.on(eventName, (...args) => {
      fn(...args)
      this.listeners[eventName].filter(listener => listener !== fn);
    })
  }

  emit(eventName, ...args) {
    const func = this.listeners[eventName];
    for (let f of func) {
      f(...args)
    }
  }

  listenerCount(eventName) {
    if (!this.listeners[eventName])
      return 0

    return this.listeners[eventName].length
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}
