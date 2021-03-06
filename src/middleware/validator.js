'use strict';

const validator = (req, res, next) => {
  if (req.params.id === undefined) {
    next(`Invalid ${req.method} request`);
  }
  next();
};

module.exports = validator;
