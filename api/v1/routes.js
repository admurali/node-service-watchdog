const routes = require('express').Router();
const helloController = require('./controllers/hello_world');
const processController = require('./controllers/process');

routes.get('/v1/hello', (req, res) => {
  return helloController.hello(req, res);
});

routes.get('/v1/process/:id', (req, res) => {
  return processController.get(req, res);
});

routes.delete('/v1/process/:id', (req, res) => {
  return processController.del(req, res);
});

routes.post('/v1/process/:id', (req, res) => {
  return processController.put(req, res);
});

module.exports = routes;
