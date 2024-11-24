/* eslint-disable max-lines */
/**
 * @file controller.js
 * @summary Appointment controllers
 * @description This file contains controller definition for appointment entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { apiResponse, errorApiResponse } = require(__basesrcdir + "/config");
const { messages } = require(__basesrcdir + "/messages");
const { commonConstants } = require(__basesrcdir + "/constants");
const { SUCCESS } = commonConstants;
const { createAppointmentValidationSchema, updateAppointmentValidationSchema } = require("./validation");
const { validateSchema } = require(__basesrcdir + "/middlewares");
const appointmentService = require("./service");
const { throwBadRequestError } = require(__basesrcdir + "/errors");

/**
 * Controller to create the appointment 
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const createAppointment = async (req, res) => {
    try {
        const appointmentObj = req.body;
        const currentUser = req.user;

        validateSchema(createAppointmentValidationSchema, appointmentObj);

        const data = await appointmentService.createAppointment(appointmentObj, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.APPOINTMENT_CREATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to get appointment info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const getAppointmentById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const currentUser = req.user;

        if (!patientId) {
            throwBadRequestError(messages.APPOINTMENT_ID_REQUIRED);
        }
        const data = await appointmentService.getAppointmentById(patientId, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.SUCCESS_MESSAGE, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to update appointment info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const updateAppointmentById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const appointmentObj = req.body;
        const currentUser = req.user;

        validateSchema(updateAppointmentValidationSchema, appointmentObj);
        const data = await appointmentService.updateAppointmentById(patientId, appointmentObj, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.APPOINTMENT_UPDATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to delete appointment info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const deleteAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const currentUser = req.user;

        if (!appointmentId) {
            throwBadRequestError(messages.APPOINTMENT_ID_REQUIRED);
        }
        const data = await appointmentService.deleteAppointmentById(appointmentId, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.APPOINTMENT_DELETED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

module.exports = {
    createAppointment,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointmentById
};