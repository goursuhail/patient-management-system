const { patientRepository, userRepository } = require(__basesrcdir + "/db/controllers");
const { USER_KEYS, PATIENT_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const { throwBadRequestError, throwNotFoundError } = require(__basesrcdir + "/errors");
const { messages, userTypeValue } = require(__basesrcdir + "/messages");
const { createUserRecord, checkIfUserExists } = require(__basesrcdir + "/modules/users/service");
const { checkIfDoctorExists } = require(__basesrcdir + "/modules/doctors/service");
const { getEntityDetails } = require(__basesrcdir + "/modules/users/service");

/**
 * Method for create the patient
 * @param {object} patientObj Patient object.
 * */
const createPatient = async (patientObj, currentUser) => {
    const { id } = currentUser;

    // Check if user already exists
    await checkIfUserExists(patientObj[USER_KEYS.EMAIL]);
    // Check if doctor already exists
    await checkIfDoctorExists(patientObj[PATIENT_KEYS.DOCTOR_ID]);
    patientObj[USER_KEYS.ROLE] = userTypeValue.PATIENT;
    // Create the user
    const user = await createUserRecord(patientObj);

    try {
        // Create the doctor
        await createPatientRecord(user._id, id, patientObj);

        return {};
    } catch (error) {
        // Rollback: Delete user if doctor creation fails
        await userRepository.deleteUserById(user._id);
        throw throwBadRequestError(messages.PATIENT_CREATION_FAILED_AND_USER_DETAILS_HAVE_BEEN_ROLLED_BACK);
    }
};

/**
 * Method for create the patient record
 * */
const createPatientRecord = async (userId, createdBy, patientObj) => {
    const patientPayload = {
        [COMMON_KEYS.USER_ID]: userId,
        [PATIENT_KEYS.CREATED_BY]: createdBy,
        [PATIENT_KEYS.UPDATED_BY]: createdBy,
        [PATIENT_KEYS.DOCTOR_ID]: patientObj[PATIENT_KEYS.DOCTOR_ID],
        [PATIENT_KEYS.DATE_OF_BIRTH]: patientObj[PATIENT_KEYS.DATE_OF_BIRTH],
        [PATIENT_KEYS.GENDER]: patientObj[PATIENT_KEYS.GENDER],
        [PATIENT_KEYS.MEDICAL_HISTORY]: patientObj[PATIENT_KEYS.MEDICAL_HISTORY] || [],
        [PATIENT_KEYS.EMERGENCY_CONTACT]: patientObj[PATIENT_KEYS.EMERGENCY_CONTACT] || null,
    };

    // Save the patient payload in the database
    const patient = await patientRepository.createPatient(patientPayload);

    if (!patient || !patient._id) {
        throw throwBadRequestError(messages.PATIENT_CREATION_FAILED);
    }

    return patient;
};

/**
 * Method to get patient info by id
 * @param {string} patientId Patient Id
 * */
const getPatientById = async (patientId, currentUser) => {
    const { id, role } = currentUser;
    const entity = await getEntityDetails(id, role);

    const patient = await patientRepository.getPatient({
        [COMMON_KEYS.OBJECT_ID]: patientId,
        [COMMON_KEYS.IS_DELETED]: false
    });

    if (!patient) {
        throwNotFoundError(messages.NOT_FOUND);
    }

    // Check if the current user is either the patient, doctor, or an Admin
    if (
        patient._id.toString() !== entity._id.toString() &&
        patient.doctorId.toString() !== entity._id.toString() &&
        role !== userTypeValue.ADMIN
    ) {
        throwBadRequestError(messages.ACCESS_DENIED);
    }

    return patient;
};

/**
 * Method to update patient info by id
 * @param {string} patientId Patient Id
 * */
const updatePatientById = async (patientId, patientObj, currentUser) => {
    const { id, role } = currentUser;
    const entity = await getEntityDetails(id, role);
    // Fetch the patient
    const patient = await patientRepository.getPatientById(patientId);

    if (!patient) {
        throwNotFoundError(messages.NOT_FOUND);
    }

    // Check if the current user is either the doctor or an Admin
    if (
        patient.doctorId.toString() !== entity._id.toString() &&
        role !== userTypeValue.ADMIN
    ) {
        throwBadRequestError(messages.ACCESS_DENIED);
    }

    // Handle user-related updates
    if (patient.userId) {
        const user = await userRepository.getUserById(patient.userId);

        if (!user) {
            throwNotFoundError(messages.USER_NOT_FOUND);
        }

        const userPayload = {};

        if (patientObj[USER_KEYS.FIRST_NAME]) {
            userPayload[USER_KEYS.FIRST_NAME] = patientObj[USER_KEYS.FIRST_NAME];
        }
        if (patientObj[USER_KEYS.LAST_NAME]) {
            userPayload[USER_KEYS.LAST_NAME] = patientObj[USER_KEYS.LAST_NAME];
        }
        if (patientObj[USER_KEYS.CONTACT_NUMBER]) {
            userPayload[USER_KEYS.CONTACT_NUMBER] = patientObj[USER_KEYS.CONTACT_NUMBER];
        }
        if (patientObj[COMMON_KEYS.ADDRESS]) {
            userPayload[COMMON_KEYS.ADDRESS] = patientObj[COMMON_KEYS.ADDRESS];
        }

        if (Object.keys(userPayload).length > 0) {
            await userRepository.updateUserById(patient.userId, userPayload);
        }
    }

    // Prepare patient payload
    const patientPayload = {
        [PATIENT_KEYS.UPDATED_BY]: id,
        [PATIENT_KEYS.DOCTOR_ID]: patientObj[PATIENT_KEYS.DOCTOR_ID] || patient.doctorId,
        [PATIENT_KEYS.DATE_OF_BIRTH]: patientObj[PATIENT_KEYS.DATE_OF_BIRTH] || patient.dateOfBirth,
        [PATIENT_KEYS.GENDER]: patientObj[PATIENT_KEYS.GENDER] || patient.gender,
        [PATIENT_KEYS.MEDICAL_HISTORY]: patientObj[PATIENT_KEYS.MEDICAL_HISTORY] || patient.medicalHistory || [],
        [PATIENT_KEYS.EMERGENCY_CONTACT]: patientObj[PATIENT_KEYS.EMERGENCY_CONTACT] || patient.emergencyContact || null,
    };

    // Update patient
    await patientRepository.updatePatientById(patientId, patientPayload);

    return;
};

/**
 * Method to delete patient info by id
 * @param {string} patientId Patient Id
 * */
const deletePatientById = async (patientId) => {
    const patient = await patientRepository.getPatientById(patientId);

    if (!patient) {
        throwNotFoundError(messages.NOT_FOUND);
    }
    await userRepository.deleteUserById(patient.userId);
    await patientRepository.deletePatientById(patientId);
    return {};
};

module.exports = {
    createPatient,
    getPatientById,
    updatePatientById,
    deletePatientById
};