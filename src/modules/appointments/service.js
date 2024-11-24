const { appointmentRepository, patientRepository, doctorRepository } = require(__basesrcdir + "/db/controllers");
const { APPOINTMENT_KEYS } = require(__basesrcdir + "/constants/models");
const { throwBadRequestError, throwNotFoundError } = require(__basesrcdir + "/errors");
const { messages, userTypeValue } = require(__basesrcdir + "/messages");
const { getEntityDetails } = require(__basesrcdir + "/modules/users/service");

/**
 * Method for create the appointment
 * @param {object} appointmentObj appointment object.
 * */
const createAppointment = async (appointmentObj, currentUser) => {
    const { id } = currentUser;
    const { patientId, doctorId } = appointmentObj;
    const patient = await patientRepository.getPatientById(patientId);

    if (!patient) {
        throwNotFoundError(messages.PATIENT_NOT_FOUND);
    }

    const doctor = await doctorRepository.getDoctorById(doctorId);

    if (!doctor) {
        throwBadRequestError(messages.DOCTOR_NOT_FOUND);
    }

    const appointmentPayload = {
        ...appointmentObj,
        [APPOINTMENT_KEYS.CREATED_BY]: id,
        [APPOINTMENT_KEYS.UPDATED_BY]: id
    };

    await appointmentRepository.createAppointment(appointmentPayload);
    return {};
};

/**
 * Method to get appointment info by id
 * @param {string} appointmentId appointment Id
 * */
const getAppointmentById = async (appointmentId, currentUser) => {
    const { id, role } = currentUser;
    const entity = await getEntityDetails(id, role);

    const appointment = await appointmentRepository.getAppointmentById(appointmentId);

    if (!appointment) {
        throwNotFoundError(messages.NOT_FOUND);
    }
    // Check if the current user is either the patient, doctor, or an Admin
    if (
        appointment.patientId.toString() !== entity._id.toString() &&
        appointment.doctorId.toString() !== entity._id.toString() &&
        role !== userTypeValue.ADMIN
    ) {
        throwBadRequestError(messages.ACCESS_DENIED);
    }

    return appointment;
};

/**
 * Method to update appointment info by id
 * @param {string} appointmentId appointment Id
 * */
const updateAppointmentById = async (appointmentId, appointmentObj, currentUser) => {
    const { patientId, doctorId } = appointmentObj;
    const { id, role } = currentUser;
    const entity = await getEntityDetails(id, role);

    const appointment = await appointmentRepository.getAppointmentById(appointmentId);

    if (!appointment) {
        throwNotFoundError(messages.NOT_FOUND);
    }
    // Check if the current user is either the patient, doctor, or an Admin
    if (
        appointment.patientId.toString() !== entity._id.toString() &&
        appointment.doctorId.toString() !== entity._id.toString() &&
        role !== userTypeValue.ADMIN
    ) {
        throwBadRequestError(messages.ACCESS_DENIED);
    }

    // Validate patient existence if patientId is provided in the update
    if (patientId) {
        const patient = await patientRepository.getPatientById(patientId);

        if (!patient) {
            throwNotFoundError(messages.PATIENT_NOT_FOUND);
        }
    }

    // Validate doctor existence if doctorId is provided in the update
    if (doctorId) {
        const doctor = await doctorRepository.getDoctorById(doctorId);

        if (!doctor) {
            throwBadRequestError(messages.DOCTOR_NOT_FOUND);
        }
    }

    const appointmentPayload = {
        ...appointmentObj,
        [APPOINTMENT_KEYS.UPDATED_BY]: id
    };

    await appointmentRepository.updateAppointmentById(appointmentId, appointmentPayload);
    return {};
};

/**
 * Method to delete appointmentObj info by id
 * @param {string} appointmentId appointmentObj Id
 * */
const deleteAppointmentById = async (appointmentId, currentUser) => {
    const { id, role } = currentUser;
    const entity = await getEntityDetails(id, role);
    const appointment = await appointmentRepository.getAppointmentById(appointmentId);

    if (!appointment) {
        throwNotFoundError(messages.NOT_FOUND);
    }

    // Check if the current user is either the patient, or an Admin
    if (
        appointment.patientId.toString() !== entity._id.toString() &&
        role !== userTypeValue.ADMIN
    ) {
        throwBadRequestError(messages.ACCESS_DENIED);
    }
    await appointmentRepository.deleteAppointmentById(appointmentId);
    return {};
};

module.exports = {
    createAppointment,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointmentById
};