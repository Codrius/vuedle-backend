const User = require("../models/user.js");
const GameState = require("../models/gamestate.js");
const errorHandler = require("./errorhandler.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const JWT_AGE = 1800; // 30 minutes in seconds

function createJwt(id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: JWT_AGE
    });
}

function createRefreshToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Let a route require that a user be logged in to access it, and then attach the logged in user to the request
async function requireLoggedIn(req, res, next) {
    try {
        const decodedToken = jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        res.sendStatus(400);
    }
}

// Define the register post function for use in auth routes
async function registerPost(req, res) {
    const { email, username, password } = req.body;
    try {
        const refreshToken = createRefreshToken();
        const user = await User.create({ email, username, password, refreshToken });
        GameState.create({  // Create a default game state upon user registration
            _id: user._id,
            username,
            currency: 0,
            clickUpgrades: 0,
            idleUpgrades: 0,
            clickMultiplier: 1,
            idleMultiplier: 1,
            combinedMultiplier: 2,
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
        await user.save();
        res.status(200).json({ refreshToken, jwtToken, username: user.username, id: user._id })
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

// Define the refresh token post route.  If token is valid, provides new JWT+Refresh token
async function refreshPost(req, res) {
    const { id, refreshToken } = req.body;
    try {
        const user = await User.findById(id);
        if (refreshToken === user.refreshToken) {
            const newJwt = createJwt(id);
            const newRefreshToken = createRefreshToken();
            user.refreshToken = newRefreshToken;
            await user.save();
            res.status(200).json({ jwtToken: newJwt, refreshToken: newRefreshToken });
        } else {
            console.log("Invalid refresh token");
            res.status(400).json({ error: "Invalid refresh token" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }

}
module.exports = { loginPost, registerPost, requireLoggedIn, refreshPost };