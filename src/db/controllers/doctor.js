/**
 * @file doctor.js
 * @summary Defines and exposes methods for Doctor entity
 * */
const { Doctor } = require(__basesrcdir + "/db/models");

/**
 * Method to get Doctor by id from DB
 * @param {string} doctorId Doctor id
 * @param {object} [selection] Object with DB projection
 * */
const getDoctorById = (doctorId, selection = {}) => Doctor.findOne({
    _id: doctorId
}, selection);

/**
 * Method to get Doctor info from DB
 * @param {string} condition Condition by which Doctor will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getDoctor = (condition = {}, selection = {}) => Doctor.findOne(condition, selection).lean();

/**
 * Method to create Doctor in DB
 * @param {object} doctorObj doctor info to save
 * */
const createDoctor = (doctorObj) => {
    const doctor = new Doctor(doctorObj);

    return doctor.save();
};

module.exports = {
    getDoctor,
    getDoctorById,
    createDoctor,
};
