const asyncExecutor = require('.');


test('should work', async () => {
  const ID = 42;
  const delayMS = 1000;

  function getId() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ID);
      }, delayMS);
    });
  }

  function getDataById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === ID) {
          resolve('🍎');
        }
        reject(new Error('💥'));
      }, delayMS);
    });
  }

  function* gen() {
    const id = yield getId();
    const data = yield getDataById(id);

    return data;
  }

  function* gen2() {
    const a = yield 20;
    const b = yield 22;
    const result = yield a + b;

    return result;
  }

  const data = await asyncExecutor(gen);
  expect(data).toBe('🍎');

  const data2 = await asyncExecutor(gen2);
  expect(data2).toBe(42);
});
