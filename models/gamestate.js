const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameStateSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, require: true }, // I manually define ID to keep it consistent with user ID
    username: { type: String, require: true },
    currency: { type: Number, require: true },
    clickUpgrades: { type: Number, require: true },
    idleUpgrades: { type: Number, require: true },
    clickMultiplier: { type: Number, require: true },
    idleMultiplier: { type: Number, require: true },
    combinedMultiplier: { type: Number, require: true }
});

// Define static function to find corresponding gamestate
GameStateSchema.statics.getStateById = async function (_id) {
    const game = await this.findOne({ _id });
    if (game) {
        const state = { ...game._doc };
        delete state._id;
        delete state.__v
        return state;
    }
    throw Error("Could not find game")
}

const GameState = mongoose.model("gamestate", GameStateSchema);

module.exports = GameState;