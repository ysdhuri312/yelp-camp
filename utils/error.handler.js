/** @format */

export default (err, req, res, next) => {
  let {
    statusCode = 500,
    message = 'Internal Server Error',
    source = undefined,
  } = err;

  console.log(err.stack);

  if (statusCode == 404) {
    return res.render('error', { err });
  }

  res
    .status(statusCode)
    .render('error', { err: { statusCode: 400, message: 'Bad request' } });
};
