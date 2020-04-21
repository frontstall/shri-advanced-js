function asyncExecutor(generator) {
  return new Promise((resolve, reject) => {
    const iterator = generator();

    function onPromiseFulfill(result) {
      let state;

      try {
        state = iterator.next(result);
      } catch (error) {
        reject(error);
      }
      // eslint-disable-next-line no-use-before-define
      next(state);
    }

    function next({ value, done }) {
      if (done) {
        return resolve(value);
      }

      return Promise.resolve(value).then(onPromiseFulfill);
    }

    onPromiseFulfill();
  });
}

module.exports = asyncExecutor;
