const authController = require("../middleware/authcontroller.js");

// Define the function to initialize the login route
function login(app) {
    app.post("/login", authController.loginPost);
    console.log("Login loaded");
}

// Define the function to initialize the register route
function register(app) {
    app.post("/register", authController.registerPost);
    console.log("Register loaded");
}

module.exports = { register, login };