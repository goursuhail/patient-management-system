/* eslint-disable max-lines */
/**
 * @file controller.js
 * @summary Patient controllers
 * @description This file contains controller definition for patient entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { apiResponse, errorApiResponse } = require(__basesrcdir + "/config");
const { messages } = require(__basesrcdir + "/messages");
const { commonConstants } = require(__basesrcdir + "/constants");
const { SUCCESS } = commonConstants;
const { createPatientSchema, updatePatientSchema } = require("./validation");
const { validateSchema } = require(__basesrcdir + "/middlewares");
const patientService = require("./service");
const { throwBadRequestError } = require(__basesrcdir + "/errors");

/**
 * Controller to create the patient 
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const createPatient = async (req, res) => {
    try {
        const patientObj = req.body;
        const currentUser = req.user;

        validateSchema(createPatientSchema, patientObj);

        const data = await patientService.createPatient(patientObj, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.PATIENT_CREATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to get patient info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const getPatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const currentUser = req.user;

        if (!patientId) {
            throwBadRequestError(messages.PATIENT_ID_REQUIRED);
        }
        const data = await patientService.getPatientById(patientId, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.SUCCESS_MESSAGE, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to update patient info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const updatePatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patientObj = req.body;
        const currentUser = req.user;

        validateSchema(updatePatientSchema, patientObj);
        const data = await patientService.updatePatientById(patientId, patientObj, currentUser);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.PATIENT_UPDATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to delete patient info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const deletePatientById = async (req, res) => {
    try {
        const patientId = req.params.id;

        if (!patientId) {
            throwBadRequestError(messages.PATIENT_ID_REQUIRED);
        }
        const data = await patientService.deletePatientById(patientId);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.PATIENT_DELETED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

module.exports = {
    createPatient,
    getPatientById,
    updatePatientById,
    deletePatientById
};