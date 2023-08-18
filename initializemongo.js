const mongoose = require("mongoose");

function initializeMongo() {
    mongoose.connect(process.env.MONGO_LOCATION);
    mongoose.connection.syncIndexes();
    mongoose.connection.once("open", () => {
        console.log("Mongoose connected to mongo!")
    }).on("error", (error) => { console.log(error); });
}

module.exports = initializeMongo;