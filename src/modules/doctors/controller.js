/* eslint-disable max-lines */
/**
 * @file controller.js
 * @summary Doctor controllers
 * @description This file contains controller definition for doctor entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { apiResponse, errorApiResponse } = require(__basesrcdir + "/config");
const { messages } = require(__basesrcdir + "/messages");
const { commonConstants } = require(__basesrcdir + "/constants");
const { SUCCESS } = commonConstants;
const { createDoctorSchema } = require("./validation");
const { validateSchema } = require(__basesrcdir + "/middlewares");
const doctorService = require("./service");

/**
 * Controller to create the doctor 
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const createDoctor = async (req, res) => {
    try {
        const doctorObj = req.body;

        validateSchema(createDoctorSchema, doctorObj);

        const data = await doctorService.createDoctor(doctorObj);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.DOCTOR_CREATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

module.exports = {
    createDoctor
};