const express = require("express");
const { login, register } = require("./auth");
const savegame = require("./savegame.js");

function initializeRoutes(app, PORT) {
    app.use(express.json());

    register(app);
    login(app);
    savegame(app);
};

module.exports = initializeRoutes;