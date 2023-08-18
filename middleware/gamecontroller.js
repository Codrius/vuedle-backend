const jwt = require("jsonwebtoken");
const GameState = require("../models/gamestate.js");

// Handle post requests to the save route
async function savePost(req, res) {
    const jwtToken = req.body.jwt;
    if (jwtToken) {
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, async (error, decodedToken) => {
            if (error) {
                console.log(error.message)
            } else {
                gamestate = await GameState.findGame(decodedToken.id);
                gamestate.currency = req.body.state.currency;
                gamestate.clickUpgrades = req.body.state.clickUpgrades;
                gamestate.idleUpgrades = req.body.state.idleUpgrades;
                gamestate.clickMultiplier = req.body.state.clickMultiplier;
                gamestate.idleMultiplier = req.body.state.idleMultiplier;
                gamestate.save();
                res.sendStatus(200);
            }
        });
    }
}

async function loadPost(req, res) {
    console.log(req, res);
}

module.exports = { savePost, loadPost }