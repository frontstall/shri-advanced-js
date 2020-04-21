const getProxy = (obj) => {
  const handler = {
    has(target, key) {
      return Object.prototype.hasOwnProperty.call(target, key);
    },
  };

  return new Proxy(obj, handler);
};

module.exports = getProxy;
