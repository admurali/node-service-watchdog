const constants = require('./constants');
const cache = require('./cache');

function add(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.body.key);
  req.routeMap.addOrUpdateObject(constants.CACHE_VALUE, req.body.value);
  req.routeMap.push(cache.set);
  req.routeMap.makeResponse(res);
}

function del(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.swagger.params.key.value);
  req.routeMap.push(cache.del);
  req.routeMap.makeResponse(res);
}

function get(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.swagger.params.key.value);
  req.routeMap.push(cache.extendTTL);
  req.routeMap.push(cache.get);
  req.routeMap.makeResponse(res);
}

function getAll(req, res) {
  const keys = req.cache.keys();
  res.status(200).send(keys);
}

module.exports = {
  add,
  del,
  get,
  getAll,
};
