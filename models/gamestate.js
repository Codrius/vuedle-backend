const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameStateSchema = new Schema({

});

const GameState = mongoose.model("gamestate", GameStateSchema);

module.exports = GameState;