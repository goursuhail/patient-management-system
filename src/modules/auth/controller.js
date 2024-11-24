/* eslint-disable max-lines */
/**
 * @file controller.js
 * @summary Auth controllers
 * @description This file contains controller definition for auth entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { apiResponse, errorApiResponse } = require(__basesrcdir + "/config");
const { messages } = require(__basesrcdir + "/messages");
const { commonConstants } = require(__basesrcdir + "/constants");
const { SUCCESS } = commonConstants;
const { logInSchema } = require("./validation");
const { validateSchema } = require(__basesrcdir + "/middlewares");
const authService = require("./service");

/**
 * Controller to login the user 
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const login = async (req, res) => {
    try {
        const authObj = req.body;

        validateSchema(logInSchema, authObj);

        const data = await authService.login(authObj);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.LOGIN_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

module.exports = {
    login,
};