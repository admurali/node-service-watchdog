const constants = require('./constants');
const cache = require('./cache');

function getStatus(req, res) {
  req.routeMap.addOrUpdateObject(constants.CACHE_KEY, req.body.key);
  req.routeMap.addOrUpdateObject(constants.CACHE_VALUE, req.body.value);
  req.routeMap.push(cache.set);
  req.routeMap.makeResponse(res);
}