'use strict';

const validator = (req, res, next) => {
  if (req.method === 'GET') {
    console.log('REQ METHOD is ', req.method);
  }
  next();
};

module.exports = validator;
