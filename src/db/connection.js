/**
 * @file connection.js
 * @summary Exposes method for connecting to mongoDB
 * */
const mongoose = require("mongoose");
const { commonConstants } = require(__basesrcdir + "/constants");

const { MONGO_URI } = commonConstants;

/**
  * Method for connecting to mongoDB
  * */
const connectToMongoDb = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on("connected", () => {
        process.stdout.write("MongoDb connected on port 27017 \n");
    });
    mongoose.connection.on("error", (err) => {
        process.stderr.write(`An error occurred. ERROR: ${err} \n`);
    });
    mongoose.connection.on("disconnected", () => {
        process.stdout.write("MongoDb disconnected! \n");
    });
};

module.exports = {
    connectToMongoDb
};
