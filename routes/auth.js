const authController = require("../middleware/authcontroller.js");

// Define the function to initialize the login route
function login(app) {
    app.post("/login", authController.loginPost);
    console.log("/Login loaded");
}

// Define the function to initialize the register route
function register(app) {
    app.post("/register", authController.registerPost);
    console.log("/Register loaded");
}

// Define the function to initialize the refresh route
function refresh(app) {
    app.post("/refresh", authController.refreshPost);
    console.log("/Refresh loaded");
}

module.exports = { register, login, refresh };