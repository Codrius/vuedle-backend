const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokensSchema = new Schema({

});

const Tokens = mongoose.model("tokens", TokensSchema);

module.exports = Tokens;