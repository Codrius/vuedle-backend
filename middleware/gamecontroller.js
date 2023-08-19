const GameState = require("../models/gamestate.js");
const { verifyJwt } = require("./authcontroller.js");

// Handle post requests to the save route
async function savePost(req, res) {
    try {
        const jwtToken = verifyJwt(req.headers.authorization);
        const game = await GameState.findByIdAndUpdate(jwtToken.id, { ...req.body.state });
        if (game) { res.sendStatus(200); }
        else { res.sendStatus(500); };
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function loadPost(req, res) {
    try {
        const jwtToken = verifyJwt(req.headers.authorization);
        const state = await GameState.getStateById(jwtToken.id);
        res.status(201).json(state);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

module.exports = { savePost, loadPost }