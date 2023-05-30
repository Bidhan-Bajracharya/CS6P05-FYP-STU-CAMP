const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // default Error
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later.'
  }

  // mongoose required field's not found error
  if(err.name === "ValidationError"){
    customError.msg  = Object.values(err.errors).map((item) => item.message).join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // mongoose duplicate error 
  if(err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // mongoose cast error: '_id' wrong
  if(err.name === 'CastError'){
    customError.msg = `No resource found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
};

module.exports = errorHandlerMiddleware;