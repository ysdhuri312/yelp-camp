/** @format */

export default (err, req, res, next) => {
  let { statusCode, message, source } = err;

  const errorResponse = {
    success: false,
    message: message || "Internal Server Error",
    source: source,
    stack: err.stack,
  };

  if (statusCode == 404) {
    return res.render("error", { err });
  }
  res.status(statusCode).json({ errorResponse });
};
