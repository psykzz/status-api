'use strict';

var errorResponse = (res, message, status) => {
  status = status || 500;
  res.status(status).json({
    status: 'error',
    response: {
      error: message
    }
  })
}


module.exports.errorResponse = errorResponse;
