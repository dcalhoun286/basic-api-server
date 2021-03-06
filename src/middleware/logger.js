'use strict';

function loggerMiddleware(req, res, next) {
  console.log(`PATH: ${req.path}`);
  console.log(`METHOD: ${req.method}`);
  next();
}

module.exports = loggerMiddleware;
