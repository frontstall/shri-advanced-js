const allKeysAndSymbols = require('.');

test('empty object', () => {
  const obj = Object.create(null);
  expect(allKeysAndSymbols(obj)).toEqual([]);
});

test('object with prototype and key-stringed props', () => {
  const ancestor = Object.create(null);
  ancestor.prop = 'prop';
  const successor = Object.create(ancestor);
  expect(allKeysAndSymbols(successor)).toEqual(['prop']);
  successor.prop = 'prop';
  expect(allKeysAndSymbols(successor)).toEqual(['prop']);
  successor.prop1 = 'prop1';
  expect(allKeysAndSymbols(successor)).toEqual(['prop', 'prop1']);
});

test('object with prototype, key-stringed props and Symbols', () => {
  const ancestor = Object.create(null);
  ancestor[Symbol.iterator] = function iterator() {
    return {
      next() {
        return {
          value: null,
          done: true,
        };
      },
    };
  };
  const ancestor2 = Object.create(ancestor);
  const obj = Object.create(ancestor2);
  ancestor2.prop = 'prop';
  obj.prop = 'prop';

  expect(allKeysAndSymbols(obj)).toEqual(['prop', Symbol.iterator]);
});
