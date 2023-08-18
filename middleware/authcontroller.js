const User = require("../models/user.js");
const GameState = require("../models/gamestate.js");
const errorHandler = require("./errorhandler.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const JWT_AGE = 1800; // 30 minutes in seconds

// Define the function to create JWT tokens
function createJwt(id, addRefresh) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: JWT_AGE
    });
}

// Define the function to create refresh tokens
function createRefreshToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Define the register post function for use in auth routes
async function registerPost(req, res) {
    const { email, username, password } = req.body;
    try {
        const refreshToken = createRefreshToken();
        const user = await User.create({ email, username, password, refreshToken });
        GameState.create({  // Create a default game state upon user registration
            _id: user._id,
            currency: 0,
            clickUpgrades: 0,
            idleUpgrades: 0,
            clickMultiplier: 1,
            idleMultiplier: 1
        })
        const jwtToken = createJwt(user._id);
        res.status(201).json({ refreshToken, jwtToken, id: user._id });
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

// Define the login post function for use in auth routes
async function loginPost(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const jwtToken = createJwt(user._id);
        const refreshToken = createRefreshToken();
        user.refreshToken = refreshToken;
        user.password = password; // Because the password is hashed every time the user is saved, we must make sure not to rehash the hashed password
        user.save();
        res.status(200).json({ refreshToken, jwtToken, username: user.username, id: user._id })
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

module.exports = { loginPost, registerPost };