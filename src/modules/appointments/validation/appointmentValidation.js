const joi = require("joi");

joi.objectId = require("joi-objectid")(joi);
const { APPOINTMENT_KEYS } = require(__basesrcdir + "/constants/models");

const createAppointmentValidationSchema = joi.object({
    [APPOINTMENT_KEYS.PATIENT_ID]: joi.string()
        .required()
        .messages({
            "any.required": "Patient ID is required",
        }),

    [APPOINTMENT_KEYS.DOCTOR_ID]: joi.string()
        .required()
        .messages({
            "any.required": "Doctor ID is required",
        }),

    [APPOINTMENT_KEYS.DATE]: joi.date()
        .iso()
        .required()
        .messages({
            "date.base": "Date must be a valid ISO date",
            "any.required": "Date is required",
        }),

    [APPOINTMENT_KEYS.TIME]: joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/) // Validate 24-hour time format (HH:mm)
        .required()
        .messages({
            "string.pattern.base": "Time must be in HH:mm format (24-hour clock)",
            "any.required": "Time is required",
        }),
});

const updateAppointmentValidationSchema = joi.object({
    [APPOINTMENT_KEYS.PATIENT_ID]: joi.string()
        .optional()
        .messages({
            "string.base": "Patient ID must be a valid string",
        }),

    [APPOINTMENT_KEYS.DOCTOR_ID]: joi.string()
        .optional()
        .messages({
            "string.base": "Doctor ID must be a valid string",
        }),

    [APPOINTMENT_KEYS.DATE]: joi.date()
        .iso()
        .optional()
        .messages({
            "date.base": "Date must be a valid ISO 8601 date",
        }),

    [APPOINTMENT_KEYS.TIME]: joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/) // Validate 24-hour time format (HH:mm)
        .optional()
        .messages({
            "string.pattern.base": "Time must be in HH:mm format (24-hour clock)",
            "string.base": "Time must be a valid string",
        }),
});

module.exports = {
    createAppointmentValidationSchema,
    updateAppointmentValidationSchema
};