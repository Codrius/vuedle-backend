const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaveGameSchema = new Schema({

});

const SaveGame = mongoose.model("savegame", SaveGameSchema);

module.exports = SaveGame;