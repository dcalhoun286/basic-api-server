'use strict';

function serverError500 (err, req, res, next) {

  const error = err.message ? err.message : err;

  const errorObject = {
    status: 500,
    message: error,
  };

  res.status(500).json(errorObject);
  // res.sendFile('/500.html');
}

module.exports = serverError500;
