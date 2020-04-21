const MySet = require('.');

test('should have iterator', () => {
  const collection = [1, 2, 3];
  const set = new MySet(collection);

  expect(set[Symbol.iterator]).not.toBeUndefined();
  expect([...set]).toStrictEqual(collection);
});

test('should have size', () => {
  const set = new MySet();
  expect(set.size).toBe(0);

  const set2 = new MySet([1, 2, 3]);
  expect(set2.size).toBe(3);
});

test('should accept only iterables', () => {
  const createSet1 = () => new MySet({});
  expect(createSet1).toThrowErrorMatchingSnapshot();

  const createSet2 = () => new MySet(1);
  expect(createSet2).toThrowErrorMatchingSnapshot();

  const createSet3 = () => new MySet(null);
  expect(createSet3).toThrowErrorMatchingSnapshot();

  const createSet4 = () => new MySet('ololo');
  expect(createSet4).not.toThrow();

  const createSet5 = () => new MySet(undefined);
  expect(createSet5).not.toThrow();

  const createSet6 = () => new MySet(() => {});
  expect(createSet6).toThrowErrorMatchingSnapshot();
});

test('should have entries()', () => {
  const set = new MySet([1, 2, 3]);
  const entries = set.entries();

  expect(entries[Symbol.iterator]).not.toBeUndefined();
  expect([...entries]).toStrictEqual([[1, 1], [2, 2], [3, 3]]);
});

test('should have values()', () => {
  const set = new MySet([1, 2, 3]);
  const values = set.values();

  expect(values[Symbol.iterator]).not.toBeUndefined();
  expect([...values]).toStrictEqual([1, 2, 3]);
});

test('should have keys()', () => {
  const set = new MySet([1, 2, 3]);
  const keys = set.keys();

  expect(keys[Symbol.iterator]).not.toBeUndefined();
  expect([...keys]).toStrictEqual([1, 2, 3]);
});

test('should have clear()', () => {
  const set = new MySet([1, 2, 3]);
  set.clear();

  expect(set.size).toBe(0);
});

describe('should have add()', () => {
  let set;

  beforeEach(() => {
    set = new MySet();
  });

  test('works with primitive values', () => {
    set.add(1);

    expect(set.size).toBe(1);
    expect([...set.values()]).toStrictEqual([1]);

    set.add('');
    expect(set.size).toBe(2);
    expect([...set.values()]).toStrictEqual([1, '']);

    set.add(1);
    expect([...set.values()]).toStrictEqual([1, '']);
  });

  test('works with objects', () => {
    const obj = { foo: 'bar' };
    set.add(obj);
    set.add(obj);
    expect([...set.values()]).toStrictEqual([obj]);

    set.add({ foo: 'bar' });
    expect([...set.values()]).toStrictEqual([obj, { foo: 'bar' }]);
    expect([...set.values()][0]).toBe(obj);
  });

  test('works with undefined', () => {
    set.add();
    expect([...set.values()]).toStrictEqual([undefined]);

    set.add();
    expect([...set.values()]).toStrictEqual([undefined]);

    set.add(undefined);
    expect([...set.values()]).toStrictEqual([undefined]);
  });

  test('works with NaN', () => {
    set.add(NaN);
    expect([...set.values()]).toStrictEqual([NaN]);

    set.add(NaN);
    expect([...set.values()]).toStrictEqual([NaN]);
  });
});

test('should have delete()', () => {
  const set = new MySet([1, 2, 3]);
  const result1 = set.delete(2);

  expect(result1).toBe(true);
  expect(set.size).toBe(2);
  expect([...set.values()]).toStrictEqual([1, 3]);

  set.add({});
  const result2 = set.delete({});
  expect(result2).toBe(false);
  expect([...set.values()]).toStrictEqual([1, 3, {}]);

  const x = { foo: 'bar' };
  set.add(x);
  const result3 = set.delete(x);
  expect(result3).toBe(true);
  expect([...set.values()]).toStrictEqual([1, 3, {}]);
});

test('should have has()', () => {
  const foo = () => {};
  const set = new MySet([1, {}, NaN, foo]);

  expect(set.has()).toBe(false);

  set.add();
  expect(set.has()).toBe(true);
  expect(set.has(0 / 0)).toBe(true);
  expect(set.has(1)).toBe(true);
  expect(set.has({})).toBe(false);
  expect(set.has(foo)).toBe(true);
  expect(set.has(NaN)).toBe(true);
});

test('should have valueOf()', () => {
  const set = new MySet();

  expect(set.valueOf()).toBe(set);
});

test('should have toString()', () => {
  const set = new MySet();

  expect(set.toString()).toBe('[object MySet]');
});

test('should have forEach()', () => {
  const set = new MySet();
  const object = {
    getValue() { return this.value; },
  };

  const data = {
    value: 42,
  };

  set.add(object);

  set.forEach(function cb(item) {
    expect(item.getValue.call(this)).toBe(42);
  }, data);
});
