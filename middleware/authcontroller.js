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
        res.status(201).json({ id: user._id });
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

// Define the login post function for use in auth routes
async function loginPost(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: JWT_AGE * 1000 })
        res.status(200).json({ email: user.email, id: user._id })
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

module.exports = { loginPost, registerPost };