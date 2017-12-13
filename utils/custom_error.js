class CustomError {
    constructor(message, httpStatusCode) {
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}

module.exports = CustomError;