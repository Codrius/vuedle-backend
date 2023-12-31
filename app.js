const express = require("express");
const initializeRoutes = require("./routes/index.js");
const initializeServer = require("./initializeserver.js");
const initializeMongo = require("./initializemongo.js");
const setCors = require("./setcors.js");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// Set up cors headers
setCors(app);

// Initialize all of the routes inside of index.js
initializeRoutes(app);

// Connect to MongoDB
initializeMongo();

// Start Server
initializeServer(app, PORT);