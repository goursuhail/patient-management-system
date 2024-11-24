const joi = require("joi");

joi.objectId = require("joi-objectid")(joi);
const { PATIENT_KEYS, COMMON_KEYS, USER_KEYS } = require(__basesrcdir + "/constants/models");

// Reusable Nested Schemas
const addressSchema = joi.object({
    [COMMON_KEYS.STREET]: joi.string().trim(true).optional(),
    [COMMON_KEYS.CITY]: joi.string().trim(true).optional(),
    [COMMON_KEYS.STATE]: joi.string().trim(true).optional(),
    [COMMON_KEYS.ZIP_CODE]: joi.string().trim(true).optional(),
    [COMMON_KEYS.COUNTRY]: joi.string().trim(true).optional(),
});

const emergencyContactSchema = joi.object({
    [PATIENT_KEYS.NAME]: joi.string().trim(true).optional(),
    [PATIENT_KEYS.RELATIONSHIP]: joi.string().trim(true).optional(),
    [USER_KEYS.CONTACT_NUMBER]: joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .optional()
        .messages({
            "string.pattern.base": "Contact number must only contain digits",
            "string.min": "Contact number must have at least 10 digits",
            "string.max": "Contact number must not exceed 15 digits",
        }),
});

const medicalHistorySchema = joi.array().items(
    joi.object({
        [PATIENT_KEYS.DIAGNOSIS]: joi.string().trim(true).optional(),
        [PATIENT_KEYS.TREATMENT]: joi.string().trim(true).optional(),
        [PATIENT_KEYS.DATE]: joi.date().iso().optional(),
    })
);

// Create Patient Schema
const createPatientSchema = joi.object({
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
    [PATIENT_KEYS.DATE_OF_BIRTH]: joi.date()
        .iso()
        .required()
        .messages({
            "date.base": "Date of birth must be a valid date",
            "any.required": "Date of birth is required",
        }),
    [PATIENT_KEYS.GENDER]: joi.string()
        .valid("Male", "Female", "Other")
        .required()
        .messages({
            "any.only": "Gender must be Male, Female, or Other",
            "any.required": "Gender is required",
        }),
    [USER_KEYS.CONTACT_NUMBER]: joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required()
        .messages({
            "string.empty": "Contact number is required",
            "string.pattern.base": "Contact number must only contain digits",
            "string.min": "Contact number must have at least 10 digits",
            "string.max": "Contact number must not exceed 15 digits",
        }),
    [COMMON_KEYS.ADDRESS]: addressSchema.optional(),
    [PATIENT_KEYS.MEDICAL_HISTORY]: medicalHistorySchema.optional(),
    [PATIENT_KEYS.EMERGENCY_CONTACT]: emergencyContactSchema.optional(),
    [PATIENT_KEYS.DOCTOR_ID]: joi.string()
        .required()
        .messages({
            "string.empty": "Doctor ID is required",
        }),
});

// Update Patient Schema
const updatePatientSchema = joi.object({
    [USER_KEYS.FIRST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .optional()
        .messages({
            "string.empty": "First name cannot be empty",
            "string.min": "First name should have at least 3 characters",
            "string.max": "First name should not exceed 25 characters",
        }),
    [USER_KEYS.LAST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .optional()
        .messages({
            "string.empty": "Last name cannot be empty",
            "string.min": "Last name should have at least 3 characters",
            "string.max": "Last name should not exceed 25 characters",
        }),
    [PATIENT_KEYS.DATE_OF_BIRTH]: joi.date()
        .iso()
        .optional()
        .messages({
            "date.base": "Date of birth must be a valid date",
        }),
    [PATIENT_KEYS.GENDER]: joi.string()
        .valid("Male", "Female", "Other")
        .optional()
        .messages({
            "any.only": "Gender must be Male, Female, or Other",
        }),
    [USER_KEYS.CONTACT_NUMBER]: joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .optional()
        .messages({
            "string.empty": "Contact number cannot be empty",
            "string.pattern.base": "Contact number must only contain digits",
            "string.min": "Contact number must have at least 10 digits",
            "string.max": "Contact number must not exceed 15 digits",
        }),
    [COMMON_KEYS.ADDRESS]: addressSchema.optional(),
    [PATIENT_KEYS.MEDICAL_HISTORY]: medicalHistorySchema.optional(),
    [PATIENT_KEYS.EMERGENCY_CONTACT]: emergencyContactSchema.optional(),
    [PATIENT_KEYS.DOCTOR_ID]: joi.string()
        .optional()
        .messages({
            "string.empty": "Doctor ID cannot be empty",
        }),
});

module.exports = {
    createPatientSchema,
    updatePatientSchema
};