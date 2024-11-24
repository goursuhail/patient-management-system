/**
 * @file checkErrorCode.js
 * @summary contains error code
 * @description This file checks the error code
 * */

const checkErrorCode = (code) => {
    switch (code) {
        case 400:
            return 400;
        case 401:
            return 401;
        case 402:
            return 402;
        case 403:
            return 403;
        case 404:
            return 404;
        case 422:
            return 422;    
        case 500:
            return 500;
        default:
            return 500;
    }
};

module.exports = {
    checkErrorCode
};
