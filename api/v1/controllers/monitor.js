const constants = require('./constants');
const cache = require('./cache');

function get(req, res) {
  if (req.query.key) {
    req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.body.key);
    req.routeMap.push(cache.get);
    req.routeMap.makeResponse(res);
  } else {
    const keys = req.cache.keys();
    res.status(200).send(keys);
  }
}

function add(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.body.key);
  req.routeMap.addOrUpdateObject(constants.CACHE_VALUE, req.body.value);
  req.routeMap.push(cache.set);
  req.routeMap.makeResponse(res);
}

module.exports = {
  add,
  get,
};
