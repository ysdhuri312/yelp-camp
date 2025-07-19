export default class customError extends Error {
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    };
}