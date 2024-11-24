/* eslint-disable array-bracket-spacing */
/* eslint-disable indent */
/**
 * @file appointment.js
 * @summary Defines Appointment schema
 * */

const mongoose = require("mongoose");
const { APPOINTMENT_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const { appointmentStatusValue } = require(__basesrcdir + "/messages");
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    [APPOINTMENT_KEYS.PATIENT_ID]: {
        type: Schema.ObjectId,
        ref: "Patients",
        required: true,
    },
    [APPOINTMENT_KEYS.DOCTOR_ID]: {
        type: Schema.ObjectId,
        ref: "Doctors",
        required: true,
    },
    [APPOINTMENT_KEYS.DATE]: {
        type: Date,
        required: true,
    },
    [APPOINTMENT_KEYS.TIME]: {
        type: String,
        required: true,
    },
    [APPOINTMENT_KEYS.CREATED_BY]: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true,
    },
    [APPOINTMENT_KEYS.UPDATED_BY]: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true,
    },
    [COMMON_KEYS.STATUS]: {
        type: Number,
        // eslint-disable-next-line array-bracket-spacing
        enum: [appointmentStatusValue.Pending, appointmentStatusValue.Confirmed,
        appointmentStatusValue.Cancelled, appointmentStatusValue.Completed],
        default: appointmentStatusValue.Confirmed,
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
    Appointment: mongoose.model("Appointments", appointmentSchema)
};
