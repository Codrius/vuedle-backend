const gameController = require("../middleware/gamecontroller.js");

function save(app) {
    app.post("/save", gameController.savePost);
    console.log("/Save loaded");
}

function load(app) {
    app.post("/load", gameController.loadPost);
    console.log("/Load loaded");
}

module.exports = { save, load };