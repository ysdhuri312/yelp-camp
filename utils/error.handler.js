/** @format */

export default (err, req, res, next) => {
  let { statusCode = 500, message = 'Internal server error' } = err;

  console.log(err.stack);

  if (statusCode == 404) {
    return res.render('error', { err });
  }

  res
    .status(statusCode)
    .render('error', { err: { statusCode, message: 'Internal server error' } });
};
