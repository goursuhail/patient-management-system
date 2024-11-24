/**
 * @file patient.js
 * @summary Defines patient schema
 * */

const mongoose = require("mongoose");
const { PATIENT_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    [COMMON_KEYS.USER_ID]: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true,
    },
    [PATIENT_KEYS.CREATED_BY]: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true,
    },
    [PATIENT_KEYS.UPDATED_BY]: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true,
    },
    [PATIENT_KEYS.DOCTOR_ID]: {
        type: Schema.ObjectId,
        ref: "Doctors",
        required: true,
    },
    [PATIENT_KEYS.DATE_OF_BIRTH]: {
        type: Date,
        required: true,
    },
    [PATIENT_KEYS.GENDER]: {
        type: String,
        // eslint-disable-next-line array-bracket-spacing
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    [PATIENT_KEYS.MEDICAL_HISTORY]: [
        {
            [PATIENT_KEYS.DIAGNOSIS]: { type: String, trim: true },
            [PATIENT_KEYS.TREATMENT]: { type: String, trim: true },
            [PATIENT_KEYS.DATE]: { type: Date },
        },
    ],
    [PATIENT_KEYS.EMERGENCY_CONTACT]: {
        [PATIENT_KEYS.NAME]: { type: String, trim: true },
        [PATIENT_KEYS.RELATIONSHIP]: { type: String, trim: true },
        [PATIENT_KEYS.CONTACT_NUMBER]: { type: String, trim: true },
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
    Patient: mongoose.model("Patients", patientSchema)
};
