const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({

});

const Token = mongoose.model("token", TokenSchema);

module.exports = Token;