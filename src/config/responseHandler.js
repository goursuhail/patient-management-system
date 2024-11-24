
const { checkErrorCode } = require(__basesrcdir + "/errors");
const { messages } = require(__basesrcdir + "/messages");

/**
 *
 * @param {{
 *  res: any,
 *  code: number,
 *  message: string,
 *  status: boolean,
 *  data: any
 * }} param0
 * @returns
 */
const apiResponse = ({ res, code, message, status, data }) => {
    return res.status(code).json({
        message,
        status,
        data,
    });
};

/**
 *
 * @param {{
*  res: any,
*  code: number,
*  message: string,
*  status: boolean,
*  data: any
* }} param0
* @returns
*/
const errorApiResponse = (res, error) => {
    console.error("error :", error);
    if (checkErrorCode(error.code) === 500) {
        return apiResponse({ res, code: checkErrorCode(error.code), message: messages.SERVER_ERROR, status: false });
    }
    return apiResponse({ res, code: checkErrorCode(error.code), message: error.message || messages.SERVER_ERROR, status: false });
};

module.exports = {
    apiResponse,
    errorApiResponse
};
