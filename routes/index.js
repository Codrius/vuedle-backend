const express = require("express");
const { login, register } = require("./auth.js");
const { save, load } = require("./gamestate.js");

function initializeRoutes(app) {
    app.use(express.json());
    register(app);
    login(app);
    save(app);
    load(app);
};

module.exports = initializeRoutes;