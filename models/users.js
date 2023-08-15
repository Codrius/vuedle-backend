const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({

});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;