const constants = require('./constants');
const cache = require('./cache');

function put(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.swagger.params.id.value);
  req.routeMap.addOrUpdateObject(constants.CACHE_VALUE, req.body);
  req.routeMap.push(cache.set);
  req.routeMap.makeResponse(res);
}

function del(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.swagger.params.id.value);
  req.routeMap.push(cache.del);
  req.routeMap.makeResponse(res);
}

function get(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.swagger.params.id.value);
  req.routeMap.push(cache.extendTTL);
  req.routeMap.push(cache.get);
  req.routeMap.makeResponse(res);
}

function getAll(req, res) {
  const keys = req.cache.keys();
  res.status(200).send(keys);
}

module.exports = {
  put,
  del,
  get,
  getAll,
};
