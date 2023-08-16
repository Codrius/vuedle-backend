const User = require("../models/user.js");
const errorHandler = require("./errorhandler.js");

async function registerpost(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(errorHandler.user(error));
    }
}

module.exports = registerpost;