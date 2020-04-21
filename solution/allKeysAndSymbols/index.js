const allKeysAndSymbols = (obj) => {
  const iter = (target, accum = []) => {
    if (!target) {
      return accum;
    }

    const properties = Object.getOwnPropertyNames(target);
    const symbols = Object.getOwnPropertySymbols(target);
    const newAccum = [...accum, ...properties, ...symbols];

    return iter(Object.getPrototypeOf(target), newAccum);
  };

  const result = iter(obj);

  return Array.from(new Set(result));
};

module.exports = allKeysAndSymbols;
