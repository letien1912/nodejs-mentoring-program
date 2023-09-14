import { EventEmitter } from '../task1/event-emitter.mjs';
import fetch from 'node-fetch'

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin')
    console.time('WithTime');
    asyncFunc(...args)
      .then(data => data.json())
      .then(data => {
      this.emit('data', data)
      console.timeEnd('WithTime');
      this.emit('end')
    })
  }
}


const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', console.log);

withTime.execute(fetch, 'https://jsonplaceholder.typicode.com/posts/1')

// console.log(withTime.rawListeners("end"));
