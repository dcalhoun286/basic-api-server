'use strict';

function serverError500 (err, req, res, next) {

  console.error('(STATUS 500 ERROR)', err);
  const errorObject = {
    status: 500,
    message: 'something broke',
  };

  res.status(500).json(errorObject);
  // res.sendFile('/500.html');
}

module.exports = serverError500;
