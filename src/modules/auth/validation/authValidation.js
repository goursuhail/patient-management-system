const joi = require("joi");

joi.objectId = require("joi-objectid")(joi);
const { USER_KEYS } = require(__basesrcdir + "/constants/models");

const logInSchema = joi.object().keys({
    [USER_KEYS.EMAIL]: joi.string().trim().email().required(),
    [USER_KEYS.PASSWORD]: joi.string().required(),
});

module.exports = {
    logInSchema,
};