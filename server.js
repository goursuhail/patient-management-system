/**
 * @file server.js
 * @summary Creates HTTP server
 * @description This file is responsible for connecting to mongoDB, creating an HTTP server and adding routes.
 * Server is created by binding express app instance.
 * */
const { createServer } = require("http");
const { log } = require("./src/errors");
const { commonConstants } = require("./src/constants");
const { app } = require("./app");
const { connectToMongoDb } = require("./src/db");
const { PORT, LOG_LEVELS } = commonConstants;
const { createAdmin } = require("./src/modules/auth/service");

connectToMongoDb();

const server = createServer(app);

createAdmin();

// Event listeners to catch uncaught errors
process.on("unhandledRejection", error => {
    log(LOG_LEVELS.ERROR, error.message, { time: new Date() });
    process.exit(1);
});

process.on("exit", code => {
    process.stderr.write(`Exiting with code: ${code} \n`);
});

server.listen(PORT, err => {
    if (err) {
        return process.stderr.write(`Something went wrong: \n${err} \n`);
    }
    process.stdout.write(`Server is listening on port: ${PORT} \n`);
});