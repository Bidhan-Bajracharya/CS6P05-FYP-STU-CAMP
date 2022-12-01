class CustomAPIError extends Error {
    // accepts a message as argument
    // overrides the message property in Error class
    constructor(message) {
        super(message)
    }
}

module.exports = CustomAPIError;