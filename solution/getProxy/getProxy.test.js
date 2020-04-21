const getProxy = require('.');

test('proxy works', () => {
  const object = Object.create(null);
  object.foo = 'bar';
  const proxy = getProxy(object);
  expect(proxy.foo).toBe('bar');
  object.foo = 'baz';
  expect(proxy.foo).toBe('baz');
});

test('custom "in" with props', () => {
  const object = Object.create({ foo: 'bar' });
  const successor = Object.create(object);
  const proxy = getProxy(successor);
  expect('foo' in successor).toBe(true);
  expect('foo' in proxy).toBe(false);
});

test('custom "in" with symbols', () => {
  const array = Object.create([]);
  const successor = Object.create(array);
  const proxy = getProxy(successor);
  expect(Symbol.iterator in array).toBe(true);
  expect(Symbol.iterator in successor).toBe(true);
  expect(Symbol.iterator in proxy).toBe(false);
});
