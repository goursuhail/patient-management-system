/**
 * @file roleValidationCheck.js
 * @summary checks the role of User
 * @description This file Checks role of the user to access the route
 * */

const { throwUnAuthorizedError } = require(__basesrcdir + "/errors");
const { messages, userTypeValue } = require(__basesrcdir + "/messages");
const { TOKEN_KEYS, USER_KEYS } = require(__basesrcdir + "/constants/models");

/**
 * Method to check the request is access by Admin
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next HTTP next callback method
 * */
const isAdmin = (req, res, next) => {
    try {
        if (req.user[TOKEN_KEYS.TOKEN_TYPE] !== userTypeValue.ADMIN) {
            throwUnAuthorizedError(messages.ACCESS_DENIED);
        }
        next();
    } catch (error) {
        return res.status(error.code).send({ error: error.message });
    }
};

const isUser = (req, res, next) => {
    try {
        if (req.user[TOKEN_KEYS.TOKEN_TYPE] !== userTypeValue.USER) {
            throwUnAuthorizedError(messages.ACCESS_DENIED);
        }
        next();
    } catch (error) {
        return res.status(error.code).send({ error: error.message });
    }
};

const isRoleAllowed = allowedRoles => (req, res, next) => {
    try {
        if (!allowedRoles.includes(req.user[USER_KEYS.ROLE])) {
            throwUnAuthorizedError(messages.ACCESS_DENIED);
        }
        next();
    } catch (error) {
        return res.status(error.code || 401).send({ error: error.message });
    }
};

module.exports = {
    isAdmin,
    isUser,
    isRoleAllowed
};
