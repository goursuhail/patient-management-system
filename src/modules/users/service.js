const { userRepository, doctorRepository, patientRepository } = require(__basesrcdir + "/db/controllers");
const { COMMON_KEYS, USER_KEYS } = require(__basesrcdir + "/constants/models");
const { throwBadRequestError } = require(__basesrcdir + "/errors");
const { messages } = require(__basesrcdir + "/messages");
const { hash } = require("bcrypt");
const { commonConstants } = require(__basesrcdir + "/constants");
const { BCRYPT_SALT_ROUNDS } = commonConstants;
const { userTypeValue } = require(__basesrcdir + "/messages");

/**
 * Method for create the user record
 * @param {object} userObj User object.
 * */
const createUserRecord = async (userObj) => {
    // Hash password
    userObj[USER_KEYS.PASSWORD] = await hash(userObj[USER_KEYS.PASSWORD], Number(BCRYPT_SALT_ROUNDS));

    const userPayload = {
        [USER_KEYS.FIRST_NAME]: userObj[USER_KEYS.FIRST_NAME],
        [USER_KEYS.LAST_NAME]: userObj[USER_KEYS.LAST_NAME],
        [USER_KEYS.EMAIL]: userObj[USER_KEYS.EMAIL],
        [USER_KEYS.PASSWORD]: userObj[USER_KEYS.PASSWORD],
        [USER_KEYS.ROLE]: userObj[USER_KEYS.ROLE],
        [USER_KEYS.CONTACT_NUMBER]: userObj[USER_KEYS.CONTACT_NUMBER],
        [COMMON_KEYS.ADDRESS]: userObj[COMMON_KEYS.ADDRESS],
    };

    const user = await userRepository.createUser(userPayload);

    if (!user || !user._id) {
        throwBadRequestError(messages.USER_CREATION_FAILED_AND_PLEASE_TRY_AGAIN);
    }
    return user;
};

/**
 * Method for check that user exist or not
 * */
const checkIfUserExists = async (email) => {
    const user = await userRepository.getUser({ [USER_KEYS.EMAIL]: email });

    if (user) {
        throwBadRequestError(messages.EMAIL_ALREADY_EXISTS);
    }
};

/**
 * Method for get the user entity detail vai id and role
 * */
const getEntityDetails = async (id, role) => {
    let entity;
    const condition = { userId: id };

    switch (role) {
        case userTypeValue.DOCTOR:
            entity = await doctorRepository.getDoctor(condition);
            break;

        case userTypeValue.PATIENT:
            entity = await patientRepository.getPatient(condition);
            break;

        default:
            throwBadRequestError(messages.NOT_FOUND);
    }
    return entity;
};

module.exports = {
    createUserRecord,
    checkIfUserExists,
    getEntityDetails
};