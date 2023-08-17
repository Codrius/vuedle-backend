const gamestatepost = require("../middleware/gamestatepost.js");

function gamestate(app) {
    app.post("/gamestate", gamestatepost)
    console.log("Gamestate loaded");
}

module.exports = gamestate;