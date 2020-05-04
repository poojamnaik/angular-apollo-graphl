import HttpStatus from 'http-status-codes';


export function methodNotAllowed(req, res) {
  res
    .status(HttpStatus.METHOD_NOT_ALLOWED)
    .json({
      status: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
    })
}

export function genericErrorHandler(err, req, res, next) {
  const { code, message } = formatError(err);
  console.error('gen',message);
  res.status(code).json({ code, message });
}

function  formatError(error){
    console.error(error);
    return {
      code:error.status ||HttpStatus.INTERNAL_SERVER_ERROR,
      message:error.error || error
    };
  }