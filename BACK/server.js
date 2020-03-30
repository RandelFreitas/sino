const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/sino");

requireDir("./src/models");

//Rotas
app.use("/api", require("./src/routes/CommonsRouter"))
app.use("/api", require("./src/routes/PatientRouter"));

app.listen(3001);