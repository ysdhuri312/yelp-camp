/** @format */

export default class CustomError extends Error {
  constructor(statusCode, message, source) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.source = source;
  }
}
