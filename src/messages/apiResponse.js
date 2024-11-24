const messages = {
    // errors
    "SERVER_ERROR": "Something went wrong",
    "USER_ALREADY_EXISTS": "A user with this email already exists!",
    "ACCESS_DENIED": "Access denied",
    "INVALID_CREDENTIALS": "Invalid credentials",
    "CONFIRM_PASSWORD_NOT_MATCHED": "Confirm password not matched",
    "USER_NOT_FOUND": "User not found",
    "SUCCESS_MESSAGE": "API executed successfully",
    "EMAIL_ALREADY_EXISTS": "Email already exists",

    //success
    "SUCCESS": "API executed successfully",
    "ERROR": "API executed with errors",

    // Auth
    "LOGIN_SUCCESSFULLY": "Login successfully..",

    // User
    "USER_CREATION_FAILED_AND_PLEASE_TRY_AGAIN": "User creation failed, Please try again.",

    // Patient
    "PATIENT_CREATED_SUCCESSFULLY": "Patient created successfully..",
    "PATIENT_UPDATED_SUCCESSFULLY": "Patient updated successfully..",
    "PATIENT_DELETED_SUCCESSFULLY": "Patient deleted successfully..",
    "NOT_FOUND": "Not found",
    "PATIENT_ALREADY_EXISTS": "Patient with this email already exists!",
    "PATIENT_ID_REQUIRED": "Patient Id required",
    "PATIENT_NOT_FOUND": "Patient not found",
    "PATIENT_CREATION_FAILED_AND_USER_DETAILS_HAVE_BEEN_ROLLED_BACK": "Patient creation failed. User details have been rolled back.",
    "PATIENT_CREATION_FAILED": "Patient creation failed",

    //Doctor
    "DOCTOR_ID_REQUIRED": "Doctor Id required",
    "DOCTOR_CREATED_SUCCESSFULLY": "Doctor created successfully..",
    "DOCTOR_NOT_FOUND": "Doctor not found",
    "DOCTOR_CREATION_FAILED_AND_USER_DETAILS_HAVE_BEEN_ROLLED_BACK": "Doctor creation failed. User details have been rolled back.",
    "DOCTOR_CREATION_FAILED": "Doctor creation failed",

    //Appointment
    "APPOINTMENT_CREATED_SUCCESSFULLY": "Appointment created successfully..",
    "APPOINTMENT_ID_REQUIRED": "Appointment Id required",
    "APPOINTMENT_UPDATED_SUCCESSFULLY": "Appointment updated successfully..",
    "APPOINTMENT_DELETED_SUCCESSFULLY": "Appointment deleted successfully..",

};

module.exports = {
    messages,
};