// Middleware for contextual logging
const logger = require('logging-express-mw');
// Middleware for writing good apis
const routeMap = require('routemap-express-mw');
// Parse incoming request bodies in a middleware
// before your handlers, available under
// the req.body property.
const bodyParser = require('body-parser');
// Middleware that enables CORS requests
const cors = require('cors');
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const NodeCache = require('node-cache');

const app = express();

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// Load environment variables
require('dotenv').config();
// CORS enabled with options
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
app.use(cors());
// Need to use `req.logger`
app.use(logger.middleware());
// mw to write elegant apis
app.use(routeMap());

// mw to have store
const myCache = new NodeCache({ stdTTL: 6000, checkperiod: 1200 });
app.use((req, res, next) => {
  req.cache = myCache;
  next();
});

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('Swagger server is up and running');
  }
});
