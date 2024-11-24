/**
 * @file index.js
 * @summary Patient routes
 * @description This file contains routes for patient entity
 * */
const { authenticateUserWithToken, isRoleAllowed } = require(__basesrcdir + "/middlewares");
const { createPatient, getPatientById, updatePatientById, deletePatientById } = require("./controller");
const { userTypeValue } = require(__basesrcdir + "/messages");

module.exports = router => {
    // eslint-disable-next-line array-bracket-spacing
    router.post("/patient", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.DOCTOR]), createPatient);
    // eslint-disable-next-line array-bracket-spacing
    router.get("/patient/:id", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.DOCTOR, userTypeValue.PATIENT]), getPatientById);
    // eslint-disable-next-line array-bracket-spacing
    router.put("/patient/:id", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.DOCTOR]), updatePatientById);
    // eslint-disable-next-line array-bracket-spacing
    router.delete("/patient/:id", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN]), deletePatientById);
};
