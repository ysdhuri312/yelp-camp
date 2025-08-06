/** @format */

export default class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
