/**
 * @file accessToken.js
 * @summary Defines and exposes methods for Token entity
 * */

const { Token } = require(__basesrcdir + "/db/models");
const { COMMON_KEYS, TOKEN_KEYS } = require(__basesrcdir + "/constants/models");

/**
 * Method to create user token in DB
 * @param {object} userObj User token info to save
 * */
const createUserToken = (userObj) => {
    const token = new Token(userObj);

    return token.save();
};

/**
 * Method to get token by userId from DB
 * @param {string} userId User id
 * @param {object} [selection] Object with DB projection
 * */
const getTokenByUserId = (userId, selection = {}) => Token.find({
    [COMMON_KEYS.USER_ID]: userId
}, selection).sort({ createdAt: -1 }).lean();

/**
 * Method to get token by userId from DB
 * @param {string} userId User id
 * @param {object} [selection] Object with DB projection
 * */
const getTokenInfoByToken = (accessToken, selection = {}) => Token.findOne({
    [TOKEN_KEYS.TOKEN]: accessToken
}, selection).lean();

/**
 * Method to delete token by userId from DB
 * @param {string} userId User id
 * @param {object} [selection] Object with DB projection
 * */
const deleteTokenByUserId = (userId) => Token.deleteOne({
    [COMMON_KEYS.USER_ID]: userId
});

module.exports = {
    createUserToken,
    getTokenByUserId,
    deleteTokenByUserId,
    getTokenInfoByToken
};