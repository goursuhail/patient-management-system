const { AppError } = require("./appError");
const { log } = require("./logger");
const {
    throwBadRequestError,
    throwInternalServerError,
    throwUnAuthenticatedError,
    throwUnAuthorizedError,
    throwNotFoundError,
    throwUnprocessableEntityError
} = require("./methods");
const { checkErrorCode } = require("./checkErrorCode");

module.exports = {
    AppError,
    log,
    throwBadRequestError,
    throwInternalServerError,
    throwUnAuthenticatedError,
    throwUnAuthorizedError,
    throwNotFoundError,
    checkErrorCode,
    throwUnprocessableEntityError
};
