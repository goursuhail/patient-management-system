/**
 * @file index.js
 * @summary Appointment routes
 * @description This file contains routes for Appointment entity
 * */
const { authenticateUserWithToken, isRoleAllowed } = require(__basesrcdir + "/middlewares");
const { createAppointment, getAppointmentById, updateAppointmentById, deleteAppointmentById } = require("./controller");
const { userTypeValue } = require(__basesrcdir + "/messages");

module.exports = router => {
    // eslint-disable-next-line array-bracket-spacing
    router.post("/appointment", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.PATIENT]), createAppointment);
    // eslint-disable-next-line array-bracket-spacing
    router.get("/appointment/:id", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.DOCTOR, userTypeValue.PATIENT]), getAppointmentById);
    // eslint-disable-next-line array-bracket-spacing
    router.put("/appointment/:id", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.DOCTOR, userTypeValue.PATIENT]), updateAppointmentById);
    // eslint-disable-next-line array-bracket-spacing
    router.delete("/appointment/:id", authenticateUserWithToken, isRoleAllowed([userTypeValue.ADMIN, userTypeValue.PATIENT]), deleteAppointmentById);
};
