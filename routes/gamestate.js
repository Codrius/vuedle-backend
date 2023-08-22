const { requireLoggedIn } = require("../middleware/authcontroller.js");
const gameController = require("../middleware/gamecontroller.js");

// Initialize the save route
function save(app) {
    app.post("/save", requireLoggedIn, gameController.savePost);
    console.log("/Save loaded");
}

// Initialize the load route
function load(app) {
    app.post("/load", requireLoggedIn, gameController.loadPost);
    console.log("/Load loaded");
}

module.exports = { save, load };