const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;