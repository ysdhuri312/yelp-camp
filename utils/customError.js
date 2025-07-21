/** @format */

export default class CustomError extends Error {
  constructor(statusCode, message, source) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.source = source;
  }
}
