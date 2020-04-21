const uniq = (array) => {
  const result = [];

  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    if (!result.includes(item)) {
      result.push(item);
    }
  }

  return result;
};

const isIterable = (value) => Symbol.iterator in Object(value);

const getIterator = (context, transform = (x) => x) => ({
  [Symbol.iterator]: () => {
    let counter = -1;

    return {
      next: () => {
        counter += 1;
        return ({
          done: counter >= context.size,
          value: transform(context.set[counter]),
        });
      },
    };
  },
});

const double = (i) => [i, i];

class MySet {
  constructor(collection = []) {
    if (!isIterable(collection)) {
      throw new TypeError(`${String(collection)} is not iterable`);
    }
    this.set = uniq(collection);
    this[Symbol.iterator] = () => {
      let counter = -1;
      return ({
        next: () => {
          counter += 1;
          return {
            done: counter >= this.set.length,
            value: this.set[counter],
          };
        },
      });
    };
  }

  get size() {
    return this.set.length;
  }

  entries() {
    return getIterator(this, double);
  }

  values() {
    return getIterator(this);
  }

  keys() {
    return getIterator(this);
  }

  clear() {
    this.set = [];
  }

  add(value) {
    if (!this.set.includes(value)) {
      this.set.push(value);
    }
  }

  delete(value) {
    if (!this.set.includes(value)) {
      return false;
    }

    this.set = this.set.filter((v) => !Object.is(v, value));
    return true;
  }

  has(value) {
    return this.set.includes(value);
  }

  valueOf() {
    return this;
  }

  toString() {
    return `[object ${this.constructor.name}]`;
  }

  forEach(cb, context) {
    this.set.forEach((item) => {
      cb.call(context, item);
    });
  }
}

module.exports = MySet;
