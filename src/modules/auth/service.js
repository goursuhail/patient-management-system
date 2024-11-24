const { userRepository, tokenRepository } = require(__basesrcdir + "/db/controllers");
const { COMMON_KEYS, USER_KEYS, TOKEN_KEYS } = require(__basesrcdir + "/constants/models");
const { throwBadRequestError } = require(__basesrcdir + "/errors");
const { messages } = require(__basesrcdir + "/messages");
const { compare } = require("bcrypt");
const { createToken } = require(__basesrcdir + "/middlewares");
const crypto = require("crypto");
const { userTypeValue } = require(__basesrcdir + "/messages");
const { hash } = require("bcrypt");

/**
 * Method for login the user
 * @param {object} authData User object.
 * */
const login = async (authObj) => {
    const user = await userRepository.getUser({ [USER_KEYS.EMAIL]: authObj[USER_KEYS.EMAIL] });

    if (!user) {
        throwBadRequestError(messages.INVALID_CREDENTIALS);
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await compare(authObj[USER_KEYS.PASSWORD], user[USER_KEYS.PASSWORD]);

    if (!isMatch) {
        throwBadRequestError(messages.INVALID_CREDENTIALS);
    }

    // Generate a JWT token
    const token = await createToken(user);

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const userTokenData = {
        [COMMON_KEYS.USER_ID]: user._id,
        [TOKEN_KEYS.TOKEN]: tokenHash,
    };

    await tokenRepository.createUserToken(userTokenData);

    return {
        authToken: token
    };
};

/**
 * Method to create admin
 * */
const createAdmin = async () => {
    const admins = await userRepository.getUsers({ [USER_KEYS.ROLE]: userTypeValue.ADMIN });

    if (admins.length) {
        return;
    }

    const adminUserObj = {
        [USER_KEYS.FIRST_NAME]: "Super",
        [USER_KEYS.LAST_NAME]: "Admin",
        [USER_KEYS.EMAIL]: "admin@example.com",
        [USER_KEYS.PASSWORD]: await hash("SuperPass123", 10),
        [USER_KEYS.ROLE]: userTypeValue.ADMIN,
        [USER_KEYS.CONTACT_NUMBER]: "123456789",
        [COMMON_KEYS.ADDRESS]: {},
    };

    await userRepository.createUser(adminUserObj);
};

module.exports = {
    login,
    createAdmin
};