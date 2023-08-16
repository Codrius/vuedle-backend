const registerpost = require("../middleware/registerpost.js");

function register(app) {
    app.post("/register", registerpost)
    console.log("Register loaded");
}

module.exports = register; 