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
const express = require('express');

// Adding SocketIO
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const NodeCache = require('node-cache');
const os = require('os');
const pidusage = require('pidusage');

const app = express();
module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required for swagger config
  publicPath: path.join(__dirname, './public'), // require for socket io
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

//  Connect all our routes to our application
const v1Routes = require('./api/v1/routes');

app.param('id', (req, res, next, id) => {
  console.log(`A call for ${id} originated`);
  next();
});
app.use('/', v1Routes);

// Initiate socket io
app.use(express.static(config.publicPath));
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  myCache.set(process.pid, {}, (err, success) => {
    if (err) {
      throw err;
    } else if (!success) {
      throw new Error('Unable to add self to cache');
    } else {
      // Compute statistics every second:
      // => {
      //   cpu: 10.0,            // percentage (it may happen to be greater than 100%)
      //   memory: 357306368,    // bytes
      //   ppid: 312,            // PPID
      //   pid: 727,             // PID
      //   ctime: 867000,        // ms user + system time
      //   elapsed: 6650000,     // ms since the start of the process
      //   timestamp: 864000000  // ms since epoch
      // }
      setInterval(() => {
        const cache = [];
        const requests = myCache.keys().map(item => new Promise((resolve) => {
          pidusage(item, (error, stats) => {
            if (error) {
              console.log(`Got error in getting status: ${error.message}`);
            } else {
              cache.push(stats);
              resolve();
            }
          });
        }));
        Promise.all(requests).then(() => socket.emit('status', {
          cache,
          cpu: {
            total: os.cpus().length,
          },
          ram: {
            free: os.freemem(),
            total: os.totalmem(),
          },
        }));
      }, 6000);
    }
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

const port = process.env.PORT || 10010;
server.listen(port, () => {
  console.log(`Socket IO server is up on ${port}`);
});
