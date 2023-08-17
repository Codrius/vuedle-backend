const User = require("../models/user.js");
const errorHandler = require("./errorhandler.js");
const jwt = require("jsonwebtoken");
const JWT_AGE = 1800; // 30 minutes in seconds

// Definte the function to create tokens
function createToken(id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: JWT_AGE
    });
}

// Define the register post function for use in auth routes
async function registerPost(req, res) {
    const { email, username, password } = req.body;
    try {
        const user = await User.create({ email, username, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: JWT_AGE * 1000 })
        res.status(201).json({ token, id: user._id });
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

// Define the login post function for use in auth routes
function loginPost(req, res) {
    console.log(req, res);
}

module.exports = { loginPost, registerPost };