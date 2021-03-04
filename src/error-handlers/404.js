'use strict';

function notFound404(req, res, next){
  res.status(404).json({ status: 404, msg: 'not found' });
  // res.sendFile('/404.html');
  next();
}

module.exports = notFound404;
