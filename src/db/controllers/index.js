const userRepository = require("./user");
const tokenRepository = require("./accessToken");
const patientRepository = require("./patient");
const doctorRepository = require("./doctor");
const appointmentRepository = require("./appointment");

module.exports = {
    userRepository,
    tokenRepository,
    patientRepository,
    doctorRepository,
    appointmentRepository
};

