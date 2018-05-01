const constants = require('./constants');

function set(req) {
  return new Promise((resolve, reject) => {
    const obj = {
      key: req.routeMap.getObject(constants.CACHE_KEY),
      value: req.routeMap.getObject(constants.CACHE_VALUE),
    };
    req.cache.set(obj.key, obj.value, (err, success) => {
      if (err) {
        reject(err);
      } else if (!success) {
        reject(new Error('Unable to add object to cache'));
      } else {
        resolve(success);
      }
    });
  });
}

function get(req) {
  return new Promise((resolve, reject) => {
    const obj = {
      key: req.routeMap.getObject(constants.CACHE_KEY),
    };
    req.cache.get(obj.key, obj.value, (err, success) => {
      if (err) {
        reject(err);
      } else if (!success) {
        reject(new Error('Unable to get object from cache'));
      } else {
        resolve(success);
      }
    });
  });
}

module.exports = {
  set,
  get,
};
