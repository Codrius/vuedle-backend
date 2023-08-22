const express = require("express");
const { login, register, refresh } = require("./auth.js");
const { save, load } = require("./gamestate.js");

function initializeRoutes(app) {
    app.use(express.json());
    register(app);
    login(app);
    refresh(app);
    save(app);
    load(app);
};

module.exports = initializeRoutes;