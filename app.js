const express = require("express");
const mongoose = require("mongoose");
const initializeRoutes = require("./routes/index.js");
const app = express();
const PORT = 4000;

mongoose.connect("mongodb+srv://vuedleAdmin:vuedlePass@cluster0.qhplnvq.mongodb.net/vuedle");
mongoose.connection.once("open", () => {
    console.log("Mongoose connected to mongo!")
}).on("error", (error) => { console.log(error); });

initializeRoutes(app, PORT);