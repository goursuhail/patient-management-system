/**
 * @file appointment.js
 * @summary Defines and exposes methods for Appointment entity
 * */
const { Appointment } = require(__basesrcdir + "/db/models");
const { COMMON_KEYS } = require(__basesrcdir + "/constants/models");

/**
 * Method to get appointment by id from DB
 * @param {string} appointmentId Appointment id
 * @param {object} [selection] Object with DB projection
 * */
const getAppointmentById = (appointmentId, selection = {}) => Appointment.findOne({
    _id: appointmentId
}, selection);

/**
 * Method to get appointmentId info from DB
 * @param {string} condition Condition by which appointmentId will be fetched
 * @param {object} [selection] Object with DB projection
 * */
// eslint-disable-next-line array-bracket-spacing
const getAppointment = (condition = {}, selection = {}) => Appointment.findOne(condition, selection).populate([COMMON_KEYS.USER_ID]).lean();

/**
 * Method to get appointments according info to some conditions from DB
 * @param {string} condition Condition by which appointment will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getAppointments = (condition = {}, selection = {}) => Appointment.find(condition, selection).lean();

/**
 * Method to create appointment in DB
 * @param {object} appointmentObj Appointment info to save
 * */
const createAppointment = (appointmentObj) => {
    const appointment = new Appointment(appointmentObj);

    return appointment.save();
};

/**
 * Method to get appointment by id from DB
 * @param {string} appointmentId Appointment id
 * @param {object} updates Data to update
 * */
const updateAppointmentById = (appointmentId, updates) => Appointment.updateOne({
    _id: appointmentId
}, {
    $set: updates
});

/**
 * Method to delete appointment by appointmentId from DB
 * @param {string} appointmentId Appointment id
 * @param {object} [selection] Object with DB projection
 * */
const deleteAppointmentById = (appointmentId) => Appointment.deleteOne({
    [COMMON_KEYS.OBJECT_ID]: appointmentId
});

module.exports = {
    getAppointmentById,
    getAppointment,
    getAppointments,
    createAppointment,
    updateAppointmentById,
    deleteAppointmentById
};
