/**
 * @file users.js
 * @summary Defines and exposes methods for users entity
 * */
const { User } = require(__basesrcdir + "/db/models");
const { USER_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");

/**
 * Method to get user by id from DB
 * @param {string} userId User id
 * @param {object} [selection] Object with DB projection
 * */
const getUserById = (userId, selection = {}) => User.findOne({
    _id: userId
}, selection).select(`-${USER_KEYS.PASSWORD}`).lean();

/**
 * Method to get user info from DB
 * @param {string} condition Condition by which user will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getUser = (condition = {}, selection = {}) => User.findOne(condition, selection).lean();

/**
 * Method to get users according info to some conditions from DB
 * @param {string} condition Condition by which user will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getUsers = (condition = {}, selection = {}) => User.find(condition, selection).select(`-${USER_KEYS.PASSWORD}`).sort({ createdAt: -1 }).lean();

/**
 * Method to create user in DB
 * @param {object} userObj User info to save
 * */
const createUser = (userObj) => {
    const user = new User(userObj);

    return user.save();
};

/**
 * Method to get user by id from DB
 * @param {string} userId User id
 * @param {object} updates Data to update
 * */
const updateUserById = (userId, updates) => User.updateOne({
    _id: userId
}, {
    $set: updates
});

/**
 * Method to delete user by userId from DB
 * @param {string} userId User id
 * @param {object} [selection] Object with DB projection
 * */
const deleteUserById = (userId) => User.deleteOne({
    [COMMON_KEYS.OBJECT_ID]: userId
});

/**
 * Method to get all users listing
 */
const userListing = (condition = {}, limit, skip) => User.find(condition).limit(limit).skip(skip).sort({ createdAt: -1 }).lean();

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUserById,
    getUsers,
    userListing,
    deleteUserById
};
