export default class customError extends Error {
    constructor(statusCode, message, source) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.source = source;
    };
}