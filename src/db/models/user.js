/**
 * @file user.js
 * @summary Defines User schema
 * */

const mongoose = require("mongoose");
const { USER_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const { userStatusValue, userTypeValue } = require(__basesrcdir + "/messages");

const userSchema = new mongoose.Schema({
    [USER_KEYS.FIRST_NAME]: {
        type: String,
        trim: true,
    },
    [USER_KEYS.LAST_NAME]: {
        type: String,
        trim: true,
    },
    [USER_KEYS.EMAIL]: {
        type: String,
        trim: true,
        required: true,
    },
    [USER_KEYS.PASSWORD]: {
        type: String,
        trim: true,
    },
    [USER_KEYS.ROLE]: {
        type: Number,
        // eslint-disable-next-line array-bracket-spacing
        enum: [userTypeValue.ADMIN, userTypeValue.DOCTOR, userTypeValue.PATIENT],
        trim: true,
    },
    [USER_KEYS.CONTACT_NUMBER]: {
        type: String,
        required: false,
        trim: true,
    },
    [COMMON_KEYS.ADDRESS]: {
        [COMMON_KEYS.STREET]: { type: String, trim: true },
        [COMMON_KEYS.CITY]: { type: String, trim: true },
        [COMMON_KEYS.STATE]: { type: String, trim: true },
        [COMMON_KEYS.ZIP_CODE]: { type: String, trim: true },
        [COMMON_KEYS.COUNTRY]: { type: String, trim: true },
    },
    [COMMON_KEYS.STATUS]: {
        type: Number,
        // eslint-disable-next-line array-bracket-spacing
        enum: [userStatusValue.ACTIVE, userStatusValue.INACTIVE, userStatusValue.BLOCKED],
        default: userStatusValue.ACTIVE,
    },
    [COMMON_KEYS.IS_DELETED]: {
        type: Boolean,
        default: false
    },
    [COMMON_KEYS.DELETED_AT]: {
        type: Date,
        default: null
    },

}, { timestamps: true });

module.exports = {
    User: mongoose.model("Users", userSchema)
};
