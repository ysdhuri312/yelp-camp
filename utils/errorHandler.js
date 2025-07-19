export default ((err, req, res, next) => {
    let { statusCode, message } = err;
    statusCode = statusCode || 500;
    message = message || "Internal Server Error";
    // console.log(err.stack);
    res.status(statusCode).send(message);
})