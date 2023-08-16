const loginpost = require("../middleware/loginpost.js");

function login(app) {
    app.post("/login", loginpost)
    console.log("Login loaded");
}

module.exports = login; 