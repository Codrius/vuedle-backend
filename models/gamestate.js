const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameStateSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, require: true },
    currency: { type: Number, require: true },
    clickUpgrades: { type: Number, require: true },
    idleUpgrades: { type: Number, require: true },
    clickMultiplier: { type: Number, require: true },
    idleMultiplier: { type: Number, require: true }
});

// Define static function to find corresponding gamestate
GameStateSchema.statics.findGame = async function (_id) {
    const game = await this.findOne({ _id });
    console.log("This is the game >>> " + game)
    if (game) {
        return game;
    }
    throw Error("Could not find game")
}

const GameState = mongoose.model("gamestate", GameStateSchema);

module.exports = GameState;