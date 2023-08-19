const { requireLoggedIn } = require("../middleware/authcontroller.js");
const gameController = require("../middleware/gamecontroller.js");

function save(app) {
    app.post("/save", requireLoggedIn, gameController.savePost);
    console.log("/Save loaded");
}

function load(app) {
    app.post("/load", requireLoggedIn, gameController.loadPost);
    console.log("/Load loaded");
}

module.exports = { save, load };