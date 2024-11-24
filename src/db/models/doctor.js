/**
 * @file doctor.js
 * @summary Defines doctor schema
 * */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DOCTOR_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const { doctorStatusValue } = require(__basesrcdir + "/messages");

const doctorSchema = new mongoose.Schema({
    [COMMON_KEYS.USER_ID]: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    [DOCTOR_KEYS.SPECIALIZATION]: {
        type: String,
        required: true,
    },
    [DOCTOR_KEYS.LICENSE_NUMBER]: {
        type: String,
        required: true,
    },
    [DOCTOR_KEYS.QUALIFICATION]: {
        type: String,
        required: true,
    },
    [DOCTOR_KEYS.EXPERIENCE_YEARS]: {
        type: Number,
        required: true,
    },
    [COMMON_KEYS.STATUS]: {
        type: Number,
        // eslint-disable-next-line array-bracket-spacing
        enum: [doctorStatusValue.ACTIVE, doctorStatusValue.INACTIVE, doctorStatusValue.BLOCKED],
        default: doctorStatusValue.ACTIVE,
    },
    [COMMON_KEYS.IS_ACTIVE]: {
        type: Boolean,
        default: true
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
    Doctor: mongoose.model("Doctors", doctorSchema)
};
