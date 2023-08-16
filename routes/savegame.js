const savegamepost = require("../middleware/savegamepost.js");

function savegame(app) {
    app.post("/savegame", savegamepost)
    console.log("Savegame loaded");
}

module.exports = savegame;