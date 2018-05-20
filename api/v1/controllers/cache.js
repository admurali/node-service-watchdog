const constants = require('./constants.json');

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
    req.cache.get(obj.key, (err, value) => {
      if (err) {
        reject(err);
      } else if (value === undefined) {
        reject(new Error('Unable to get object from cache'));
      } else {
        req.routeMap.addOrUpdateObject(constants.CACHE_VALUE, value);
        resolve(value);
      }
    });
  });
}

function del(req) {
  return new Promise((resolve, reject) => {
    const obj = {
      key: req.routeMap.getObject(constants.CACHE_KEY),
    };
    req.cache.del(obj.key, (err, count) => {
      if (err) {
        reject(err);
      } else if (count === 0) {
        reject(new Error('Unable to delete object from cache'));
      } else {
        resolve(count);
      }
    });
  });
}

function extendTTL(req) {
  return new Promise((resolve, reject) => {
    req.cache.ttl(req.routeMap.getObject(constants.CACHE_KEY), constants.TTL, (err, changed) => {
      if (err) {
        reject('Error in trying to extend ttl for key');
      } else if (!changed) {
        reject('Unable to extend ttl as key is missing');
      } else {
        resolve(req.routeMap.getObject(constants.CACHE_VALUE));
      }
    });
  });
}

module.exports = {
  set,
  get,
  del,
  extendTTL,
};
