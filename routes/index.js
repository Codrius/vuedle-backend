const express = require("express");
const { login, register } = require("./auth");
const gamestate = require("./gamestate.js");

function initializeRoutes(app, PORT) {
    app.use(express.json());

    register(app);
    login(app);
    gamestate(app);
};

module.exports = initializeRoutes;