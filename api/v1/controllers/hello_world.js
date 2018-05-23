const util = require('util');

function resolveHello(req) {
  return new Promise((resolve) => {
    req.logger.info(req.params);
    const name = req.query.name || 'stranger';
    // this sends back a JSON response which is a single string
    resolve(util.format('Hello, %s!', name));
  });
}

function hello(req, res) {
  req.routeMap.push(resolveHello);
  req.routeMap.makeResponse(res);
}

module.exports = {
  hello,
};
