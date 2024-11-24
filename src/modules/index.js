/**
 * @file index.js
 * @summary Initiate and expose routes
 * */
const auth = require("./auth");
const patients = require("./patients");
const doctors = require("./doctors");
const appointments = require("./appointments");

const initiateRoutes = router => {
    auth(router);
    patients(router);
    doctors(router);
    appointments(router);
};

module.exports = initiateRoutes;