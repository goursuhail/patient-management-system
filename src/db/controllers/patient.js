/**
 * @file patient.js
 * @summary Defines and exposes methods for Patient entity
 * */
const { Patient } = require(__basesrcdir + "/db/models");
const { COMMON_KEYS } = require(__basesrcdir + "/constants/models");

/**
 * Method to get patient by id from DB
 * @param {string} patientId Patient id
 * @param {object} [selection] Object with DB projection
 * */
const getPatientById = (patientId, selection = {}) => Patient.findOne({
    _id: patientId
}, selection);

/**
 * Method to get patient info from DB
 * @param {string} condition Condition by which patient will be fetched
 * @param {object} [selection] Object with DB projection
 * */
// eslint-disable-next-line array-bracket-spacing
const getPatient = (condition = {}, selection = {}) => Patient.findOne(condition, selection).populate([COMMON_KEYS.USER_ID]).lean();

/**
 * Method to get patients according info to some conditions from DB
 * @param {string} condition Condition by which patient will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getPatients = (condition = {}, selection = {}) => Patient.find(condition, selection).lean();

/**
 * Method to create patient in DB
 * @param {object} patientObj Patient info to save
 * */
const createPatient = (patientObj) => {
    const patient = new Patient(patientObj);

    return patient.save();
};

/**
 * Method to get patient by id from DB
 * @param {string} patientId Patient id
 * @param {object} updates Data to update
 * */
const updatePatientById = (patientId, updates) => Patient.updateOne({
    _id: patientId
}, {
    $set: updates
});

/**
 * Method to delete patient by patientId from DB
 * @param {string} patientId Patient id
 * @param {object} [selection] Object with DB projection
 * */
const deletePatientById = (patientId) => Patient.deleteOne({
    [COMMON_KEYS.OBJECT_ID]: patientId
});

/**
 * Method to get all patient listing
 */
const patientListing = (condition = {}, limit, skip) => Patient.find(condition).limit(limit).skip(skip).sort({ createdAt: -1 }).lean();

module.exports = {
    getPatient,
    getPatientById,
    createPatient,
    updatePatientById,
    getPatients,
    patientListing,
    deletePatientById
};
