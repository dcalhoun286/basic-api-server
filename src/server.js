'use strict';
// if applicable, 1st party dependencies
// example: const path = require('path');

// 3rd party dependencies

const express = require('express');
const app = express();

// internal modules

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
// const ThingsModel = require('./models/thing.js');
// const itemRoutes = require('./routes/things.js');
const dogsRoutes = require('./routes/dogs.js');
const clothesRoutes = require('./routes/clothes.js');

// internal constants
const PORT = process.env.PORT || 3333;

// Express Global Middleware
// if your POST requests don't work, it's probably because you forgot to add this
app.use(express.json());

// Our own Global Middleware
app.use(logger);

// use the routes from the routing module
app.use(dogsRoutes);
app.use(clothesRoutes);

app.get('/', getHomePage);

function getHomePage(req, res) {
  let outputObject = {
    
    route: 'homepage',

  };

  res.status(200).json(outputObject);
}

app.get('/bad', (req, res, next) => {
  next('error');
});

// error handling middleware is always at the bottom of the middleware chain
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) { throw new Error('Missing Port');}
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
