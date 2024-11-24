/**
 * @file accessToken.js
 * @summary Defines accessToken schema
 * */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { TOKEN_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");

const tokenSchema = new mongoose.Schema({
    [COMMON_KEYS.USER_ID]: {
        type: Schema.ObjectId,
        ref: "Users",
    },
    [TOKEN_KEYS.TOKEN]: {
        type: String
    },
});

module.exports = {
    Token: mongoose.model("Tokens", tokenSchema)
};