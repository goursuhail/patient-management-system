const joi = require("joi");

joi.objectId = require("joi-objectid")(joi);
const { DOCTOR_KEYS, COMMON_KEYS, USER_KEYS } = require(__basesrcdir + "/constants/models");

const createDoctorSchema = joi.object({
    [USER_KEYS.FIRST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            "string.empty": "First name is required",
            "string.min": "First name should have at least 3 characters",
            "string.max": "First name should not exceed 25 characters",
        }),
    [USER_KEYS.LAST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Last name is required",
            "string.min": "Last name should have at least 3 characters",
            "string.max": "Last name should not exceed 25 characters",
        }),
    [USER_KEYS.EMAIL]: joi.string()
        .trim(true)
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
        }),
    [USER_KEYS.PASSWORD]: joi.string()
        .min(8)
        .max(50)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password should not exceed 50 characters",
        }),
    [USER_KEYS.CONTACT_NUMBER]: joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Contact number is required",
            "string.pattern.base": "Contact number must be a valid phone number (10-15 digits)",
        }),
    [COMMON_KEYS.ADDRESS]: joi.object({
        [COMMON_KEYS.STREET]: joi.string().trim(true).allow(""),
        [COMMON_KEYS.CITY]: joi.string().trim(true).allow(""),
        [COMMON_KEYS.STATE]: joi.string().trim(true).allow(""),
        [COMMON_KEYS.ZIP_CODE]: joi.string().trim(true).allow(""),
        [COMMON_KEYS.COUNTRY]: joi.string().trim(true).allow(""),
    }).optional(),
    [DOCTOR_KEYS.SPECIALIZATION]: joi.string()
        .min(3)
        .max(50)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Specialization is required",
            "string.min": "Specialization should have at least 3 characters",
            "string.max": "Specialization should not exceed 50 characters",
        }),
    [DOCTOR_KEYS.LICENSE_NUMBER]: joi.string()
        .min(5)
        .max(25)
        .trim(true)
        .required()
        .messages({
            "string.empty": "License number is required",
            "string.min": "License number must have at least 5 characters",
            "string.max": "License number should not exceed 25 characters",
        }),
    [DOCTOR_KEYS.QUALIFICATION]: joi.string()
        .min(2)
        .max(50)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Qualification is required",
            "string.min": "Qualification should have at least 2 characters",
            "string.max": "Qualification should not exceed 50 characters",
        }),
    [DOCTOR_KEYS.EXPERIENCE_YEARS]: joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Experience years must be a number",
            "number.min": "Experience years must be at least 0",
        }),
});

module.exports = {
    createDoctorSchema,
};