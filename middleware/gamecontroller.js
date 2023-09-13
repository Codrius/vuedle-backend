const GameState = require("../models/gamestate.js");
const { verifyJwt } = require("./authcontroller.js");

// Handle post requests to the save route
async function savePost(req, res) {
    try {
        req.body.state.combinedMultiplier = req.body.state.clickMultiplier + req.body.state.idleMultiplier;
        const game = await GameState.findByIdAndUpdate(req.user._id, { ...req.body.state });
        if (game) { res.sendStatus(200); }
        else { res.sendStatus(500); };
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

// Handle post requests to the load route
async function loadPost(req, res) {
    try {
        const state = await GameState.getStateById(req.user._id);
        res.status(201).json(state);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

module.exports = { savePost, loadPost }