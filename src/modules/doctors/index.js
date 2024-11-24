/**
 * @file index.js
 * @summary Doctor routes
 * @description This file contains routes for doctor entity
 * */
const { createDoctor } = require("./controller");

module.exports = router => {
    router.post("/doctor", createDoctor);
};
