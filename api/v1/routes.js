const routes = require('express').Router();
const processController = require('./controllers/process');

routes.get('/v1/process/:id', (req, res) => processController.get(req, res));
routes.delete('/v1/process/:id', (req, res) => processController.del(req, res));
routes.post('/v1/process/:id', (req, res) => processController.put(req, res));

module.exports = routes;
