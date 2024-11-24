const { doctorRepository, userRepository } = require(__basesrcdir + "/db/controllers");
const { USER_KEYS, COMMON_KEYS, DOCTOR_KEYS } = require(__basesrcdir + "/constants/models");
const { throwBadRequestError } = require(__basesrcdir + "/errors");
const { messages } = require(__basesrcdir + "/messages");
const { userStatusValue, userTypeValue } = require(__basesrcdir + "/messages");
const { createUserRecord, checkIfUserExists } = require(__basesrcdir + "/modules/users/service");
/**
 * Method for create the doctor
 * @param {object} patientObj Doctor object.
 * */
const createDoctor = async (doctorObj) => {
    // Check if user already exists
    await checkIfUserExists(doctorObj[USER_KEYS.EMAIL]);
    doctorObj[USER_KEYS.ROLE] = userTypeValue.DOCTOR;

    // Create the user
    const user = await createUserRecord(doctorObj);

    try {
        // Create the doctor
        await createDoctorRecord(user._id, doctorObj);

        return {};
    } catch (error) {
        // Rollback: Delete user if doctor creation fails
        await userRepository.deleteUserById(user._id);
        throw throwBadRequestError(messages.DOCTOR_CREATION_FAILED_AND_USER_DETAILS_HAVE_BEEN_ROLLED_BACK);
    }
};

/**
 * Method for create the doctor record
 * */
const createDoctorRecord = async (userId, doctorObj) => {
    const doctorPayload = {
        [COMMON_KEYS.USER_ID]: userId,
        [DOCTOR_KEYS.SPECIALIZATION]: doctorObj[DOCTOR_KEYS.SPECIALIZATION],
        [DOCTOR_KEYS.LICENSE_NUMBER]: doctorObj[DOCTOR_KEYS.LICENSE_NUMBER],
        [DOCTOR_KEYS.QUALIFICATION]: doctorObj[DOCTOR_KEYS.QUALIFICATION],
        [DOCTOR_KEYS.EXPERIENCE_YEARS]: doctorObj[DOCTOR_KEYS.EXPERIENCE_YEARS],
        [COMMON_KEYS.STATUS]: userStatusValue.ACTIVE,
    };

    const doctor = await doctorRepository.createDoctor(doctorPayload);

    if (!doctor || !doctor._id) {
        throw throwBadRequestError(messages.DOCTOR_CREATION_FAILED);
    }
    return doctor;
};

/**
 * Method for check that doctor exist or not via doctor Id
 * */
const checkIfDoctorExists = async (doctorId) => {
    const doctor = await doctorRepository.getDoctorById(doctorId);

    if (!doctor) {
        throwBadRequestError(messages.DOCTOR_NOT_FOUND);
    }
};

module.exports = {
    createDoctor,
    checkIfDoctorExists
};