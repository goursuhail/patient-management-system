/**
 * @file index.js
 * @summary auth routes
 * @description This file contains routes for auth entity
 * */
const { login } = require("./controller");

module.exports = router => {
    router.post("/login", login);
};
