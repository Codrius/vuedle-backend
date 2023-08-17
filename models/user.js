const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
});

// Before saving a new user to mongo, hash their password
UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, process.env.SALT);
    next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;