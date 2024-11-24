/**
 * @file app.js
 * @summary Create and expose express app instance
 * @description This file is responsible for creating instance of express. All application specific
 * middleware will be used here.
 * The app instance along with the express router are exposed to be used by HTTP server.
 * */
const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const router = express.Router();
const initiateRoutes = require("./src/modules");
const { accessLogger } = require("./src/middlewares");
const { commonConstants } = require("./src/constants");
const fs = require("fs");

const { ENABLE_ACCESS_LOGS } = commonConstants;

const app = express();

app.use(urlencoded({
    extended: true,
    limit: "10mb"
}));

app.use(json({
    extended: true,
    limit: "10mb"
}));

app.use(cors());

initiateRoutes(router);

if (ENABLE_ACCESS_LOGS) {
    router.use(accessLogger);
}

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

if (!fs.existsSync("files")) {
    fs.mkdirSync("files");
}

// For serving files statically from "public" directory
app.use(express.static("public"));
app.use("/api/v1", router);

module.exports = {
    app,
    router
};
