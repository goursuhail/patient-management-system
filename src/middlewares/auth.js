/**
 * @file auth.js
 * @summary User authentication and verification middleware
 * @description This file contains utility methods for authentication and verification of user.
 * */

const { sign, verify } = require("jsonwebtoken");
const { messages, userStatusValue } = require(__basesrcdir + "/messages");
const { commonConstants } = require(__basesrcdir + "/constants");
const { throwUnAuthenticatedError } = require(__basesrcdir + "/errors");
const { tokenRepository, userRepository } = require(__basesrcdir + "/db/controllers");
const crypto = require("crypto");
const { USER_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const { JWT_SECRET, JWT_EXPIRE_TIME } = commonConstants;
const { errorApiResponse } = require(__basesrcdir + "/config");

/**
 * Method to extract and verify JWT token from HTTP headers
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next HTTP next callback method
 * */
const authenticateUserWithToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth) {
            throwUnAuthenticatedError(messages.ACCESS_DENIED);
        }
        const authParts = auth.split(" ");

        if (authParts.length !== 2) {
            throwUnAuthenticatedError("Format is: Bearer <token>");
        }
        // eslint-disable-next-line array-bracket-spacing
        const [scheme, token] = authParts;

        if (new RegExp("^Bearer$").test(scheme)) {
            let requestToken;

            try {
                requestToken = await verify(token, JWT_SECRET);
            } catch (e) {
                throwUnAuthenticatedError(e.message);
            }
            const userId = requestToken.id;

            const user = await userRepository.getUser({ _id: userId, [COMMON_KEYS.STATUS]: userStatusValue.ACTIVE });

            if (!user) {
                throwUnAuthenticatedError("Invalid token");
            }
            const userTokens = await tokenRepository.getTokenByUserId(userId);

            if (!userTokens || !userTokens.length) {
                throwUnAuthenticatedError("Invalid token");
            }

            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

            const isTokenExist = userTokens.some(userToken => userToken.accessToken === tokenHash);

            if (!isTokenExist) {
                throwUnAuthenticatedError("Invalid token");
            }
            requestToken[USER_KEYS.ROLE] = user[USER_KEYS.ROLE];
            req.user = requestToken;
            next();

        } else {
            throwUnAuthenticatedError("Format is: Bearer <token>");
        }
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Method to generate token from a given payload
 * @param {object} payload Payload to be injected in token
 * */
const createToken = payload => {
    const tokenPayload = {
        id: payload._id,
        [USER_KEYS.FIRST_NAME]: payload[USER_KEYS.FIRST_NAME],
        [USER_KEYS.LAST_NAME]: payload[USER_KEYS.LAST_NAME],
        [COMMON_KEYS.EMAIL]: payload[USER_KEYS.EMAIL],
        time: new Date().getTime(),
    };

    return sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
};

module.exports = {
    createToken,
    authenticateUserWithToken
};
