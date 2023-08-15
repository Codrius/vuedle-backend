const express = require("express");
const register = require("./register.js");
const login = require("./login.js");
const savegame = require("./savegame.js");

function initializeRoutes(app, PORT) {
    app.use(express.json());

    register(app);
    login(app);
    savegame(app);

    app.listen(PORT, (error) => {
        if (error) { console.log(`Server unable to start: ${error}`); }
        else { console.log(`Server running on port ${PORT}`); }
    });
};

module.exports = initializeRoutes;